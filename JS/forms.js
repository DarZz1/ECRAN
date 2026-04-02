"use strict";

const Forms = {
  init() {
    document.addEventListener("input", (e) => {
      if (e.target.tagName == "INPUT" && e.target.type == "email") {
        e.target.value = e.target.value.toString().toLowerCase();
      }
    });

    document.addEventListener(
      "blur",
      (e) => {
        if (e.target.closest(".field")) {
          e.target.closest(".field").classList.add("show-validation");
        }
      },
      true
    );

    document.addEventListener(
      "click",
      (e) => {
        if (e.target.closest("[type=submit]") && e.target.closest("form")) {
          e.target.closest("form").classList.add("show-validation");
        }
      },
      true
    );

    this.mask();

    document.body.addEventListener("htmx:afterSettle", (e) => {
      this.mask();
    });
  },

  mask() {
    if (window.Maska) {
      Maska.create("[type=tel]", {
        mask: "+7 (###) ###-##-##",
        preprocessor: (value) => (value == "8" ? "+7" : value),
      });
      document
        .querySelectorAll("[type=tel]")
        .forEach((el) => (el.pattern = ".{18}"));
    }
  },

  ga(target, params = { event_category: "form" }) {
    window.gtag && gtag("event", target, params);
  },

  metrika(target) {
    if (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) {
      const ym = Ya.Metrika || Ya.Metrika2;
      const counters = ym.counters() || [];
      for (let i of counters) {
        const counter = window[`yaCounter${i.id}`];
        counter && counter.reachGoal(target);
      }
    }
  }
};

Forms.init();