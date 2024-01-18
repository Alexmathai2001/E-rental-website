

var seconds = 59;
const container = document.getElementById("resendotp");
let countdownInterval; // Add this line to declare the variable

function updatecountdown() {
    container.innerText = `Resend OTP in ${seconds} seconds`;
    container.classList.remove("text-blue-500");
    container.classList.add("text-gray-400");
}

function resendotp() {
    // logic for resending otp
    startcountdown();

}

function startcountdown() {
    clearInterval(countdownInterval);
    updatecountdown();

    countdownInterval = setInterval(() => {
        seconds--;
        updatecountdown();
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            container.innerText = `Resend OTP`;
        container.classList.add("text-blue-500");
        container.classList.remove("text-gray-400");
            seconds = 59;
        }
    }, 1000);
    
}

startcountdown();


function validateOTP(event) {
    event.preventDefault()
    const enteredOTP = document.getElementById('otpInput').value;

    fetch('/user/enterotp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enteredOtp: enteredOTP }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            window.location.href = data.redirectTo;
        }else{
            // OTP validation failed
            document.getElementById('message').innerText = data.message;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


  