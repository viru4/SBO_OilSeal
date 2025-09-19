import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getToken, setToken, listContacts, ContactRecord, replyContact, updateContactStatus } from "@/lib/admin";

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [token, setTok] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return toast.error("Enter token");
    try {
      // quick probe to validate
      await listContacts(undefined, token.trim());
      setToken(token.trim());
      onSuccess();
      toast.success("Signed in");
    } catch {
      toast.error("Invalid token");
    }
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Owner Sign-in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="token">Access Token</Label>
            <Input id="token" value={token} onChange={(e) => setTok(e.target.value)} placeholder="Enter owner token" />
          </div>
          <Button type="submit">Sign in</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactRow({ item, onSelect }: { item: ContactRecord; onSelect: (id: string) => void }) {
  return (
    <button onClick={() => onSelect(item.id)} className="w-full text-left rounded-md border p-3 hover:bg-muted/40">
      <div className="flex items-center justify-between">
        <div className="font-medium">{item.name} • {item.email}</div>
        <div className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground truncate">{item.message}</div>
      <div className="mt-1 text-xs"><span className="rounded bg-muted px-2 py-0.5">{item.status}</span></div>
    </button>
  );
}

function ReplyBox({ current, onDone }: { current: ContactRecord | null; onDone: (c: ContactRecord) => void }) {
  const [msg, setMsg] = useState("");
  const disabled = !current;
  const send = async () => {
    if (!current) return;
    if (!msg.trim()) return toast.error("Type a reply message");
    const updated = await replyContact(current.id, msg.trim());
    setMsg("");
    onDone(updated);
    toast.success("Reply saved");
  };
  return (
    <div className="grid gap-2">
      <Label>Reply</Label>
      <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your reply to the customer..." disabled={disabled} />
      <div className="flex gap-2">
        <Button onClick={send} disabled={disabled}>Send Reply</Button>
        {current && (
          <Button type="button" variant="outline" onClick={async () => { const u = await updateContactStatus(current.id, "closed"); onDone(u); toast.success("Marked closed"); }}>Mark Closed</Button>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!getToken());
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ContactRecord[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => (Array.isArray(items) ? items.find(i => i.id === activeId) || null : null), [items, activeId]);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      try {
        setLoading(true);
        const data = await listContacts();
        setItems(Array.isArray(data) ? data : []);
        if (data.length) setActiveId(data[0].id);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load contacts (check token)");
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [authed]);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  return (
    <div className="container py-8 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Requests & Inquiries</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
            {!loading && items.length === 0 && <div className="text-sm text-muted-foreground">No requests yet.</div>}
            {items.map((i) => (
              <ContactRow key={i.id} item={i} onSelect={setActiveId} />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {!active && <div className="text-sm text-muted-foreground">Select a request on the left.</div>}
            {active && (
              <div className="grid gap-3">
                <div className="rounded-md border p-3 bg-background">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{active.name} • {active.email}</div>
                    <div className="text-xs text-muted-foreground">{new Date(active.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 text-sm whitespace-pre-wrap">{active.message}</div>
                </div>
                {active.reply && (
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="text-xs text-muted-foreground">Replied on {new Date(active.reply.repliedAt).toLocaleString()}</div>
                    <div className="mt-1 text-sm whitespace-pre-wrap">{active.reply.message}</div>
                  </div>
                )}
                <ReplyBox current={active} onDone={(u) => {
                  setItems((prev) => prev.map((it) => (it.id === u.id ? u : it)));
                }} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
