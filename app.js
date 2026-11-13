const $ = (s) => document.querySelector(s);

const date = new Intl.DateTimeFormat('ar-EG', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date());

$('#todayDate').textContent = date;

const intro = $('#introSparkles');

for (let i = 0; i < 120; i++) {
  const star = document.createElement('i');
  star.className = 'rain-star';
  star.style.left = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 0.9 + 's';
  star.style.animationDuration = 1.6 + Math.random() * 1.1 + 's';
  intro.appendChild(star);
}

function sparkle(x, y, count = 7) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('i');
    s.className = 'spark';
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 19;
    s.style.left = x + Math.cos(angle) * radius + 'px';
    s.style.top = y + Math.sin(angle) * radius + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 850);
  }
}

const cardStarStyle = document.createElement('style');

cardStarStyle.textContent = `
.menu-card.star-tap,
.daily-card.star-tap,
.prayer-card.star-tap {
  position: relative;
  isolation: isolate;
  overflow: visible !important;
  box-shadow:
    0 0 12px #ffffff,
    0 0 25px #ffe45c,
    0 0 40px #ffb700,
    0 0 55px #00ffc3 !important;
  animation: cardLightBurst 1s ease-out;
}

.tap-star {
  position: absolute;
  z-index: 20;
  color: #fff;
  font-size: 19px;
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
  35% { filter: brightness(2.2); transform: scale(1.025); }
  100% { filter: brightness(1); transform: scale(1); }
}

@keyframes tapStarFlash {
  0% { opacity: 0; transform: scale(.2) rotate(0deg); }
  25% { opacity: 1; transform: scale(1.7) rotate(90deg); }
  100% { opacity: 0; transform: scale(.3) rotate(220deg); }
}
`;

document.head.appendChild(cardStarStyle);

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('[data-no-sparkles="true"]')) return;

  sparkle(e.clientX, e.clientY, 10);

  const card = e.target.closest(
    '.menu-card, .daily-card, .prayer-card'
  );

  if (!card) return;

  card.classList.remove('star-tap');
  card.querySelectorAll('.tap-star').forEach(star => star.remove());

  void card.offsetWidth;
  card.classList.add('star-tap');

  for (let i = 0; i < 32; i++) {
    const star = document.createElement('span');
    star.className = 'tap-star';
    star.textContent = Math.random() > .5 ? '✦' : '✧';

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

    star.style.animationDelay = Math.random() * .25 + 's';
    card.appendChild(star);

    setTimeout(() => star.remove(), 1400);
  }

  setTimeout(() => card.classList.remove('star-tap'), 1100);
});


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

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2300);
}

document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.section;
    showToast('سنجهّز قسم «' + (labels[key] || 'الإعدادات') + '» في المرحلة التالية');
  });
});

$('#settingsBtn').addEventListener('click', () => {
  showToast('الإعدادات سنضيفها في المرحلة التالية');
});

$('#navSettings').addEventListener('click', () => {
  showToast('الإعدادات سنضيفها في المرحلة التالية');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
