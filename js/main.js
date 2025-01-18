// Función para mostrar/ocultar el menú desplegable (ámbito global)
function menuToggle() {
    const menu = document.getElementById("userDropdown");
    if (menu) {
        menu.classList.toggle("hidden");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el usuario actual desde localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Elementos de la barra de navegación
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");
    const loginLink = document.getElementById("loginLink");
    const mobileUserProfile = document.getElementById("mobileUserProfile");
    const mobileUserName = document.getElementById("mobileUserName");
    const mobileLoginLink = document.getElementById("mobileLoginLink");

    // Mostrar el perfil del usuario si está autenticado
    if (currentUser) {
        // Mostrar nombre y foto en la barra de navegación
        userProfile.classList.remove("hidden");
        userName.textContent = currentUser.nombre;
        loginLink.classList.add("hidden");

        // Mostrar nombre y foto en el menú móvil
        mobileUserProfile.classList.remove("hidden");
        mobileUserName.textContent = currentUser.nombre;
        mobileLoginLink.classList.add("hidden");
    } else {
        // Ocultar el perfil del usuario si no está autenticado
        userProfile.classList.add("hidden");
        loginLink.classList.remove("hidden");
        mobileUserProfile.classList.add("hidden");
        mobileLoginLink.classList.remove("hidden");
    }

    // Manejo del menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar el menú móvil cuando se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    // Animación suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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

    // Manejo del formulario de reserva
    const reservationForm = document.getElementById('reservation-form');
    const loginCard = document.getElementById('loginCard');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            if (!currentUser) {
                e.preventDefault(); // Evitar que el formulario se envíe
                loginCard.classList.remove('hidden'); // Mostrar la tarjeta de invitación
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
    loginCard.addEventListener('click', function (e) {
        if (e.target === loginCard) {
            loginCard.classList.add('hidden');
        }
    });

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

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        const userMenu = document.getElementById("userMenu");
        const menu = document.getElementById("userDropdown");

        if (userMenu && menu && !userMenu.contains(event.target)) {
            menu.classList.add("hidden");
        }
    });

    // Función para cerrar sesión
    document.getElementById("logoutButton")?.addEventListener("click", () => {
        localStorage.removeItem("currentUser"); // Eliminar el usuario actual
        window.location.reload(); // Recargar la página
    });
});

// Mostrar/ocultar servicios adicionales
const servicesGrid = document.getElementById('servicesGrid');
const toggleButton = document.getElementById('toggleServices');
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