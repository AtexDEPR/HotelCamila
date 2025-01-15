document.addEventListener('DOMContentLoaded', () => {
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

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
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
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;

            // Aquí normalmente enviarías estos datos al servidor para procesar la reserva
            console.log('Intento de reserva:', { checkIn, checkOut, guests });
            alert(`Reserva solicitada para ${guests} personas desde ${checkIn} hasta ${checkOut}`);
        });
    }

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
            delay: 5000,
            disableOnInteraction: false
        }
    });

});

