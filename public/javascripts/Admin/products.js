function deletepopup(element){
    document.getElementById("deletepopup").style.display="flex";
    const list = element.id.split("-");
    document.getElementById('deleteId').value=list[0]
    deleteproductname.textContent = list[1]
}
function canceldeletepopup(){
    document.getElementById("deletepopup").style.display="none";
}
function showPopup() {
    document.getElementById('add-product-popup').style.display = "flex"
}
function CancelproductPopup(){
    document.getElementById('add-product-popup').style.display = "none"
}

var form = document.getElementById('product-form').addEventListener('submit',function(event){
    event.preventDefault();
    
    let productname = document.getElementById('productname').value
    let brandname = document.getElementById('brandname').value
    let category = document.getElementById('category').value
    let regularprice = document.getElementById('regularprice').value
    let discount = document.getElementById('discountpercentage').value
    let bestseller = document.getElementById('bestseller').value
    let stockstatus = document.getElementById('stockstatus').value
    let productcondition = document.getElementById('productcondition').value
    let heading1 = document.getElementById('heading1').value
    let content1 = document.getElementById('content1').value
    let heading2 = document.getElementById('heading2').value
    let content2 = document.getElementById('content2').value
    let heading3 = document.getElementById('heading3').value
    let content3 = document.getElementById('content3').value
    let heading4 = document.getElementById('heading4').value
    let content4 = document.getElementById('content4').value
    let heading5 = document.getElementById('heading5').value
    let content5 = document.getElementById('content5').value
    let imageupload = document.getElementById('image-upload')
    let imageUploadError = document.getElementById('upload-error')
    let submit = document.getElementById('product-submit')
    
    //image validation
    if(imageupload.textContent !== 'Upload Successfull !!!'){
        imageUploadError.textContent = 'Upload an image'
        imageUploadError.style.display = "block"
    }else{
        submit.textContent = 'Saving...'
        document.getElementById('product-form').submit();
    }
})

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
    let imageupload = document.getElementById('image-upload')
    imageupload.style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    imageupload.textContent = 'Upload Successfull !!!'
}