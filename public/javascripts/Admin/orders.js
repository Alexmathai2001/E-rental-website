
let data

async function editorder(element){
    let bothId = element.id

    const response = await fetch(`/admin/orders/${bothId}`)
    data = await response.json()

    let price = 0
    let discount = 0
    let totalAmount = 0
    let totalpriceforeachproduct
    data.order.productid.forEach((element) => {
        totalpriceforeachproduct = element.product.regularprice * element.days
        price += totalpriceforeachproduct
        discount += element.product.discountpercentage

    })
    let discountAmount = Math.round((discount * price) / 100)
    let total = price - discountAmount
    discountAmount = "- " + discountAmount + " /-"
    price = price + " /-"
    total = total + " /-"

    document.getElementById('name').textContent = data.order.address.name
    document.getElementById('houseno').textContent = data.order.address.houseno
    document.getElementById('roadname').textContent = data.order.address.roadname
    document.getElementById('city').textContent = data.order.address.city
    document.getElementById('state').textContent = data.order.address.state
    document.getElementById('pin').textContent = data.order.address.pin
    document.getElementById('phone').textContent = data.order.address.phone
    document.getElementById('price').textContent = price
    document.getElementById('discount').textContent = discountAmount
    document.getElementById('total').textContent = total

    let status = data.order.status
    switch (status) {
        case 'confirmed':
            document.getElementById('confirmed').checked = true
            break;
        case 'shipped' :
            document.getElementById('shipped').checked = true
            break;
        case 'outfordelivery':
            document.getElementById('outfordelivery').checked = true
            break;
        case 'delivered' :
            document.getElementById('delivered').checked = true
            break;
        case 'returned' :
            document.getElementById('returned').checked = true
            break;
        default:    
            break;
    }
    let container = document.getElementById('product-container')

    container.innerHTML = "";

    data.order.productid.forEach((data) => {
        let code = `                                <div class="flex bg-white p-3 mb-1 border-[2px]">
        <div class="">
            <div><img src=${data.product.imageurl} class="h-14" alt=""></div>
        </div>
        <div class="ms-6">
            <div class="w-64 text-xs capitalize">${data.product.productname} </div>
            <div class="font-semibold text-sm">${data.product.saleprice}/day <span class="text-green-500">${data.product.discountpercentage}% off</span></div>
        </div>
    </div>`
    container.innerHTML += code

    })
    console.log(data);

    document.getElementById("editorder").style.display="flex";
}
function canceleditorder(){
    document.getElementById("editorder").style.display="none";
}


//searching
document.getElementById('ordersSearchForm').addEventListener('submit',function(event){
    event.preventDefault()
    searchOrders()
  })
  
  async function searchOrders(){
    const searchValue = document.getElementById('searchValue').value;
    try {
      const response = await fetch('/admin/orders/search', {
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
    if (selectedSortWhat === "Date") {
      addOption(sortHowSelect, "Newest first", "Newest first");
      addOption(sortHowSelect, "Oldest First", "Oldest First");
    } else if (selectedSortWhat === "Price") {
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
      const response = await fetch('/admin/orders/sort', {
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
      console.log(data);
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
        const response = await fetch('/admin/orders/filter', {
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