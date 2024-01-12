async function edituserinfo(){
    try{
        const response = await fetch('/user/myaccount/edit')
        const data = await response.json()
        const username = document.getElementById('username')
        const useremail = document.getElementById('useremail')
        const userphone = document.getElementById('userphone')
        userphone.value = data.phone
        useremail.value = data.email
        username.value = data.name
    }catch(err){
        console.log(err);
    }
    document.getElementById("updateuserinfo").style.display="flex";
}
function cancelupdateuserinfo(){
    document.getElementById("updateuserinfo").style.display="none";
}