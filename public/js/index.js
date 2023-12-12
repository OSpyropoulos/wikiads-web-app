var outer;
var fetched_data;

// Function to list categories
function list_categories() {
    // API endpoint URL for fetching categories
    let url = "https://wiki-ads.onrender.com/categories";

    // Create headers for the HTTP request
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    // Configure the HTTP request
    let init = {
        method: 'GET',
        headers: headers
    };

    // Perform the fetch operation to get data from the API
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            // Parse the fetched data and store it in the 'fetched_data' variable
            fetched_data = parseData(data);

            // Get the HTML element with the id "category_list"
            outer = document.getElementById("category_list");

            // Update the inner HTML of the "category_list" element using the 'templates' function
            outer.innerHTML = templates(fetched_data);
        });
}

// Call the list_categories function to initiate the data fetching and rendering
list_categories();

// Function to parse the fetched data
function parseData(data) {
    var categories = {};
    var categories_arr = [];

    // Iterate through the fetched data and extract relevant information
    for (let category of data) {
        var tmp = {};
        tmp.id = category.id;
        tmp.title = category.title;
        tmp.img_url = category.img_url;
        categories_arr.push(tmp);
    }

    // Create an object containing the parsed categories data
    categories["categories"] = categories_arr;

    // Return the parsed data
    return categories;
}
