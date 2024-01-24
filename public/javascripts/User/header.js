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


const searchHeaderDesks= document.querySelectorAll('.searchDesktopHeader')
searchHeaderDesks.forEach(function(element){
    element.addEventListener('submit',async function(event){

        event.preventDefault()
        let searchValue = element.querySelector('.searchHeaderInput').value;
        if(searchValue===''){
            window.location.href='/user/landing'
        }
       
        const response = await fetch(`/user/search?q=${encodeURIComponent(searchValue)}`);
        const result = await response.text();
            // document.body.innerHTML = result;
            document.getElementsByTagName('main')[0].style.display = 'none';
            document.querySelector('.searchResult-Container').innerHTML=result
            
    })
})