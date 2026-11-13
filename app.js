
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

// رسائل الطمأنينة
const dailyMessages = [
  'ألا بذكر الله تطمئن القلوب',
  'استغفر الله، فبالاستغفار تنشرح الصدور',
  'اللهم اجعل القرآن ربيع قلوبنا',
  'سبحان الله وبحمده، سبحان الله العظيم',
  'اللهم ارزقنا راحة البال وطمأنينة القلب'
];

const messageElement = $('#dailyMessage');
if (messageElement) {
  messageElement.textContent =
    dailyMessages[new Date().getDate() % dailyMessages.length];
}

// التنبيهات
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// النجوم
const starsContainer = $('#introSparkles');

if (starsContainer && !starsContainer.children.length) {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
  }
}

// تأثير اللمس
document.addEventListener('pointerdown', (event) => {
  const sparkle = document.createElement('span');
  sparkle.className = 'touch-sparkle';
  sparkle.style.left = event.clientX + 'px';
  sparkle.style.top = event.clientY + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
});

// تغيير المظهر
const themePanel = $('#themePanel');
const themeBtn = $('#themeBtn');
const closeTheme = $('#closeTheme');
const resetTheme = $('#resetTheme');

if (themeBtn && themePanel) {
  themeBtn.addEventListener('click', () => {
    themePanel.hidden = false;
  });
}

if (closeTheme && themePanel) {
  closeTheme.addEventListener('click', () => {
    themePanel.hidden = true;
  });
}

document.querySelectorAll('[data-theme-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rafiqTheme', theme);
    if (themePanel) themePanel.hidden = true;
    showToast('تم تغيير المظهر');
  });
});

if (resetTheme) {
  resetTheme.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'green');
    localStorage.setItem('rafiqTheme', 'green');
    if (themePanel) themePanel.hidden = true;
    showToast('تمت إعادة المظهر');
  });
}

const savedTheme = localStorage.getItem('rafiqTheme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// أسماء سور القرآن الكريم
const surahs = [
'الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف',
'الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر',
'النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون',
'النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم',
'لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر',
'غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف',
'محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر',
'الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف',
'الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم',
'الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة',
'الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار',
'المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر',
'البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر',
'البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة',
'الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد',
'الإخلاص','الفلق','الناس'
];

// صفحة القرآن
const quranPage = $('#quranPage');
const mainPage = $('main');
const quranBack = $('#quranBack');
const surahList = $('#surahList');
const surahSearch = $('#surahSearch');

function renderSurahs(filter = '') {
  if (!surahList) return;

  surahList.innerHTML = '';

  surahs.forEach((name, index) => {
    if (!name.includes(filter)) return;

    const item = document.createElement('button');
    item.className = 'surah-item';
    item.type = 'button';

    const number = document.createElement('span');
    number.className = 'surah-number';
    number.textContent = index + 1;

    const title = document.createElement('span');
    title.className = 'surah-name';
    title.textContent = name;

    const icon = document.createElement('span');
    icon.className = 'surah-icon';
    icon.textContent = '۞';

    item.append(number, title, icon);

    item.addEventListener('click', () => {
      showToast('اخترتِ سورة ' + name);
    });

    surahList.appendChild(item);
  });
}

function openQuran() {
  if (mainPage) mainPage.hidden = true;
  if (quranPage) quranPage.hidden = false;
  if (surahSearch) surahSearch.value = '';
  renderSurahs();
  window.scrollTo(0, 0);
}

function closeQuran() {
  if (quranPage) quranPage.hidden = true;
  if (mainPage) mainPage.hidden = false;
  window.scrollTo(0, 0);
}

if (quranBack) {
  quranBack.addEventListener('click', closeQuran);
}

if (surahSearch) {
  surahSearch.addEventListener('input', () => {
    renderSurahs(surahSearch.value.trim());
  });
}

renderSurahs();

// أزرار الأقسام الرئيسية والسفلية
document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;

    if (section === 'quran') {
      openQuran();
    } else {
      showToast('سيتم تجهيز هذا القسم قريبًا بإذن الله');
    }
  });
});

// زر الإعدادات
function openSettings() {
  showToast('إعدادات التطبيق');
}

const settingsBtn = $('#settingsBtn');
const navSettings = $('#navSettings');

if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
if (navSettings) navSettings.addEventListener('click', openSettings);

// تشغيل التطبيق
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.log('Service Worker:', error);
    });
  });
}
