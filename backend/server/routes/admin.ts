import { RequestHandler, Router } from "express";
import { z } from "zod";
import { getContact, listContacts, updateContact } from "../store";

function verifyToken(req: Parameters<RequestHandler>[0]) {
  const auth = req.headers["authorization"] || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
  const expected = process.env.ADMIN_TOKEN;
  return expected && token === expected;
}

const requireOwner: RequestHandler = (req, res, next) => {
  if (!verifyToken(req)) return res.status(401).json({ error: "Unauthorized" });
  next();
};

const ReplySchema = z.object({ message: z.string().min(1) });
const StatusSchema = z.object({
  status: z.enum(["new", "in_progress", "closed", "replied"]),
});

export function createAdminRouter() {
  const r = Router();
  r.use(requireOwner);

  r.get("/contacts", async (req, res) => {
    try {
      const status =
        typeof req.query.status === "string"
          ? (req.query.status as any)
          : undefined;
      const items = await listContacts(status);
      res.json({ items });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to load contacts" });
    }
  });

  r.get("/contacts/:id", async (req, res) => {
    try {
      const item = await getContact(req.params.id);
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json({ item });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to load contact" });
    }
  });

  r.post("/contacts/:id/reply", async (req, res) => {
    try {
      const parsed = ReplySchema.safeParse(req.body);
      if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
      const item = await getContact(req.params.id);
      if (!item) return res.status(404).json({ error: "Not found" });
      const updated = await updateContact(req.params.id, {
        status: "replied",
        reply: {
          message: parsed.data.message,
          repliedAt: new Date().toISOString(),
        },
      });
      res.json({ ok: true, item: updated });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to send reply" });
    }
  });

  r.patch("/contacts/:id", async (req, res) => {
    try {
      const parsed = StatusSchema.safeParse({ status: req.body?.status });
      if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
      const updated = await updateContact(req.params.id, {
        status: parsed.data.status,
      });
      if (!updated) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true, item: updated });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  return r;
}
