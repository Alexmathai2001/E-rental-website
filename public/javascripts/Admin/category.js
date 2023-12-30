
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

function editpreviewimage(input){
    imageEditDone()
    const fileInput = input.files[0];
    // Display the image preview
    const image_Preview = document.getElementById('image-Preview');
    const reader = new FileReader();
    reader.onload = function (e) {
      image_Preview.src = e.target.result;
    };
    reader.readAsDataURL(fileInput);
}


function imagedone(){
    let imageupload = document.getElementById('image-upload')
    imageupload.style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    imageupload.textContent = 'Upload Successfull !!!'
}
function imageEditDone(){
    let image_edit_upload = document.getElementById('image-edit-upload')
    image_edit_upload.style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    image_edit_upload.textContent = 'Upload Successfull !!!'

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
    }else if(document.getElementById('image-upload').textContent !== 'Upload Successfull !!!'){
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
        let imagePreview = document.getElementById('image-Preview');
        let categoryname = document.getElementById('categoryname')
        let categoryStatus = document.getElementById('category-status')
        const categoryId = element.id
        const response = await fetch(`/admin/categories/edit/${categoryId}`);
        const data = await response.json();
        const categoryName = data.categoryname;
        const status = data.showstatus;
        const imageUrl = data.categoryimgurl;
        imagePreview.src = imageUrl
        console.log(imageUrl);
        console.log(imagePreview)
        categoryname.value = categoryName
        categoryStatus.value = status

        document.getElementById("editpopup").style.display="flex";
    }
    catch(error){
        console.error('error fetching category data',error)
    }
}

async function deletepopup(element){
    let deletecategoryname = document.getElementById('deletecategoryname')
    document.getElementById("deletepopup").style.display="flex";
    const list = element.id.split("-");
    document.getElementById('deleteId').value=list[0]
    deletecategoryname.textContent = list[1]
}

