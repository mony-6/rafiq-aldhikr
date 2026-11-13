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

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('[data-no-sparkles="true"]')) return;
  sparkle(e.clientX, e.clientY, 6);
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
