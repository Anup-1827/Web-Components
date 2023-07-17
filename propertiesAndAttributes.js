// Step 1:-- Define the allowed Attributes
// Step 2:-- Sync the attrubutes with the properties
//Step:3-- Handle Values and Changes in the Attributes

const style = `
        <style>
            ::slotted(h2){
                color: orangered !important;
            }

            .attrRoot{
                background: grey;
                padding: 10px 30px;
                margin: 10px
            }

            .character{
                text-align: center;
                font-size: 30px;
                font-weight: bold;
                cursor: pointer;
            }
        </style>
`;

const template = document.createElement("template");
template.innerHTML = `
    ${style}
    <div class="attrRoot">
        <h1>This Component is For Properties and Attributes</h1>
        <slot name="desc">This is a default for Slot</slot>
    </div>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });
    const templateClone = template.content.cloneNode(true);

    this.root.appendChild(templateClone);
  }
  // Step 1:-- Define the allowed Attributes
  static get observedAttributes(){
    return ["character", "color"]
  }
  // Step 2:-- Sync the attrubutes with the properties
  get character(){
    return this.getAttribute("character")
  }
  set character(value){
     this.setAttribute("character", value)
  }


  get color(){
    return this.getAttribute("color")
  }
  set color(value){
     this.setAttribute("color", value)
  }

  //Step:3-- Handle Values and Changes in the Attributes
  attributeChangedCallback(attrName, oldVal, newVal){
    if(attrName.toLowerCase() === "character" && newVal){
        const div = this.root.querySelector('.attrRoot');
        const p = div.querySelector('p') ? div.querySelector('p'): document.createElement('p');
        p.className = "character"
        p.textContent = newVal;

        div.appendChild(p);
    }

    if(attrName.toLowerCase() === "color" && newVal){ 
        const div = this.root.querySelector('.attrRoot');
        const p = div.querySelector('p')? div.querySelector('p') : document.createElement('p');
        p.className = "character";
        p.style.color = newVal;

        if(!div.querySelector('p')){
            div.appendChild(p)
        }
    }
  }

}

window.customElements.define("prop-attr", WebComp);
