export class JSXRenderer {
  /**
   * React-like createElement function so we can use JSX in our code.
   */
  public static createElement (tag, attrs, ...children): HTMLElement {
    // if component was created by a function
    if (typeof tag === 'function') {
      return tag({ ...attrs });
    }

    const element: HTMLElement = document.createElement(tag);

    for (const name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        const value = attrs[name];

        if (typeof value === 'function') {
          element.addEventListener(name, value);
        } else if (name === 'className') {
          element.className = value;
        } else if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      // skip children which are equal to 'false'
      if (!child) {
        continue;
      }

      // allow to write children with 'map' function
      if (Array.isArray(child)) {
        child.forEach(child => element.appendChild(child));
        continue;
      }

      element.appendChild(!child.nodeType
        ? document.createTextNode(child.toString())
        : child,
      );
    }

    return element;
  }
}
