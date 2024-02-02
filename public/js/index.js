const categoriesUrl = "https://wiki-ads.onrender.com/categories";

// Fetch categories data
fetch(categoriesUrl)
    .then(response => response.json())
    .then(categories => {
        const categoriesContainer = document.getElementById("categoriesContainer");

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
                    const categoryBoxHtml = templates.categoryBoxTemplate(categoryData);
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