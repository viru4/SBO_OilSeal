import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { History, Users, Factory, Target } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container py-12">
      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="relative bg-black/60 p-8 md:p-12">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary">
              Established 2003
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About SBO Oil Seals
            </h1>
            <p className="text-gray-200 text-lg">
              Specializing in high-performance oil seals for the automotive industry,
              with expertise in motorcycle shocker and fork seals for over 20 years.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Our Story</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-4">
              SBO Oil Seals was founded in 2003 with a vision to provide high-quality sealing 
              solutions specifically for the automotive sector. What began as a small workshop 
              has grown into a specialized manufacturing unit with state-of-the-art equipment.
            </p>
            <p className="text-muted-foreground">
              Our journey has been defined by continuous improvement and specialization. 
              Over the years, we've developed unique expertise in motorcycle fork and shocker 
              seals, becoming a trusted partner for OEMs and aftermarket distributors across India.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2003", label: "Year Founded" },
              { value: "20+", label: "Years of Experience" },
              { value: "500+", label: "Product SKUs" },
              { value: "300+", label: "Bike Models Supported" },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{item.value}</div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Mission & Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Quality First",
              description: "We never compromise on materials or precision. Every seal we produce undergoes rigorous testing.",
            },
            {
              title: "Customer Partnership",
              description: "We work closely with customers to understand their needs and provide tailored sealing solutions.",
            },
            {
              title: "Continuous Innovation",
              description: "We constantly improve our materials, designs and manufacturing processes.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Factory className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Manufacturing Capabilities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-4">
              Our production facility is equipped with specialized machinery for precision 
              molding, finishing, and quality control. We maintain strict process controls 
              to ensure consistent quality.
            </p>
            <ul className="space-y-2">
              {[
                "Automated mixing and molding systems",
                "Precision CNC finishing equipment",
                "Digital measurement and inspection tools",
                "In-house tooling and prototyping",
                "Environmental testing chambers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-bold mb-4">Materials Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "NBR", desc: "For general applications" },
                { name: "FKM", desc: "For high-temperature resistance" },
                { name: "PTFE", desc: "For low friction requirements" },
                { name: "Custom Compounds", desc: "For specific performance needs" },
              ].map((material) => (
                <div key={material.name} className="border bg-background p-3 rounded-md">
                  <div className="font-medium">{material.name}</div>
                  <div className="text-xs text-muted-foreground">{material.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Our Team</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          SBO Oil Seals is powered by a team of experienced engineers, skilled technicians, 
          and quality specialists who are passionate about precision and performance.
        </p>
        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Our leadership team combines over 50 years of experience in automotive sealing technology. 
            From design to delivery, we're committed to excellence at every stage.
          </p>
        </div>
      </section>
    </div>
  );
}