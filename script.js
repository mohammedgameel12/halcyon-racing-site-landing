// Halcyon Racing — tiny, dependency-free JS
(function () {
  // Footer year
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Fade-in on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Enquiry form: validate + send without leaving the page
  var form = document.getElementById('enquiry-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      var phoneOk = phone.replace(/[^\d]/g, '').length >= 7;
      if (!name || !emailOk || !phoneOk) {
        show('Please enter your name, a valid email and a phone number.', true);
        return;
      }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      fetch(form.action, {
        method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          show('Thank you. Your enquiry has been received and we’ll be in touch shortly.', false);
        } else { throw new Error('bad response'); }
      }).catch(function () {
        show('Sorry, something went wrong. Please email us directly at hello@yourdomain.com.', true);
      }).finally(function () {
        btn.disabled = false; btn.textContent = 'Enquire to Join →';
      });
    });
  }
  function show(msg, isError) {
    status.textContent = msg;
    status.className = 'form-status is-visible' + (isError ? ' is-error' : '');
  }
})();
