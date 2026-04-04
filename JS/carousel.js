const gallerySwiper = new Swiper('.gallerySwiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
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

const exampleSwiper = new Swiper('.exampleSwiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        577: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    },
});

const partnersSwiper = new Swiper('.partnersSwiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        577: {
            slidesPerView: 3,
            spaceBetween: 12,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 5,
            spaceBetween: 32,
        },
        1200: {
            slidesPerView: 6,
        },
        1400: {
            slidesPerView: 7,
        }
    },
});