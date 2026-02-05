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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">
          React 18 + TypeScript + Webpack 5 已初始化，并已集成 Tailwind CSS。
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            操作
          </button>
          <button className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100">
            次要
          </button>
        </div>
      </div>
    </main>
  );
}
