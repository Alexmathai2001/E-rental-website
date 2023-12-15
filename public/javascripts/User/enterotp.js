

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
