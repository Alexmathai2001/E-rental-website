const indianstates = ["kerala",
"Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chhattisgarh",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jharkhand",
"Karnataka",
"Kerala",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal",
"Jammu and Kashmir", // Note: The status of Jammu and Kashmir changed after my last update in January 2022.
"Lakshadweep",
"Puducherry",
"Andaman and Nicobar Islands"]

function populateDropdown(){
    const dropdown = document.getElementById("states")
    indianstates.forEach(states => {
        const option = document.createElement("option")
        option.value = states
        option.text = states
        dropdown.add(option)
    })
}
window.onload = populateDropdown