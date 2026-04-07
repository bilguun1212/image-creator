// Allow importing plain CSS files as side-effect imports in TypeScript
// This makes statements like `import './globals.css'` compile without
// needing generated typings for every stylesheet.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';
declare module '*.module.less';

export {};
