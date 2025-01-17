document.addEventListener('DOMContentLoaded', () => {
    // Elementos UI
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('main');
    const registerForm = document.querySelector('.sign-up form');
    const loginForm = document.querySelector('.sign-in form');
    const registerMessage = document.createElement('div'); // Mensaje de registro dinámico
    const loginMessage = document.createElement('div'); // Mensaje de inicio de sesión dinámico

    // Agregar mensajes al DOM
    registerForm.appendChild(registerMessage);
    loginForm.appendChild(loginMessage);

    // URL base del JSON Server
    const API_URL = 'http://localhost:3000'; // Cambia esto por la URL de tu JSON Server

    // Event Listeners para cambiar entre formularios
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Función para mostrar mensajes
    const showMessage = (element, message, type) => {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    };

    // Registro de usuario
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userData = {
            nombre: document.querySelector('.sign-up input[type="text"]').value,
            email: document.querySelector('.sign-up input[type="email"]').value,
            password: document.querySelector('.sign-up input[type="password"]').value
        };

        try {
            // Verificar si el usuario ya existe
            const checkUser = await fetch(`${API_URL}/usuarios?email=${userData.email}`);
            const existingUser = await checkUser.json();

            if (existingUser.length > 0) {
                showMessage(registerMessage, 'Este correo ya está registrado', 'error');
                return;
            }

            // Registrar nuevo usuario
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                showMessage(registerMessage, 'Registro exitoso', 'success');
                registerForm.reset();
                // Cambiar a la vista de login después de un registro exitoso
                setTimeout(() => {
                    container.classList.remove("right-panel-active");
                }, 1500);
            } else {
                showMessage(registerMessage, 'Error en el registro', 'error');
            }
        } catch (error) {
            showMessage(registerMessage, 'Error en el servidor', 'error');
            console.error('Error:', error);
        }
    });

    // Login de usuario
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginData = {
            email: document.querySelector('.sign-in input[type="email"]').value,
            password: document.querySelector('.sign-in input[type="password"]').value
        };

        try {
            const response = await fetch(`${API_URL}/usuarios?email=${loginData.email}`);
            const users = await response.json();

            if (users.length === 0) {
                showMessage(loginMessage, 'Usuario no encontrado', 'error');
                return;
            }

            const user = users[0];
            if (user.password === loginData.password) {
                showMessage(loginMessage, '¡Bienvenido!', 'success');
                // Guardar el usuario en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirigir al usuario a la página principal
                window.location.href = './index.html';
            } else {
                showMessage(loginMessage, 'Contraseña incorrecta', 'error');
            }
        } catch (error) {
            showMessage(loginMessage, 'Error en el servidor', 'error');
            console.error('Error:', error);
        }
    });
});