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

function menuslidein(){
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.remove("-translate-x-[250px]")
    sidebar.classList.add("translate-x-[0px]")
    document.getElementById("sidebarcontainer").style.visibility="visible"
}
function closesidebar(){
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.add("-translate-x-[250px]")
    sidebar.classList.remove("translate-x-[0px]")
    document.getElementById("sidebarcontainer").style.visibility = "hidden"
}