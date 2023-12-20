function deletepopup(){
    document.getElementById("deletepopup").style.display="flex";
}
function canceldeletepopup(){
    document.getElementById("deletepopup").style.display="none";
}
function scrollToSection(sectionId) {
    document.getElementById("section1").style.display="flex";
    var section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function addmoreinput(){
    newspace = document.getElementById("newspace")

    let newdiv = document.createElement("div")
    newdiv.className = "w-full flex mt-2"
    newspace.appendChild(newdiv)

    let firstinput = document.createElement("input")
    firstinput.type = "text"
    firstinput.className = "rounded-full w-1/2 p-2 me-1"
    firstinput.placeholder = "key"
    firstinput.name = "attribute"
    newdiv.appendChild(firstinput)

    let secondinput = document.createElement("input")
    secondinput.type = "text"
    secondinput.className = "rounded-full w-1/2 p-2 me-1"
    secondinput.placeholder = "value"
    secondinput.name = "property"
    newdiv.appendChild(secondinput)
}

function previewImage(input) {
    const fileInput = input.files[0];

    // Display the file name
    document.getElementById('fileName').textContent = fileInput.name;

    // Display the image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(fileInput);
  }