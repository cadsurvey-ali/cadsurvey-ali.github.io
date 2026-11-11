/* CAD & SURVEY website — By Eng. Ali */
(function () {
  var C = window.CS_CONFIG || {}, I = window.I18N || {}, D = document, root = D.documentElement;
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- analytics ---------- */
  function track(name, params) { try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {} }
  if (C.GA_ID) {
    var g = D.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.GA_ID; D.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', C.GA_ID);
  }
  D.addEventListener('click', function (e) {
    var t = e.target.closest('[data-track]'); if (t) track(t.getAttribute('data-track'), { lang: lang, page: location.pathname });
  });

  /* ---------- theme ---------- */
  function setTheme(t, save) { root.setAttribute('data-theme', t); if (save) store('cs_theme', t); $$('[data-theme-label]').forEach(function (b) { b.textContent = tr(t === 'light' ? 'ui.toDark' : 'ui.toLight'); }); }
  var th = store('cs_theme');
  if (th !== 'dark' && th !== 'light') { th = 'dark'; try { if (matchMedia('(prefers-color-scheme: light)').matches) th = 'light'; } catch (e) {} }

  /* ---------- language ---------- */
  var lang = store('cs_lang');
  if (!I[lang]) { var n = (navigator.language || '').toLowerCase(); lang = n.indexOf('ar') === 0 ? (n.indexOf('iq') > -1 ? 'iq' : 'ar') : 'en'; }
  function tr(k) { return (I[lang] && I[lang][k] != null) ? I[lang][k] : (I.ar && I.ar[k] != null ? I.ar[k] : ''); }
  function setLang(l, save) {
    lang = I[l] ? l : 'ar';
    if (save) { store('cs_lang', lang); track('language', { to: lang }); }
    root.lang = lang === 'iq' ? 'ar-IQ' : lang; root.dir = lang === 'en' ? 'ltr' : 'rtl';
    $$('[data-t]').forEach(function (el) { var v = tr(el.getAttribute('data-t')); if (v) el.textContent = v; });
    $$('[data-ta]').forEach(function (el) {
      el.getAttribute('data-ta').split(';').forEach(function (p) { var kv = p.split(':'); var v = tr(kv[1]); if (v) el.setAttribute(kv[0], v); });
    });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    $$('[data-arrow]').forEach(function (el) { el.textContent = lang === 'en' ? '→' : '←'; });
    $$('[data-mail]').forEach(function (a) { a.href = 'mailto:' + C.EMAIL + '?subject=' + encodeURIComponent(tr(a.getAttribute('data-mail'))); });
    var title = tr(D.body.getAttribute('data-title')); if (title) D.title = title;
    setTheme(root.getAttribute('data-theme') || th, false);
    if (openSheet) openSheet.refresh();
    try { D.dispatchEvent(new CustomEvent('cs:lang', { detail: lang })); } catch (e) {}
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); }); });

  /* ---------- header, drawer, theme buttons ---------- */
  var hdr = $('.hdr');
  addEventListener('scroll', function () { if (hdr) hdr.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
  var mb = $('.menu-btn'), dr = $('.drawer');
  if (mb && dr) mb.addEventListener('click', function () { var o = dr.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  $$('[data-theme-toggle]').forEach(function (b) { b.addEventListener('click', function () { setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true); }); });

  /* ---------- restartable svg animation ---------- */
  function replay(el) { var c = el.cloneNode(true); el.parentNode.replaceChild(c, el); return c; }

  /* ---------- cover scenes (random per visit, never the same twice in a row) ---------- */
  var scenes = $$('[data-scene]');
  if (scenes.length) {
    var labels = window.CS_SCENES || [], last = parseInt(store('cs_scene'), 10), i = Math.floor(Math.random() * scenes.length);
    if (i === last && scenes.length > 1) i = (i + 1 + Math.floor(Math.random() * (scenes.length - 1))) % scenes.length;
    function show(k) {
      scenes = $$('[data-scene]');
      scenes.forEach(function (s) { s.classList.remove('on'); });
      var s = replay(scenes[k]); s.classList.add('on'); store('cs_scene', String(k));
      var lb = $('[data-scene-label]'); if (lb) lb.textContent = labels[k] || '';
      i = k;
    }
    show(i);
    var nx = $('[data-scene-next]'); if (nx) nx.addEventListener('click', function () { show((i + 1) % scenes.length); });
  }

  /* ---------- launch-offer ring ---------- */
  var ring = $('[data-ring]');
  if (ring) {
    var seats = 50 - Math.max(0, Math.min(50, C.BOOKED || 0));
    $('[data-seats]').textContent = seats;
    var arc = $('.arc', ring); requestAnimationFrame(function () { setTimeout(function () { arc.style.strokeDashoffset = Math.round(327 * (1 - seats / 50)); }, 300); });
  }

  /* ---------- download button ---------- */
  $$('[data-download]').forEach(function (a) { if (C.DOWNLOAD_URL) a.href = C.DOWNLOAD_URL; else a.setAttribute('data-mail', 'mail.trial'); });

  /* ---------- tool filter ---------- */
  $$('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      $$('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.tool[data-pro]').forEach(function (t) {
        var pro = t.getAttribute('data-pro') === '1', vis = f === 'all' || (f === 'pro' ? pro : !pro);
        t.hidden = !vis; t.classList.remove('show'); if (vis) { void t.offsetWidth; t.classList.add('show'); }
      });
    });
  });

  /* ---------- sheets ---------- */
  var openSheet = null, lastFocus = null;
  function sheetOpen(sh, fill) {
    lastFocus = D.activeElement;
    openSheet = { el: sh, refresh: fill }; fill();
    sh.classList.add('open'); D.body.classList.add('locked');
    var cl = $('[data-close]', sh); if (cl) setTimeout(function () { cl.focus(); }, 50);
  }
  function sheetClose() { $$('video.loopvid').forEach(function (v) { v.pause(); });
    if (!openSheet) return; openSheet.el.classList.remove('open'); D.body.classList.remove('locked'); openSheet = null;
    if (lastFocus) lastFocus.focus();
  }
  $$('.sheet [data-close]').forEach(function (b) { b.addEventListener('click', sheetClose); });
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openSheet) sheetClose(); });
  function showAnim(sh, kind) {
    var svg = $('.anim', sh); if (!svg) return;
    $$('[data-anim]', svg).forEach(function (g) { g.classList.remove('on'); });
    var g = $('[data-anim="' + kind + '"]', svg); if (g) replay(g).classList.add('on');
  }

  // real motion clip of the tool (assets/tool-loops/<CMD>.webm / .mp4) — shown only when the file exists, else the drawn animation stays
  function loopVid(sh, cmd) {
    var svg = $('.anim', sh); if (!svg) return;
    var v = $('video.loopvid', sh);
    if (!v) { v = D.createElement('video'); v.className = 'anim loopvid'; v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true'); svg.parentNode.insertBefore(v, svg); }
    v.pause(); v.hidden = true; svg.hidden = false; v.innerHTML = ''; v.removeAttribute('poster'); v.oncanplay = null;
    if (!cmd) return;
    var base = (C.LOOPS || 'assets/tool-loops/') + cmd;
    ['webm', 'mp4'].forEach(function (x) { var so = D.createElement('source'); so.src = base + '.' + x; so.type = 'video/' + x; v.appendChild(so); });
    v.oncanplay = function () { v.oncanplay = null; svg.hidden = true; v.hidden = false; var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    v.load();
  }
  // tools / app tools
  var tsh = $('#toolSheet');
  $$('[data-tool]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-tool'), d = (window.CS_TOOLDATA || {})[id]; if (!d) return;
      track('tool_open', { tool: id });
      sheetOpen(tsh, function () {
        $('[data-s="icon"]', tsh).innerHTML = $('.tile', btn).innerHTML;
        $('[data-s="name"]', tsh).textContent = d.name;
        var cmd = $('[data-s="cmd"]', tsh); if (cmd) { cmd.textContent = d.cmd || ''; cmd.hidden = !d.cmd; }
        var pr = $('[data-s="pro"]', tsh); if (pr) { pr.className = d.pro ? 'pro' : 'free'; pr.textContent = d.pro ? 'PRO' : tr('tools.freeTag'); pr.hidden = d.pro == null; }
        $('[data-s="desc"]', tsh).textContent = d[lang] || d.ar;
        var st = $('[data-s="steps"]', tsh);
        if (st) {
          var list = lang === 'en' ? d.sEn : d.sAr;
          st.parentNode.hidden = !list;
          st.innerHTML = '';
          (list || []).forEach(function (s, k) { var r = D.createElement('div'); r.className = 'step'; r.style.animationDelay = (0.15 + k * 0.15) + 's'; var b = D.createElement('b'); b.textContent = k + 1; var sp = D.createElement('span'); sp.textContent = s; r.appendChild(b); r.appendChild(sp); st.appendChild(r); });
        }
        var v = $('[data-s="video"]', tsh), vs = $('[data-s="videosoon"]', tsh);
        if (v) { v.hidden = !d.video; if (d.video) v.href = d.video; }
        if (vs) vs.hidden = !!d.video;
        var gd = $('[data-s="guide"]', tsh); if (gd && d.cmd) gd.href = (C.GUIDE || 'guide/') + d.cmd.toLowerCase() + '.html';
        var tn = $('[data-s="training"]', tsh); if (tn) { tn.hidden = !d.train; if (d.train) tn.href = (C.TRAINING || 'training/') + d.train + '.zip'; }
        showAnim(tsh, d.kind); loopVid(tsh, d.cmd);
      });
    });
  });

  // apps (home)
  var ash = $('#appSheet');
  $$('[data-app]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var k = +btn.getAttribute('data-app'); track('app_open', { app: k });
      sheetOpen(ash, function () {
        var a = (window.CS_APPS || {})[lang][k];
        $('[data-s="status"]', ash).textContent = a[1]; $('[data-s="name"]', ash).textContent = a[0];
        $('[data-s="desc"]', ash).textContent = a[2];
        var f = $('[data-s="feats"]', ash); f.innerHTML = '';
        a[3].forEach(function (x, j) { var r = D.createElement('div'); r.className = 'perk step'; r.style.animationDelay = (0.1 + j * 0.12) + 's'; r.innerHTML = '<span class="ok"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>'; var s = D.createElement('span'); s.textContent = x; r.appendChild(s); f.appendChild(r); });
        var c = $('[data-s="cta"]', ash); c.textContent = a[4]; c.href = a[5];
      });
    });
  });

  /* ---------- price form ---------- */
  var pf = $('#priceForm');
  if (pf) {
    pf.addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = $('input', pf), v = (inp.value || '').trim(), err = $('.err', pf), row = $('.field', pf);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { err.classList.add('on'); row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); inp.focus(); return; }
      err.classList.remove('on'); track('price_request', { lang: lang });
      function done() { pf.hidden = true; $('#priceOk').classList.add('on'); }
      if (C.PRICE_ENDPOINT) {
        fetch(C.PRICE_ENDPOINT, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ kind: 'price', email: v, lang: lang }) }).then(done, done);
      } else {
        location.href = 'mailto:' + C.EMAIL + '?subject=' + encodeURIComponent(tr('mail.prices')) + '&body=' + encodeURIComponent(v);
        done();
      }
    });
    $('input', pf).addEventListener('input', function () { $('.err', pf).classList.remove('on'); });
  }

  window.CS_TR = function (k) { return tr(k); }; window.CS_LANG = function () { return lang; }; window.CS_TRACK = track;
  setTheme(th, false);
  setLang(lang, false);
})();
