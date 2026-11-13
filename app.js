
const $ = (selector) => document.querySelector(selector);

// التاريخ
const dateElement = $('#todayDate');

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());
}

// رسائل التنبيه
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2300);
}

// نجوم الافتتاح
const intro = $('#introSparkles');

if (intro) {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('i');
    star.className = 'rain-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 1.2 + 's';
    star.style.animationDuration = 1.8 + Math.random() * 1.5 + 's';

    intro.appendChild(star);
    setTimeout(() => star.remove(), 4000);
  }
}

// تأثير النجوم عند الضغط
function sparkle(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('i');
    star.className = 'spark';
    star.textContent = Math.random() > 0.5 ? '✦' : '✧';
    star.style.left = (x + Math.random() * 70 - 35) + 'px';
    star.style.top = (y + Math.random() * 70 - 35) + 'px';

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 900);
  }
}

// تأثير الإضاءة والنجوم حول الخانات
const starStyle = document.createElement('style');

starStyle.textContent = `
.menu-card.star-tap,
.daily-card.star-tap,
.prayer-card.star-tap {
  position: relative;
  isolation: isolate;
  overflow: visible !important;
  box-shadow:
    0 0 12px #fff,
    0 0 25px #ffe45c,
    0 0 40px #ffb700,
    0 0 55px #00ffc3 !important;
  animation: cardLightBurst 1s ease-out;
}

.tap-star {
  position: absolute;
  z-index: 30;
  color: #fff;
  font-size: 20px;
  pointer-events: none;
  text-shadow:
    0 0 5px #fff,
    0 0 12px #ffe45c,
    0 0 22px #ffae00,
    0 0 30px #00ffc3;
  animation: tapStarFlash 1s ease-out forwards;
}

@keyframes cardLightBurst {
  0% { filter: brightness(1); }
  35% { filter: brightness(2); transform: scale(1.025); }
  100% { filter: brightness(1); transform: scale(1); }
}

@keyframes tapStarFlash {
  0% { opacity: 0; transform: scale(.2) rotate(0deg); }
  25% { opacity: 1; transform: scale(1.7) rotate(90deg); }
  100% { opacity: 0; transform: scale(.3) rotate(220deg); }
}
`;

document.head.appendChild(starStyle);

// الضغط والنجوم حول الخانات
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('[data-no-sparkles="true"]')) return;

  sparkle(event.clientX, event.clientY, 8);

  const card = event.target.closest(
    '.menu-card, .daily-card, .prayer-card'
  );

  if (!card) return;

  card.classList.remove('star-tap');
  card.querySelectorAll('.tap-star').forEach(star => star.remove());

  void card.offsetWidth;
  card.classList.add('star-tap');

  for (let i = 0; i < 28; i++) {
    const star = document.createElement('span');
    star.className = 'tap-star';
    star.textContent = Math.random() > 0.5 ? '✦' : '✧';

    const side = i % 4;
    const position = Math.random() * 100;

    if (side === 0) {
      star.style.left = position + '%';
      star.style.top = '-13px';
    } else if (side === 1) {
      star.style.left = '100%';
      star.style.top = position + '%';
    } else if (side === 2) {
      star.style.left = position + '%';
      star.style.top = '100%';
    } else {
      star.style.left = '-13px';
      star.style.top = position + '%';
    }

    star.style.animationDelay = Math.random() * 0.25 + 's';
    card.appendChild(star);

    setTimeout(() => star.remove(), 1400);
  }

  setTimeout(() => card.classList.remove('star-tap'), 1100);
});

// أسماء الأقسام
const labels = {
  quran: 'القرآن الكريم',
  adhkar: 'الأذكار',
  tasbih: 'المسبحة الإلكترونية',
  comfort: 'رسائل الطمأنينة',
  recitation: 'تسميع القرآن',
  listen: 'استمع وافهم',
  achievements: 'إنجازاتي',
  daily: 'كنز اليوم وتحدي الخير',
  favorites: 'مفضلتي',
  friday: 'تذكيرات الجمعة'
};

// الأقسام
document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.section;
    showToast(
      'سنجهّز قسم «' + (labels[key] || 'القسم') + '» في المرحلة التالية'
    );
  });
});

// الألوان الستة
const themeBtn = $('#themeBtn');
const themePanel = $('#themePanel');
const closeTheme = $('#closeTheme');
const resetTheme = $('#resetTheme');
const themeOptions = document.querySelectorAll('[data-theme-choice]');

const themes = ['green', 'pink', 'blue', 'purple', 'black', 'mint'];

function applyTheme(theme) {
  const selectedTheme = themes.includes(theme) ? theme : 'green';

  document.body.dataset.theme = selectedTheme;

  themeOptions.forEach(button => {
    const isSelected =
      button.dataset.themeChoice === selectedTheme;

    button.classList.toggle('active', isSelected);
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  try {
    localStorage.setItem('rafiqTheme', selectedTheme);
  } catch (error) {
    // يستمر التطبيق حتى لو تعذر الحفظ
  }
}

// استعادة اللون المحفوظ
let savedTheme = 'green';

try {
  savedTheme = localStorage.getItem('rafiqTheme') || 'green';
} catch (error) {}

applyTheme(savedTheme);

// فتح نافذة الألوان
if (themeBtn && themePanel) {
  themeBtn.addEventListener('click', () => {
    themePanel.hidden = false;
  });
}

// إغلاق نافذة الألوان
if (closeTheme && themePanel) {
  closeTheme.addEventListener('click', () => {
    themePanel.hidden = true;
  });
}

// اختيار لون
themeOptions.forEach(button => {
  button.addEventListener('click', () => {
    applyTheme(button.dataset.themeChoice);
    showToast('تم اختيار المظهر الجديد ✨');

    if (themePanel) {
      themePanel.hidden = true;
    }
  });
});

// إعادة المظهر الافتراضي
if (resetTheme) {
  resetTheme.addEventListener('click', () => {
    applyTheme('green');
    showToast('تمت إعادة المظهر الافتراضي');

    if (themePanel) {
      themePanel.hidden = true;
    }
  });
}

// إغلاق النافذة عند الضغط خارج الصندوق
if (themePanel) {
  themePanel.addEventListener('click', event => {
    if (event.target === themePanel) {
      themePanel.hidden = true;
    }
  });
}

// الإعدادات مؤقتًا
const settingsBtn = $('#settingsBtn');

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    showToast('الإعدادات سنضيفها في المرحلة التالية');
  });
}

const navSettings = $('#navSettings');

if (navSettings) {
  navSettings.addEventListener('click', () => {
    showToast('الإعدادات سنضيفها في المرحلة التالية');
  });
}

// تشغيل التطبيق
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
