import {
    View,
    Events
  } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class LandingViewElement extends View<Model, Msg> {
  render() {
    return html`
    <article>
      <journal-header><h1 slot="title">Welcome</h1></journal-header>
        <a href="/login.html" @click=${signOutUser}>Login</a>
        <br>
        <a href="/new_account.html">Create New Account</a>
    </article>
    `;
  }
}

function signOutUser(ev: Event) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
  }

