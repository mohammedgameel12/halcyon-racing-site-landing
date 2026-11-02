// Palette preview tool — remove before launch (see README).
(function () {
  var KEY = 'halcyon-palette';
  var PALETTES = [
    { id: 'gold-midnight',    name: 'Gold & Midnight',    note: 'Classic premium (default)', sw: ['#0d1117', '#b08d57', '#f6f6f4', '#ffffff'] },
    { id: 'racing-green',     name: 'Racing Green',       note: 'Heritage, modernised',      sw: ['#0e1f17', '#1f6b4a', '#7fc4a0', '#f3f6f4'] },
    { id: 'crimson-charcoal', name: 'Crimson & Charcoal', note: 'Bold, high energy',         sw: ['#15161a', '#a3202f', '#e5707c', '#f7f5f4'] },
    { id: 'navy-blue',        name: 'Navy & Royal Blue',  note: 'Trustworthy, corporate',    sw: ['#0a1730', '#2a56c6', '#8fb0ff', '#f3f5f9'] },
    { id: 'burgundy-cream',   name: 'Burgundy & Cream',   note: 'Warm, luxurious',           sw: ['#2a0f17', '#7a1f3d', '#e0a9bb', '#f7f1e8'] },
    { id: 'mono-champagne',   name: 'Mono & Champagne',   note: 'Ultra minimal',             sw: ['#111111', '#d2b98c', '#f5f5f5', '#ffffff'] }
  ];

  function get() { try { return localStorage.getItem(KEY) || PALETTES[0].id; } catch (e) { return PALETTES[0].id; } }
  function save(id) { try { localStorage.setItem(KEY, id); } catch (e) {} }
  function apply(id) {
    if (id === PALETTES[0].id) document.documentElement.removeAttribute('data-palette');
    else document.documentElement.setAttribute('data-palette', id);
  }

  var current = get();
  apply(current);

  // Floating button
  var fab = document.createElement('button');
  fab.className = 'pal-fab'; fab.type = 'button';
  fab.setAttribute('aria-label', 'Compare colour palettes');
  fab.setAttribute('aria-haspopup', 'dialog');
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor"/><circle cx="10.5" cy="7.5" r="1" fill="currentColor"/><circle cx="15" cy="7.5" r="1" fill="currentColor"/></svg>';

  // Backdrop + drawer
  var backdrop = document.createElement('div'); backdrop.className = 'pal-backdrop';
  var drawer = document.createElement('aside');
  drawer.className = 'pal-drawer'; drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-labelledby', 'pal-title');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML =
    '<div class="pal-head"><div><h2 id="pal-title">Colour palettes</h2><p>Tap one to preview it live on every page.</p></div>' +
    '<button class="pal-close" type="button" aria-label="Close">&times;</button></div>' +
    '<div class="pal-list" role="radiogroup" aria-label="Colour palette"></div>' +
    '<div class="pal-foot">Preview tool only. Your choice is remembered in this browser. Once you decide, tell me the winner (or paste its hex values into <code>styles.css</code>) and remove this switcher.</div>';
  var list = drawer.querySelector('.pal-list');

  PALETTES.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'pal-opt'; b.setAttribute('role', 'radio'); b.dataset.id = p.id;
    b.setAttribute('aria-checked', p.id === current ? 'true' : 'false');
    b.innerHTML = '<span class="pal-sw">' + p.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>' +
      '<span><span class="pal-name">' + p.name + '</span><span class="pal-note">' + p.note + '</span></span><span class="pal-check"></span>';
    b.addEventListener('click', function () {
      current = p.id; apply(p.id); save(p.id);
      list.querySelectorAll('.pal-opt').forEach(function (o) { o.setAttribute('aria-checked', o.dataset.id === p.id ? 'true' : 'false'); });
    });
    list.appendChild(b);
  });

  function open() {
    drawer.classList.add('open'); backdrop.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    var sel = list.querySelector('[aria-checked="true"]'); if (sel) sel.focus();
  }
  function close() {
    drawer.classList.remove('open'); backdrop.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false'); fab.focus();
  }
  fab.addEventListener('click', function () { drawer.classList.contains('open') ? close() : open(); });
  backdrop.addEventListener('click', close);
  drawer.querySelector('.pal-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });

  function mount() { document.body.appendChild(backdrop); document.body.appendChild(drawer); document.body.appendChild(fab); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
