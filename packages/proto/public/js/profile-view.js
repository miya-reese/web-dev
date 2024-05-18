import { prepareTemplate } from "./template.js";
import { loadJSON } from "./json-loader.js";
import { Auth, Observer } from "@calpoly/mustang";


export class ProfileViewElement extends HTMLElement {
    get src() {
        return this.getAttribute("src");
      }

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
        grid-template-rows: [start] 1fr [h1] 1fr [slot.profilepic] 1fr [end];
      }
      ::slotted(h1) {
        display: grid;
        grid-column: h1 / end;
        grid-template-columns: subgrid;
      }
      ::slotted(.profilepic) {
        grid-column: slot.profilepic;
        justify-self: start;
      }

    
  `;

  static template = prepareTemplate(`
    <template>
      <section>
        <h1><slot name="firstname"></slot> <slot name="lastname"></slot></h1>
        <slot name="profilepic"></slot>
        <dl>
          <dt>Username:  <slot name="userid"></slot></dt>
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

  _authObserver = new Observer(this, "journal:auth");

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user;
  
      if (this.src) {
        loadJSON(this.src, this, renderSlots, this.authorization );
      }
    });
  }
}

customElements.define("profile-view", ProfileViewElement);

function renderSlots(json) {
    const entries = Object.entries(json);
    const slot = ([key, value]) => {
      // default case for now:
      if (key == "profilepic") {
        return `<img slot="profilepic" src="${value}" alt="Profile Picture"/>`
      }
      else {
        return `<span slot="${key}">${value}</span>`;
      }
    };
  
    return entries.map(slot).join("\n");
  }