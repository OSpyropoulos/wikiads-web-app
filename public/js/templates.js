const templates = {};

var categoryBoxTemplate = `
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
templates.categoryBoxTemplate = Handlebars.compile(categoryBoxTemplate);

var ads_category = `
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
                        <button class='add_to_cart_button' id='{{@index}}' onclick=addToCart({{@index}})>Add to favourites</button>
                    </section>
                </li>
            {{/each}}
        </ul>
    {{/if}}`;
templates.list_cat = Handlebars.compile(ads_category);

var ads_subcategory = `
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
                    <button class='add_to_cart_button' id='{{@index}}' onclick=addToCart({{@index}})>Add to favorites</button>
                </section>
            </li>
        {{/each}}
    </ul>
{{/if}}`;
templates.list_subcat = Handlebars.compile(ads_subcategory);


var userCreds = 
                    "{{#if creds}} \
                        {{#each creds}} \
                            <h2>Username: {{username}}</h1> \
                            <h2>Id: {{sessionId}}</h2> \
                        {{/each}} \
                    {{/if}}";

templates.logged_in = Handlebars.compile(userCreds);

var cart_size ="<div>{{size}}</div>";
templates.cart_size = Handlebars.compile(cart_size);



var cart = " \{{#if creds}} \
                    {{#each creds}} \
                        <a href='favorite-ads.html?username={{username}}&sessionId={{sessionId}}' onclick=goToCart()><img src='./images/favourite.png' alt=''></a> \
                    {{/each}} \
               {{else}} \
                    <div onclick=goToCart()><img src='./images/favourite.png' alt=''></div> \
               {{/if}}"
templates.Gocart = Handlebars.compile(cart);


var totalCost = "<h2>TOTAL COST:    {{#if cost}}{{cost}}€{{/if}}</h2>"
templates.viewCost = Handlebars.compile(totalCost);


var cartItems = `
<ul class='ads'>
  {{#each this}}
    <li class='ad'>
      <section class='ad_info'>
        <h2>{{title}}</h2>
        <h4>{{cost}}€</h4>
      </section>
    </li>
  {{/each}}
</ul>

`;
templates.cartItems = Handlebars.compile(cartItems);

