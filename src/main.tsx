import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setDefaultConsent } from "./lib/consentMode";

setDefaultConsent();

createRoot(document.getElementById("root")!).render(<App />);
