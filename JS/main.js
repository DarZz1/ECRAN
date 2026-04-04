document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки и соответствующие им списки
    const headerButtons = document.querySelectorAll('.header__button');
    
    headerButtons.forEach(button => {
        // Находим ближайший список для этой кнопки
        const controls = button.closest('.header__controls');
        const headerLogins = controls ? controls.querySelector('.header__logins') : null;
        
        if (headerLogins) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Закрываем все остальные открытые списки
                document.querySelectorAll('.header__logins.active').forEach(activeList => {
                    if (activeList !== headerLogins) {
                        activeList.classList.remove('active');
                    }
                });
                
                // Переключаем текущий список
                headerLogins.classList.toggle('active');
            });
        }
    });
    
    // Закрытие всех списков при клике вне области
    document.addEventListener('click', function() {
        document.querySelectorAll('.header__logins.active').forEach(list => {
            list.classList.remove('active');
        });
    });
    
    // Предотвращаем закрытие при клике внутри списка
    document.querySelectorAll('.header__logins').forEach(list => {
        list.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

/** спойлеры */
document.addEventListener(
  "click",
  (e) => {
    const spoilerTitle = e.target.closest(".spoiler-title");
    if (spoilerTitle) {
      const spoiler = spoilerTitle.parentElement.closest(".b-faq__item, .spoiler, .js-spoiler");
      if (spoiler) {
        spoiler.classList.toggle("is-open");
      }
    }
  },
  true
);

/** для плавного раскрытия */
const accordions = Array.from(
  document.querySelectorAll(".js-max-height, .spoiler-content")
);

["load", "resize"].forEach((event) =>
  window.addEventListener(event, () => {
    accordions.forEach((el) =>
      el.style.setProperty("--max-height", `${el.scrollHeight}px`)
    );
  })
);