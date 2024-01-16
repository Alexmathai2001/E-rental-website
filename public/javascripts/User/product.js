document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rentdayselector');
    const addToCartLabel = document.querySelector('label[for="addtocartbutton"]');
    const rentNowLabel = document.querySelector('label[for="rentnowbutton"]');
  
    addToCartLabel.addEventListener('click', (event) => {
      event.preventDefault();
      form.method = 'post'
      form.action = '/User/cart/addtocart'
      form.submit();  // Submit the form
    });
  
    rentNowLabel.addEventListener('click',function (event) {
      event.preventDefault();
      form.method = 'post'
        form.action = `/User/checkout/${this.id}`
      form.submit();  
    });
  
    // Handle form submission (optional, if not using AJAX)
    form.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent default form submission
      const formData = new FormData(form);
      const selectedAction = formData.get('action');  // Get the selected action value
  
      // Perform AJAX request based on the selected action
      if (selectedAction === 'addtocart') {
        // AJAX request for Add to Cart route
        // ... Your AJAX code for Add to Cart ...
      } else if (selectedAction === 'rentnow') {
        // AJAX request for Rent Now route
        // ... Your AJAX code for Rent Now ...
      }
    });
  });
  