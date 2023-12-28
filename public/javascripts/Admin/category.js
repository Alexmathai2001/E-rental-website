function deletepopup(){
    document.getElementById("deletepopup").style.display="flex";
}
function canceldeletepopup(){
    document.getElementById("deletepopup").style.display="none";
}

function addcategory(){
    document.getElementById('add-popup').style.display = "flex"
}
function CancelAddPopup(){
    document.getElementById("add-popup").style.display="none";
}
function canceleditpopup(){
    document.getElementById('editpopup').style.display = "none";
}

function previewImage(input){
    imagedone();
    const fileInput = input.files[0];

    // Display the image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.remove('hidden');


    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(fileInput);
}

function imagedone(){
    document.getElementById('image-upload').style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    document.getElementById('image-upload').textContent = 'Upload Successfull !!!'
}


//validation
var form = document.getElementById('category-form').addEventListener('submit',function(event){
    event.preventDefault();

    var categoryname = document.getElementById('category-name')
    var categoryerror = document.getElementById('category-error')
    var submit = document.getElementById('category-submit')
    var imageUploadError = document.getElementById('upload-error')

    if (categoryname.value.trim() === '') {
        categoryerror.textContent = "Category name cannot be empty"
        categoryerror.style.display = "block"
    }else if(document.getElementById('image-upload').textContent !== 'Done'){
        categoryerror.style.display = 'none'
        imageUploadError.textContent = 'Upload an image'
        imageUploadError.style.display = "block"
    }else{
        submit.textContent = 'Saving...'
        document.getElementById('category-form').submit();
    }
})


async function editpopup(element){
    try {
        const categoryId = element.id
        const response = await fetch(`/admin/categories/edit/${categoryId}`);
        const data = await response.json();
        const itemId = data.item._id;
        const categoryName = data.item.categoryname;
        const status = data.item.showstatus;
        console.log(status);
        const imageUrl = data.item.imageUrl;
        let categoryname = document.getElementById('categoryname')
        let categoryStatus = document.getElementById('category-status')
        categoryname.value = categoryName
        categoryStatus.value = status

        document.getElementById("editpopup").style.display="flex";
    }
    catch(error){
        console.error('error fetching category data',error)
    }
}



