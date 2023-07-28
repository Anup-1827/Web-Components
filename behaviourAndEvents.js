const style = `
    <style>
        #eventRoot{
            background: lightblue;
            color: white;
            padding: 10px 20px;
            text-align:center;
        }
        button{
            border: none !important;
            background: white;
            padding: 5px 10px;
            color: red;
        }
        
    </style>

`

const template = document.createElement('template');
template.innerHTML = `
        ${style}
    <div id="eventRoot">
        <h1>Web Component for Behaviours and Events </h1>
        <button>
            <slot name="done"></slot>
        </button>
    </div>
`

class BehaviourAndEvents extends HTMLElement{

    constructor(){
        super()
        
        this.root = this.attachShadow({mode: 'closed'});
        const cloneTemplate = template.content.cloneNode(true);

        this.root.appendChild(cloneTemplate);


        // Step:-- Handling Slots
        const btnSlot = this.root.querySelector('#eventRoot button slot');
            // assignedNodes returns the list of all the Nodes inside the Slot
            // assignedElements returns the list of all the Elements (including tags) inside the SLot'
            const htmlSlot = btnSlot.assignedNodes()[0];
        if(htmlSlot){
            // console.log(btnSlot);
            btnSlot.addEventListener('slotchanged', ()=>{
                console.log(htmlSlot);
            })


            // Step:-- Handle Events
            btnSlot.addEventListener('click',(ev)=>{
                const action = (this.action && typeof window[this.action] === "function")? window[this.action] : this.defaultActionFunc;

                action(ev);
            })
        }
        else{
            // Removed if the Slot Inside the Btn is not added
            // This removes the button from the HTML 
            // Little White Rectangle is Gone
            btnSlot.parentElement.remove()
        }

    }


    // Default Action Function 
    defaultActionFunc(){
        console.log("Missing Action Attribute Form the Web Compoenent");
    }


    // Web Component Added or Removed form the Page
    connectedCallback(){
        // Web Comp is added to the page
        console.log("Web Comp Added");
        if(this.color === "orangered"){
            this.color ="green"
        }

    }
    disconnectedCallback    (){ 
        // Web Comp is removed from the page
        // It is called when the component is removed form the page
        // It only has access to the Web Page and DOM APIs
        // It is used for cleap up
    }



      // Step 1:-- Define the allowed Attributes
  static get observedAttributes(){
    return ["character", "color", "action"]
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

  get action(){
    return this.getAttribute("action")
  }
  set action(value){
    this.setAttribute("action", value);
  }

  //Step:3-- Handle Values and Changes in the Attributes
  attributeChangedCallback(attrName, oldVal, newVal){
    if(attrName.toLowerCase() === "character" && newVal){
        const div = this.root.querySelector('#eventRoot');
        const p = div.querySelector('p') ? div.querySelector('p'): document.createElement('p');
        p.className = "character"
        p.textContent = newVal;

        div.appendChild(p);
    }

    if(attrName.toLowerCase() === "color" && newVal){ 
        const div = this.root.querySelector('#eventRoot');
        const p = div.querySelector('p')? div.querySelector('p') : document.createElement('p');
        p.className = "character";
        p.style.color = newVal;

        if(!div.querySelector('p')){
            div.appendChild(p)
        }
    }
  }
}

customElements.define('behav-events', BehaviourAndEvents);