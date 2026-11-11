/* CAD & SURVEY — support centre: problem solver, Q&A search, message form with screenshots. By Eng. Ali */
(function () {
  var D = document, C = window.CS_CONFIG || {}, S = window.CS_SUP || {};
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function L() { return window.CS_LANG ? CS_LANG() : 'ar'; }
  function t(k) { return window.CS_TR ? CS_TR('sup.' + k) : k; }
  function track(n, p) { if (window.CS_TRACK) CS_TRACK(n, p); }
  function el(tag, cls, txt) { var e = D.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  var LINKS = { 'guide/install.html': 'guide/install.html', 'guide/': 'guide/index.html', 'training.html': 'training.html', 'pricing.html': 'pricing.html' };
  function rich(text) { // turns known site paths into links, everything else stays plain text
    var f = D.createDocumentFragment(), re = /(guide\/install\.html|guide\/|training\.html|pricing\.html)/g, last = 0, m;
    while ((m = re.exec(text))) { f.appendChild(D.createTextNode(text.slice(last, m.index))); var a = el('a', null, '→ ' + m[1].replace('.html', '').replace('guide/', 'guide')); a.href = LINKS[m[1]]; f.appendChild(a); last = re.lastIndex; }
    f.appendChild(D.createTextNode(text.slice(last))); return f;
  }
  function icon(cmd) { var tpl = $('#ico-' + cmd); return tpl ? tpl.innerHTML : ''; }

  /* ---------- problem solver ---------- */
  var ts = $('#tsBox'), cur = null, step = 0;
  function tsHome() {
    cur = null; step = 0; ts.innerHTML = '';
    var g = el('div', 'ts-opts');
    S.ts.forEach(function (p, i) {
      var b = el('button', 'ts-opt'); b.type = 'button'; b.style.animationDelay = (i * 0.05) + 's';
      var e = el('span', 'e'); e.innerHTML = icon(p[1]); b.appendChild(e); b.appendChild(el('span', null, p[2][L()][0]));
      b.addEventListener('click', function () { cur = p; step = 0; track('ts_pick', { problem: p[0] }); tsStep(); });
      g.appendChild(b);
    });
    ts.appendChild(g);
  }
  function tsStep() {
    var d = cur[2][L()], fixes = d[1]; ts.innerHTML = '';
    var h = el('div'); h.style.cssText = 'display:flex;align-items:center;gap:12px';
    var e = el('span', 'tile'); e.style.cssText = 'width:52px;height:52px;border-radius:14px'; e.innerHTML = icon(cur[1]); h.appendChild(e);
    h.appendChild(el('b', null, d[0])); h.lastChild.style.fontSize = '17px'; ts.appendChild(h);
    var bar = el('div', 'ts-bar'), i = el('i'), bb = el('b'); i.appendChild(bb); bar.appendChild(el('span', null, t('step') + ' ' + Math.min(step + 1, fixes.length) + ' / ' + fixes.length)); bar.lastChild.style.cssText = 'font-size:13px;color:var(--muted);font-weight:600;white-space:nowrap'; bar.appendChild(i); ts.appendChild(bar);
    setTimeout(function () { bb.style.width = (Math.min(step + 1, fixes.length) / fixes.length * 100) + '%'; }, 30);
    if (step < fixes.length) {
      var f = el('div', 'fix'), r = el('div'); r.style.cssText = 'display:flex;gap:12px;align-items:flex-start';
      var n = el('b', null, String(step + 1)); n.style.cssText = 'flex:none;width:32px;height:32px;border-radius:10px;background:var(--gold);color:var(--onGold);display:flex;align-items:center;justify-content:center;direction:ltr';
      var p = el('span'); p.style.cssText = 'font-size:16px;padding-top:4px'; p.appendChild(rich(fixes[step])); r.appendChild(n); r.appendChild(p); f.appendChild(r);
      f.appendChild(el('span', null, t('tsWorked'))); f.lastChild.style.cssText = 'font-weight:700;color:var(--text2)';
      var q = el('div', 'q'), y = el('button', 'btn btn-gold', t('tsYes')), no = el('button', 'btn btn-ghost', t('tsNo')); y.type = no.type = 'button';
      y.addEventListener('click', function () { track('ts_solved', { problem: cur[0], step: step + 1 }); tsDone(); });
      no.addEventListener('click', function () { step++; tsStep(); });
      q.appendChild(y); q.appendChild(no); f.appendChild(q); ts.appendChild(f);
    } else {
      var f2 = el('div', 'fix'); f2.appendChild(el('b', null, t('tsFail')));
      var s = el('button', 'btn btn-gold btn-block', t('tsSend')); s.type = 'button';
      s.addEventListener('click', function () { track('ts_unsolved', { problem: cur[0] }); prefill(d, fixes); });
      f2.appendChild(s); ts.appendChild(f2);
    }
    var back = el('button', 'crumb', '↺ ' + t('tsBack')); back.type = 'button'; back.style.cssText += ';border:0;background:none;cursor:pointer;font:inherit;align-self:flex-start'; back.addEventListener('click', tsHome); ts.appendChild(back);
  }
  function tsDone() {
    ts.innerHTML = '';
    var y = el('div', 'yay'); y.innerHTML = '<span class="ok" style="width:46px;height:46px;background:#3CAA5A"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';
    var c = el('div'); c.appendChild(el('b', null, t('tsDone'))); c.appendChild(D.createElement('br')); c.appendChild(el('span', null, t('tsDoneT'))); y.appendChild(c); ts.appendChild(y);
    var back = el('button', 'btn btn-ghost', t('tsBack')); back.type = 'button'; back.addEventListener('click', tsHome); ts.appendChild(back);
  }

  /* ---------- Q&A ---------- */
  var cat = 'all';
  function faqRender() {
    var box = $('#faqList'), q = ($('#faqQ').value || '').trim().toLowerCase(), n = 0; box.innerHTML = '';
    S.faq.forEach(function (f) {
      var d = f[1][L()];
      if (cat !== 'all' && f[0] !== cat) return;
      if (q && (d[0] + ' ' + d[1]).toLowerCase().indexOf(q) < 0) return;
      var det = el('details', 'card'), sm = el('summary', null, d[0]), a = el('div', 'ans'); a.appendChild(rich(d[1]));
      det.appendChild(sm); det.appendChild(a); det.addEventListener('toggle', function () { if (det.open) track('faq_open', { q: d[0].slice(0, 60) }); });
      box.appendChild(det); n++;
    });
    $('#faqNone').classList.toggle('on', n === 0);
  }
  $$('.faqcats button').forEach(function (b) { b.addEventListener('click', function () { cat = b.getAttribute('data-cat'); $$('.faqcats button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); faqRender(); }); });
  $('#faqQ').addEventListener('input', faqRender);

  /* ---------- message form ---------- */
  var form = $('#msgForm'), files = [], kind = 'problem', ver = '';
  function chips(sel, cb) { $$(sel + ' button').forEach(function (b) { b.addEventListener('click', function () { var on = b.getAttribute('aria-pressed') !== 'true' || sel === '#kinds'; $$(sel + ' button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', on ? 'true' : 'false'); cb(on ? b.getAttribute('data-v') : ''); }); }); }
  chips('#kinds', function (v) { kind = v || 'problem'; });
  chips('#vers', function (v) { ver = v; });
  function setKind(v) { kind = v; $$('#kinds button').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-v') === v ? 'true' : 'false'); }); }
  function check(fld, ok) { fld.classList.toggle('bad', !ok); fld.classList.toggle('good', ok); $('.msg', fld).textContent = ok ? t(fld.getAttribute('data-ok')) : t(fld.getAttribute('data-bad')); }
  var desc = $('#mDesc'), mail = $('#mMail');
  function vDesc() { return desc.value.trim().length >= 15; }
  function vMail() { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim()); }
  desc.addEventListener('input', function () { if (desc.value.length > 3) check(desc.parentNode, vDesc()); });
  mail.addEventListener('input', function () { if (mail.value.length > 4) check(mail.parentNode, vMail()); });
  function prefill(d, fixes) {
    setKind('problem'); $('#mProd').value = /DWG|CAD Survey/.test(d[0]) ? 'CAD Survey' : 'CAD & SURVEY Tools';
    desc.value = d[0] + '\n\n— ' + fixes.map(function (x, i) { return (i + 1) + ') ' + x; }).join('\n— ') + '\n\n';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(function () { desc.focus(); desc.setSelectionRange(desc.value.length, desc.value.length); }, 500);
  }
  // screenshots: pick, drop, paste
  var drop = $('#drop'), inp = $('#mShots'), thumbs = $('#thumbs');
  function addFiles(list) { Array.prototype.forEach.call(list, function (f) { if (/^image\//.test(f.type) && files.length < 8) files.push(f); }); drawThumbs(); }
  function drawThumbs() {
    thumbs.innerHTML = '';
    files.forEach(function (f, i) { var fg = el('figure'), im = el('img'), x = el('button', null, '✕'); im.alt = f.name; im.src = URL.createObjectURL(f); x.type = 'button'; x.setAttribute('aria-label', 'remove'); x.addEventListener('click', function () { files.splice(i, 1); drawThumbs(); }); fg.appendChild(im); fg.appendChild(x); thumbs.appendChild(fg); });
  }
  drop.addEventListener('click', function () { inp.click(); });
  drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } });
  inp.addEventListener('change', function () { addFiles(inp.files); inp.value = ''; });
  ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); if (ev === 'drop') addFiles(e.dataTransfer.files); }); });
  D.addEventListener('paste', function (e) { if (!form.contains(D.activeElement) && D.activeElement !== D.body) return; var it = (e.clipboardData || {}).items || []; var fs = []; for (var i = 0; i < it.length; i++) if (it[i].kind === 'file') fs.push(it[i].getAsFile()); if (fs.length) addFiles(fs); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var okD = vDesc(), okM = vMail(); check(desc.parentNode, okD); check(mail.parentNode, okM);
    if (!okD || !okM) { var bad = $('.fld.bad', form); bad.classList.remove('shake'); void bad.offsetWidth; bad.classList.add('shake'); $('textarea,input', bad).focus(); return; }
    var prod = $('#mProd').value, tool = $('#mTool').value, kn = $('#kinds [data-v="' + kind + '"]').textContent;
    track('support_send', { kind: kind, product: prod, shots: files.length });
    function done() { form.hidden = true; $('#msgOk').classList.add('on'); }
    if (C.SUPPORT_ENDPOINT) {
      var data = { kind: kind, product: prod, tool: tool, version: ver, text: desc.value, email: mail.value.trim(), lang: L(), shots: [] };
      Promise.all(files.map(function (f) { return new Promise(function (res) { var r = new FileReader(); r.onload = function () { res({ name: f.name, type: f.type, data: String(r.result).split(',')[1] }); }; r.onerror = function () { res(null); }; r.readAsDataURL(f); }); }))
        .then(function (sh) { data.shots = sh.filter(Boolean); return fetch(C.SUPPORT_ENDPOINT, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) }); })
        .then(done, done);
    } else {
      var body = kn + ' · ' + prod + (tool ? ' · ' + tool : '') + (ver ? ' · AutoCAD ' + ver : '') + '\n\n' + desc.value.trim() + '\n\n' + mail.value.trim() + (files.length ? '\n\n(' + files.length + ' screenshots)' : '');
      location.href = 'mailto:' + C.EMAIL + '?subject=' + encodeURIComponent('[' + kn + '] ' + prod + (tool ? ' · ' + tool : '')) + '&body=' + encodeURIComponent(body);
      done();
    }
  });
  if (!C.SUPPORT_ENDPOINT) $('#attachNote').hidden = false;
  var qp = (location.search.match(/[?&]type=(\w+)/) || [])[1]; if (qp) setKind(qp);

  function all() { tsHome(); faqRender(); $$('.fld.bad,.fld.good').forEach(function (f) { check(f, f.classList.contains('good')); }); }
  D.addEventListener('cs:lang', all);
  all();
})();
