document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки переключения dropdown
    const toggleButtons = document.querySelectorAll('.navbar__button[aria-controls]');
    
    toggleButtons.forEach(button => {
        const controlsId = button.getAttribute('aria-controls');
        const dropdown = document.getElementById(controlsId);
        
        if (!dropdown) return;

        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // 1. Закрываем все остальные открытые dropdowns на странице
            document.querySelectorAll('.navbar__logins.active').forEach(activeList => {
                if (activeList !== dropdown) {
                    closeDropdown(activeList);
                }
            });
            
            // 2. Переключаем текущий
            if (isExpanded) {
                closeDropdown(dropdown);
            } else {
                openDropdown(dropdown);
            }
        });
    });
    
    // Функция открытия
    function openDropdown(element) {
        element.classList.add('active');
        element.removeAttribute('hidden');
        // Находим кнопку, которая управляет этим элементом, и обновляем aria
        const id = element.id;
        const btn = document.querySelector(`[aria-controls="${id}"]`);
        if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    // Функция закрытия
    function closeDropdown(element) {
        element.classList.remove('active');
        element.setAttribute('hidden', '');
        // Находим кнопку и обновляем aria
        const id = element.id;
        const btn = document.querySelector(`[aria-controls="${id}"]`);
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
    
    // Закрытие всех списков при клике вне области
    document.addEventListener('click', function() {
        document.querySelectorAll('.navbar__logins.active').forEach(list => {
            closeDropdown(list);
        });
    });
    
    // Предотвращаем закрытие при клике внутри списка
    document.querySelectorAll('.navbar__logins').forEach(list => {
        list.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Обработка клавиши Escape для закрытия
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.navbar__logins.active').forEach(list => {
                closeDropdown(list);
            });
        }
    });
});

// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    
    const burgerBtn = document.querySelector('.navbar__burger');
    const mobileMenuId = burgerBtn ? burgerBtn.getAttribute('aria-controls') : null;
    const mobileMenu = mobileMenuId ? document.getElementById(mobileMenuId) : null;

    if (burgerBtn && mobileMenu) {
        
        function toggleMobileMenu() {
            const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            mobileMenu.removeAttribute('hidden');
            burgerBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMobileMenu() {
            mobileMenu.setAttribute('hidden', '');
            burgerBtn.setAttribute('aria-expanded', 'false');
        }

        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        document.addEventListener('click', function(e) {
            const isMenuOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
            if (!isMenuOpen) return;

            const isClickInsideMenu = mobileMenu.contains(e.target);
            const isClickOnBurger = burgerBtn.contains(e.target);

            if (!isClickInsideMenu && !isClickOnBurger) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && burgerBtn.getAttribute('aria-expanded') === 'true') {
                closeMobileMenu();
                burgerBtn.focus();
            }
        });
    }

    const dropdownTriggers = document.querySelectorAll('.navbar__button[aria-controls]');

    dropdownTriggers.forEach(trigger => {
        const targetId = trigger.getAttribute('aria-controls');
        const targetMenu = document.getElementById(targetId);

        if (!targetMenu) return;

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            document.querySelectorAll('.navbar__logins.active').forEach(openList => {
                if (openList !== targetMenu) {
                    closeDropdown(openList);
                }
            });

            if (isExpanded) {
                closeDropdown(targetMenu);
            } else {
                openDropdown(targetMenu);
            }
        });
    });

    function openDropdown(element) {
        element.classList.add('active');
        element.removeAttribute('hidden');
        const id = element.id;
        const btn = document.querySelector(`[aria-controls="${id}"]`);
        if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown(element) {
        element.classList.remove('active');
        element.setAttribute('hidden', '');
        const id = element.id;
        const btn = document.querySelector(`[aria-controls="${id}"]`);
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', function() {
        document.querySelectorAll('.navbar__logins.active').forEach(list => {
            closeDropdown(list);
        });
    });

    document.querySelectorAll('.navbar__logins').forEach(list => {
        list.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.navbar__logins.active').forEach(list => {
                closeDropdown(list);
            });
            if (burgerBtn && burgerBtn.getAttribute('aria-expanded') === 'true') {
                closeMobileMenu();
            }
        }
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