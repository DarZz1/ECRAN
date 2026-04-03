const swiper = new Swiper('.gallerySwiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination', // Должно совпадать с классом в HTML
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        577: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        }
    },
});