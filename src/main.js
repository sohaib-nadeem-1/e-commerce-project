import { showCards } from "./functionCards.js";

fetch("./Apis/product.json")        // ✅ absolute path from root
  .then(res => res.json())
  .then(data => {
    showCards(data)
  })

/*
  INSTRUCTIONS:
  Paste this entire block as a <script> tag just before </body> in your HTML.
  Example:
      ...
      <script type="module" src="main.js"></script>
      <script src="scroll-animations.js"></script>   ← add this line
  </body>
  OR paste the contents directly inside a <script> tag.
*/

(function () {
  /* ── Wait for DOM ── */
  function init() {

    /* ── Scroll progress bar ── */
    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:#0062ff;z-index:99999;transition:width 0.08s linear;pointer-events:none;';
    document.body.appendChild(bar);
    window.addEventListener('scroll', function () {
      var pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(100, Math.round(pct)) + '%';
    }, { passive: true });

    /* ── Inject keyframes + base CSS via <style> ── */
    var style = document.createElement('style');
    style.textContent = [
      'html{scroll-behavior:smooth}',

      /* Reveal base */
      '.sa-hidden{opacity:0;transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);will-change:opacity,transform}',
      '.sa-up{transform:translateY(60px)}',
      '.sa-left{transform:translateX(-60px)}',
      '.sa-right{transform:translateX(60px)}',
      '.sa-zoom{transform:scale(0.88)}',
      '.sa-show{opacity:1!important;transform:none!important}',

      /* Stagger delays */
      '.sd1{transition-delay:0.08s}',
      '.sd2{transition-delay:0.16s}',
      '.sd3{transition-delay:0.26s}',
      '.sd4{transition-delay:0.36s}',
      '.sd5{transition-delay:0.46s}',
      '.sd6{transition-delay:0.56s}',

      /* Navbar load animation */
      '@keyframes saNavDrop{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}',
      '.sa-nav-anim{animation:saNavDrop 0.6s cubic-bezier(0.22,1,0.36,1) both}',

      /* Card hovers */
      '.about-card-1{transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),box-shadow 0.35s ease}',
      '.about-card-1:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(0,98,255,0.13)}',
      '.card{transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),box-shadow 0.35s ease}',
      '.card:hover{transform:translateY(-7px);box-shadow:0 18px 36px rgba(0,98,255,0.14)}',

      /* Service cards */
      '.sec-card-1{transition:background 0.25s ease,transform 0.3s ease}',
      '.sec-card-1:hover{background:#f0f6ff;transform:translateY(-3px)}',

      /* Feature items */
      '.feature{border-left:3px solid transparent;padding-left:10px;border-radius:0;transition:border-color 0.3s ease,transform 0.3s ease}',
      '.feature:hover{border-left-color:#0062ff;transform:translateX(5px)}',

      /* CTA button */
      '.hero-section-btn{transition:background-color 0.3s ease,transform 0.25s ease!important;cursor:pointer}',
      '.hero-section-btn:hover{transform:translateY(-3px) scale(1.04)}',
      '.hero-section-btn:active{transform:scale(0.97)}',

      /* Nav buttons */
      '.nav-btn{transition:background-color 0.25s ease,transform 0.2s ease}',
      '.nav-btn:hover{transform:scale(1.1)}',
      '.nav-btn:active{transform:scale(0.95)}',
      '.sgn-btn,.lgn-btn{transition:color 0.25s ease,transform 0.2s ease}',
      '.sgn-btn:hover,.lgn-btn:hover{transform:scale(1.06)}',

      /* Input focus */
      '.input-box input:focus{outline:none;box-shadow:0 0 0 2px rgba(37,99,235,0.35)}',
    ].join('');
    document.head.appendChild(style);

    /* ── Navbar animation ── */
    ['nav-parent','parent-login-pg'].forEach(function(cls) {
      var el = document.querySelector('.' + cls);
      if (el) el.classList.add('sa-nav-anim');
    });

    /* ── Define what gets animated ── */
    var groups = [
      { sel: '.hero-child-1',      dir: 'sa-left',  immediate: true },
      { sel: '.hero-child-2',      dir: 'sa-right', immediate: true },
      { sel: '.about-card-1',      dir: 'sa-up',    stagger: true },
      { sel: '.sec-card-1',        dir: 'sa-up',    stagger: true },
      { sel: '.stats-section',     dir: 'sa-up' },
      { sel: '.center',            dir: 'sa-zoom' },
      { sel: '.left .feature',     dir: 'sa-left',  stagger: true },
      { sel: '.right .feature',    dir: 'sa-right', stagger: true },
      { sel: '.footer-brand',      dir: 'sa-left' },
      { sel: '.footer-links',      dir: 'sa-up' },
      { sel: '.footer-newsletter', dir: 'sa-right' },
    ];

    var delays = ['sd1','sd2','sd3','sd4','sd5','sd6'];

    groups.forEach(function(g) {
      var els = document.querySelectorAll(g.sel);
      els.forEach(function(el, i) {
        el.classList.add('sa-hidden', g.dir);
        if (g.stagger) el.classList.add(delays[i % delays.length]);

        if (g.immediate) {
          /* Hero elements fire after a short delay, no scroll needed */
          setTimeout(function() { el.classList.add('sa-show'); }, 250 + (i * 100));
        }
      });
    });

    /* ── IntersectionObserver triggers .sa-show on scroll ── */
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sa-show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.sa-hidden').forEach(function(el) {
      io.observe(el);
    });
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();