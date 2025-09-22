import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-xl font-bold">SBO OilSeals</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Precision oil seals engineered for reliability. Over 25+ years of
            manufacturing excellence.
          </p>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link to="/industries" className="hover:text-primary">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/quality" className="hover:text-primary">
                Quality
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:ravi24827@gmail.com"
                className="hover:text-primary"
              >
                ravi24827@gmail.com
              </a>
            </li>
            {/* <li>
              <a href="tel:+11234567890" className="hover:text-primary">
                +1 (123) 456-7890
              </a>
            </li> */}
            <li>Mon–Sat, 9:00–18:00</li>
            <li>Delhi, India</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SBO OilSeals. All rights reserved.
      </div>
    </footer>
  );
}
