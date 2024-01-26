
const phoneno = document.getElementById('phoneno')
const phoneerror = document.getElementById('phone-error')
phoneerror.style.display = "none"

let form = document.getElementById('login-form')
form.addEventListener('submit',(event) =>{
    event.preventDefault();
    validate()
})


function validate(){
    if(phoneno.value.trim() === ""){
        phoneerror.textContent = "This field cannot be empty"
        phoneerror.style.display = "block"
    }else if(phoneno.value.length !== 10){
        phoneerror.textContent = "10 digits expected"
        phoneerror.style.display = "block"
    }else{
        phoneerror.style.display = "none"
        form.submit()
    }
}

