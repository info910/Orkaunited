/* ORKA United — Main JS
   Handles: language toggle, dark mode, mobile menu, scroll animations,
   counters, form submission (email + WhatsApp), back-to-top
*/

const CONFIG = {
  whatsapp: '966570524353',
  email: 'info@orkaunited.com',
  formspreeEndpoint: 'https://formspree.io/f/mzdwyjae',
  defaultLang: 'ar',
};

// ============ Language Switching ============
function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
}

function setLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('orka-lang', lang);

  applyTranslations(lang);

  const switcher = document.querySelector('.lang-toggle');
  if (switcher) switcher.textContent = lang === 'ar' ? 'EN' : 'ع';
}

function initLanguage() {
  const stored = localStorage.getItem('orka-lang') || CONFIG.defaultLang;
  setLanguage(stored);

  const toggle = document.querySelector('.lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.lang || 'ar';
      setLanguage(current === 'ar' ? 'en' : 'ar');
    });
  }
}

// ============ Dark Mode ============
function initTheme() {
  const stored = localStorage.getItem('orka-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('orka-theme', next);
    });
  }
}

// ============ Mobile Menu ============
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

// ============ Header Scroll Effect ============
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const update = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// ============ Reveal on Scroll ============
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  items.forEach((el) => obs.observe(el));
}

// ============ Counter Animation ============
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => obs.observe(c));
}

// ============ Back to Top ============
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ Project Filter ============
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

// ============ Contact Form ============
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgEl = form.querySelector('.form-message');
  const showMessage = (text, type) => {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.className = 'form-message ' + type;
    setTimeout(() => { msgEl.className = 'form-message'; }, 6000);
  };

  const collectData = () => ({
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim(),
  });

  const validate = (data) => {
    if (!data.name || !data.email || !data.message) return false;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRe.test(data.email);
  };

  // Email submission via Formspree
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = collectData();
    const lang = document.documentElement.lang || 'ar';
    const dict = TRANSLATIONS[lang];

    if (!validate(data)) {
      showMessage(dict['form.error'], 'error');
      return;
    }

    // If Formspree is not yet configured, fallback to mailto
    if (CONFIG.formspreeEndpoint.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent('رسالة من موقع ORKA United - ' + data.name);
      const body = encodeURIComponent(
        `الاسم: ${data.name}\nالإيميل: ${data.email}\nالجوال: ${data.phone}\nالخدمة: ${data.service}\n\n${data.message}`
      );
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
      showMessage(dict['form.success'], 'success');
      form.reset();
      return;
    }

    try {
      const response = await fetch(CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        showMessage(dict['form.success'], 'success');
        form.reset();
      } else {
        showMessage(dict['form.error'], 'error');
      }
    } catch {
      showMessage(dict['form.error'], 'error');
    }
  });

  // WhatsApp submission
  const waBtn = form.querySelector('.btn-whatsapp');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = collectData();
      const lang = document.documentElement.lang || 'ar';
      const dict = TRANSLATIONS[lang];
      if (!data.name || !data.message) {
        showMessage(dict['form.error'], 'error');
        return;
      }

      const lines = lang === 'ar'
        ? [
            'السلام عليكم، أنا ' + data.name,
            data.email ? 'الإيميل: ' + data.email : '',
            data.phone ? 'الجوال: ' + data.phone : '',
            data.service ? 'الخدمة: ' + data.service : '',
            '',
            data.message,
          ]
        : [
            'Hello, my name is ' + data.name,
            data.email ? 'Email: ' + data.email : '',
            data.phone ? 'Phone: ' + data.phone : '',
            data.service ? 'Service: ' + data.service : '',
            '',
            data.message,
          ];
      const text = encodeURIComponent(lines.filter(Boolean).join('\n'));
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${text}`, '_blank');
    });
  }
}

// ============ Active Nav Link ============
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

// ============ Year ============
function setYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ============ Init ============
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initMobileMenu();
  initHeaderScroll();
  initReveal();
  initCounters();
  initBackToTop();
  initProjectFilter();
  initContactForm();
  initActiveNav();
  setYear();
});
