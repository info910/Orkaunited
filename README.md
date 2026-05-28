# ORKA United — Engineering Portfolio Website
# موقع اوركا المتحدة الهندسي

موقع تعريفي احترافي لشركة اوركا المتحدة الهندسية، مبني بـ HTML/CSS/JS بدون أي إطار عمل، ثنائي اللغة (عربي/إنجليزي) مع وضع ليلي.

## هيكل المشروع

```
website/
├── index.html          الصفحة الرئيسية
├── about.html          من نحن
├── services.html       الخدمات
├── projects.html       الأعمال
├── contact.html        تواصل معنا
├── css/
│   └── style.css       جميع التنسيقات
├── js/
│   ├── translations.js قاموس الترجمة
│   └── main.js         منطق الموقع
└── images/
    ├── logo.svg        الشعار الأصلي (أسود)
    └── logo-light.svg  نسخة بيضاء للخلفيات الداكنة
```

## المميزات

- ✅ **5 صفحات كاملة** (رئيسية، من نحن، خدمات، أعمال، تواصل)
- ✅ **ثنائي اللغة** (عربي/إنجليزي) مع تبديل فوري وحفظ التفضيل
- ✅ **وضع ليلي** (Dark Mode) قابل للتبديل ومحفوظ
- ✅ **تصميم متجاوب** يعمل على جميع الأجهزة
- ✅ **نموذج تواصل ثنائي** (إيميل + واتساب)
- ✅ **أيقونة واتساب عائمة** ثابتة في كل الصفحات
- ✅ **خريطة Google Maps** مدمجة
- ✅ **عدادات إحصائيات** مع تأثير حركي
- ✅ **معرض مشاريع** مع فلتر حسب التصنيف
- ✅ **آراء العملاء** (Testimonials)
- ✅ **قسم الشركاء** (Partners)
- ✅ **زر العودة للأعلى**
- ✅ **تأثيرات Scroll Animations**
- ✅ **SEO محسّن** بميتا تاجز ومحتوى عربي

## الإعدادات قبل النشر

### 1. تفعيل إرسال نموذج التواصل عبر الإيميل

افتح ملف `js/main.js` وعدل القيمة:

```js
const CONFIG = {
  whatsapp: '966570524353',
  email: 'info@orkaunited.com',
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // استبدل YOUR_FORM_ID
  defaultLang: 'ar',
};
```

**خطوات الحصول على Formspree:**
1. اذهب إلى [formspree.io](https://formspree.io) وسجل حساب مجاني
2. أنشئ نموذج جديد New Form
3. انسخ الـ Form ID (مثل: `xpzgkqwv`)
4. الصق الرابط الكامل في `formspreeEndpoint`

> ملاحظة: إذا لم تضبط Formspree، النموذج سيفتح برنامج البريد الافتراضي تلقائياً (mailto fallback).

### 2. تحديث خريطة Google Maps

افتح `contact.html` وابحث عن `<iframe>` داخل `.map-wrapper` واستبدل الرابط بـ embed code الخاص بموقعك من Google Maps:

1. افتح Google Maps واذهب لموقع شركتك
2. اضغط Share → Embed a map → Copy HTML
3. الصق `src` داخل الـ iframe الموجود

### 3. تحديث روابط السوشيال ميديا

ابحث عن `href="#"` في الـ footer وعدلها لروابطك:
- Twitter
- Instagram
- LinkedIn

### 4. الشركاء (Partners)

في `index.html` ابحث عن `.partners-grid` واستبدل `PARTNER 01-06` بشعارات شركائك الفعلية:

```html
<div class="partner-item">
  <img src="images/partners/partner1.png" alt="اسم الشريك" />
</div>
```

ثم ضع شعارات الشركاء في مجلد `images/partners/`.

### 5. صور المشاريع

الصور الحالية هي صور تجريبية من Unsplash. لاستبدالها بصور مشاريعك الفعلية:
1. ضع صور مشاريعك في `images/projects/`
2. عدل مسار `src` في كل `<div class="project-card">`

## التشغيل المحلي

افتح أي ملف HTML مباشرة في المتصفح، أو شغل خادم محلي:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

ثم افتح: `http://localhost:8000`

## النشر

يمكن نشر الموقع على أي استضافة ثابتة مجاناً:
- **GitHub Pages** (مجاني)
- **Netlify** (مجاني، يدعم Formspree)
- **Vercel** (مجاني)
- **Cloudflare Pages** (مجاني)
- أي استضافة عادية (FTP)

ببساطة ارفع كامل مجلد `website/` كما هو.

## معلومات التواصل المضمنة

- 📱 **واتساب:** +966 57 052 4353
- 📧 **الإيميل:** info@orkaunited.com
- 🗺️ **الموقع:** [Google Maps](https://maps.app.goo.gl/1x4m9xDCoMvPDGD19)

## الألوان المستخدمة

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| أسود فحمي | `#0a0a0a` | اللون الأساسي |
| أبيض | `#ffffff` | الخلفية الرئيسية |
| ذهبي ملكي | `#c9a961` | اللون المميز (Accent) |
| رمادي معدني | `#6b7280` | النصوص الثانوية |
| بيج فاتح | `#f5f0e8` | خلفيات الأقسام |

---

تم بناؤه بـ ❤️ لشركة ORKA United
