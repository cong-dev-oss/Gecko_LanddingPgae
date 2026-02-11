// Basic page animations powered by Anime.js

document.addEventListener("DOMContentLoaded", () => {
  // Hero intro animation
  if (window.anime) {
    anime
      .timeline({
        easing: "easeOutExpo",
        duration: 800,
      })
      .add({
        targets: ".dn-u-gii-php-bn-vng-wrapper",
        opacity: [0, 1],
        translateY: [-20, 0],
      })
      .add(
        {
          targets: ".gii-php-xy",
          opacity: [0, 1],
          translateY: [20, 0],
        },
        "-=500"
      )
      .add(
        {
          targets: ".gecko-group-cung",
          opacity: [0, 1],
          translateY: [20, 0],
        },
        "-=550"
      )
      .add(
        {
          targets: ".button-parent .button, .button-parent .button2",
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(100),
        },
        "-=600"
      );
  }

  // Helper: animate metric counters
  const animateCounters = () => {
    if (!window.anime) return;
    const counters = document.querySelectorAll(".metric-number");
    counters.forEach((el) => {
      const text = el.textContent.trim();
      const hasPlus = text.endsWith("+");
      const target = parseInt(text.replace(/\D/g, ""), 10);
      if (Number.isNaN(target)) return;

      const counter = { val: 0 };
      anime({
        targets: counter,
        val: target,
        duration: 1800,
        easing: "easeOutExpo",
        update: () => {
          const value = Math.round(counter.val);
          el.textContent = hasPlus ? `${value}+` : String(value);
        },
      });
    });
  };

  // Scroll-based reveal animations
  const revealTargets = document.querySelectorAll(
    ".about-layout, .metrics2, .frame-parent9, .frame-parent10, .thnh-tu-ca-gecko .frame-parent11, .rectangle-parent7, .footer-content .frame-parent16"
  );

  if (revealTargets.length && window.IntersectionObserver && window.anime) {
    const getSectionAnimation = (el) => {
      const base = {
        duration: 900,
        easing: "easeOutQuad",
      };

      if (el.classList.contains("about-layout")) {
        // About section: ảnh và content slide đối xứng từ 2 bên
        return {
          ...base,
          targets: el.querySelectorAll(".frame-child, .frame-container"),
          opacity: [0, 1],
          translateX: (targetEl, i) => (i === 0 ? -40 : 40),
          translateY: [20, 0],
          delay: anime.stagger(150),
        };
      }

      if (el.classList.contains("metrics2")) {
        // Stats: nhẹ nhàng từ dưới lên, stagger giữa các item
        return {
          ...base,
          targets: el.querySelectorAll(".number-06"),
          opacity: [0, 1],
          translateY: [30, 0],
          delay: anime.stagger(120),
        };
      }

      if (el.classList.contains("frame-parent9")) {
        // Hàng thẻ trên: zoom-in nhẹ + trượt lên
        return {
          ...base,
          targets: el.querySelectorAll(".rectangle-group"),
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.96, 1],
          delay: anime.stagger(150),
        };
      }

      if (el.classList.contains("frame-parent10")) {
        // Hàng thẻ dưới: trượt lên + xoay rất nhẹ
        return {
          ...base,
          targets: el.querySelectorAll(".rectangle-parent3"),
          opacity: [0, 1],
          translateY: [50, 0],
          rotate: [-1.5, 0],
          delay: anime.stagger(130),
        };
      }

      if (el.classList.contains("frame-parent11")) {
        // Cột text ở section Thành tựu: trượt từ trái sang
        return {
          ...base,
          targets: el,
          opacity: [0, 1],
          translateX: [-40, 0],
        };
      }

      if (el.classList.contains("rectangle-parent7")) {
        // 2 ảnh dự án: trượt từ phải sang + fade
        return {
          ...base,
          targets: el.querySelectorAll(".frame-child10, .frame-parent15"),
          opacity: [0, 1],
          translateX: [40, 0],
          delay: anime.stagger(160),
        };
      }

      if (el.classList.contains("frame-parent16")) {
        // Footer main: fade-in nhẹ từ dưới
        return {
          ...base,
          targets: el,
          opacity: [0, 1],
          translateY: [30, 0],
        };
      }

      // Fallback chung
      return {
        ...base,
        targets: el,
        opacity: [0, 1],
        translateY: [40, 0],
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (!entry.isIntersecting) return;

          // Trigger counters mỗi lần metrics block vào viewport
          if (el.classList.contains("metrics2")) {
            animateCounters();
          }

          const config = getSectionAnimation(el);
          anime(config);
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealTargets.forEach((el) => {
      // Không ẩn trước để tránh trường hợp không intersect được sẽ mất section.
      observer.observe(el);
    });
  }

  // Sticky nav blur on scroll
  const nav = document.querySelector(".nav");
  if (nav) {
    const handleNavScroll = () => {
      if (window.scrollY > 10) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    handleNavScroll();
    window.addEventListener("scroll", handleNavScroll);
  }
});

