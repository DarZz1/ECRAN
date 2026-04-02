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

const fancySelectors = ["[data-fancybox]", ".button-fancy"];

fancySelectors.forEach(selector => {
    Fancybox.bind(selector, {
        on: {
            init: (fancybox, slide) => {
            if (
                !(
                fancybox.options.$trigger.href &&
                fancybox.options.$trigger.href.includes("assets/")
                )
            ) {
                fancybox.options.dragToClose = false;
                fancybox.options.ScrollLock = false;
                fancybox.options.autoFocus = false;
            }
            if (fancybox.options.$trigger.dataset.fancyboxClass) {
                fancybox.options.mainClass =
                fancybox.options.$trigger.dataset.fancyboxClass;
            }
            },
        },
    });
});
// добавление # к кнопкам попа через tinymce
function setHrefFancy() {
    const btns = document.querySelectorAll('.button-fancy');
    if (btns.length == 0) return;

    btns.forEach(btn => {
        const href = btn.getAttribute('href');
        if (!href) return;

        btn.setAttribute('href', `#${href}`);
    });
}

document.addEventListener("DOMContentLoaded", setHrefFancy);
document.addEventListener("htmx:afterSwap", setHrefFancy);

/** форматирует 10000 в 10 000 и тр... */
const numFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/** анимация чисел */
const runNumber = (target, number, step = 50, delay = 100, format = false) => {
  let i = 0;
  let interval = setInterval(() => {
    if (number + step > i) {
      target.innerHTML = format ? numFormat(i) : i;
      i += step;
    } else {
      target.innerHTML = format ? numFormat(number) : number;
      clearInterval(interval);
    }
  }, delay);
};

/** спойлеры */
document.addEventListener(
  "click",
  (e) => {
    if (e.target.closest(".spoiler-title")) {
      e.target.closest(".spoiler").classList.toggle("is-open");
    }
  },
  true
);

/** для плавного раскрытия */
const accordions = [].map.call(
  document.querySelectorAll(".js-max-height, .spoiler-content"),
  (el) => el
);
["load", "resize"].map((event) =>
  window.addEventListener(event, () => {
    accordions.map((el) =>
      el.style.setProperty("--max-height", `${el.scrollHeight}px`)
    );
  })
);

/** $on */
const $on = function (event, target, callback) {
  document.addEventListener(
    event,
    (e) => {
      const el = e.target.closest(target);
      if (el) {
        e.preventDefault();
        callback(el);
      }
    },
    true
  );
};

/** Добавление в избранное */
const navbarFavorites = document.querySelector(".navbar__favorites");

const favoritesAnimation = () => {
  navbarFavorites.classList.add("_add");
  setTimeout(() => {
    navbarFavorites.classList.remove("_add");
  }, 1000);
};

const addInFavorites = (id, target) => {
  const favGetFromCoolies = Cookies.get("favorites");
  let favorites;

  if (favGetFromCoolies) {
    favorites = favGetFromCoolies.split(",");
  } else {
    favorites = [];
  }

  if (target.checked) {
    if (favorites.includes(String(id))) {
      console.log("Товар уже в избранном");
    } else {
      favorites.push(id);
      favorites = favorites.join(",");
      Cookies.set("favorites", favorites, { expires: 30 });
      favoritesAnimation();
    }
  } else {
    if (!favorites.includes(String(id))) {
      console.log("Удаляемый товар не найден в избранном");
    } else {
      favorites = favorites.filter((value) => Number(value) !== id);
      Cookies.set("favorites", favorites, { expires: 30 });
    }
  }

  // изменение иконки "избранное" в блоке navbar
  if (Cookies.get("favorites")) {
    navbarFavorites.classList.remove("_empty");
  } else {
    navbarFavorites.classList.add("_empty");
  }
};

function formCheck() {
    var checkbox = document.getElementById("checkbox");
    if (!checkbox) return;
    var form = checkbox.closest("form");

    checkbox.addEventListener('click', function () {
        var btn = form.querySelector(".form__box-button");
        if (checkbox.checked) btn.disabled = false;
        else btn.disabled = true;
})
}

document.addEventListener("DOMContentLoaded", ()=>{
    formCheck();
});
