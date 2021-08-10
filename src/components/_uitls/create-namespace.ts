export type Modifier = string | { [key: string]: string };
export type Modifiers = Modifier | Modifier[];

export type NamespaceData = [
  string,
  (element?: Modifiers, modifier?: Modifiers) => string
];

const generateModifier = (name: string, modifier?: Modifiers): string => {
  if (!modifier) {
    return "";
  }

  if (typeof modifier === "string") {
    return ` ${name}--${modifier}`;
  }

  if (Array.isArray(modifier)) {
    return modifier.reduce<string>(
      (res, item) => res + generateModifier(name, item),
      ""
    );
  }

  return Object.keys(modifier).reduce(
    (res, key) => res + (modifier[key] ? generateModifier(name, key) : ""),
    ""
  );
};

/**
 * bem helper
 * @example bem() // 'button'
 * @example bem('text') // 'button__text'
 * @example bem({ disabled }) // 'button button--disabled'
 * @example bem('text', { disabled }) // 'button__text button__text--disabled'
 * @example bem(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
const createBEM = (block: string) => {
  return (element?: Modifiers, modifier?: Modifiers) => {
    if (element && typeof element !== "string") {
      modifier = element;
      element = "";
    }
    element = element ? `${block}__${element}` : block;
    return `${element}${generateModifier(element, modifier)}`;
  };
};

export const createNamespace = (name: string): NamespaceData => {
  const block = `v-${name}`;
  return [block, createBEM(block)];
};
