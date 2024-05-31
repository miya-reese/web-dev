//import { DropdownElement, define } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

export class JournalHeaderElement extends LitElement {
  //static uses = define({
    //"drop-down": DropdownElement
  //});

  render() {
    return html`
    <header>
        <h1>Welcome</h1>
        <h1>hi</h1>
        <!--<drop-down>…</drop-down>-->
    </header>
    `;
  }

  static styles = css`
  header {
    color: var(--color-text-header);
    background-color: var(--color-accent);
    display: flex; 
    align-items: baseline; 
    justify-content: space-between; 
    padding: 0.0 rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  header h1 {
    font-family: "Libre Baskerville", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 40px;
  }
  `;
}