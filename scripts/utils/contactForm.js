function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector(".form");
const textControl = document.querySelectorAll(".text-control")

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire
    
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const message = document.querySelector(".form__message").value;

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
    };

    console.log("Form Data:", formData);
    // Réinitialiser le formulaire après la soumission
    form.reset();
    // Fermer la modale du formulaire
    closeModal();
});