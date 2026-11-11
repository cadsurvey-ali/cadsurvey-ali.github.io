/* CAD & SURVEY Tools - help pages  |  By Eng. Ali
   Language switch (remembered), video button (assets/videos.js is written by the tools from links.txt). */
(function () {
  var KEY = "cadsurvey-help-lang";
  function getLang() {
    var q = (location.hash || "").replace("#", "");
    if (q === "ar") q = "msa"; if (q === "en" || q === "msa") return q;
    try { var v = localStorage.getItem(KEY); if (v === "ar") v = "msa"; if (v === "en" || v === "msa") return v; } catch (e) { }
    return "msa";
  }
  function setLang(l) {
    document.documentElement.setAttribute("data-l", l);
    document.documentElement.setAttribute("lang", l === "en" ? "en" : "ar");
    try { localStorage.setItem(KEY, l); } catch (e) { }
    var s = document.querySelectorAll(".lang span");
    for (var i = 0; i < s.length; i++) s[i].className = s[i].getAttribute("data-v") === l ? "on" : "";
  }
  setLang(getLang());
  document.addEventListener("DOMContentLoaded", function () {
    setLang(getLang());
    var s = document.querySelectorAll(".lang span");
    for (var i = 0; i < s.length; i++) s[i].addEventListener("click", function () { setLang(this.getAttribute("data-v")); });
    // video button: the tool's own video, else the playlist, else the channel
    var v = window.CS_VIDEOS || {};
    var b = document.querySelectorAll("[data-video]");
    for (var j = 0; j < b.length; j++) {
      var t = b[j].getAttribute("data-video");
      var u = (t && v[t]) || v.playlist || v.channel || "https://www.youtube.com/@Eng.alicadsurvey";
      b[j].setAttribute("href", u);
      b[j].setAttribute("target", "_blank");
      if (t && !v[t]) { var sp = b[j].querySelectorAll(".soon"); for (var k = 0; k < sp.length; k++) sp[k].style.display = "inline"; }
      // no own video yet (or the general Videos button): first a short note that the playlist grows, tool by tool,
      // then the playlist opens in a new tab ~1.2 s later, so the note is seen before the browser switches tab
      if (!(t && v[t]) && v.playlist) b[j].addEventListener("click", (function (own, url) {
        return function (e) {
          if (e && (e.ctrlKey || e.shiftKey || e.metaKey || e.button === 1)) return;   // the user's own new tab / window
          if (e && e.preventDefault) e.preventDefault();
          toast(own);
          setTimeout(function () {
            var w = null;
            try { w = window.open(url, "_blank"); } catch (x) { }
            if (!w) location.href = url;   // pop-up blocked: open it here
          }, 1200);
        };
      })(!!t, u));
    }
    // copy buttons (e.g. the Western Union receiver name): <button class="cp" data-copy="text">
    var cps = document.querySelectorAll("[data-copy]");
    for (var c = 0; c < cps.length; c++) cps[c].addEventListener("click", function () {
      var el = this, txt = el.getAttribute("data-copy");
      function done() { el.className += " done"; setTimeout(function () { el.className = el.className.replace(/ done/g, ""); }, 1600); }
      function old() {
        var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (x) { }
        document.body.removeChild(ta);
      }
      try { if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, old); else old(); } catch (x) { old(); }
    });
    function toast(own) {
      var old = document.getElementById("vidnote"); if (old) old.parentNode.removeChild(old);
      var d = document.createElement("div");
      d.id = "vidnote"; d.className = "vidnote"; d.setAttribute("role", "status");
      d.innerHTML = own
        ? '<span class="ar">فيديو هالأداة بعده ما نزل، فانفتحت قائمة الشرح. القائمة تتحدث باستمرار والشرح ينزل بالترتيب، وكل أداة راح يكون إلها فيديو.</span>' +
          '<span class="msa">لم يُنشر فيديو هذه الأداة بعد، لذا فُتحت قائمة الشرح. تُحدَّث القائمة باستمرار ويُنشر الشرح بالترتيب، وسيكون لكل أداة فيديو خاص.</span>' +
          '<span class="en">This tool\'s video is not out yet, so the lessons playlist opened. The playlist is updated all the time, lesson by lesson in order, and every tool will get its own video.</span>'
        : '<span class="ar">قائمة الشرح تتحدث باستمرار: الفيديوهات تنزل بالترتيب، وكل أداة راح يكون إلها فيديو.</span>' +
          '<span class="msa">تُحدَّث قائمة الشرح باستمرار: تُنشر المقاطع بالترتيب، وسيكون لكل أداة فيديو خاص.</span>' +
          '<span class="en">The lessons playlist is updated all the time: videos come out in order, and every tool will get its own.</span>';
      document.body.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 9000);
      d.addEventListener("click", function () { if (d.parentNode) d.parentNode.removeChild(d); });
    }
  });
})();
