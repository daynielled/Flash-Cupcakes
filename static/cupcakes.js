$(document).ready(function() {
    // Function to load cupcakes from the API and display them
    function loadCupcakes() {
        // Use Axios to fetch cupcakes from the API
        axios.get('/api/cupcakes')
            .then(function(response) {
                const cupcakes = response.data.cupcakes;
                const cupcakeList = $('#cupcake-list');
                cupcakeList.empty();  // Clear the existing list
                
                // Loop through cupcakes and add them to the page
                for (const cupcake of cupcakes) {
                    cupcakeList.append(`<li>${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}</li>`);
                }
            })
            .catch(function(error) {
                console.error('Error loading cupcakes:', error);
            });
    }

    // Call the loadCupcakes function to load cupcakes when the page loads
    loadCupcakes();

    // Form submission event
    $('#cupcake-form').submit(function(event) {
        event.preventDefault();
        const flavor = $('#flavor').val();
        const size = $('#size').val();
        const rating = $('#rating').val();
        const image = $('#image').val();

        // Use Axios to post the new cupcake to the API
        axios.post('/api/cupcakes', { flavor, size, rating, image })
            .then(function(response) {
                // After successfully adding a cupcake, reload the cupcakes list
                loadCupcakes();
                // Clear the form fields
                $('#flavor').val('');
                $('#size').val('');
                $('#rating').val('');
                $('#image').val('');
            })
            .catch(function(error) {
                console.error('Error adding cupcake:', error);
            });
    });
});
