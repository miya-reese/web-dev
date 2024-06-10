import {
    View
  } from "@calpoly/mustang";
import { html, css } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class BookshelfViewElement extends View<Model, Msg> {
    static styles = css`
        .card {
            margin: 2.0rem;
            padding: 0.0rem;
            height: 15rem;
            width: 8rem;
            color: var(--color-text-header);
            background-color: var(--color-accent);
    }
    
    .card-img {
        border-style: solid;
        border-width: 1rem;
        border-color: var(--color-accent);
    }
    
    .center {
        margin: auto;
        width: 50%;
    }
  
    `

  render() {
    return html`
    <article>
        <journal-header><h1 slot="title">Bookshelf</h1></journal-header>
        <section class="center">
            <article class="card" style='text-align:center;'>
                <img class="card-img" src="https://molang.com/cdn/shop/files/molang_fraise_fonddecran_mobile_473x1024.png?v=1690980321" alt="Notebook" style="width:150%;height:100%;align:center;">
                <br>
                <a class="center" href="./app/journal">My Journal</a>
            </article>
        </section>
    </article>
    `;
  }
}

