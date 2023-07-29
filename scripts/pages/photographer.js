let medias = [];

async function getPhotographerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerID = parseInt(urlParams.get('id'));

  const response = await fetch('./data/photographers.json');
  const data = await response.json();

  const photographer = data.photographers.find((p) => p.id === parseInt(photographerID));
  console.log(photographer);

  medias = data.media.filter((m) => m.photographerId === parseInt(photographerID));
  console.log(medias);

  photographerInfo(photographer);
  displayMediaGallery(medias);
  displayLikesCount(medias);
}

/***************************************************************************************/

function photographerInfo(photographer) {
  const description = document.getElementById('description');
  const images = document.getElementById('images');
  const price = document.getElementById('price');

  const picture = `assets/photographers/${photographer.portrait}`;

  const img = document.createElement('img');
  img.setAttribute("src", picture);
  images.appendChild(img);

  const photographerName = createHeadingElement('h2', photographer.name);
  const localisation = createHeadingElement('h3', `${photographer.city}, ${photographer.country}`);

  const tagline = document.createElement('p');
  tagline.textContent = photographer.tagline;

  const priceText = document.createElement('span');
  priceText.textContent = photographer.price + '€ / jour';


  description.appendChild(photographerName);
  description.appendChild(localisation);
  description.appendChild(tagline);
  price.appendChild(priceText);
  images.appendChild(img);
}

function createHeadingElement(tagName, text) {
  const element = document.createElement(tagName);
  element.textContent = text;
  return element;
}

/***************************************************************************************/

// Affiche l'ensemble des photos du photographe selectionné
function displayMediaGallery(media) {
  const gallery = document.getElementById('gallery');

  media.forEach((m, index) => {
    const mediaElement = createMediaElement(m, index);
    gallery.appendChild(mediaElement);

    // Gestionnaire d'événement pour les éléments cliquables
    const clickableElement = mediaElement.querySelector('.clickable');
    clickableElement.addEventListener('click', () => {
      openLightbox(media, index);
    });
  });
}

// Ouverture de la lightBox
function openLightbox(media, startIndex) {
  const prevButton = document.querySelector('.js-arrow-left');
  const nextButton = document.querySelector('.js-arrow-right');
  const slideImageGallery = document.getElementById('imgMedia');
  const close = document.getElementById('closeBox');

  // Afficher la lightbox
  displayLightBox();

  // Fermeture de la lightBox
  close.addEventListener("click", closelightBox);

  // Afficher l'image de départ
  showMedia(startIndex);

  // Gestionnaire d'événement pour la flèche de gauche
  prevButton.addEventListener('click', () => {
    startIndex--;
    showMedia(startIndex);
  });

  // Gestionnaire d'événement pour la flèche de droite
  nextButton.addEventListener('click', () => {
    startIndex++;
    showMedia(startIndex);
  });

  // Gestionnaire d'événement pour les touches du clavier
  document.addEventListener('keydown', (el) => {
    if (el.key === "ArrowLeft") {
      startIndex--;
      showMedia(startIndex);
    } else if (el.key === "ArrowRight") {
      startIndex++;
      showMedia(startIndex);
    }
  });

  // Fonction pour afficher une image ou une vidéo à un index donné
  function showMedia(index) {
    // Assurer que l'index reste dans les limites du tableau media
    if (index < 0) {
      index = media.length - 1;
    } else if (index >= media.length) {
      index = 0;
    }

    const mediaItem = media[index];
    slideImageGallery.innerHTML = '';

    if (mediaItem.image) {
      const image = document.createElement('img');
      image.src = `assets/media/${mediaItem.image}`;
      slideImageGallery.appendChild(image);

    } else if (mediaItem.video) {
      const video = document.createElement('video');
      video.src = `assets/media/${mediaItem.video}`;
      video.controls = true;
      slideImageGallery.appendChild(video);
    }

    console.log(index);
  }
}

function displayLightBox() {
  const lightBox = document.querySelector(".bg-box");
  lightBox.style.display = "block";
}

function closelightBox() {
  const lightBox = document.querySelector(".bg-box");
  lightBox.style.display = "none";
}

//Fonction pour la création de chaque image
function createMediaElement(media, index) {
  const mediaElement = document.createElement('article');

  if (media.image) {
    const imageElement = document.createElement('img');
    imageElement.src = `assets/media/${media.image}`;
    imageElement.classList.add('clickable');
    mediaElement.appendChild(imageElement);
    // Gestionnaire d'événement pour les images cliquables
    imageElement.addEventListener('click', () => {
      openLightbox(media, index);
    });

  } else if (media.video) {
    const videoElement = document.createElement('video');
    videoElement.src = `assets/media/${media.video}`;
    videoElement.controls = true;
    videoElement.classList.add('clickable');
    mediaElement.appendChild(videoElement);
    // Gestionnaire d'événement pour les vidéos cliquables
    videoElement.addEventListener('click', () => {
      openLightbox(media, index);
    });
  }

  const mediaText = document.createElement('div');
  const mediaTitle = document.createElement('h2');
  mediaTitle.textContent = media.title;

  const mediaLikesContainer = document.createElement('p');

  const mediaLikes = document.createElement('span');
  mediaLikes.textContent = media.likes;
  const heartIcon = document.createElement('i');
  heartIcon.classList.add('fa-solid', 'fa-heart');


  // Gestionnaire d'événement pour le clic sur l'icône de like
  heartIcon.addEventListener('click', () => {
    // Vérifier si l'utilisateur n'a pas déjà liké la photo
    if (!media.liked) {
      media.liked = true;
      media.likes++;
      mediaLikes.textContent = media.likes;

      // Mettre à jour le nombre total de likes
      displayLikesCount(medias);
    }
  });

  mediaLikesContainer.appendChild(mediaLikes);
  mediaLikesContainer.appendChild(heartIcon);

  mediaText.appendChild(mediaTitle);
  mediaText.appendChild(mediaLikesContainer);
  mediaElement.appendChild(mediaText);

  return mediaElement;
}

/***************************************************************************************/

// fonction qui compte le total de like
function displayLikesCount(media) {
  const likes = document.getElementById('likes');
  let nbLikes = 0;
  for (let i = 0; i < media.length; i++) {
    let like = media[i].likes;
    console.log(like);
    nbLikes = nbLikes + like;
  }
  likes.textContent = nbLikes;
}

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".filter-select__trigger");
  const options = document.querySelector(".filter-select__options");
  const optionLinks = document.querySelectorAll(".filter-option");

  // Fonction pour ouvrir ou fermer la liste déroulante
  function toggleOptions() {
    options.classList.toggle("open");
  }
  
  // Fonction pour mettre à jour le contenu du déclencheur avec l'option sélectionnée
  function updateTriggerContent(selectedOption) {
    trigger.querySelector("span").textContent = selectedOption;
  }
/*
  // Fonction pour trier les images en fonction de l'option sélectionnée
  function sortImages(option) {
    
    si l'option est "Popularité", triez les images par popularité, etc.
    console.log("Option sélectionnée:", option);
  }
*/
  // Gestionnaire d'événement pour le clic sur l'élément déclencheur
  trigger.addEventListener("click", toggleOptions);

  // Gestionnaire d'événement pour le clic sur une option
  optionLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedOption = this.getAttribute("data-value");
      updateTriggerContent(selectedOption);

      // Fermer la liste déroulante après avoir sélectionné une option
      toggleOptions();
    });
  });
});

getPhotographerDetails();