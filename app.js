const rowsData = [
  {
    request: "99665",
    company: "ООО Северный Пиксель",
    product: "VK Cloud",
    inn: "7704821593",
    status: "Проиграна",
    statusType: "red",
    date: "12.02.2026"
  },
  {
    request: "99264",
    company: "АО Орбита Сервис",
    product: "VK Workspace",
    inn: "7812049365",
    status: "Отменена",
    statusType: "red",
    date: "04.02.2026"
  },
  {
    request: "98963",
    company: "ООО Городские Решения",
    product: "VK Cloud",
    inn: "5043182751",
    status: "Успешно закрыта",
    statusType: "green",
    date: "26.01.2026"
  },
  {
    request: "98762",
    company: "ООО Альфа Коннект",
    product: "VK Cloud",
    inn: "6679120348",
    status: "В работе",
    statusType: "blue",
    date: "17.01.2026"
  },
  {
    request: "98461",
    company: "ИП Савельев М.Д.",
    product: "VK Cloud",
    inn: "6315082746",
    status: "Успешно закрыта",
    statusType: "green",
    date: "08.01.2026"
  },
  {
    request: "98160",
    company: "ООО Бизнес Платформа",
    product: "VK Cloud",
    inn: "2468091357",
    status: "Успешно закрыта",
    statusType: "green",
    date: "27.12.2025"
  },
  {
    request: "97859",
    company: "АО Технопарк Регион",
    product: "VK Cloud",
    inn: "5267148392",
    status: "Успешно закрыта",
    statusType: "green",
    date: "18.12.2025"
  },
  {
    request: "97558",
    company: "ООО Дельта Лаб",
    product: "VK Cloud",
    inn: "0274159683",
    status: "Успешно закрыта",
    statusType: "green",
    date: "09.12.2025"
  },
  {
    request: "97257",
    company: "ООО Ритм Проект",
    product: "VK Cloud",
    inn: "3901864275",
    status: "Успешно закрыта",
    statusType: "green",
    date: "30.11.2025"
  },
  {
    request: "96956",
    company: "ООО Норд Системс",
    product: "VK Cloud",
    inn: "7453208196",
    status: "Успешно закрыта",
    statusType: "green",
    date: "22.11.2025"
  },
  {
    request: "96655",
    company: "ИП Белова Е.А.",
    product: "VK Cloud",
    inn: "1654379208",
    status: "Успешно закрыта",
    statusType: "green",
    date: "13.11.2025"
  },
  {
    request: "96354",
    company: "ООО Прайм Диджитал",
    product: "VK Cloud",
    inn: "9002741635",
    status: "Успешно закрыта",
    statusType: "green",
    date: "05.11.2025"
  }
];

const rows = document.getElementById("rows");
const layoutRoot = document.getElementById("layout-root");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sideMenuButtons = document.querySelectorAll(".sidebar-nav .icon-btn[data-section]");
const sectionSubtitle = document.getElementById("section-subtitle");
const sectionTitle = document.getElementById("section-title");
const dealsContent = document.getElementById("deals-content");
const menuEmptyState = document.getElementById("menu-empty-state");
const tabs = document.querySelectorAll(".tab[data-tab]");
const openTabPanel = document.getElementById("open-tab-panel");
const confirmedTabPanel = document.getElementById("confirmed-tab-panel");
const notifDot = document.querySelector(".notif-dot");
const profileEmail = document.querySelector(".profile-text strong");
const avatarLetter = document.querySelector(".avatar-letter");
const sortableHeaders = document.querySelectorAll("th.sortable");
const searchInput = document.querySelector(".search input");
const emptyState = document.getElementById("empty-state");
const resetFilterBtn = document.getElementById("reset-filter");
const statusDropdown = document.getElementById("status-dropdown");
const statusDropdownLabel = document.getElementById("status-dropdown-label");
const statusDropdownMenu = document.getElementById("status-dropdown-menu");
const statusDropdownToggle = statusDropdown ? statusDropdown.querySelector(".dropdown-toggle") : null;
const productDropdown = document.getElementById("product-dropdown");
const productDropdownLabel = document.getElementById("product-dropdown-label");
const productDropdownToggle = productDropdown
  ? productDropdown.querySelector(".dropdown-toggle")
  : null;
const productDropdownItems = productDropdown
  ? productDropdown.querySelectorAll(".dropdown-item")
  : [];
const reportOpenBtn = document.getElementById("report-open-btn");
const reportModal = document.getElementById("report-modal");
const reportModalCloseBtn = document.getElementById("report-modal-close");
const reportCancelBtn = document.getElementById("report-cancel-btn");
const reportRangeOptions = reportModal
  ? reportModal.querySelectorAll(".report-range-option")
  : [];
const reportDateTrigger = document.getElementById("report-date-trigger");
const reportDatePopover = document.getElementById("report-date-popover");
const reportDateFromInput = document.getElementById("report-date-from");
const reportDateToInput = document.getElementById("report-date-to");
const reportDateApplyBtn = document.getElementById("report-date-apply");
const reportDateCancelBtn = document.getElementById("report-date-cancel");
const reportDateStart = document.getElementById("report-date-start");
const reportDateEnd = document.getElementById("report-date-end");
const reportDownloadBtn = document.getElementById("report-download-btn");
const reportToast = document.getElementById("report-toast");
const reportToastCloseBtn = document.getElementById("report-toast-close");
const reportToastIcon = document.getElementById("report-toast-icon");
const reportToastTitle = document.getElementById("report-toast-title");
const reportToastText = document.getElementById("report-toast-text");

const sortState = {
  key: "request",
  direction: "desc"
};
const TAB_FADE_MS = 100;

let filterQuery = "";
let statusFilter = "all";
let productFilter = "all";
let tabTransitionTimer = null;
let currentSection = "deals";

const sectionTitles = {
  home: "Главная",
  deals: "Регистрация сделки",
  marketing: "Маркетинговый материал",
  learning: "Обучение",
  features: "Возможности"
};
const SIDEBAR_ANIM_MS = 450;
const LABEL_FADE_MS = 100;
let sidebarTransitionTimer = null;
let lastFocusedElement = null;
let reportRangeMode = "all";
let reportToastHideTimer = null;
let reportToastStatusTimer = null;
let reportToastAutoHideTimer = null;

function statusIconByLabel(status) {
  const label = status.toLowerCase();

  if (label.includes("проигран")) {
    return "img/StatusErrorIcon.svg";
  }

  if (label.includes("отмен")) {
    return "img/StatusCrossIcon.svg";
  }

  if (label.includes("успеш")) {
    return "img/StatusSuccessIcon.svg";
  }

  return "img/StatusClockIcon.svg";
}

function parseDate(value) {
  const [day, month, year] = value.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function normalizeValue(item, key) {
  if (key === "request" || key === "inn") {
    return Number(item[key]);
  }

  if (key === "date") {
    return parseDate(item.date);
  }

  return String(item[key]).toLowerCase();
}

function sortRowsData(data) {
  const directionFactor = sortState.direction === "asc" ? 1 : -1;

  return [...data].sort((a, b) => {
    const left = normalizeValue(a, sortState.key);
    const right = normalizeValue(b, sortState.key);

    if (typeof left === "number" && typeof right === "number") {
      return (left - right) * directionFactor;
    }

    return left.localeCompare(right, "ru") * directionFactor;
  });
}

function filterRowsData(data) {
  return data.filter((item) => {
    const searchable = [
      item.request,
      item.company,
      item.product,
      item.inn,
      item.status,
      item.date
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !filterQuery || searchable.includes(filterQuery);
    const matchesProduct =
      productFilter === "all" || item.product.toLowerCase() === productFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesProduct && matchesStatus;
  });
}

function setupStatusDropdown() {
  if (!statusDropdownMenu || !statusDropdownLabel || !statusDropdownToggle) {
    return;
  }

  const uniqueStatuses = [...new Set(rowsData.map((item) => item.status))];
  const options = ["all", ...uniqueStatuses];

  statusDropdownMenu.innerHTML = options
    .map((statusValue) => {
      const label = statusValue === "all" ? "Все заявки" : statusValue;
      const isActive = statusValue === "all";
      return `
        <button
          type="button"
          class="dropdown-item ${isActive ? "active" : ""}"
          data-status-filter="${statusValue}"
        >
          ${label}
        </button>
      `;
    })
    .join("");

  const statusItems = statusDropdownMenu.querySelectorAll(".dropdown-item");

  statusDropdownToggle.addEventListener("click", () => {
    const isOpen = statusDropdown.classList.toggle("open");
    statusDropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  statusItems.forEach((item) => {
    item.addEventListener("click", () => {
      statusFilter = item.dataset.statusFilter || "all";
      statusDropdownLabel.textContent = item.textContent.trim();
      statusItems.forEach((node) => {
        node.classList.toggle("active", node === item);
      });
      statusDropdown.classList.remove("open");
      statusDropdownToggle.setAttribute("aria-expanded", "false");
      applySorting();
    });
  });
}

function renderRows(data) {
  rows.innerHTML = data
    .map(
      (item) => `
        <tr>
          <td class="request-cell"><span class="cell-text">${item.request}</span></td>
          <td><span class="cell-text">${item.company}</span></td>
          <td><span class="cell-text">${item.product}</span></td>
          <td><span class="cell-text">${item.inn}</span></td>
          <td>
            <span class="status">
              <img class="status-icon" src="${statusIconByLabel(item.status)}" alt="" />
              <span class="status-text">${item.status}</span>
            </span>
          </td>
          <td><span class="cell-text">${item.date}</span></td>
          <td class="actions-cell">
            <div class="actions-wrap">
              <button class="row-menu-btn" type="button" aria-label="Действия" aria-expanded="false">
                <img src="img/Table/MoreButton.svg" alt="" />
              </button>
              <div class="row-menu" role="menu">
                <button type="button" class="row-menu-item" role="menuitem">Открыть заявку</button>
                <button type="button" class="row-menu-item" role="menuitem">Редактировать</button>
                <button type="button" class="row-menu-item danger" role="menuitem">Удалить</button>
              </div>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  if (emptyState) {
    const hasRows = data.length > 0;
    emptyState.classList.toggle("visible", !hasRows);
    emptyState.hidden = hasRows;
  }
}

function updateSortHeaderState() {
  sortableHeaders.forEach((header) => {
    const isActive = header.dataset.sortKey === sortState.key;
    header.classList.toggle("is-active", isActive);
    header.classList.remove("sort-asc", "sort-desc");
    if (isActive) {
      header.classList.add(sortState.direction === "asc" ? "sort-asc" : "sort-desc");
    }
  });
}

function applySorting() {
  const filteredData = filterRowsData(rowsData);
  const sortedData = sortRowsData(filteredData);
  renderRows(sortedData);
  updateSortHeaderState();
}

function switchTab(tabKey) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabKey);
  });

  const showPanel = tabKey === "open" ? openTabPanel : confirmedTabPanel;
  const hidePanel = tabKey === "open" ? confirmedTabPanel : openTabPanel;

  if (!showPanel || !hidePanel) {
    return;
  }

  if (!showPanel.hidden && showPanel.classList.contains("is-visible")) {
    return;
  }

  if (tabTransitionTimer) {
    window.clearTimeout(tabTransitionTimer);
    tabTransitionTimer = null;
  }

  if (hidePanel.hidden) {
    showPanel.hidden = false;
    requestAnimationFrame(() => {
      showPanel.classList.add("is-visible");
    });
    return;
  }

  hidePanel.classList.remove("is-visible");

  tabTransitionTimer = window.setTimeout(() => {
    hidePanel.hidden = true;
    showPanel.hidden = false;
    showPanel.classList.remove("is-visible");
    requestAnimationFrame(() => {
      showPanel.classList.add("is-visible");
    });
    tabTransitionTimer = null;
  }, TAB_FADE_MS);
}

function switchSection(sectionKey) {
  currentSection = sectionKey;

  sideMenuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionKey);
  });

  const title = sectionTitles[sectionKey] || sectionTitles.deals;
  if (sectionSubtitle) {
    sectionSubtitle.textContent = title;
  }
  if (sectionTitle) {
    sectionTitle.textContent = title;
  }

  const isDeals = sectionKey === "deals";
  if (dealsContent) {
    dealsContent.hidden = !isDeals;
  }
  if (menuEmptyState) {
    menuEmptyState.hidden = isDeals;
  }
}

if (notifDot) {
  window.setTimeout(() => {
    notifDot.classList.add("visible");
  }, 5000);
}

if (profileEmail && avatarLetter) {
  const firstLetter = profileEmail.textContent.trim().charAt(0);
  avatarLetter.textContent = firstLetter.toUpperCase();
}

function closeAllRowMenus() {
  const openCells = document.querySelectorAll(".actions-cell.open");
  openCells.forEach((cell) => {
    cell.classList.remove("open");
    const btn = cell.querySelector(".row-menu-btn");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

function toIsoFromDisplay(value) {
  const [day, month, year] = value.split(".");
  if (!day || !month || !year) {
    return "";
  }
  return `${year}-${month}-${day}`;
}

function toDisplayFromIso(value) {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) {
    return "";
  }
  return `${day}.${month}.${year}`;
}

function toFileDateFromDisplay(value) {
  const [day, month, year] = value.split(".");
  if (!day || !month || !year) {
    return "";
  }
  return `${day}-${month}-${year}`;
}

function getReportFileName() {
  const startDisplay = reportDateStart ? reportDateStart.textContent.trim() : "";
  const endDisplay = reportDateEnd ? reportDateEnd.textContent.trim() : "";
  const start = toFileDateFromDisplay(startDisplay);
  const end = toFileDateFromDisplay(endDisplay);
  if (!start || !end) {
    return "request_report.xlsx";
  }
  return `request_report_${start}_${end}.xlsx`;
}

function closeReportDatePopover() {
  if (!reportDatePopover || !reportDateTrigger) {
    return;
  }
  reportDatePopover.hidden = true;
  reportDateTrigger.setAttribute("aria-expanded", "false");
}

function openReportDatePopover() {
  if (!reportDatePopover || !reportDateTrigger || reportRangeMode !== "custom") {
    return;
  }
  reportDatePopover.hidden = false;
  reportDateTrigger.setAttribute("aria-expanded", "true");
}

function syncReportDateText() {
  if (!reportDateStart || !reportDateEnd || !reportDateFromInput || !reportDateToInput) {
    return;
  }
  if (reportDateFromInput.value) {
    reportDateStart.textContent = toDisplayFromIso(reportDateFromInput.value);
  }
  if (reportDateToInput.value) {
    reportDateEnd.textContent = toDisplayFromIso(reportDateToInput.value);
  }
}

function setReportRangeMode(mode) {
  reportRangeMode = mode === "custom" ? "custom" : "all";
  const isCustom = reportRangeMode === "custom";

  reportRangeOptions.forEach((node) => {
    node.classList.toggle("active", node.dataset.rangeMode === reportRangeMode);
  });

  if (reportDateTrigger) {
    reportDateTrigger.classList.toggle("is-active", isCustom);
    reportDateTrigger.setAttribute("aria-disabled", String(!isCustom));
  }

  if (!isCustom) {
    closeReportDatePopover();
  }
}

function openReportModal() {
  if (!reportModal) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  reportModal.hidden = false;
  document.body.classList.add("modal-open");
  closeReportDatePopover();
}

function closeReportModal() {
  if (!reportModal) {
    return;
  }

  reportModal.hidden = true;
  document.body.classList.remove("modal-open");
  closeReportDatePopover();
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function hideReportToast() {
  if (!reportToast) {
    return;
  }
  if (reportToastHideTimer) {
    window.clearTimeout(reportToastHideTimer);
  }
  if (reportToastStatusTimer) {
    window.clearTimeout(reportToastStatusTimer);
    reportToastStatusTimer = null;
  }
  if (reportToastAutoHideTimer) {
    window.clearTimeout(reportToastAutoHideTimer);
    reportToastAutoHideTimer = null;
  }
  reportToast.classList.remove("is-visible");
  reportToastHideTimer = window.setTimeout(() => {
    reportToast.hidden = true;
    reportToastHideTimer = null;
  }, 300);
}

function showReportToast() {
  if (!reportToast) {
    return;
  }

  if (reportToastHideTimer) {
    window.clearTimeout(reportToastHideTimer);
    reportToastHideTimer = null;
  }
  if (reportToastStatusTimer) {
    window.clearTimeout(reportToastStatusTimer);
    reportToastStatusTimer = null;
  }
  if (reportToastAutoHideTimer) {
    window.clearTimeout(reportToastAutoHideTimer);
    reportToastAutoHideTimer = null;
  }

  if (reportToastIcon) {
    reportToastIcon.src = "img/Loader Field.svg";
    reportToastIcon.classList.add("is-loading");
  }
  const fileName = getReportFileName();
  if (reportToastTitle) {
    reportToastTitle.textContent = "Отчет скачивается";
  }
  if (reportToastText) {
    reportToastText.textContent = `Файл с отчетом ${fileName} в процессе загрузки`;
  }

  reportToast.hidden = false;
  requestAnimationFrame(() => {
    reportToast.classList.add("is-visible");
  });

  reportToastStatusTimer = window.setTimeout(() => {
    if (reportToastIcon) {
      reportToastIcon.src = "img/StatusSuccessIcon.svg";
      reportToastIcon.classList.remove("is-loading");
    }
    if (reportToastTitle) {
      reportToastTitle.textContent = "Отчет загружен";
    }
    if (reportToastText) {
      reportToastText.textContent = `Файл с отчетом ${fileName} успешно загружен`;
    }
    reportToastStatusTimer = null;
    reportToastAutoHideTimer = window.setTimeout(() => {
      hideReportToast();
    }, 5000);
  }, 5000);
}

rows.addEventListener("click", (event) => {
  const menuBtn = event.target.closest(".row-menu-btn");
  if (menuBtn) {
    const cell = menuBtn.closest(".actions-cell");
    const isOpen = cell.classList.contains("open");
    closeAllRowMenus();
    if (!isOpen) {
      cell.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
    }
    return;
  }

  const menuItem = event.target.closest(".row-menu-item");
  if (menuItem) {
    closeAllRowMenus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".actions-cell")) {
    closeAllRowMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (reportModal && !reportModal.hidden) {
      if (reportDatePopover && !reportDatePopover.hidden) {
        closeReportDatePopover();
        return;
      }
      closeReportModal();
      return;
    }
    closeAllRowMenus();
  }
});

sortableHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const clickedKey = header.dataset.sortKey;
    if (!clickedKey) {
      return;
    }

    if (sortState.key === clickedKey) {
      sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
      sortState.key = clickedKey;
      sortState.direction = "asc";
    }

    applySorting();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    filterQuery = event.target.value.trim().toLowerCase();
    applySorting();
  });
}

if (resetFilterBtn) {
  resetFilterBtn.addEventListener("click", () => {
    filterQuery = "";
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    statusFilter = "all";
    if (statusDropdownLabel && statusDropdownMenu) {
      statusDropdownLabel.textContent = "Все заявки";
      statusDropdownMenu.querySelectorAll(".dropdown-item").forEach((item) => {
        item.classList.toggle("active", item.dataset.statusFilter === "all");
      });
    }
    productFilter = "all";
    if (productDropdownLabel) {
      productDropdownLabel.textContent = "Все продукты";
    }
    productDropdownItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.productFilter === "all");
    });
    applySorting();
  });
}

if (productDropdown && productDropdownToggle) {
  productDropdownToggle.addEventListener("click", () => {
    const isOpen = productDropdown.classList.toggle("open");
    productDropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  productDropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      productFilter = item.dataset.productFilter || "all";
      if (productDropdownLabel) {
        productDropdownLabel.textContent = item.textContent.trim();
      }
      productDropdownItems.forEach((node) => {
        node.classList.toggle("active", node === item);
      });
      productDropdown.classList.remove("open");
      productDropdownToggle.setAttribute("aria-expanded", "false");
      applySorting();
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#product-dropdown")) {
      productDropdown.classList.remove("open");
      productDropdownToggle.setAttribute("aria-expanded", "false");
    }
    if (statusDropdown && statusDropdownToggle && !event.target.closest("#status-dropdown")) {
      statusDropdown.classList.remove("open");
      statusDropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
}

setupStatusDropdown();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchTab(tab.dataset.tab || "open");
  });
});

sideMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchSection(button.dataset.section || "deals");
  });
});

switchTab("open");
switchSection(currentSection);

if (layoutRoot && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    if (sidebarTransitionTimer) {
      return;
    }

    const isExpanded = layoutRoot.classList.contains("sidebar-expanded");

    if (!isExpanded) {
      layoutRoot.classList.add("sidebar-expanded");
      sidebarToggle.setAttribute("aria-expanded", "true");
      const showLabelsDelay = Math.max(SIDEBAR_ANIM_MS - LABEL_FADE_MS, 0);
      sidebarTransitionTimer = window.setTimeout(() => {
        layoutRoot.classList.add("sidebar-labels-visible");
        sidebarTransitionTimer = null;
      }, showLabelsDelay);
      return;
    }

    layoutRoot.classList.remove("sidebar-labels-visible");
    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarTransitionTimer = window.setTimeout(() => {
      layoutRoot.classList.remove("sidebar-expanded");
      sidebarTransitionTimer = null;
    }, LABEL_FADE_MS);
  });
}

if (reportOpenBtn) {
  reportOpenBtn.addEventListener("click", openReportModal);
}

if (reportModalCloseBtn) {
  reportModalCloseBtn.addEventListener("click", closeReportModal);
}

if (reportCancelBtn) {
  reportCancelBtn.addEventListener("click", closeReportModal);
}

if (reportModal) {
  reportModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.modalClose === "overlay") {
      closeReportModal();
    }
  });
}

if (reportRangeOptions.length > 0) {
  reportRangeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setReportRangeMode(option.dataset.rangeMode || "all");
    });
  });
}

if (reportDateStart && reportDateEnd && reportDateFromInput && reportDateToInput) {
  reportDateFromInput.value = toIsoFromDisplay(reportDateStart.textContent.trim());
  reportDateToInput.value = toIsoFromDisplay(reportDateEnd.textContent.trim());
}

if (reportDateTrigger) {
  reportDateTrigger.addEventListener("click", () => {
    if (reportRangeMode !== "custom") {
      return;
    }

    if (reportDatePopover && !reportDatePopover.hidden) {
      closeReportDatePopover();
      return;
    }

    openReportDatePopover();
  });
}

if (reportDateApplyBtn && reportDateFromInput && reportDateToInput) {
  reportDateApplyBtn.addEventListener("click", () => {
    if (reportDateFromInput.value && reportDateToInput.value && reportDateFromInput.value > reportDateToInput.value) {
      const temp = reportDateFromInput.value;
      reportDateFromInput.value = reportDateToInput.value;
      reportDateToInput.value = temp;
    }
    syncReportDateText();
    closeReportDatePopover();
  });
}

if (reportDateCancelBtn) {
  reportDateCancelBtn.addEventListener("click", () => {
    closeReportDatePopover();
  });
}

if (reportDownloadBtn) {
  reportDownloadBtn.addEventListener("click", () => {
    closeReportModal();
    showReportToast();
  });
}

if (reportToastCloseBtn) {
  reportToastCloseBtn.addEventListener("click", () => {
    hideReportToast();
  });
}

document.addEventListener("click", (event) => {
  if (!reportModal || reportModal.hidden || !reportDatePopover || reportDatePopover.hidden) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Node)) {
    return;
  }

  const clickedInsidePopover = reportDatePopover.contains(target);
  const clickedTrigger = reportDateTrigger ? reportDateTrigger.contains(target) : false;
  if (!clickedInsidePopover && !clickedTrigger) {
    closeReportDatePopover();
  }
});

setReportRangeMode("all");

applySorting();
