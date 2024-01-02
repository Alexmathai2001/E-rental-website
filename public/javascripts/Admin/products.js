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

async function ShowEditPopup(element){
    let productname = document.getElementById('editproductname')
    let brandname = document.getElementById('editbrandname')
    let category = document.getElementById('editcategory')
    let regularprice = document.getElementById('editregularprice')
    let discount = document.getElementById('editdiscountpercentage')
    let bestseller = document.getElementById('editbestseller')
    let stockstatus = document.getElementById('editstockstatus')
    let productcondition = document.getElementById('editproductcondition')
    let imagePreview = document.getElementById('editimagePreview');
    let specification = document.getElementById('editspecification')
    let sampleinput = document.getElementById('editId')
    sampleinput.value = element.id
    let productid = element.id
    const response = await fetch(`/admin/products/edit/${productid}`)
    const data = await response.json()
    productname.value = data.productname
    brandname.value = data.brandname
    category.value = data.category
    regularprice.value = data.regularprice
    discount.value = data.discountpercentage
    bestseller.value = data.bestseller
    specification.value = data.productspecification
    stockstatus.value = data.stockstatus
    productcondition.value = data.productcondition
    imagePreview.src = data.imageurl
    document.getElementById('edit-product-popup').style.display = "flex"
}

function CancelEditPopup(){
    document.getElementById('edit-product-popup').style.display = "none"
}

function CancelproductPopup(){
    document.getElementById('add-product-popup').style.display = "none"
}

var form = document.getElementById('product-form').addEventListener('submit',function(event){
    event.preventDefault();

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

function editpreviewimage(input){
    imageEditDone()
    const fileInput = input.files[0];
    // Display the image preview
    const image_Preview = document.getElementById('editimagePreview');
    const reader = new FileReader();
    reader.onload = function (e) {
      image_Preview.src = e.target.result;
    };
    reader.readAsDataURL(fileInput);
}

function imageEditDone(){
    let image_edit_upload = document.getElementById('edit-image-upload')
    image_edit_upload.style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    image_edit_upload.textContent = 'Upload Successfull !!!'

}

function imagedone(){
    let imageupload = document.getElementById('image-upload')
    imageupload.style.backgroundColor ="rgb(22 163 74 / var(--tw-bg-opacity))"
    imageupload.textContent = 'Upload Successfull !!!'
}