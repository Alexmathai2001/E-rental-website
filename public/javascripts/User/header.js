const expandedsearchbox = document.getElementById("expandedsearchbox")
const defaultheader = document.getElementById("defaultsubheader")
const testelement = document.getElementById('test')
const testright = document.getElementById('testright')

function showsearchbox(){
    
    defaultheader.classList.remove("flex")
    defaultheader.classList.add("hidden")    
    expandedsearchbox.classList.remove("hidden")
    testelement.classList.add('hidden')
    testright.classList.add('hidden')
}

function hidesearchbox(){
    expandedsearchbox.classList.add("hidden")
    defaultheader.classList.remove("hidden")
    defaultheader.classList.add("flex")    
    testelement.classList.remove('hidden')
    testright.classList.remove('hidden')
}