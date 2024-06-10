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
  
  
  export class JournalCardElement extends View<Model, Msg> {
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
      return html`
      <article>
            <img src="https://cdn-icons-png.flaticon.com/512/4371/4371313.png" alt="Notebook" style="width:100px;height:100px;">
            <br>
            <a href="journal.html">My Journal</a>
      </article>
      `;
    }
  
    static styles = css`
    .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 40%;
    }

    .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .container {
    padding: 2px 16px;
    }

    .c {
      height: 8rem;
      width: 8rem;
    }

    article {
      margin: 0.0rem;
      padding: 0.0rem;
      height: 8rem;
      width: 8rem;
      border-style: solid;
      border-width: 1rem;
      border-color: white;
      color: var(--color-text-header);
      background-color: var(--color-accent);
      display: flex; 
      align-items: baseline; 
      justify-content: space-between; 
      padding-left: 2rem;
      padding-right: 2rem;
    }
  
    article a {
      margin: 0.0rem;
      padding: 0.0rem;
      color: var(--color-text);
      background-color: var(--color-accent);
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 18px;
    }
    `;
  
    _authObserver = new Observer<Auth.Model>(
      this,
      "journal:auth"
    );
  
  }