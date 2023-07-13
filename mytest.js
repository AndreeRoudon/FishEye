async function getPhotographerDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerID = urlParams.get('id');

    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    const photographer = data.photographers.find((p) => p.id === parseInt(photographerID));

    const media = data.media.filter((m) => m.photographerId === parseInt(photographerID));

    const gallery = `assets/media/${media.image}`;
}

getPhotographerDetails();