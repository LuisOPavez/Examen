document.addEventListener('DOMContentLoaded', function() {
    console.log('CARGÓ');
    obtenerDivisa();
    const selectDivisa = document.getElementById('divisa');
    selectDivisa.addEventListener('change', calcularTotal);
    calcularTotal();
});

let valorTotalInicial;

async function calcularTotal() {
    const selectDivisa = document.getElementById('divisa');
    const divisaSeleccionada = selectDivisa.value;

    try {
        const tipoCambio = await obtenerTipoCambio(divisaSeleccionada);

        if (valorTotalInicial === undefined) {
            valorTotalInicial = parseFloat(document.getElementById('total').dataset.total);
        }

        const totalDivisa = valorTotalInicial / tipoCambio;
        document.getElementById('total').innerText = `$${totalDivisa.toFixed(2)} ${divisaSeleccionada.toUpperCase()}`;
    } catch (error) {
        console.error('Error al calcular el total en la divisa seleccionada:', error);
    }
}

async function obtenerTipoCambio(divisa) {
    const url = `https://mindicador.cl/api`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        let tipoCambio;
        switch (divisa) {
            case 'dolar':
                tipoCambio = data.dolar.valor;
                break;
            case 'bitcoin':
                tipoCambio = data.bitcoin.valor;
                break;
            case 'uf':
                tipoCambio = data.uf.valor;
                break;
            case 'peso':
            default:
                tipoCambio = 1;
                break;
        }

        return tipoCambio;
    } catch (error) {
        throw new Error('Error al obtener el tipo de cambio de la API');
    }
}

async function obtenerDivisa() {
    const url = `https://mindicador.cl/api`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const uf = data.uf.valor;
        const dolar = data.dolar.valor;
        const bitcoin = data.bitcoin.valor;

        const divisasNavbar = document.getElementById('divisas-navbar');
        divisasNavbar.innerHTML = `<i class="fas fa-dollar-sign"></i> Dólar: $${dolar} | <i class="fab fa-bitcoin"></i> Bitcoin: ${bitcoin} | <i class="fas fa-file-invoice-dollar"></i> UF: $${uf}`;
    } catch (error) {
        console.error('Error al obtener las divisas:', error);
    }
}

function validarFormulario() {
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();

    const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const validarPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    if (!nombres) {
        alert("Por favor ingrese su nombre.");
        return false;
    }
    if (!apellidos) {
        alert("Por favor ingrese su apellido.");
        return false;
    }
    if (!correo || !validarEmail.test(correo)) {
        alert("Por favor ingrese un correo válido.");
        return false;
    }
    if (!password || !validarPassword.test(password)) {
        alert("Por favor ingrese una contraseña válida. La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula y un caracter no alfanumérico.");
        return false;
    }

    alert("¡Formulario enviado con éxito!");
    return true;
}

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

async function addProducto(item_id, cantidad) {
    try {
        const response = await fetch('/cart/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ item_id: item_id, cantidad: cantidad })
        });

        const data = await response.json();
        if (data.success) {
            alert('Producto añadido al carrito');
        } else {
            alert('Error al añadir producto al carrito');
        }
    } catch (error) {
        console.error('Error al añadir producto al carrito:', error);
    }
}

async function comprarAhora(item_id, cantidad) {
    try {
        const response = await fetch(`/cart/comprar_ahora/${item_id}/?quantity=${cantidad}`);
        if (response.ok) {
            window.location.href = response.url;
        } else {
            alert('Error al realizar la compra');
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
