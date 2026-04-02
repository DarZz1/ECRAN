const swiper = new Swiper('.gallerySwiper', {
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    slidesPerView: 5,
    spaceBetween: 20,
  });