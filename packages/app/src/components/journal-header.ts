import {
  View,
  Auth,
  Events,
  Observer,
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";


export class JournalHeaderElement extends View<Model, Msg> {
  @property()
  username = "anonymous";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("journal:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.dispatchMessage([
          "profile/select",
          { userid: this.username }
        ]);
      }
    });
  }

  render() {
    const {userid} =
      this.profile || {};

    return html`
    <header>
        <h1><slot name="title"><slot></h1>
        <nav>
            <a href="/app">Home</a>
            <a href="/app/aboutus">About Us</a>
            <a href="/app/profile/${userid}">Profile</a>
            <a href="/login.html" @click=${signOutUser}>Logout</a>
        </nav>
    </header>
    `;
  }

  static styles = css`
  header {
    margin: 0.0rem;
    padding: 0.0rem;
    
    color: var(--color-text-header);
    background-color: var(--color-accent);
    display: flex; 
    align-items: baseline; 
    justify-content: space-between; 
    padding-left: 2rem;
    padding-right: 2rem;
  }

  header h1 {
    margin: 0.0rem;
    padding: 0.0rem;
    font-family: "Libre Baskerville", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
  }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "journal:auth"
  );

}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}