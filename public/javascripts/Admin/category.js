function deletepopup(){
    document.getElementById("deletepopup").style.display="flex";
}
function canceldeletepopup(){
    document.getElementById("deletepopup").style.display="none";
}
function editpopup(){
    document.getElementById("editpopup").style.display="flex";
}
function canceleditpopup(){
    document.getElementById("editpopup").style.display="none";
}
function addcategory(){
    document.getElementById("editpopup").style.display="flex";
}

function imagedone(){
    document.getElementById('image-upload').style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    document.getElementById('image-upload').textContent = 'Done'
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






