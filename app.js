
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

// رسائل نفحة الطمأنينة اليومية
const dailyMessages = [
  ['﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾', 'سورة الرعد · الآية ٢٨'],
  ['﴿فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾', 'سورة الشرح · الآيتان ٥–٦'],
  ['﴿لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾', 'سورة التوبة · الآية ٤٠'],
  ['﴿وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ﴾', 'سورة الطلاق · الآية ٣'],
  ['﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾', 'سورة طه · الآية ١١٤'],
  ['﴿إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾', 'سورة البقرة · الآية ١٥٣'],
  ['﴿ادْعُونِي أَسْتَجِبْ لَكُمْ﴾', 'سورة غافر · الآية ٦٠'],
  ['﴿وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ﴾', 'سورة يوسف · الآية ٨٧'],
  ['﴿إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ﴾', 'سورة هود · الآية ٦١'],
  ['﴿رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي﴾', 'سورة طه · الآيتان ٢٥–٢٦'],
  ['﴿رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ﴾', 'سورة البقرة · الآية ٢٠١'],
  ['﴿وَهُوَ أَرْحَمُ الرَّاحِمِينَ﴾', 'سورة يوسف · الآية ٦٤'],
  ['﴿وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ﴾', 'سورة الأعراف · الآية ١٥٦'],
  ['﴿حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ﴾', 'سورة آل عمران · الآية ١٧٣']
];

const dailyMessage = $('#dailyMessage');
const dailySource = document.querySelector('.daily-source');

if (dailyMessage && dailySource) {
  const now = new Date();
  const dayNumber = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
  );
  const message = dailyMessages[
    ((dayNumber % dailyMessages.length) + dailyMessages.length) % dailyMessages.length
  ];

  dailyMessage.textContent = message[0];
  dailySource.textContent = message[1];
}

// رسائل التنبيه
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 2300);
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

// تأثير الإضاءة والنجوم
const starStyle = document.createElement('style');

starStyle.textContent = `
.menu-card.star-tap,
.daily-card.star-tap,
.prayer-card.star-tap {
  position: relative;
  isolation: isolate;
  overflow: visible !important;
  box-shadow: 0 0 15px #ffe8a3, 0 0 30px #d9ae52, 0 0 45px #b8860b !important;
  animation: cardLightBurst 1s ease-out;
}

.tap-star {
  position: absolute;
  z-index: 30;
  color: #fff;
  font-size: 20px;
  pointer-events: none;
  text-shadow: 0 0 5px #fff, 0 0 12px #ffe45c, 0 0 22px #ffae00, 0 0 30px #00ffc3;
  animation: tapStarFlash 1s ease-out forwards;
}

@keyframes cardLightBurst {
  0% { transform: scale(1); box-shadow: 0 0 8px #d9ae52; }
  50% { transform: scale(1.015); box-shadow: 0 0 15px #ffe8a3, 0 0 30px #d9ae52, 0 0 45px #b8860b; }
  100% { transform: scale(1); }
}

@keyframes tapStarFlash {
  0% { opacity: 0; transform: scale(.2) rotate(0deg); }
  25% { opacity: 1; transform: scale(1.7) rotate(90deg); }
  100% { opacity: 0; transform: scale(.3) rotate(220deg); }
}

.settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.settings-box {
  width: 100%;
  max-width: 430px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--bg, #f6f3e9);
  color: var(--main, #123f32);
  border: 2px solid var(--accent, #d9ae52);
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 0 30px rgba(255,210,80,.4);
}

.settings-box h2 { text-align: center; margin-top: 0; }
.setting-item { padding: 14px 0; border-bottom: 1px solid rgba(150,150,150,.3); }
.setting-item label { display: block; margin-bottom: 10px; font-weight: bold; }
.setting-item select {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--accent, #d9ae52);
  background: var(--bg, #fff);
  color: inherit;
  font-size: 16px;
}
.setting-item input { width: 22px; height: 22px; vertical-align: middle; }
.settings-action {
  width: 100%;
  padding: 13px;
  margin-top: 12px;
  border: 0;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.settings-save { background: var(--main, #123f32); color: white; }
.settings-reset { background: #eee2c5; color: #493718; }
.settings-close { background: #777; color: white; }
`;

document.head.appendChild(starStyle);

// الضغط والنجوم حول الخانات
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('[data-no-sparkles="true"]')) return;

  sparkle(event.clientX, event.clientY, 8);

  const card = event.target.closest('.menu-card, .daily-card, .prayer-card');
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

// الألوان السبعة
const themeBtn = $('#themeBtn');
const themePanel = $('#themePanel');
const closeTheme = $('#closeTheme');
const resetTheme = $('#resetTheme');
const themeOptions = document.querySelectorAll('[data-theme-choice]');

const themes = ['green', 'pink', 'blue', 'purple', 'black', 'mint', 'blackgold'];

function applyTheme(theme) {
  const selectedTheme = themes.includes(theme) ? theme : 'green';
  document.body.dataset.theme = selectedTheme;

  themeOptions.forEach(button => {
    const isSelected = button.dataset.themeChoice === selectedTheme;
    button.classList.toggle('active', isSelected);
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  try {
    localStorage.setItem('rafiqTheme', selectedTheme);
  } catch (error) {}
}

let savedTheme = 'green';

try {
  savedTheme = localStorage.getItem('rafiqTheme') || 'green';
} catch (error) {}

applyTheme(savedTheme);

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

themeOptions.forEach(button => {
  button.addEventListener('click', () => {
    applyTheme(button.dataset.themeChoice);
    showToast('تم اختيار المظهر الجديد ✨');
    if (themePanel) themePanel.hidden = true;
  });
});

if (resetTheme) {
  resetTheme.addEventListener('click', () => {
    applyTheme('green');
    showToast('تمت إعادة المظهر الافتراضي');
    if (themePanel) themePanel.hidden = true;
  });
}

if (themePanel) {
  themePanel.addEventListener('click', event => {
    if (event.target === themePanel) themePanel.hidden = true;
  });
}

// حجم الخط
function applyFontSize(size) {
  const sizes = {
    normal: '16px',
    large: '18px',
    larger: '20px'
  };

  document.documentElement.style.fontSize = sizes[size] || sizes.normal;
}

try {
  applyFontSize(localStorage.getItem('appFontSize') || 'normal');
} catch (error) {
  applyFontSize('normal');
}

// شاشة الإعدادات
function openSettings() {
  if (document.querySelector('.settings-overlay')) return;

  let reminderOn = true;
  let reminderTime = '15';
  let fontSize = 'normal';

  try {
    reminderOn = localStorage.getItem('reminderOn') !== 'false';
    reminderTime = localStorage.getItem('reminderTime') || '15';
    fontSize = localStorage.getItem('appFontSize') || 'normal';
  } catch (error) {}

  const overlay = document.createElement('div');
  overlay.className = 'settings-overlay';

  overlay.innerHTML = `
    <div class="settings-box" role="dialog" aria-modal="true">
      <h2>⚙️ إعدادات رفيق الذكر</h2>

      <div class="setting-item">
        <label for="reminderToggle">🔔 تفضيلات التذكير</label>
        <input id="reminderToggle" type="checkbox" ${reminderOn ? 'checked' : ''}>
        <span>تفعيل التذكيرات</span>
      </div>

      <div class="setting-item">
        <label for="reminderInterval">⏰ الفاصل الزمني المفضل</label>
        <select id="reminderInterval">
          <option value="15">كل 15 دقيقة</option>
          <option value="30">كل 30 دقيقة</option>
          <option value="60">كل ساعة</option>
        </select>
      </div>

      <div class="setting-item">
        <label for="fontSizeSelect">🔤 حجم الخط</label>
        <select id="fontSizeSelect">
          <option value="normal">عادي</option>
          <option value="large">كبير</option>
          <option value="larger">كبير جدًا</option>
        </select>
      </div>

      <button class="settings-action settings-save" id="saveSettings">حفظ الإعدادات</button>
      <button class="settings-action settings-reset" id="settingsReset">إعادة المظهر الافتراضي</button>
      <button class="settings-action settings-close" id="closeSettings">إغلاق</button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#reminderInterval').value = reminderTime;
  overlay.querySelector('#fontSizeSelect').value = fontSize;

  overlay.querySelector('#saveSettings').addEventListener('click', () => {
    const enabled = overlay.querySelector('#reminderToggle').checked;
    const interval = overlay.querySelector('#reminderInterval').value;
    const size = overlay.querySelector('#fontSizeSelect').value;

    try {
      localStorage.setItem('reminderOn', String(enabled));
      localStorage.setItem('reminderTime', interval);
      localStorage.setItem('appFontSize', size);
    } catch (error) {}

    applyFontSize(size);
    overlay.remove();
    showToast('تم حفظ تفضيلاتك بنجاح ✨');
  });

  overlay.querySelector('#settingsReset').addEventListener('click', () => {
    applyTheme('green');
    showToast('تمت إعادة المظهر الافتراضي');
  });

  overlay.querySelector('#closeSettings').addEventListener('click', () => {
    overlay.remove();
  });

  overlay.addEventListener('click', event => {
    if (event.target === overlay) overlay.remove();
  });
}

// أزرار الإعدادات
const settingsBtn = $('#settingsBtn');
const navSettings = $('#navSettings');

if (settingsBtn) {
  settingsBtn.addEventListener('click', openSettings);
}

if (navSettings) {
  navSettings.addEventListener('click', openSettings);
}

// أسماء سور القرآن الكريم
const surahs = [
  'الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام',
  'الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد',
  'إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه',
  'الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء',
  'النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب',
  'سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت',
  'الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد',
  'الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر',
  'الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة',
  'الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم',
  'الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل',
  'المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات',
  'عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج',
  'الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس',
  'الليل','الضحى','الشرح','التين','العلق','القدر','البينة',
  'الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة',
  'الفيل','قريش','الماعون','الكوثر','الكافرون','النصر',
  'المسد','الإخلاص','الفلق','الناس'
];

// عرض أسماء السور
const surahList = $('#surahList');
const surahSearch = $('#surahSearch');

function renderSurahs(searchText = '') {
  if (!surahList) return;

  const search = searchText.trim().toLowerCase();

  const filtered = surahs
    .map((name, index) => ({ name, number: index + 1 }))
    .filter(item => item.name.includes(search));

  if (!filtered.length) {
    surahList.innerHTML = '<div class="surah-empty">لا توجد سورة بهذا الاسم</div>';
    return;
  }

  surahList.innerHTML = filtered.map(item => `
    <button class="surah-item" type="button" data-surah-number="${item.number}">
      <span class="surah-number">${item.number}</span>
      <span class="surah-info">
        <strong>${item.name}</strong>
        <small>سورة رقم ${item.number}</small>
      </span>
      <span aria-hidden="true">❯</span>
    </button>
  `).join('');
}

renderSurahs();

if (surahSearch) {
  surahSearch.addEventListener('input', () => {
    renderSurahs(surahSearch.value);
  });
}

// فتح صفحة القرآن والرجوع
const quranPage = $('#quranPage');
const quranBack = $('#quranBack');
const homeMain = document.querySelector('main');

function openQuranPage() {
  if (!quranPage) {
    showToast('صفحة القرآن غير موجودة في index.html');
    return;
  }

  if (homeMain) homeMain.hidden = true;
  quranPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeQuranPage() {
  if (!quranPage) return;

  quranPage.hidden = true;
  if (homeMain) homeMain.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (quranBack) {
  quranBack.addEventListener('click', closeQuranPage);
}

document.querySelectorAll('[data-section="quran"]').forEach(button => {
  button.addEventListener('click', openQuranPage);
});

// اختيار سورة
if (surahList) {
  surahList.addEventListener('click', event => {
    const button = event.target.closest('[data-surah-number]');
    if (!button) return;

    const number = Number(button.dataset.surahNumber);
    const name = surahs[number - 1];

    showToast(`اخترتِ سورة ${name} ✨`);
  });
}

// تشغيل التطبيق
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
