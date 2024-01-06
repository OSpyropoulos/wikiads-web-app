const templates = {};

var ads = `
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
    {{/if}}`;
templates.list = Handlebars.compile(ads);


var userCreds = 
                    "{{#if creds}} \
                        {{#each creds}} \
                            <h2>Username: {{username}}</h1> \
                            <h2>Id: {{sessionId}}</h2> \
                        {{/each}} \
                    {{/if}}";

templates.logged_in = Handlebars.compile(userCreds);

var cart_size ="<h1>{{size}}</h1>";
templates.cart_size = Handlebars.compile(cart_size);



var cart = " \{{#if creds}} \
                    {{#each creds}} \
                        <a href='cart.html?username={{username}}&id={{id}}' onclick=goToCart()><img src='./images/cart.png' alt=''></a> \
                    {{/each}} \
               {{else}} \
                    <a href='' target='_self' onclick=goToCart()><img src='./images/cart.png' alt=''></a> \
               {{/if}}"
templates.Gocart = Handlebars.compile(cart);

var cartProducts = "{{#if items}} \
                        <table class='cart_table'> \
                        {{#each items}} \
                            <tr class='cart_item'> \
                                <td><img class='image' src={{image}}></td> \
                                <td><div class='some_space'><h2>{{title}}</h2></td></div> \
                                <td><div class='some_space'><h3>quantity:{{quantity}}</h3> \
                                <button id='{{@index}}' class='update_button' onclick=remove_cart({{@index}})>-</button> \
                                <button id='{{@index}}' class='update_button' onclick=add_cart({{@index}})>+</button> \
                                </div></td> \
                                <td><div class='some_space'><h3>cost:{{cost}}€</h3></div></td> \
                            </tr> \
                        {{/each}} \
                        </table> \
                    {{else}} \
                        <div id='empty cart'><h1>THIS CART IS EMPTY.</h1></div> \
                    {{/if}}"
templates.viewCart = Handlebars.compile(cartProducts);  

var totalCost = "<h2>TOTAL COST:    {{#if cost}}{{cost}}€{{/if}}</h2>"
templates.viewCost = Handlebars.compile(totalCost);
