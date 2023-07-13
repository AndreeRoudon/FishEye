async function getPhotographerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerID = urlParams.get('id');

  const response = await fetch('./data/photographers.json');
  const data = await response.json();

  const photographer = data.photographers.find((p) => p.id === parseInt(photographerID));
  console.log(photographer);

  const media = data.media.filter((m) => m.photographerId === parseInt(photographerID));
  console.log(media);

  /*************************************************/

  const description = document.getElementById('description');
  const images = document.getElementById('images');
  const price = document.getElementById('price');
  const likes = document.getElementById('likes');
  const gallery = document.getElementById('gallery');

  let nbLikes = 0;
  for (let i = 0; i < media.length; i++) {
    let like = media[i].likes;
    nbLikes = nbLikes + like;
  }
  console.log(nbLikes);

  likes.textContent = nbLikes;

  media.forEach((m) => {
    const mediaElement = document.createElement('article');
    //mediaElement.classList.add('media');

    if (m.image) {
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', `assets/media/${m.image}`);
      //imageElement.classList.add('image');
      mediaElement.appendChild(imageElement);
    } else if (m.video) {
      const videoElement = document.createElement('video');
      videoElement.setAttribute('src', `assets/media/${m.video}`);
      //videoElement.classList.add('video');
      mediaElement.appendChild(videoElement);
    }

    const mediaText = document.createElement('div');
    const mediaTitle = document.createElement('h2');
    mediaTitle.textContent = m.title;

    const mediaLikesContainer = document.createElement('p');

    const mediaLikes = document.createElement('span');
    mediaLikes.textContent = m.likes;
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-solid', 'fa-heart');

    mediaLikesContainer.appendChild(mediaLikes);
    mediaLikesContainer.appendChild(heartIcon);

    mediaText.appendChild(mediaTitle);
    mediaText.appendChild(mediaLikesContainer);
    mediaElement.appendChild(mediaText);

    gallery.appendChild(mediaElement);
  });

  const picture = `assets/photographers/${photographer.portrait}`;

  const img = document.createElement('img');
  img.setAttribute("src", picture);
  images.appendChild(img);

  const h2 = document.createElement('h2');
  h2.textContent = photographer.name;

  const localisation = document.createElement('h3');
  localisation.textContent = photographer.city + ', ' + photographer.country;

  const paragraph = document.createElement('p');
  paragraph.textContent = photographer.tagline;

  const Price = document.createElement('span');
  Price.textContent = photographer.price + '€ / jour';

  description.appendChild(h2);
  description.appendChild(localisation);
  description.appendChild(paragraph);
  price.appendChild(Price);
}

getPhotographerDetails();