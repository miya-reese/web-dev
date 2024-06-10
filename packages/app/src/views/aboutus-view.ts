import {
    View
  } from "@calpoly/mustang";
import { html, css } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class AboutusViewElement extends View<Model, Msg> {
    static styles = css`
        section {
    padding-top: 1rem;
}

.about-us {
    display: grid; 
    grid-template-columns: [start] 1fr 1fr [end]; 
    gap: 1rem;
}

.center {
    margin: auto;
    width: 50%;
  }
  
    `

  render() {
    return html`
    <journal-header><h1 slot="title">About Us</h1></journal-header>
    <article class="about-us">
            <img src="https://i.pinimg.com/564x/95/47/12/95471297c20d862b703b4a2e1bb948ee.jpg" alt="About Us Picture">
            <section>
                <h3>It's the little things in life &#9825;</h3>
                <p><br>Details, details, details! The little things in life matter most, 
                    and our hope is that our cute journals add a little sunshine to your day. 
                    Whether you are using our journals for school, poetry, a little self-care journaling, or for 
                    organizing your thoughts, we're here for you! Like the little flowers
                    that grow between the cracks in the sidewalk, we exsist as a reminder that there is
                    beauty in the mundane. In case no one told you today, we love you!
                    <br>
                    <br>Xoxo,
                    <br>Our Team
                    <br>
                    <br>P.S. This is a free website because kindness is free &#9786;</p>
            </section>
            
        </article>
    `;
  }
}

