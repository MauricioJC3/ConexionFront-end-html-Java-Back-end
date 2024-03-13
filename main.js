// Registro de Usuario

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("FormularioRegistro");

    if (form) {  // Asegúrate de que el formulario existe
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var nombre = document.getElementById("nombre").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;

            var usuario = {
                nombre: nombre,
                correo: email,
                contraseña: password
            };

            fetch('http://localhost:8080/registrar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta del back-end
                console.log(data);
            })
            .catch(error => {
                console.error('Error al enviar datos al back-end:', error);
            });
        });
    }
});

// Inicio de Sesión

(function () {
    // Verificar si el usuario ya ha iniciado sesión (puedes ajustar esto según tu lógica de autenticación)
    var usuarioHaIniciadoSesion = obtenerEstadoDeSesion(); // Lógica para obtener el estado de sesión

    // Si el usuario ha iniciado sesión, redirigir automáticamente a apartado_logico.html
    if (usuarioHaIniciadoSesion) {
        window.location.href = 'apartado_logico.html';
    }

    // Manejar el formulario de inicio de sesión
    var form = document.getElementById("inicioSesionForm");

    if (form) {  // Asegúrate de que el formulario existe
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            var credentials = {
                username: username,
                password: password
            };

            fetch('http://localhost:8080/iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta del backend
                console.log(data);

                // Puedes redirigir al usuario a una nueva página o mostrar un mensaje según la respuesta del backend
                if (data.autenticado) {
                    // Redirigir a la página apartado_logico.html
                    window.location.href = 'apartado_logico.html';
                } else {
                    alert('Credenciales incorrectas. Inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al enviar datos al backend:', error);
            });
        });
    }

    function obtenerEstadoDeSesion() {
        // Verificar si el usuario ha iniciado sesión usando localStorage
        var usuarioLogueado = localStorage.getItem('usuarioLogueado');

        // Retorna true si el usuario ha iniciado sesión, de lo contrario, retorna false
        return usuarioLogueado === 'true';
    }
})();
