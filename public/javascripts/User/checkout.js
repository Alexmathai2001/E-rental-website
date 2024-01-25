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

document.getElementById('payForm').addEventListener('submit',
async function(e){
    e.preventDefault()
   
        var radioButtons = document.getElementsByName("paymenttype");
        let selectvalue
        console.log(radioButtons);
        // Loop through the radio buttons to find the selected one
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
           
                // Return the value of the selected radio button
                selectvalue =  radioButtons[i].value
            }
        }
        
      





    const response =  await fetch('/User/checkout/payment',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            amount:500,
            paymentMethod:selectvalue,
        })
    })
    let data = await response.json()
    console.log(data)
    if(data == 'Cod'){
        await fetch('/User/checkout/placeorder',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                amount:500,
                paymenttype:document.getElementById('cashondelivery').value,
                address:document.getElementById('address').value
            })
        })
        window.location.href= '/User/orderconfirmed'
    }
var options = {
    "key": data.key_id, // Enter the Key ID generated from the Dashboard
    "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Torq",
    "description": "Test Transaction",
    "image": "http://localhost:3000/images/LOGO FOR WHITEBG.jpg",
    "order_id": data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
        await fetch('/User/checkout/placeorder',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                amount:500,
                paymenttype:document.getElementById('cashondelivery').value,
                address:document.getElementById('address').value
            })
        })
        window.location.href= '/User/orderconfirmed'
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#5E8E99"
    }
};
const rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    rzp1.open();
    e.preventDefault();
}
   )


