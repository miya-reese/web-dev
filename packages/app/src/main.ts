// app/src/main.ts
import { html } from "lit";
import {
    Auth,
    History,
    Store,
    Switch,
    define
  } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { JournalHeaderElement } from "./components/journal-header";
import { LandingViewElement } from "./views/landing-view";
import { BookshelfViewElement } from "./views/bookshelf-view";
import { AboutusViewElement } from "./views/aboutus-view";
import { JournalViewElement } from "./views/journal-view";


const routes: Switch.Route[] = [
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/aboutus",
    view: () => html`
      <aboutus-view></aboutus-view>
    `
  },
  {
    path: "/app/journal",
    view: () => html`
      <journal-view></journal-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <bookshelf-view></bookshelf-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "journal:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "journal:history");
    }
  },
  "journal-header": JournalHeaderElement,
  "profile-view": ProfileViewElement,
  "landing-view": LandingViewElement,
  "bookshelf-view": BookshelfViewElement,
  "aboutus-view": AboutusViewElement,
  "journal-view": JournalViewElement
});