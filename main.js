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
          translateX: (targetEl, i) => (i === 0 ? [-40, 0] : [40, 0]),
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

  // Mobile nav drawer
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileCloseTargets = document.querySelectorAll("[data-mobile-close]");

  if (navToggle && mobileNav && mobileOverlay) {
    const openMobileNav = () => {
      document.body.classList.add("nav-open");
      navToggle.setAttribute("aria-expanded", "true");
      mobileNav.setAttribute("aria-hidden", "false");
      mobileOverlay.hidden = false;
    };

    const closeMobileNav = () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
      mobileOverlay.hidden = true;
    };

    navToggle.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileCloseTargets.forEach((el) => {
      el.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeMobileNav();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && document.body.classList.contains("nav-open")) {
        closeMobileNav();
      }
    });
  }

  // Featured projects tabs
  const projectItems = document.querySelectorAll(".project-item[data-project-key]");
  const projectHeroImage = document.querySelector("[data-project-hero]");
  const projectSubImage = document.querySelector("[data-project-sub]");
  const projectField = document.querySelector("[data-project-field]");
  const projectRole = document.querySelector("[data-project-role]");
  const projectDescription = document.querySelector("[data-project-description]");
  const projectCard = document.querySelector("[data-project-card]");

  const projectData = {
    "project-environment-system": {
      heroImage: "./assets/Rectangle-4@2x.png",
      heroAlt: "Nhà máy và hệ thống xử lý môi trường",
      fieldValue: "Môi trường",
      roleValue: "Tư vấn, thiết kế và triển khai",
      description:
        "Khảo sát hiện trạng, đề xuất giải pháp và triển khai hệ thống xử lý phù hợp với quy mô hoạt động, giúp doanh nghiệp vận hành ổn định và đáp ứng yêu cầu môi trường.",
      subImage: "./assets/Rectangle-5@2x.png",
      subAlt: "Đội ngũ kỹ sư Gecko tại công trường",
    },
    "project-infrastructure-construction": {
      heroImage: "./assets/Rectangle-3@2x.png",
      heroAlt: "Dự án thi công hạ tầng kỹ thuật và công trình",
      fieldValue: "Xây dựng hạ tầng",
      roleValue: "Tổng thầu thi công và giám sát",
      description:
        "Tổ chức thi công đồng bộ hạ tầng kỹ thuật, tối ưu tiến độ và kiểm soát chất lượng theo yêu cầu vận hành thực tế của công trình công nghiệp và dân dụng.",
      subImage: "./assets/Rectangle-35@2x.png",
      subAlt: "Hạ tầng vận tải và bến bãi phục vụ dự án",
    },
    "project-byproduct-recycling": {
      heroImage: "./assets/Rectangle-32@2x.png",
      heroAlt: "Dự án xử lý và tái chế phụ phẩm công nghiệp",
      fieldValue: "Tái chế phụ phẩm",
      roleValue: "Thiết kế giải pháp và vận hành hệ thống",
      description:
        "Triển khai quy trình thu gom, xử lý và tái chế phụ phẩm công nghiệp nhằm giảm tải môi trường, đồng thời tạo ra vật liệu đầu ra phục vụ chuỗi sản xuất bền vững.",
      subImage: "./assets/Rectangle-34@2x.png",
      subAlt: "Sản xuất vật liệu từ tro xỉ và phụ phẩm",
    },
  };

  if (
    projectItems.length &&
    projectHeroImage &&
    projectSubImage &&
    projectField &&
    projectRole &&
    projectDescription
  ) {
    const setActiveProject = (projectKey) => {
      const selectedProject = projectData[projectKey];
      if (!selectedProject) return;

      projectItems.forEach((item) => {
        const isSelected = item.dataset.projectKey === projectKey;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      projectHeroImage.src = selectedProject.heroImage;
      projectHeroImage.alt = selectedProject.heroAlt;
      projectField.textContent = selectedProject.fieldValue;
      projectRole.textContent = selectedProject.roleValue;
      projectDescription.textContent = selectedProject.description;
      projectSubImage.src = selectedProject.subImage;
      projectSubImage.alt = selectedProject.subAlt;

      if (window.anime) {
        anime({
          targets: [projectHeroImage, projectCard || projectDescription, projectSubImage],
          opacity: [0.5, 1],
          duration: 260,
          easing: "easeOutQuad",
        });
      }
    };

    projectItems.forEach((item) => {
      item.addEventListener("click", () => {
        setActiveProject(item.dataset.projectKey);
      });
    });

    const initialProjectKey =
      Array.from(projectItems).find((item) => item.classList.contains("is-active"))?.dataset
        .projectKey || projectItems[0].dataset.projectKey;
    setActiveProject(initialProjectKey);
  }
});

