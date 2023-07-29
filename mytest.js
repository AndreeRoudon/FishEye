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

  // Gestionnaire d'événement pour le clic sur l'élément déclencheur
  trigger.addEventListener("click", toggleOptions);

  // Gestionnaire d'événement pour le clic sur une option
  optionLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedOption = this.getAttribute("data-value");
      // Fermer la liste déroulante après avoir sélectionné une option
      toggleOptions();
    });
  });
});