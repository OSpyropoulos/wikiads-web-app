// Function to list categories
function listCategories() {
    // API endpoint URL for fetching categories
    let url = "https://wiki-ads.onrender.com/categories";

    // Perform fetch to get data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Parse the fetched data and store it in the 'categories' variable
            var fetched_data = parseData(data);

            // Get the HTML element with the id "category_list"
            var category_list = document.getElementById("category_list");

            // Update the inner HTML of the "category_list" element using the 'templates' function
            category_list.innerHTML = templates(fetched_data);
        });
}

// Call the listCategories function to initiate the data fetching and rendering
listCategories();

// Function to parse the fetched data
function parseData(data) {
    // Iterate through the fetched data and extract relevant information
    var categories = data.map(category => ({
        id: category.id,
        title: category.title,
        img_url: category.img_url
    }));

    // Return the parsed data
    return { categories };
}


//Handlebars
Handlebars.registerHelper('ifState', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });


var templates = {};

var catList = "{{#if categories}} \
                    <ul class='categories'> \
                        {{#each categories}} \
                            <li class='category smaller'> \
                                <a href='category.html?categoryId={{id}}'> \
                                <img class='imageC' src='{{this.img_url}}'> \
                                </a> \
                                <section class='category_info'> \
                                    <h3> {{title}}</h3> \
                                    <h3> {{id}}</id> \
                                </section> \
                            </li> \
                            {{/each}} \
                            </ul> \
                    {{/if}}";
templates = Handlebars.compile(catList);

var prodList = "{{#if products}} \
                    <ul class='products'> \
                        {{#each products}} \
                            <li class='product'> \
                            <div class='product_info'> \
                                <img class='image' src='{{image}}'> \
                            </div'> \
                                <section class='product_info'> \
                                    <h2>{{title}}</h2> \
                                    <h3>{{description}}</h3> \
                                    <h4>{{cost}}€</h4> \
                                    <button class='search_button' id='{{@index}}' onclick=addToc({{@index}})>Add to cart</button>\
                                </section> \
                            </li> \
                        {{/each}} \
                    </ul> \
                    {{/if}}";
templates.list = Handlebars.compile(prodList);


var subcList = "{{#if subcategories}} \
                        {{#each subcategories}} \
                            <input type='radio' name='subcategory' id={{id}} value={{title}} {{#if checked}}checked{{/if}}> \
                            <label for='{{title}}'>{{title}}</label> \
                        {{/each}} \
                    {{/if}}";

templates.form = Handlebars.compile(subcList);

/*
function templates(context) {
    
    return templates.list(context);
}
*/