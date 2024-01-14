async function editpopup(element){
    const name = document.getElementById('nameinput')
    const email = document.getElementById('emailinput')
    const status = document.getElementById('statusinput')
    const phone = document.getElementById('phoneinput')
    const userid = element.id
    const response = await fetch(`/admin/customers/edit/${userid}`)
    const data = await response.json()
    console.log(data)
    const namevalue = data.name
    const emailvalue = data.email
    const statusvalue = data.status
    const phonevalue = data.phone
    name.value = namevalue
    email.value = emailvalue
    status.value = statusvalue
    phone.value = phonevalue

    document.getElementById("updateuserinfo").style.display="flex";

}


function cancelupdateuserinfo(){
    document.getElementById("updateuserinfo").style.display="none";
}