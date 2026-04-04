/* ========== Языковой файл ========== */

const translations = {
  pl: {
    langBtn: '🇵🇱 PL',
    backBtn: '← Wstecz',
    backBtnText: 'Wstecz',
    previewBtn: '🔍 Podgląd',
    collageBtn: '🧩 Utwórz kolaż',
    settings: 'Ustawienia',
    logoLabel: 'Logo (PNG/JPG/SVG)',
    logoSizeLabel: 'Rozmiar logo: ',
    bgShapeLabel: 'Tło pod logo:',
    circle: 'Koło',
    rectangle: 'Prostokąt',
    none: 'Brak',
    codesList: 'Lista kodów',
    code: 'Kod',
    color: 'Kolor',
    addRow: '+ Dodaj wiersz',
    downloadAll: '💾 Pobierz wszystkie PNG',
    collageHint: 'Aby utworzyć kolaż, wybierz kartę w oknie "Utwórz kolaż" (kliknij kartę).',
    gallery: 'Galeria kart',
    chooseColor: 'Wybierz kolor:',
    collageTitle: 'Kolaż A4 (4 kwadranty)',
    selected: 'Wybrane: 0/4',
    cutGapLabel: 'Strefa cięcia (mm):',
    close: '✖ Zamknij',
    collageHint2: 'Kolaż jest wyświetlany bez rozciągania, z zachowaniem proporcji.',
    reset: '🗑 Resetuj',
    savePng: '💾 Zapisz PNG',
    selectedCard: 'Wybrano',
    placeholder: 'Kod (np: F3-WMT-000-000-001)',
    deleteRow: 'Usuń wiersz',
    paletteTitle: 'Wybierz kolor z palety'
  },
  en: {
    langBtn: '🇬🇧 EN',
    backBtn: '← Back',
    backBtnText: 'Back',
    previewBtn: '🔍 Preview',
    collageBtn: '🧩 Create Collage',
    settings: 'Settings',
    logoLabel: 'Logo (PNG/JPG/SVG)',
    logoSizeLabel: 'Logo size: ',
    bgShapeLabel: 'Background shape:',
    circle: 'Circle',
    rectangle: 'Rectangle',
    none: 'None',
    codesList: 'Code List',
    code: 'Code',
    color: 'Color',
    addRow: '+ Add Row',
    downloadAll: '💾 Download All PNG',
    collageHint: 'To create a collage, select cards in the "Create Collage" window (click on card).',
    gallery: 'Card Gallery',
    chooseColor: 'Choose color:',
    collageTitle: 'A4 Collage (4 Quadrants)',
    selected: 'Selected: 0/4',
    cutGapLabel: 'Cut zone (mm):',
    close: '✖ Close',
    collageHint2: 'Collage is displayed without stretching, keeping proportions.',
    reset: '🗑 Reset',
    savePng: '💾 Save PNG',
    selectedCard: 'Selected',
    placeholder: 'Code (e.g: F3-WMT-000-000-001)',
    deleteRow: 'Delete row',
    paletteTitle: 'Select color from palette'
  },
  ua: {
    langBtn: '🇺🇦 UA',
    backBtn: '← Назад',
    backBtnText: 'Назад',
    previewBtn: '🔍 Попередній перегляд',
    collageBtn: '🧩 Створити колаж',
    settings: 'Налаштування',
    logoLabel: 'Логотип (PNG/JPG/SVG)',
    logoSizeLabel: 'Розмір логотипу: ',
    bgShapeLabel: 'Фон під логотипом:',
    circle: 'Коло',
    rectangle: 'Прямокутник',
    none: 'Немає',
    codesList: 'Список кодів',
    code: 'Код',
    color: 'Колір',
    addRow: '+ Додати рядок',
    downloadAll: '💾 Завантажити всі PNG',
    collageHint: 'Щоб створити колаж, виберіть картки у вікні "Створити колаж" (клікніть по картці).',
    gallery: 'Галерея карток',
    chooseColor: 'Виберіть колір:',
    collageTitle: 'Колаж А4 (4 квадранти)',
    selected: 'Вибрано: 0/4',
    cutGapLabel: 'Зона різання (мм):',
    close: '✖ Закрити',
    collageHint2: 'Колаж відображається без розтягування, з збереженням пропорцій.',
    reset: '🗑 Скинути',
    savePng: '💾 Зберегти PNG',
    selectedCard: 'Вибрано',
    placeholder: 'Код (наприклад: F3-WMT-000-000-001)',
    deleteRow: 'Видалити рядок',
    paletteTitle: 'Вибрати колір з палітри'
  }
};

// Список языков с названиями для отображения в dropdown
const languages = [
  { code: 'pl', name: 'Polski', flag: 'pl' },
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'ua', name: 'Українська', flag: 'ua' }
];

let currentLang = localStorage.getItem('qrLang') || 'pl';
let langDropdownOpen = false;

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('qrLang', lang);
  document.documentElement.lang = lang;
  
  // Обновляем кнопку языка (используем flag-icons)
  const langBtn = document.getElementById('langBtn');
  const langInfo = languages.find(l => l.code === lang);
  if (langInfo) {
    langBtn.innerHTML = `<span class="fi fi-${langInfo.flag}" style="margin-right:6px"></span>${langInfo.code.toUpperCase()}`;
  }
  
  // Обновляем тексты
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  
  // Обновляем placeholder
  const codeInput = document.querySelector('#codeTable tbody input[type="text"]');
  if (codeInput && translations[lang].placeholder) {
    codeInput.placeholder = translations[lang].placeholder;
}

  
  // Обновляем select options
  document.querySelectorAll('#bgShape option').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (key && translations[lang][key]) {
      opt.textContent = translations[lang][key];
    }
  });
  
  // Обновляем popup палитры
  const palTitle = document.querySelector('#paletteTemplate .pal-title');
  if (palTitle) {
    palTitle.textContent = translations[lang].chooseColor + ':';
  }
  
  // Обновляем информацию о выбранных карточках
  updateSelectedInfo();
  
  // Перерисовываем picker если он есть
  if (typeof renderPicker === 'function') {
    renderPicker();
  }
  
  // Обновляем lightbox
  const lbClose = document.querySelector('.lb-close');
  if (lbClose) lbClose.textContent = '✕';
  
  // Обновляем active состояние в dropdown
  updateDropdownActive();
}

function toggleLanguageDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('langDropdown');
  langDropdownOpen = !langDropdownOpen;
  
  if (langDropdownOpen) {
    dropdown.classList.add('show');
  } else {
    dropdown.classList.remove('show');
  }
}

function closeLanguageDropdown() {
  const dropdown = document.getElementById('langDropdown');
  langDropdownOpen = false;
  if (dropdown) dropdown.classList.remove('show');
}

function selectLanguage(langCode) {
  setLanguage(langCode);
  closeLanguageDropdown();
}

function updateDropdownActive() {
  const items = document.querySelectorAll('.lang-dropdown-item');
  items.forEach(item => {
    if (item.dataset.lang === currentLang) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function t(key) {
  return translations[currentLang][key] || key;
}

// Функция для обновления информации о выбранных карточках
function updateSelectedInfo() {
  const count = typeof selectedSet !== 'undefined' ? selectedSet.size : 0;
  const text = t('selected').replace('0', count).replace('4', '4');
  const infoEl = document.getElementById('selectedInfo');
  if (infoEl) {
    const langKey = currentLang === 'pl' ? 'Wybrane: ' : 
                    currentLang === 'en' ? 'Selected: ' : 
                    'Вибрано: ';
    infoEl.textContent = langKey + count + '/4';
  }
}

// Экспорт для использования в основном файле
if (typeof window !== 'undefined') {
  window.translations = translations;
  window.languages = languages;
  window.currentLang = currentLang;
  window.setLanguage = setLanguage;
  window.toggleLanguageDropdown = toggleLanguageDropdown;
  window.closeLanguageDropdown = closeLanguageDropdown;
  window.selectLanguage = selectLanguage;
  window.t = t;
  window.updateSelectedInfo = updateSelectedInfo;
}

// Закрыть dropdown при клике вне его
document.addEventListener('click', function(e) {
  if (langDropdownOpen && !e.target.closest('.lang-dropdown-wrapper')) {
    closeLanguageDropdown();
  }
});
