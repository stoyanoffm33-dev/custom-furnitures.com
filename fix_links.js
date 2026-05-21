const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix global paths to relative paths
html = html.replace(/href="\/kitchen"/g, 'href="kitchen.html"');
html = html.replace(/href="\/bedroom"/g, 'href="bedroom.html"');
html = html.replace(/href="\/livingroom"/g, 'href="livingroom.html"');
html = html.replace(/href="\/wardrobe"/g, 'href="bedroom.html"'); // Wardrobe goes to bedroom.html
html = html.replace(/href="\/bathroom"/g, 'href="bathroom.html"');
html = html.replace(/href="\/contact-us"/g, 'href="contact-us.html"');

// Fix data-hrefs for local viewing
html = html.replace(/data-href-en="\/kitchen"/g, 'data-href-en="kitchen.html"');
html = html.replace(/data-href-bg="\/kuhnya"/g, 'data-href-bg="kitchen.html"');

html = html.replace(/data-href-en="\/bedroom"/g, 'data-href-en="bedroom.html"');
html = html.replace(/data-href-bg="\/spalnya"/g, 'data-href-bg="bedroom.html"');

html = html.replace(/data-href-en="\/livingroom"/g, 'data-href-en="livingroom.html"');
html = html.replace(/data-href-bg="\/vsekidnevna"/g, 'data-href-bg="livingroom.html"');

html = html.replace(/data-href-en="\/bathroom"/g, 'data-href-en="bathroom.html"');
html = html.replace(/data-href-bg="\/banya"/g, 'data-href-bg="bathroom.html"');

html = html.replace(/data-href-en="\/contact-us"/g, 'data-href-en="contact-us.html"');
html = html.replace(/data-href-bg="\/kontakti"/g, 'data-href-bg="contact-us.html"');

// Logo link
html = html.replace(/href="#" class="logo"/g, 'href="index.html" class="logo"');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html links.');
