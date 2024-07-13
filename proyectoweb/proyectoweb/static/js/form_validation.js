document.querySelector('#item-form').addEventListener('submit', function(event) {
    var nombre = document.querySelector('input[name="nombre"]').value;
    var precio = document.querySelector('input[name="precio"]').value;
    var descuento = document.querySelector('input[name="descuento"]').value;
    var descripcion = document.querySelector('textarea[name="descripcion"]').value;

    // Validar nombre
    if (!nombre) {
        alert('El nombre es obligatorio');
        event.preventDefault();
        return;
    }

    // Validar precio
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
        alert('El precio debe ser un número positivo');
        event.preventDefault();
        return;
    }

    // Validar descuento
    if (descuento && (isNaN(descuento) || parseFloat(descuento) < 0 || parseFloat(descuento) > 100)) {
        alert('El descuento debe ser un número entre 0 y 100');
        event.preventDefault();
        return;
    }

    // Validar descripción
    if (!descripcion) {
        alert('La descripción es obligatoria');
        event.preventDefault();
        return;
    }
});
