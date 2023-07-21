// Affiche l'ensemble des photos du photographe selectionné
function displayMediaGallery(media) {
    const gallery = document.getElementById('gallery');
  
    media.forEach((m, index) => {
      const mediaElement = createMediaElement(m, index);
      gallery.appendChild(mediaElement);
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
      /*
      // Assurer que l'index reste dans les limites du tableau media
      if (index < 0) {
        index = media.length - 1;
      } else if (index >= media.length) {
        index = 0;
      }
  */
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
  /*
  // fonction qui met à jour le total des likes
function updateTotalLikes(likeCount) {
  totalLikes += likeCount;
  const likes = document.getElementById('likes');
  likes.textContent = totalLikes;
}
let totalLikes = 0;
*/
  
  function displayLightBox() {
    const lightBox = document.querySelector(".bg-box");
    lightBox.style.display = "block";
  }
  
  function closelightBox() {
    const lightBox = document.querySelector(".bg-box");
    lightBox.style.display = "none";
  }
  
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