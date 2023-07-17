// Web Component Inherits the Styling of the Web Page if not defined by default
// To Style the Web Component we need to write the CSS
// IMPORTANT
    // Whatever we write inside the Style Tag is applied to the HTML that is written or appended in through JS
// <li> tag color is set to orange but not applied because it is inside the Shadow Root

// :host--> It is used to style the Shadow Root 
// :host(web-comp)--> This method is applied only when the web-component is big-bang;
// :host-context(tag-name)--> If the web-component is inside the <tag-name> specified then the Style are applied to it

// IMPORTANT
    // :slotted(tag-name)--> The Styling is added to the element inside the shadow root
    // But the style inside the ::slotted is cascade first than other styling. So the the "!important" is added to the style inside the pesudo selector ::slotted

// IMPORTANT
    // :part(part-name) --> It is the reversal of the styling the shadow element
    // If the Web Component is Styled Through ./style.css file i.e., outside the web-component then part is used
    // It overrides the style of the element inside the Web-Component
    // ::part(outlineStyling) span{
    //     /* Does Not Works */
    //     /* Span should have the part attribute */
    // }

const customStyling = `
    <style>
        div{
            border: 1px solid red;
            padding: 10px 20px;
            color: white;
        }

        h3{
            color: red;
        }

        li{
            color: orange;
        }

        :host{
            background: green;

            /* display: block is set to the Div inside the Shadow Root because the Everthing inside the Shadow Root is inline HTML */
            display: block; 
        }

        :host(big-bang){
            /* color: white; */
        }

        :host-context(article){
            text-decoration: line-through;
        }
        
        ::slotted(ul){
            background: gold;
            color: black !important;
        }

    </style>
`


// Another Way to Append 
const template = document.createElement('template');
template.innerHTML = `
    ${customStyling}
    <div>
        <h3>Template Big Bang Theory</h3>
        <slot name="title">This is the default title for the slot</slot>
        <slot name="char">This is the default character for the slot</slot>
        <slot name="charList">This is the default character list for the slot</slot>
        <p part="outlineStyling">This element is styled outside the Web-Component</p>
    </div>
`



class BigBang extends HTMLElement{
    constructor(){
        super();

        // Shadow Root:-- Web Component has its own Styling and JS File. We don't want our Component to Effect the Rest of the Webpage and vice-versa.
        // Shadow Root creates a Sandbox to our web-component which remians unaffected to the rest of the page
        // {mode: 'closed'}:-- mode has two values open/close
        // open:-- Allows the parent js (main.js) to access the Web Component
        // close:-- Discards the Permission to access the Web Component
        const shadowRoot = this.attachShadow({mode: 'closed'})

        // const div = document.createElement('div');
        // div.textContent = "Bing Bang Theory";
        // shadowRoot.appendChild(div)

        const templateClone = template.content.cloneNode(true)  //Cloning all the node inside the HTML Element

        // <big-bang>Hii This is a Big Bang Comp</big-bang>
            // Anything inside <big-bang> component is never reflected on the screen
            // <slot> tag with title is used to added the content inside the component
        
        shadowRoot.appendChild(templateClone)


    }
}

window.customElements.define('big-bang', BigBang);
// There must be an "-" inside the name of the Web Component
// <big-bang>