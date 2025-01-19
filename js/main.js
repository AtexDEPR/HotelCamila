document.addEventListener('DOMContentLoaded', () => {
    // Obtener el usuario actual desde localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Elementos del menú desplegable
    const userProfile = document.getElementById("userProfile");
    const userDropdown = document.getElementById("userDropdown");
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("loginButton");
    const mobileLoginButton = document.getElementById("mobileLoginButton");
    const mobileUserMenu = document.getElementById("mobileUserMenu");
    const mobileUserProfile = document.getElementById("mobileUserProfile");
    const mobileUserDropdown = document.getElementById("mobileUserDropdown");
    const mobileLogoutButton = document.getElementById("mobileLogoutButton");

    // Función para actualizar la interfaz según el estado de autenticación
    function updateUI() {
        if (currentUser) {
            // Mostrar nombre y foto en la barra de navegación
            if (userProfile) userProfile.classList.remove("hidden");
            if (mobileUserMenu) mobileUserMenu.classList.remove("hidden");
            if (document.getElementById("userName")) document.getElementById("userName").textContent = currentUser.nombre;
            if (document.getElementById("mobileUserName")) document.getElementById("mobileUserName").textContent = currentUser.nombre;

            // Ocultar el botón de inicio de sesión
            if (loginButton) loginButton.classList.add("hidden");
            if (mobileLoginButton) mobileLoginButton.classList.add("hidden");
        } else {
            // Ocultar el perfil del usuario si no está autenticado
            if (userProfile) userProfile.classList.add("hidden");
            if (mobileUserMenu) mobileUserMenu.classList.add("hidden");

            // Mostrar el botón de inicio de sesión
            if (loginButton) loginButton.classList.remove("hidden");
            if (mobileLoginButton) mobileLoginButton.classList.remove("hidden");
        }
    }

    // Actualizar la interfaz al cargar la página
    updateUI();

    // Mostrar el menú desplegable al hacer clic en el perfil del usuario (versión escritorio)
    if (userProfile) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle("hidden");
        });
    }

    // Mostrar el menú desplegable al hacer clic en el perfil del usuario (versión móvil)
    if (mobileUserProfile) {
        mobileUserProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileUserDropdown.classList.toggle("hidden");
        });
    }

    // Cerrar el menú desplegable al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (userDropdown && !userProfile.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.add("hidden");
        }
        if (mobileUserDropdown && !mobileUserProfile.contains(e.target) && !mobileUserDropdown.contains(e.target)) {
            mobileUserDropdown.classList.add("hidden");
        }
    });

    // Función para cerrar sesión
    function logout() {
        localStorage.removeItem("currentUser");
        currentUser = null;
        updateUI();
    }

    // Manejar cierre de sesión (versión escritorio)
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    // Manejar cierre de sesión (versión móvil)
    if (mobileLogoutButton) {
        mobileLogoutButton.addEventListener('click', logout);
    }

    // Manejo del botón de inicio de sesión
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = './Login.html';
        });
    }

    // Manejo del botón de inicio de sesión en móvil
    if (mobileLoginButton) {
        mobileLoginButton.addEventListener('click', () => {
            window.location.href = './Login.html';
        });
    }

    // Manejo del menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle("hidden");
        });

        // Cerrar el menú móvil al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }

    // Animación de aparición para elementos cuando se hace scroll
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Funcionalidad del botón de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            window.open('https://wa.me/NUMERODETELEFONO', '_blank');
        });

        // Mostrar/ocultar el botón de WhatsApp al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                whatsappButton.classList.remove('opacity-0');
                whatsappButton.classList.add('opacity-100');
            } else {
                whatsappButton.classList.remove('opacity-100');
                whatsappButton.classList.add('opacity-0');
            }
        });
    }

    // Manejo del formulario de reserva
    const reservationForm = document.getElementById('reservation-form');
    const loginCard = document.getElementById('loginCard');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            if (!currentUser) {
                e.preventDefault(); // Evitar que el formulario se envíe
                if (loginCard) loginCard.classList.remove('hidden'); // Mostrar la tarjeta de invitación
            } else {
                const checkIn = document.getElementById('check-in').value;
                const checkOut = document.getElementById('check-out').value;
                const guests = document.getElementById('guests').value;

                // Aquí normalmente enviarías estos datos al servidor para procesar la reserva
                console.log('Intento de reserva:', { checkIn, checkOut, guests });
                alert(`Reserva solicitada para ${guests} personas desde ${checkIn} hasta ${checkOut}`);
            }
        });
    }

    // Ocultar la tarjeta de invitación al hacer clic fuera de ella
    if (loginCard) {
        loginCard.addEventListener('click', function (e) {
            if (e.target === loginCard) {
                loginCard.classList.add('hidden');
            }
        });
    }

    // Configuración del carrusel (Swiper)
    let swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        // Ajustes responsivos
        breakpoints: {
            320: {
                slidesPerView: 1, // Muestra 1 slide en dispositivos móviles
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2, // Muestra 2 slides en tablets
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3, // Muestra 3 slides en pantallas grandes
                spaceBetween: 30,
            },
        }
    });
});

// Mostrar/ocultar servicios adicionales
const servicesGrid = document.getElementById('servicesGrid');
const toggleButton = document.getElementById('toggleServices');

if (servicesGrid && toggleButton) {
    const hiddenServices = servicesGrid.querySelectorAll('.hidden');
    let expanded = false;

    toggleButton.addEventListener('click', function () {
        hiddenServices.forEach(service => {
            service.classList.toggle('hidden');
        });

        expanded = !expanded;
        toggleButton.textContent = expanded ? 'Ver menos servicios' : 'Ver más servicios';

        if (!expanded) {
            servicesGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const deslizador = document.getElementById('deslizador');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const scrollAmount = 300; // Cantidad de desplazamiento en píxeles

// Función para desplazar hacia la izquierda
btnAnterior.addEventListener('click', () => {
deslizador.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth',
});
});

// Función para desplazar hacia la derecha
btnSiguiente.addEventListener('click', () => {
deslizador.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
});
});
