// creer une fonction filter avec en parametre medias
function selectOptionSort(medias) {
    const trigger = document.querySelector(".filter-select__trigger");
    const options = document.querySelector(".filter-select__options");
    const optionLinks = document.querySelectorAll(".filter-option");

    let currentSortCriteria = "Popularité"; // Par défaut, trier par popularité
    // Appeler la fonction de tri initial
    sortMedia(currentSortCriteria);

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

    const arrow = document.querySelector(".arrow");
    // Fonction pour ouvrir ou fermer la liste déroulante
    function toggleOptions() {
        options.classList.toggle("open");
        if (options.classList.contains("open")) {
            arrow.style.transform = "rotate(-45deg)";
            arrow.style.bottom = "-3px";
        } else {
            arrow.style.transform = "rotate(135deg)";
            arrow.style.bottom = "3px";
        }
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
}