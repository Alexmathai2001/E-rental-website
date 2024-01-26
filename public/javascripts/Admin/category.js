
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
    categoryValidation(categoryname,categoryerror,submit,imageUploadError)

})
function categoryValidation(categoryname,categoryerror,submit,imageUploadError){
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
}

//editvalidation
var form = document.getElementById('editcategory-form').addEventListener('submit',function(event){
    event.preventDefault();
    var categoryname = document.getElementById('editcategory-name')
    var categoryerror = document.getElementById('editcategory-error')
    var submit = document.getElementById('editcategory-submit')
    var imageUploadError = document.getElementById('editupload-error')
    var uploadimage = document.getElementById('image-Preview')
    editcategoryValidation(categoryname,categoryerror,submit,imageUploadError,uploadimage)

})

function editcategoryValidation(categoryname,categoryerror,submit,imageUploadError,uploadimage){
    console.log(`uploaded image info is ${uploadimage.src}`);
    if (categoryname.value.trim() === '') {
        categoryerror.textContent = "Category name cannot be empty"
        categoryerror.style.display = "block"
    }else if( uploadimage.src === ''){
        categoryerror.style.display = 'none'
        imageUploadError.textContent = 'Upload an image'
        imageUploadError.style.display = "block"
    }else{
        submit.textContent = 'Saving...'
        document.getElementById('editcategory-form').submit();
    }
}


async function editpopup(element){
    try {
        let imagePreview = document.getElementById('image-Preview');
        let categoryname = document.getElementById('editcategory-name')
        let categoryStatus = document.getElementById('editcategory_status')
        let sampleinput = document.getElementById('Id')
        sampleinput.value = element.id;
        const categoryId = element.id
        const response = await fetch(`/admin/categories/edit/${categoryId}`);
        const data = await response.json();
        const categoryName = data.categoryname;
        const status = data.showstatus;
        const imageUrl = data.categoryimgurl;
        imagePreview.src = imageUrl
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

//sorting

function updateSortHowOptions() {
    const sortWhatSelect = document.getElementById("sortSelect");
    const selectedSortWhat = sortWhatSelect.value;
    const sortHowSelect = document.getElementById("sortHow");

    sortHowSelect.innerHTML = "";
    addOption(sortHowSelect, "Sort type", "sortType");
    if (selectedSortWhat === "CategoryName") {
      addOption(sortHowSelect, "a-z", "a-z");
      addOption(sortHowSelect, "z-a", "z-a");
      addOption(sortHowSelect, "Newest first", "Newest first");
      addOption(sortHowSelect, "Oldest First", "Oldest First");
    } else if (selectedSortWhat === "ProductCount") {
      addOption(sortHowSelect, "Ascending", "Ascending");
      addOption(sortHowSelect, "Descending", "Descending");
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
      const response = await fetch('/admin/categories/sort', {
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

  // filter cateogry
let filterForm =  document.getElementById('filterForm');
let filtervalues = document.getElementById('categoryfilter');
filtervalues.addEventListener('change',function(){
    filterCategory()
})

  async function filterCategory(){
    const selectedOption = document.getElementById('categoryfilter').value;
    try {
      const response = await fetch('/admin/categories/filter', {
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