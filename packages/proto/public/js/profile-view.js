import { prepareTemplate } from "./template.js";

export class ProfileViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }

    img {
        width:6rem;
        height: auto;
    }

    section {
        display: grid;
        gap: var(--size-spacing-medium);
        grid-template-rows: [start] 1fr [h1] 1fr [slot.profilepic] 1fr [dl];
      }

    
  `;

  static template = prepareTemplate(`
    <template>
      <section>
        <h1><slot name="firstname"></slot> <slot name="lastname"></slot></h1>
        <slot name="profilepic"></slot>
        <dl>
          <dt>Username:</dt>
          <dd><slot name="userid"></slot></dd>
        </dl>
      </section>
      <style>${ProfileViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );
  }
}

customElements.define("profile-view", ProfileViewElement);