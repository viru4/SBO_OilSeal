import { createRoot, Root } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

const w = window as unknown as { __root?: Root };
if (!w.__root) {
  w.__root = createRoot(container);
}

w.__root.render(<App />);
