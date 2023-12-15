const expandedsearchbox = document.getElementById("expandedsearchbox")
const defaultheader = document.getElementById("defaultsubheader")

function showsearchbox(){
    
    defaultheader.classList.remove("flex")
    defaultheader.classList.add("hidden")    
    expandedsearchbox.classList.remove("hidden")
}

function hidesearchbox(){
    expandedsearchbox.classList.add("hidden")
    defaultheader.classList.remove("hidden")
    defaultheader.classList.add("flex")    
}