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
    <article class="center">
        <img src="https://i.pinimg.com/564x/73/e5/ef/73e5ef15db6b76b9d4017a454825ac32.jpg" alt="Flowers">
        <br>
        <br>
        <a href="/login.html" @click=${signOutUser}>Login</a>
        <br>
        <a href="new_account.html">Create New Account</a>
        <br>
        <br>
        <a href="/app/profile/cnadin">Profile Page</a>
    </article>
    `;
  }
}

function signOutUser(ev: Event) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
  }

