import { App } from "vue";
import Button from "./button/index";
import Img from "./img/index";
import Ellipsis from "./ellipsis/index";

const install = (app: App) => {
  [Button, Img, Ellipsis].forEach((component) => {
    app.use(component);
  });
  return app;
};

export { install, Button, Img, Ellipsis };
