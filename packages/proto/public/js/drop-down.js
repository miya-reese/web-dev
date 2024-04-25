import { prepareTemplate } from "./template.js";

export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <slot name="actuator"><button><slot name="label"></slot></button></slot>
    <div id="panel">
      <slot></slot>
      <slot></slot>
      <slot></slot>
      <slot></slot>
      <slot></slot>
      <slot></slot>
    </div>
    
    <style>
      :host {
        position: relative;
      }
      #is-shown {
        display: none;
      }
      #panel {
        display: none; 
        position: absolute;
        left: 0;
        margin-top: 0.25rem;
        width: 16rem;
        height: 24rem;
        padding-top: 1.5rem;
        border-radius:  0.25rem;
        background: var(--color-accent2);
        color: black;
        box-shadow: var(--shadow-popover);
      }
      :host([open]) #panel {
        display: grid;
        grid-template-columns: [start]1fr 1fr[end];
        grid-template-rows: [start] 1fr 1fr 1fr[end]; 
        gap: 0rem;
        justify-items: center;
      }
      button {
        background-color: var(--color-accent);
        color: var(--color-text-header);
        }
    </style>
  </template>`);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .querySelector("slot[name='actuator']")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);