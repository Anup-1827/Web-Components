document.addEventListener('DOMContentLoaded', ()=>{

    const propAttrWebCom = document.querySelector('prop-attr');
    propAttrWebCom.addEventListener('click', ()=>{
        const character = propAttrWebCom.getAttribute('character');
        if(character === "Iron Man"){
            propAttrWebCom.setAttribute('character', "Captain America")
            propAttrWebCom.setAttribute('color', "navy")
        }
        else{
            propAttrWebCom.setAttribute('character', "Iron Man")
            propAttrWebCom.setAttribute('color', "red")
        }
    })


    const behavAttrWebComp = document.querySelector('behav-events');
    behavAttrWebComp.addEventListener('click', ()=>{
        const character = behavAttrWebComp.getAttribute('character');
        if(character === "Iron Man"){
            behavAttrWebComp.setAttribute('character', "Captain America")
            behavAttrWebComp.setAttribute('color', "navy")
        }
        else{
            behavAttrWebComp.setAttribute('character', "Iron Man")
            behavAttrWebComp.setAttribute('color', "red")
        }
    })
})


function hello(){
    console.log("Hello Function is getting called");
}