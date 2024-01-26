document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', async function () {
            var formDataString = serializeForm(document.getElementById('products-filter-form'));
            try {
                const response = await fetch('/user/allproducts/filter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formDataString,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.text();
                console.log("data is : ",data);
                document.getElementsByTagName('main')[1].style.display = 'none';
                document.querySelector('.searchResult-Container').innerHTML=data
            } catch (error) {
                console.error('Error:', error);
            }
        })
    })
    function serializeForm(formElement) {
        const formData = new FormData(formElement);
        const serialized = [];
        
        for (const [key, value] of formData.entries()) {
            serialized.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }

        return serialized.join('&');
    }
    })



    function menuslidein(){
        const sidebar = document.getElementById('sidebar')
        sidebar.classList.remove("-translate-x-[250px]")
        sidebar.classList.add("translate-x-[0px]")
        document.getElementById("sidebarcontainer").style.visibility="visible"
    }
    function closesidebar(){
        const sidebar = document.getElementById('sidebar')
        sidebar.classList.add("-translate-x-[250px]")
        sidebar.classList.remove("translate-x-[0px]")
        document.getElementById("sidebarcontainer").style.visibility = "hidden"
    }