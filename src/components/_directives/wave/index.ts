import "./style.scss";

const removeHandle = "@@wavesOutHandle";

const handleClick = (ele: HTMLElement, color = "#1890ff") => {
  const handle = () => {
    if (!ele) return;
    ele.style.position = "relative";
    let ripple = ele.querySelector<HTMLElement>(".waves-out");
    if (ripple) {
      ripple.classList.remove("active");
    } else {
      ripple = document.createElement("span");
      ripple.classList.add("waves-out");
      ele.appendChild(ripple);
    }
    ripple.style.borderColor = color;
    ripple.offsetWidth;
    ripple.classList.add("active");
  };

  ele[removeHandle] = handle;
  return handle;
};

export default {
  name: "wave",
  mounted(el: HTMLElement, { value }) {
    el.addEventListener("click", handleClick(el, value), false);
  },
  update(el: HTMLElement, { value }) {
    el.removeEventListener("click", el[removeHandle], false);
    el.addEventListener("click", handleClick(el, value), false);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("click", el[removeHandle], false);
    Reflect.deleteProperty(el, removeHandle);
  },
};
