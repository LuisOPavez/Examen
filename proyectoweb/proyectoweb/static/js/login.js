// login.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario para hacer algo antes

        const formData = new FormData(loginForm);

        // Aquí podrías añadir validaciones personalizadas antes de enviar el formulario
        if (validateForm(formData)) {
            // Si todo es correcto, envía el formulario
            loginForm.submit();
        }
    });

    function validateForm(formData) {
        // Ejemplo de validación: asegurar que los campos no estén vacíos
        for (let [name, value] of formData.entries()) {
            if (!value.trim()) {
                alert("Por favor, complete todos los campos.");
                return false;
            }
        }
        return true;
    }
});
