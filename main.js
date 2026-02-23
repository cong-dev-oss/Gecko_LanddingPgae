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

  // Services modal (Giải pháp toàn diện)
  const solutionItems = document.querySelectorAll("[data-solution-item]");
  const solutionModalOverlay = document.querySelector("[data-solution-modal-overlay]");
  const solutionModal = solutionModalOverlay?.querySelector(".solution-modal");
  const solutionModalTitle = document.querySelector("[data-solution-modal-title]");
  const solutionModalDescription = document.querySelector("[data-solution-modal-description]");
  const solutionModalTableWrap = document.querySelector("[data-solution-modal-table-wrap]");
  const solutionModalTableHead = document.querySelector("[data-solution-modal-table-head]");
  const solutionModalTableBody = document.querySelector("[data-solution-modal-table-body]");
  const solutionModalSections = document.querySelector("[data-solution-modal-sections]");
  const solutionModalCloseButtons = document.querySelectorAll("[data-solution-modal-close]");

  const defaultTableHeaders = ["Mã ngành", "Tên ngành", "Diễn giải"];
  const constructionRows = [
    ["4100", "Xây dựng nhà các loại", "Dự án dân dụng, công"],
    ["4210", "Xây dựng công trình giao thông", "Hạ tầng"],
    ["4220", "Xây dựng công trình công ích", "Điện, nước"],
    ["4290", "Xây dựng công trình kỹ thuật khác", "Dự án công"],
    ["4321", "Lắp đặt hệ thống điện", "Hạ tầng CNTT"],
    ["4322", "Lắp đặt hệ thống cấp thoát nước", "Công trình"],
    ["4329", "Lắp đặt hệ thống khác", "Mạng, camera"],
    ["7110", "Hoạt động kiến trúc & tư vấn kỹ thuật", "Tư vấn dự án"],
    ["7410", "Thiết kế chuyên dụng", "Thiết kế công trình"],
    ["4390", "Hoạt động xây dựng chuyên dụng", "Thi công phụ trợ"],
    ["8292", "Dịch vụ đóng gói", "Hồ sơ đấu thầu"],
    ["8230", "Tổ chức giới thiệu & xúc tiến thương mại", "Hội nghị dự án"],
    ["4311", "Phá dỡ", ""],
    ["4312", "Chuẩn bị mặt bằng", ""],
  ];
  const figmaSampleContent = {
    title: "Xây dựng, đấu thầu, dự án công nhà nước",
    description:
      "Triển khai thi công, tham gia đấu thầu và quản lý các dự án hạ tầng, công trình kỹ thuật và dự án công theo quy định của nhà nước.",
    tableHeaders: defaultTableHeaders,
    tableRows: constructionRows,
  };
  const steelTradeContent = {
    title: "THƯƠNG MẠI NGÀNH THÉP – KIM LOẠI – PHẾ LIỆU",
    description:
      "Thu mua, phân loại và phân phối thép, kim loại, phế liệu; kết hợp kho bãi, bốc xếp và vận tải đa phương thức phục vụ chuỗi cung ứng.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
    tableRows: [
      ["4662", "Bán buôn kim loại và quặng kim loại", "Thép, gang, phôi"],
      ["4663", "Bán buôn vật liệu, thiết bị lắp đặt khác trong xây dựng", "Thép xây dựng"],
      ["4690", "Bán buôn tổng hợp", "Bao trùm thương mại"],
      ["4610", "Đại lý, môi giới, đấu giá hàng hóa", "Trung gian thép"],
      ["4669", "Bán buôn chuyên doanh khác", "Xỉ, tro"],
      ["4672", "Bán buôn nhiên liệu rắn, lỏng, khí", "Than, coke"],
      ["4719", "Bán lẻ khác trong các cửa hàng kinh doanh tổng hợp", "VLXD"],
      ["4791", "Bán lẻ theo yêu cầu đặt hàng qua bưu điện hoặc internet", "TMĐT"],
      ["5210", "Kho bãi và lưu giữ hàng hóa", "Kho xỉ, kho thép"],
      ["5224", "Bốc xếp hàng hóa", "Cảng, nhà máy"],
      ["5229", "Hoạt động dịch vụ hỗ trợ khác liên quan đến vận tải", "Logistics"],
      ["4922", "Vận tải hàng hóa bằng đường bộ", "Vận chuyển chất thải"],
      ["5022", "Vận tải hàng hóa đường thủy nội địa", "Xà lan"],
      ["5012", "Vận tải hàng hóa ven biển và viễn dương", "Xuất nhập"],
    ],
  };
  const environmentGroupContent = {
    title: "MÔI TRƯỜNG",
    description:
      "Nhóm ngành liên quan đến thu gom, xử lý và tiêu hủy chất thải công nghiệp theo phạm vi kỹ thuật và điều kiện vận hành.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
    tableRows: [
      ["3811", "Thu gom rác thải không độc hại", "Bùn lò cao, xỉ thép, xỉ hạt, tro bay, tro đáy"],
      ["3812", "Thu gom rác thải độc hại", "Nếu phân loại là CTNH"],
      ["3821", "Xử lý và tiêu hủy rác thải không độc hại", "Xỉ, bùn, tro"],
      ["3822", "Xử lý và tiêu hủy rác thải độc hại", "Có điều kiện"],
      ["3830", "Tái chế phế liệu", "Xỉ → VLXD, kim loại"],
      ["3900", "Xử lý ô nhiễm và hoạt động quản lý chất thải khác", "Đồng xử lý, cải tạo, phục hồi"],
      ["7490", "Hoạt động chuyên môn, khoa học và công nghệ khác chưa được phân vào đâu", "Tư vấn môi trường"],
      ["7120", "Kiểm tra và phân tích kỹ thuật", "Phân tích mẫu xỉ, bùn"],
      ["7110", "Hoạt động kiến trúc và tư vấn kỹ thuật có liên quan", "ĐTM, hồ sơ kỹ thuật"],
      ["4329", "Lắp đặt hệ thống khác", "Hệ thống xử lý môi trường"],
      ["3700", "Thoát nước và xử lý nước thải", "Trạm xử lý nước thải"],
      ["3510", "Sản xuất, truyền tải và phân phối điện", "Tận dụng nhiệt"],
      ["4669", "Bán buôn chuyên doanh khác chưa được phân vào đâu", "Bán vật liệu tái chế"],
    ],
  };
  const insuranceConsultingContent = {
    title: "TƯ VẤN BẢO HIỂM",
    description:
      "Nhóm ngành tư vấn và hỗ trợ bảo hiểm, tập trung vào đại lý, giám định, tư vấn rủi ro và xử lý hồ sơ doanh nghiệp.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi"],
    tableRows: [
      ["6622", "Hoạt động đại lý & môi giới bảo hiểm", "Trục chính"],
      ["6629", "Hoạt động hỗ trợ bảo hiểm khác", "Giám định, tư vấn"],
      ["7020", "Tư vấn quản lý", "Tư vấn rủi ro DN"],
      ["8299", "Dịch vụ hỗ trợ kinh doanh khác", "Hồ sơ bảo hiểm"],
    ],
  };
  const byproductMaterialContent = {
    title: "SẢN XUẤT VẬT LIỆU TỪ XỈ – TRO – BÙN",
    description:
      "Nhóm ngành sản xuất vật liệu và sản phẩm phụ trợ từ xỉ, tro, bùn và khoáng chất phục vụ tái chế và chuỗi cung ứng VLXD.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
    tableRows: [
      ["2392", "Sản xuất vật liệu xây dựng từ đất sét", "Gạch"],
      ["2395", "Sản xuất bê tông và các sản phẩm từ xi măng", "VLXD từ xỉ"],
      ["2399", "Sản xuất sản phẩm từ khoáng phi kim khác", "Xỉ, tro"],
      ["2310", "Sản xuất thủy tinh và sản phẩm từ thủy tinh", "Tro"],
      ["2410", "Sản xuất sắt, thép, gang", "Tái chế"],
      ["2431", "Đúc sắt, thép", "Tái chế"],
      ["2599", "Sản xuất sản phẩm khác bằng kim loại", "Phụ kiện"],
      ["0810", "Khai thác đá, cát, sỏi", "Phối trộn"],
      ["0899", "Khai khoáng khác chưa được phân vào đâu", "Phụ gia"],
      ["1629", "Sản xuất sản phẩm khác từ gỗ", "Pallet"],
      ["2012", "Sản xuất phân bón và hợp chất nito", "Tro"],
      ["2029", "Sản xuất hóa chất khác chưa được phân vào đâu", "Phụ gia"],
    ],
  };
  const portDredgingContent = {
    title: "CẢNG – NẠO VÉT – BẾN BÃI",
    description:
      "Nhóm ngành thi công, vận hành hạ tầng cảng và bến bãi; bao gồm nạo vét, bù lấp và dịch vụ logistics liên quan.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
    tableRows: [
      ["4290", "Xây dựng công trình kỹ thuật dân dụng khác", "Cảng"],
      ["4210", "Xây dựng công trình giao thông", "Hạ tầng"],
      ["4311", "Phá dỡ", "Cải tạo"],
      ["4312", "Chuẩn bị mặt bằng", "Bến bãi"],
      ["5222", "Hoạt động dịch vụ hỗ trợ trực tiếp cho vận tải đường thủy", "Cảng"],
      ["5224", "Bốc xếp hàng hóa", "Cầu cảng"],
      ["5229", "Hoạt động dịch vụ hỗ trợ khác liên quan đến vận tải", "Logistics"],
      ["4299", "Xây dựng công trình kỹ thuật khác", "Nạo vét"],
      ["0810", "Khai thác cát, sỏi", "Bù lấp"],
    ],
  };
  const technicalMonitoringContent = {
    title: "QUAN TRẮC – TƯ VẤN – KỸ THUẬT",
    description:
      "Nhóm ngành quan trắc, phân tích và tư vấn kỹ thuật phục vụ hồ sơ môi trường, quản trị dự án và báo cáo chuyên môn.",
    tableHeaders: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
    tableRows: [
      ["7110", "Hoạt động kiến trúc và tư vấn kỹ thuật", "ĐTM"],
      ["7120", "Kiểm tra và phân tích kỹ thuật", "Mẫu môi trường"],
      ["7490", "Hoạt động chuyên môn khác", "Tư vấn"],
      ["7020", "Tư vấn quản lý", "Dự án"],
      ["8299", "Dịch vụ hỗ trợ kinh doanh khác", "Hồ sơ"],
      ["6209", "Hoạt động CNTT khác", "Phần mềm giám sát"],
      ["6311", "Xử lý dữ liệu", "Quan trắc"],
      ["6312", "Cổng thông tin", "Báo cáo"],
      ["7211", "Nghiên cứu khoa học tự nhiên", "R&D"],
    ],
  };
  const energyThermalContent = {
    title: "NHÀ MÁY NHIỆT ĐIỆN – THAN – TRO – XỈ – FGD – KHÍ THẢI",
    description:
      "Danh mục ngành cho cụm nhiệt điện, nhiên liệu, phụ phẩm và hệ thống xử lý khí/nước thải.",
    tableSections: [
      {
        title: "1. Nhóm sản xuất – vận hành – năng lượng",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
        rows: [
          ["3510", "Sản xuất, truyền tải và phân phối điện", "Điện nhiệt"],
          ["3520", "Sản xuất khí đốt, phân phối nhiên liệu khí", "Phụ trợ"],
          ["3530", "Sản xuất và phân phối hơi nước, nước nóng", "Nhiệt dư"],
          ["2811", "Sản xuất động cơ, tua bin", "Phụ tùng"],
          ["2813", "Sản xuất máy bơm, máy nén", "Phụ trợ"],
          ["2819", "Sản xuất máy thông dụng khác", "Thiết bị"],
          ["2829", "Sản xuất máy chuyên dụng khác", "Thiết bị nhiệt điện"],
          ["3312", "Sửa chữa máy móc, thiết bị", "Bảo trì"],
          ["3314", "Sửa chữa thiết bị điện", "O&M"],
          ["4321", "Lắp đặt hệ thống điện", "Nhà máy"],
          ["4322", "Lắp đặt hệ thống cấp thoát nước", "Phụ trợ"],
          ["4329", "Lắp đặt hệ thống khác", "Lọc bụi, lọc khí"],
        ],
      },
      {
        title: "2. Nhóm nhiên liệu – than – coke – phụ gia đốt",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
        rows: [
          ["4661", "Bán buôn nhiên liệu rắn, lỏng, khí", "Than, dầu"],
          ["4672", "Bán buôn nhiên liệu rắn, lỏng, khí", "Than nhiệt"],
          ["4669", "Bán buôn chuyên doanh khác", "Phụ gia"],
          ["4690", "Bán buôn tổng hợp", "Tổng hợp"],
          ["4610", "Đại lý, môi giới hàng hóa", "Trung gian"],
        ],
      },
      {
        title: "3. Nhóm tro – xỉ – thạch cao – phụ phẩm nhiệt điện",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
        rows: [
          ["3811", "Thu gom rác thải không độc hại", "Tro bay, tro đáy"],
          ["3812", "Thu gom rác thải độc hại", "Nếu phân loại"],
          ["3821", "Xử lý rác thải không độc hại", "Tro, xỉ"],
          ["3822", "Xử lý rác thải độc hại", "Nếu CTNH"],
          ["3830", "Tái chế phế liệu", "Tro -> VLXD"],
          ["3900", "Xử lý ô nhiễm và quản lý chất thải khác", "Bãi xỉ"],
          ["2395", "Sản xuất bê tông và sản phẩm từ xi măng", "Gạch tro"],
          ["2399", "Sản xuất sản phẩm khoáng phi kim khác", "Tấm, gạch"],
          ["0810", "Khai thác đá, cát, sỏi", "Phối trộn"],
          ["4663", "Bán buôn vật liệu xây dựng", "VLXD từ tro"],
        ],
      },
      {
        title: "4. Nhóm xử lý khí thải – nước thải – FGD – ESP – SCR",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
        rows: [
          ["3700", "Thoát nước và xử lý nước thải", "Nước thải nhiệt điện"],
          ["3900", "Xử lý ô nhiễm môi trường", "Khí thải"],
          ["4329", "Lắp đặt hệ thống khác", "Lọc bụi"],
          ["2821", "Sản xuất lò và đầu đốt", "Lò"],
          ["2829", "Máy chuyên dụng", "ESP, FGD"],
          ["7110", "Tư vấn kỹ thuật", "Thiết kế"],
          ["7120", "Kiểm tra & phân tích kỹ thuật", "Khí, bụi"],
        ],
      },
      {
        title: "5. Nhóm logistics – cảng – bãi tro xỉ – vận chuyển",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi / Ghi chú"],
        rows: [
          ["5210", "Kho bãi và lưu giữ hàng hóa", "Bãi tro"],
          ["5224", "Bốc xếp hàng hóa", "Than, xỉ"],
          ["5229", "Dịch vụ hỗ trợ vận tải", "Logistics"],
          ["4922", "Vận tải đường bộ", "Xỉ, than"],
          ["5022", "Vận tải thủy nội địa", "Xà lan"],
          ["5012", "Vận tải biển", "Xuất tro"],
          ["4290", "Xây dựng công trình kỹ thuật", "Bãi thải"],
          ["4312", "Chuẩn bị mặt bằng", "Bãi xỉ"],
        ],
      },
      {
        title: "6. Nhóm quan trắc – ĐTM – báo cáo môi trường nhiệt điện",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi"],
        rows: [
          ["7110", "Hoạt động kiến trúc và tư vấn kỹ thuật", "ĐTM"],
          ["7120", "Kiểm tra và phân tích kỹ thuật", "Quan trắc"],
          ["7490", "Hoạt động KHKT khác", "Báo cáo"],
          ["7020", "Tư vấn quản lý", "Quản trị môi trường"],
          ["6311", "Xử lý dữ liệu", "Quan trắc online"],
          ["6312", "Cổng thông tin", "Hệ thống báo cáo"],
        ],
      },
      {
        title: "7. Nhóm EPC – bảo trì – vận hành",
        headers: ["Mã ngành", "Tên ngành", "Phạm vi"],
        rows: [
          ["4290", "Xây dựng công trình kỹ thuật", "EPC"],
          ["4321", "Lắp đặt hệ thống điện", "Nhà máy"],
          ["4329", "Lắp đặt hệ thống khác", "Lọc"],
          ["3312", "Sửa chữa máy móc", "O&M"],
          ["3314", "Sửa chữa thiết bị điện", "O&M"],
          ["4390", "Hoạt động xây dựng chuyên dụng", "Phụ trợ"],
        ],
      },
    ],
  };

  const solutionContent = {
    "construction-deployment": { ...figmaSampleContent },
    "material-logistics": { ...steelTradeContent },
    "environmental-solutions": { ...environmentGroupContent },
    "environment-consulting": { ...insuranceConsultingContent },
    "technical-monitoring": { ...technicalMonitoringContent },
    "byproduct-material-production": { ...byproductMaterialContent },
    "port-logistics-infrastructure": { ...portDredgingContent },
    "energy-thermal-byproduct": { ...energyThermalContent },
  };

  if (solutionItems.length && solutionModalOverlay && solutionModalTitle && solutionModalDescription) {
    let lastActiveElement = null;
    let modalOpenedAt = 0;

    // Always start closed. Prevent stale open state after refresh/hot reload.
    solutionModalOverlay.hidden = true;
    solutionModalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("solution-modal-open");

    const renderSolutionTable = (tableHeaders, tableRows) => {
      if (!solutionModalTableWrap || !solutionModalTableHead || !solutionModalTableBody) return;

      const hasTable = Array.isArray(tableHeaders) && tableHeaders.length && Array.isArray(tableRows);
      solutionModalTableWrap.hidden = !hasTable;
      if (!hasTable) return;

      const headerHtml = `<tr>${tableHeaders
        .map((header) => `<th scope="col">${header}</th>`)
        .join("")}</tr>`;
      solutionModalTableHead.innerHTML = headerHtml;

      const rowsHtml = tableRows
        .map(
          (row) =>
            `<tr>${row
              .map((cell) => `<td>${cell || "&nbsp;"}</td>`)
              .join("")}</tr>`
        )
        .join("");
      solutionModalTableBody.innerHTML = rowsHtml;
    };

    const renderSolutionSections = (sections) => {
      if (!solutionModalSections) return;
      const hasSections = Array.isArray(sections) && sections.length > 0;
      solutionModalSections.hidden = !hasSections;
      if (!hasSections) {
        solutionModalSections.innerHTML = "";
        return;
      }

      const sectionsHtml = sections
        .map((section) => {
          const headers = section.headers || defaultTableHeaders;
          const rows = Array.isArray(section.rows) ? section.rows : [];
          const headerHtml = `<tr>${headers
            .map((header) => `<th scope="col">${header}</th>`)
            .join("")}</tr>`;
          const rowsHtml = rows
            .map(
              (row) =>
                `<tr>${row
                  .map((cell) => `<td>${cell || "&nbsp;"}</td>`)
                  .join("")}</tr>`
            )
            .join("");

          return `
            <section class="solution-modal-section">
              <h4 class="solution-modal-section-title">${section.title || ""}</h4>
              <div class="solution-modal-section-table-wrap">
                <table class="solution-modal-table" aria-label="${section.title || "Danh mục ngành"}">
                  <thead>${headerHtml}</thead>
                  <tbody>${rowsHtml}</tbody>
                </table>
              </div>
            </section>
          `;
        })
        .join("");

      solutionModalSections.innerHTML = sectionsHtml;
    };

    const openSolutionModal = (solutionKey, fallbackTitle) => {
      const content = solutionContent[solutionKey] || figmaSampleContent;

      solutionModalTitle.textContent = content.title;
      solutionModalDescription.textContent = content.description;
      if (Array.isArray(content.tableSections) && content.tableSections.length > 0) {
        if (solutionModalTableWrap) {
          solutionModalTableWrap.hidden = true;
        }
        renderSolutionSections(content.tableSections);
      } else {
        if (solutionModalSections) {
          solutionModalSections.hidden = true;
          solutionModalSections.innerHTML = "";
        }
        if (solutionModalTableWrap) {
          solutionModalTableWrap.hidden = false;
        }
        renderSolutionTable(content.tableHeaders, content.tableRows);
      }
      solutionModalOverlay.hidden = false;
      solutionModalOverlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("solution-modal-open");
      modalOpenedAt = Date.now();

      if (window.anime && solutionModal) {
        anime.remove([solutionModalOverlay, solutionModal]);
        anime({
          targets: solutionModalOverlay,
          opacity: [0, 1],
          duration: 180,
          easing: "linear",
        });
        anime({
          targets: solutionModal,
          opacity: [0, 1],
          translateY: [24, 0],
          scale: [0.96, 1],
          duration: 320,
          easing: "easeOutCubic",
        });
      }
    };

    const closeSolutionModal = () => {
      const finishClose = () => {
        solutionModalOverlay.hidden = true;
        solutionModalOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("solution-modal-open");
        if (lastActiveElement && typeof lastActiveElement.focus === "function") {
          lastActiveElement.focus();
        }
      };

      if (window.anime && solutionModal) {
        anime.remove([solutionModalOverlay, solutionModal]);
        anime({
          targets: solutionModalOverlay,
          opacity: [1, 0],
          duration: 140,
          easing: "linear",
        });
        anime({
          targets: solutionModal,
          opacity: [1, 0],
          translateY: [0, 20],
          scale: [1, 0.98],
          duration: 220,
          easing: "easeInCubic",
          complete: finishClose,
        });
      } else {
        finishClose();
      }
    };

    solutionItems.forEach((item) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");

      const openFromItem = (event) => {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        lastActiveElement = document.activeElement;
        const key = item.dataset.solutionKey;
        const fallbackTitle =
          item.querySelector(".xy-dng-v, .t-vn-mi")?.textContent?.trim() || "Giải pháp";
        openSolutionModal(key, fallbackTitle);
      };

      item.addEventListener("click", (event) => openFromItem(event));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          openFromItem();
        }
      });
    });

    solutionModalCloseButtons.forEach((button) => {
      button.addEventListener("click", closeSolutionModal);
    });

    solutionModalOverlay.addEventListener("click", (event) => {
      if (Date.now() - modalOpenedAt < 220) {
        return;
      }
      if (event.target === solutionModalOverlay) {
        closeSolutionModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !solutionModalOverlay.hidden) {
        closeSolutionModal();
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const projectPanel = document.querySelector(".rectangle-parent7");
    const projectMetaTargets = projectCard
      ? projectCard.querySelectorAll(".lnh-vc-parent, .vector-icon, [data-project-description]")
      : [];

    let activeProjectKey = null;
    let pendingProjectKey = null;
    let isSwitching = false;

    const applyProjectContent = (selectedProject) => {
      projectHeroImage.src = selectedProject.heroImage;
      projectHeroImage.alt = selectedProject.heroAlt;
      projectField.textContent = selectedProject.fieldValue;
      projectRole.textContent = selectedProject.roleValue;
      projectDescription.textContent = selectedProject.description;
      projectSubImage.src = selectedProject.subImage;
      projectSubImage.alt = selectedProject.subAlt;
    };

    const preloadProjectImages = (selectedProject) => {
      const sources = [selectedProject.heroImage, selectedProject.subImage];
      return Promise.all(
        sources.map(
          (source) =>
            new Promise((resolve) => {
              const image = new Image();
              image.onload = resolve;
              image.onerror = resolve;
              image.src = source;
            })
        )
      );
    };

    const setActiveProject = async (projectKey, options = {}) => {
      const { immediate = false } = options;
      const selectedProject = projectData[projectKey];
      if (!selectedProject) return;
      if (projectKey === activeProjectKey) return;

      if (isSwitching) {
        pendingProjectKey = projectKey;
        return;
      }

      isSwitching = true;
      if (projectPanel) {
        projectPanel.classList.add("is-switching");
      }

      projectItems.forEach((item) => {
        const isSelected = item.dataset.projectKey === projectKey;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      if (!window.anime || reducedMotion || immediate) {
        applyProjectContent(selectedProject);
        activeProjectKey = projectKey;
        isSwitching = false;
        if (projectPanel) {
          projectPanel.classList.remove("is-switching");
        }
        if (pendingProjectKey && pendingProjectKey !== projectKey) {
          const nextProjectKey = pendingProjectKey;
          pendingProjectKey = null;
          setActiveProject(nextProjectKey);
        } else {
          pendingProjectKey = null;
        }
        return;
      }

      try {
        await Promise.all([
          preloadProjectImages(selectedProject),
          anime({
            targets: [projectHeroImage, projectCard || projectDescription, projectSubImage],
            opacity: [1, 0],
            translateY: [0, -18],
            scale: [1, 0.98],
            duration: 280,
            easing: "easeInQuad",
          }).finished,
        ]);
      } catch (_error) {
        // Fallback to continue updating even if animation promise is interrupted.
      }

      applyProjectContent(selectedProject);

      try {
        await anime
          .timeline({
            easing: "easeOutCubic",
            duration: 620,
          })
          .add({
            targets: [projectHeroImage, projectSubImage],
            opacity: [0, 1],
            translateY: [26, 0],
            scale: [1.06, 1],
            delay: anime.stagger(100),
          })
          .add(
            {
              targets: projectCard || projectDescription,
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.985, 1],
              duration: 520,
            },
            "-=440"
          )
          .add(
            {
              targets: projectMetaTargets,
              opacity: [0, 1],
              translateY: [16, 0],
              delay: anime.stagger(65),
              duration: 420,
            },
            "-=420"
          ).finished;
      } catch (_error) {
        // Ignore interrupted animation and continue state synchronization.
      }

      activeProjectKey = projectKey;
      isSwitching = false;
      if (projectPanel) {
        projectPanel.classList.remove("is-switching");
      }

      if (pendingProjectKey && pendingProjectKey !== projectKey) {
        const nextProjectKey = pendingProjectKey;
        pendingProjectKey = null;
        setActiveProject(nextProjectKey);
      } else {
        pendingProjectKey = null;
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
    setActiveProject(initialProjectKey, { immediate: true });
  }
});

