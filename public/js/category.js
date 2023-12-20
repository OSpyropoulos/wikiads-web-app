
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

function listAds() {
    const url = `https://wiki-ads.onrender.com/ads?category=${categoryId}`;
    fetchData(url, parseAds, renderAds);
}

function renderAds(data) {
    const adsList = document.getElementById("ads_list");
    adsList.innerHTML = templates.list(data);
}

listAds();

function parseAds(data) {
    return {
        ads: data.map(ad => ({
            id: ad.id,
            title: ad.title,
            subcategory_id: ad.subcategory_id,
            description: ad.description,
            cost: ad.cost,
            img_url: ad.images && ad.images.length > 0 ? ad.images[0] : '' // Use the first image if available
        }))
    };
}

const templates = {};

templates.list = Handlebars.compile(`
    {{#if ads}}
        <ul class='ads'>
            {{#each ads}}
                <li class='ad'>
                    <div class='ad_info'>
                        <img class='image' src='https://wiki-ads.onrender.com/{{img_url}}'>
                    </div'>
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
