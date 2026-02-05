import { createRoot } from "react-dom/client";
import "./style/normalize.css";
import "./style/index.css";
import App from "./App.tsx";
import { ModalProvider } from "./context/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <App />
  </ModalProvider>,
);
