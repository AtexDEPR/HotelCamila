document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const images = [
        { src: '../img/areas-comunes/DUBAI-CARTAGENA-16-2304w.webp', alt: 'Habitación de lujo' },
        { src: '../img/areas-comunes/DUBAI-CARTAGENA-4-2304w.webp', alt: 'Suite presidencial' },
        { src: '../img/areas-comunes/dubai-cartagena-54-1920w.webp', alt: 'Piscina del hotel' },
        { src: '../img/areas-comunes/cartagena_dubai_exterior_piscina_tumbonas_1_1600x1090-1600h.webp', alt: 'Spa y zona de relajación' }
    ];

    let currentIndex = 0;

    function createCarouselItem(image) {
        const item = document.createElement('div');
        item.classList.add('relative', 'w-full', 'h-64', 'md:h-96', 'bg-cover', 'bg-center', 'rounded-lg', 'transition-opacity', 'duration-500');
        item.style.backgroundImage = `url(${image.src})`;

        const caption = document.createElement('div');
        caption.classList.add('absolute', 'bottom-0', 'left-0', 'right-0', 'bg-black', 'bg-opacity-50', 'text-white', 'p-4', 'rounded-b-lg');
        caption.textContent = image.alt;

        item.appendChild(caption);
        return item;
    }

    function updateCarousel() {
        const newItem = createCarouselItem(images[currentIndex]);
        newItem.style.opacity = '0';
        carousel.appendChild(newItem);

        setTimeout(() => {
            newItem.style.opacity = '1';
            if (carousel.children.length > 1) {
                carousel.removeChild(carousel.children[0]);
            }
        }, 50);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    // Crear botones de navegación
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;';
    prevButton.classList.add('absolute', 'left-0', 'top-1/2', 'transform', '-translate-y-1/2', 'bg-black', 'bg-opacity-50', 'text-white', 'p-2', 'rounded-r');
    prevButton.addEventListener('click', prevSlide);

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;';
    nextButton.classList.add('absolute', 'right-0', 'top-1/2', 'transform', '-translate-y-1/2', 'bg-black', 'bg-opacity-50', 'text-white', 'p-2', 'rounded-l');
    nextButton.addEventListener('click', nextSlide);

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    updateCarousel();
    setInterval(nextSlide, 5000);
});