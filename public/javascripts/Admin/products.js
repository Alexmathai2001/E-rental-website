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

//sorting

function updateSortHowOptions() {
    const sortWhatSelect = document.getElementById("sortSelect");
    const selectedSortWhat = sortWhatSelect.value;
    const sortHowSelect = document.getElementById("sortHow");

    sortHowSelect.innerHTML = "";
    addOption(sortHowSelect, "Sort type", "sortType");
    if (selectedSortWhat === "Product name") {
      addOption(sortHowSelect, "a-z", "a-z");
      addOption(sortHowSelect, "z-a", "z-a");
      addOption(sortHowSelect, "Newest first", "Newest first");
      addOption(sortHowSelect, "Oldest First", "Oldest First");
    } else if (selectedSortWhat === "Discount") {
      addOption(sortHowSelect, "Ascending", "Ascending");
      addOption(sortHowSelect, "Descending", "Descending");
    }else if (selectedSortWhat === "Price") {
        addOption(sortHowSelect, "Ascending", "priceAscending");
        addOption(sortHowSelect, "Descending", "priceDescending");
    }
  }

  function addOption(selectElement, text, value) {
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    selectElement.add(option);
  }

  updateSortHowOptions()
  const sortWhatSelect = document.getElementById("sortSelect");
  sortWhatSelect.addEventListener('change',updateSortHowOptions)
  const sortHowSelect = document.getElementById("sortHow");
  //fetch data and sort on change sortvalues 
  sortHowSelect.addEventListener('change',function(){
    sortCategory()
  })
  async function sortCategory() {
    const selectedOption = document.getElementById('sortHow').value;
    try {
      const response = await fetch('/admin/products/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'sort=' + selectedOption,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      document.getElementById('table-container').innerHTML = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }


    // filter product
let filterForm =  document.getElementById('filterForm');
let filtervalues = document.getElementById('productfilter');
filtervalues.addEventListener('change',function(){
    filterProduct()
})

  async function filterProduct(){
    const selectedOption = document.getElementById('productfilter').value;
    try {
      const response = await fetch('/admin/products/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'filterValue=' + selectedOption,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      document.getElementById('table-container').innerHTML = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
}