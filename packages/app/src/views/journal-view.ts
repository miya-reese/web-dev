import {
    View
  } from "@calpoly/mustang";
import { html, css } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class JournalViewElement extends View<Model, Msg> {
    static styles = css`
        .journal {
    display: grid; 
    grid-template-columns: [start] 4fr 1fr 1fr[end]; 
    gap: 2rem;
    justify-items: center;
}

img {
    width:6rem;
    height: auto;
}
  
    `

  render() {
    return html`
    <journal-header><h1 slot="title">Journal</h1></journal-header>
    <article class="journal">
            <article>
                <textarea cols="80" rows="30"></textarea>
            </article>
            <article>
                <details>
                    <summary>Available Libraries</summary>
                    <dl>
                      <dd>
                        <drop-down>
                            <p slot="label">Sticker Library</p>
                            <img src="/images/duck0.png" alt="Cute Duck">
                            <img src="/images/tulip0.png" alt="Sparkling Tulip">
                            <img src="/images/bunny0.png" alt="Sitting Bunny">
                            <img src="/images/bunny1.png" alt="Leaping Bunny">
                            <img src="/images/frog0.png" alt="Frog">
                            <img src="/images/frog1.png" alt="Squished Frog">
                        </drop-down>
                      </dd>
                    </dl>
                </details>
            </article> 
        </article>
    `;
  }
}

