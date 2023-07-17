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
})