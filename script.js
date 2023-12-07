
  // Add event listener for keyboard arrow keys
  document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the down arrow key
    if (event.key === 'ArrowDown') {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    // Check if the pressed key is the up arrow key
    else if (event.key === 'ArrowUp') {
        // Scroll to the previous section smoothly
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
});





// Fetch API for categories
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://wikiads.onrender.com/categories')
      .then(response => response.json())
      .then(data => {
        const templateScript = document.getElementById('category-template').innerHTML;
        const template = Handlebars.compile(templateScript);
        const filledHtml = template({ categories: data });
  
        document.getElementById('content').innerHTML = filledHtml;
      })
      .catch(error => console.error('Error:', error));
  });
  

