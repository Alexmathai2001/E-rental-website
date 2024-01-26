async function editpopup(element){
    const name = document.getElementById('nameinput')
    const email = document.getElementById('emailinput')
    const status = document.getElementById('statusinput')
    const phone = document.getElementById('phoneinput')
    const userid = element.id
    const response = await fetch(`/admin/customers/edit/${userid}`)
    const data = await response.json()
    console.log(data)
    const namevalue = data.name
    const emailvalue = data.email
    const statusvalue = data.status
    const phonevalue = data.phone
    name.value = namevalue
    email.value = emailvalue
    status.value = statusvalue
    phone.value = phonevalue

    document.getElementById("updateuserinfo").style.display="flex";

}


//searching
document.getElementById('customerSearchForm').addEventListener('submit',function(event){
    event.preventDefault()
    searchCustomer()
  })
  
  async function searchCustomer(){
    const searchValue = document.getElementById('searchValue').value;
    try {
      const response = await fetch('/admin/customers/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'searchValue=' + searchValue,
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

//sorting
function updateSortHowOptions() {
    const sortWhatSelect = document.getElementById("sortSelect");
    const selectedSortWhat = sortWhatSelect.value;
    const sortHowSelect = document.getElementById("sortHow");
    
    sortHowSelect.innerHTML = "";
    addOption(sortHowSelect, "Sort type", "sortType");
    // sortHowSelect.appendChild(initialOption);
    if (selectedSortWhat === "UserName") {
      addOption(sortHowSelect, "a-z", "a-z");
      addOption(sortHowSelect, "z-a", "z-a");
      addOption(sortHowSelect, "Newest first", "Newest first");
      addOption(sortHowSelect, "Oldest First", "Oldest First");
    } else if (selectedSortWhat === "Orders") {
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
    sortProduct()
  })
  
  async function sortProduct() {
    const selectedOption = document.getElementById('sortHow').value;
    try {
      const response = await fetch('/admin/customers/sort', {
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


function cancelupdateuserinfo(){
    document.getElementById("updateuserinfo").style.display="none";
}

//Filter 
document.getElementById('filterValues').addEventListener('change',function(){
    filterProduct()
  })
  
  async function filterProduct(){
    let selectedValue = document.getElementById('filterValues').value;
    try {
        const response = await fetch('/admin/customers/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'filterValue=' + selectedValue,
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