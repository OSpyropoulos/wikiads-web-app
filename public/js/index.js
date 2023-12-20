const categoriesUrl = "https://wiki-ads.onrender.com/categories";

// Fetch categories data
fetch(categoriesUrl)
    .then(response => response.json())
    .then(categories => {
        const categoriesContainer = document.getElementById("categoriesContainer");

        // Define Handlebars template for category box
        const categoryBoxTemplate = `
            <div class="categoryBox">
                <a href='category.html?categoryId={{id}}'><img class='imageC' src='https://wiki-ads.onrender.com/{{img_url}}'></a>
                <h2>{{title}}</h2>
                <ul>
                    {{#each subcategories}}
                        <li><a href='subcategory.html?categoryId={{id}}'>{{title}}</a></li>
                    {{/each}}
                </ul>
            </div>
        `;

        const template = Handlebars.compile(categoryBoxTemplate);

        // Fetch subcategories for each category and wait for all promises to resolve
        const fetchPromises = categories.map(category => {
            const subcategoriesUrl = `https://wiki-ads.onrender.com/categories/${category.id}/subcategories`;
            return fetch(subcategoriesUrl)
                .then(response => response.json())
                .then(subcategories => ({ ...category, subcategories }));
        });

        Promise.all(fetchPromises)
            .then(categoryDataArray => {
                // Iterate through categories with ordered data
                categoryDataArray.forEach(categoryData => {
                    const categoryBoxHtml = template(categoryData);
                    categoriesContainer.innerHTML += categoryBoxHtml;
                });
            })
            .catch(error => {
                console.error("Error fetching categories or subcategories:", error);
            });
    })
    .catch(error => {
        console.error("Error fetching categories:", error);
    });