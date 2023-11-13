function loadCupcakes() {
    // Use Axios to fetch cupcakes from the API
    axios.get('/api/cupcakes')
        .then(function(response) {
            const cupcakes = response.data.cupcakes;
            const cupcakeList = document.getElementById('cupcake-list');
            
            // Clear the existing list
            while (cupcakeList.firstChild) {
                cupcakeList.removeChild(cupcakeList.firstChild);
            }

            // Loop through cupcakes and add them to the page
            cupcakes.forEach(function(cupcake) {
                const listItem = document.createElement('li');
                listItem.textContent = `${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}`;
                cupcakeList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error('Error loading cupcakes:', error);
        });
}

// Call the loadCupcakes function to load cupcakes when the page loads
loadCupcakes();

// Form submission event
document.getElementById('cupcake-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const rating = document.getElementById('rating').value;
    const image = document.getElementById('image').value;

    // Use Axios to post the new cupcake to the API
    axios.post('/api/cupcakes', { flavor, size, rating, image })
        .then(function(response) {
            // After successfully adding a cupcake, reload the cupcakes list
            loadCupcakes();
            // Clear the form fields
            document.getElementById('flavor').value = '';
            document.getElementById('size').value = '';
            document.getElementById('rating').value = '';
            document.getElementById('image').value = '';
        })
        .catch(function(error) {
            console.error('Error adding cupcake:', error);
        });
});
