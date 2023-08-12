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

  displayMediaGallery(medias);
  displayLikesCount(medias);
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

  mediaLikesContainer.appendChild(mediaLikes);
  mediaLikesContainer.appendChild(heartIcon);

  mediaText.appendChild(mediaTitle);
  mediaText.appendChild(mediaLikesContainer);
  mediaElement.appendChild(mediaText);

  return mediaElement;
}

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".filter-select__trigger");
  const options = document.querySelector(".filter-select__options");
  const optionLinks = document.querySelectorAll(".filter-option");
  let currentSortCriteria = "Popularité"; // Par défaut, trier par popularité

  // Fonction pour ouvrir ou fermer la liste déroulante
  function toggleOptions() {
    options.classList.toggle("open");
  }

  // Fonction pour trier les médias en fonction des critères sélectionnés
  function sortMedia(criteria) {
    if (criteria === "Titre") {
      medias.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "Popularité") {
      medias.sort((a, b) => b.likes - a.likes);
    } else if (criteria === "Date") {
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    displayMediaGallery(medias);
  }

  // Gestionnaire d'événement pour le clic sur l'élément déclencheur
  trigger.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêcher la propagation de l'événement de clic
    toggleOptions();
  });

  // Gestionnaire d'événement pour le clic sur une option
  optionLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Supprimer la classe "selected" de toutes les options
      optionLinks.forEach((optionLink) => {
        optionLink.classList.remove("selected");
      });

      // Ajouter la classe "selected" à l'option actuellement sélectionnée
      this.classList.add("selected");

      // Mettre à jour le contenu du déclencheur
      const selectedValue = this.getAttribute("data-value");
      trigger.querySelector("span").textContent = selectedValue;

      // Mettre à jour aria-selected pour le tri
      optionLinks.forEach((optionLink) => {
        const isSelected = optionLink.classList.contains("selected");
        optionLink.setAttribute("aria-selected", isSelected);
      });

      // Mettre à jour le critère de tri actuel
      currentSortCriteria = selectedValue;

      // Trier les médias en fonction du critère sélectionné
      sortMedia(currentSortCriteria);
    });
  });

  // Gestionnaire d'événement pour fermer la liste déroulante en cliquant ailleurs
  document.addEventListener("click", function () {
    if (options.classList.contains("open")) {
      toggleOptions();
    }
  });

  // Appeler la fonction de tri initial
  sortMedia(currentSortCriteria);
});

getPhotographerDetails();