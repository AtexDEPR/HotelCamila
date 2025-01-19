document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('main');
    const registerForm = document.querySelector('.sign-up form');
    const loginForm = document.querySelector('.sign-in form');
    const registerMessage = document.createElement('div');
    const loginMessage = document.createElement('div');

    registerForm.appendChild(registerMessage);
    loginForm.appendChild(loginMessage);

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const showMessage = (element, message, type) => {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    };

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userData = {
            nombre: document.querySelector('.sign-up input[type="text"]').value,
            email: document.querySelector('.sign-up input[type="email"]').value,
            password: document.querySelector('.sign-up input[type="password"]').value
        };

        try {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = existingUsers.find(user => user.email === userData.email);

            if (existingUser) {
                showMessage(registerMessage, 'Este correo ya está registrado', 'error');
                return;
            }

            existingUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            showMessage(registerMessage, 'Registro exitoso', 'success');
            registerForm.reset();

            setTimeout(() => {
                container.classList.remove("right-panel-active");
            }, 1500);
        } catch (error) {
            showMessage(registerMessage, 'Error en el registro', 'error');
            console.error('Error:', error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginData = {
            email: document.querySelector('.sign-in input[type="email"]').value,
            password: document.querySelector('.sign-in input[type="password"]').value
        };

        try {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = existingUsers.find(user => user.email === loginData.email);

            if (!user) {
                showMessage(loginMessage, 'Usuario no encontrado', 'error');
                return;
            }

            if (user.password === loginData.password) {
                showMessage(loginMessage, '¡Bienvenido!', 'success');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = './index.html'; // Redirigir al inicio
            } else {
                showMessage(loginMessage, 'Contraseña incorrecta', 'error');
            }
        } catch (error) {
            showMessage(loginMessage, 'Error en el servidor', 'error');
            console.error('Error:', error);
        }
    });
});