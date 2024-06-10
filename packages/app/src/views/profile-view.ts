// src/views/profile-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class ProfileViewer extends LitElement {
    static styles = css`
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

      .profile {
    display: grid; 
    grid-template-columns: [start] 1fr 4fr[end]; 
    gap: 2rem;
}

.right {
    margin-left: auto; 
    margin-right: 0;

    
  `;
  
    render() {
      return html`
      <section>
      <journal-header><h1 slot="title">Profile</h1></journal-header>
      <article>
      <h1><slot name="firstname"></slot> <slot name="lastname"></slot></h1>
      <slot name="profilepic"></slot>
      <dl>
        <dt>Username:  <slot name="userid"></slot></dt>
      </dl>
      </article>
      </section>
      `;
    }
  }
  

export class ProfileViewElement extends View<Model, Msg> {

    static uses = define({
        "profile-viewer": ProfileViewer
      });

    @property({ type: Boolean, reflect: true })
    edit = false;
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get profile(): Profile | undefined {
      return this.model.profile;
    }

  constructor() {
    super("journal:model");
  }

  static styles = css`.profile {
    display: grid; 
    grid-template-columns: [start] 1fr 4fr[end]; 
    gap: 2rem;
}

.right {
    margin-left: auto; 
    margin-right: 0;
}`

  render() {

    const {
        userid,
        firstname,
        lastname,
        profilepic
      } = this.profile || {};

    return html`
      <profile-viewer>
          <span slot="firstname">${firstname}</span>
          <span slot="lastname">${lastname}</span>
          <img slot="profilepic" src="${profilepic}" alt="Profile Picture"/>
          <span slot="userid">${userid}</span>
      </profile-viewer>
    `;
  }

  // etc
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }
}