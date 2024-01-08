const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('categoryId');

console.log(categoryId)

function fetchData(url, parseFunction, renderFunction) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fetchedData = parseFunction(data);
            renderFunction(fetchedData);
        })
        .catch(error => {
            console.error(`Error fetching data from ${url}:`, error);
        });
}

function parseAds(data) {
    return {
        ads: data.map(ad => ({
            id: ad.id,
            title: ad.title,
            subcategory_id: ad.subcategory_id,
            description: ad.description,
            cost: ad.cost,
            img_url: ad.images, // Use the images array
        }))
    };
}

function renderAds(data) {
    const adsList = document.getElementById("ads_list");
    adsList.innerHTML = templates.list_subcat(data);
}

function listAds() {
    const url = `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;
    fetchData(url, parseAds, renderAds);
}

listAds();

const templates = {};

templates.list = Handlebars.compile(`
{{#if ads}}
    <ul class='ads'>
        {{#each ads}}
            <li class='ad'>
                <div class='ad_info'>
                    <div class='images'>
                        {{#each img_url}}
                            <img class='image' src='https://wiki-ads.onrender.com/{{this}}'>
                        {{/each}}
                    </div>
                </div>
                <section class='ad_info'>
                    <h2>{{title}}</h2>
                    <h3>{{description}}</h3>
                    <h4>{{cost}}€</h4>
                    <button class='search_button' id='{{@index}}' onclick=addToc({{@index}})>Add to cart</button>
                </section>
            </li>
        {{/each}}
    </ul>
{{/if}}
`);
