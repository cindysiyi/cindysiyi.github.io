import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

/**
 * 启动应用并挂载到根节点。
 * @returns 是否完成挂载
 */
const bootstrap = (): boolean => {
  const container = document.getElementById("root");
  if (!container) {
    return false;
  }

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  return true;
};

bootstrap();
