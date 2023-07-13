function photographerTemplate(data) {
    const { name, portrait, country, city, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        link.setAttribute('href', `photographer.html?id=${data.id}`);
        link.appendChild(img);
        
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const localisation = document.createElement('h3');
        localisation.textContent = city + ', ' + country;

        const paragraph = document.createElement('p');
        paragraph.textContent = tagline;

        const Price = document.createElement('span');
        Price.textContent = price + '€/jour';

        article.appendChild(link);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(paragraph);
        article.appendChild(Price);
        return article; 
    }
    return { name, picture, country, city, tagline, price, getUserCardDOM }
}