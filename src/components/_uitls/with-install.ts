import { App, DefineComponent } from "vue";

export const withInstall = (component: DefineComponent) => {
  const install = (app: App) => {
    app.component(component.name, component);
    return app;
  };
  return {
    ...component,
    install,
  };
};
