import type { ReactElement } from "react";

export type AppProps = {
  title?: string;
};

/**
 * 应用主视图。
 * @param props - 组件属性
 * @returns 应用根元素
 */
export function App(props: AppProps): ReactElement {
  const { title = "My Persona Web" } = props;

  return (
    <main>
      <h1>{title}</h1>
      <p>React 18 + TypeScript + Webpack 5 已初始化。</p>
    </main>
  );
}
