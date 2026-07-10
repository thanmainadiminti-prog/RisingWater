/* ========================================
   Rising Waters - Weather Animation Engine
   Canvas Rain, Lightning, Particles
   ======================================== */

(function () {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    rain: {
      count: Math.min(280, Math.floor(window.innerWidth / 5)),
      speedMin: 12,
      speedMax: 25,
      lengthMin: 12,
      lengthMax: 28,
      wind: 1.5,
      opacityMin: 0.4,
      opacityMax: 0.85,
      widthMin: 1.2,
      widthMax: 2.8
    },
    lightning: {
      minInterval: 8000,
      maxInterval: 15000
    },
    particles: {
      count: 22
    }
  };

  // Reduce on mobile for performance
  if (window.innerWidth < 768) {
    CONFIG.rain.count = Math.floor(CONFIG.rain.count * 0.5);
    CONFIG.particles.count = 12;
  }

  // ===== RAIN SYSTEM (Canvas API) =====
  class RainSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.drops = [];
      this.resize();
      this.initDrops();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initDrops() {
      this.drops = [];
      for (let i = 0; i < CONFIG.rain.count; i++) {
        this.drops.push(this.createDrop(true));
      }
    }

    createDrop(randomY) {
      const cfg = CONFIG.rain;
      return {
        x: Math.random() * (this.canvas.width + 200) - 100,
        y: randomY ? Math.random() * this.canvas.height : -Math.random() * 80,
        length: Math.random() * (cfg.lengthMax - cfg.lengthMin) + cfg.lengthMin,
        speed: Math.random() * (cfg.speedMax - cfg.speedMin) + cfg.speedMin,
        opacity: Math.random() * (cfg.opacityMax - cfg.opacityMin) + cfg.opacityMin,
        width: Math.random() * (cfg.widthMax - cfg.widthMin) + cfg.widthMin
      };
    }

    update() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.drops.length; i++) {
        const d = this.drops[i];

        this.ctx.beginPath();
        this.ctx.moveTo(d.x, d.y);
        this.ctx.lineTo(d.x + CONFIG.rain.wind, d.y + d.length);
        this.ctx.strokeStyle = 'rgba(220, 235, 255, ' + d.opacity + ')';
        this.ctx.lineWidth = d.width;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        d.y += d.speed;
        d.x += CONFIG.rain.wind * 0.3;

        if (d.y > this.canvas.height + 10) {
          this.drops[i] = this.createDrop(false);
        }
      }
    }
  }

  // ===== LIGHTNING SYSTEM =====
  class LightningSystem {
    constructor(element) {
      this.el = element;
      this.active = true;
      this.schedule();
    }

    schedule() {
      if (!this.active) return;
      const delay = Math.random() * (CONFIG.lightning.maxInterval - CONFIG.lightning.minInterval) + CONFIG.lightning.minInterval;
      setTimeout(() => this.flash(), delay);
    }

    flash() {
      if (!this.active) return;
      const el = this.el;

      // Double-flash pattern for realism
      el.style.opacity = '0.18';
      setTimeout(() => { el.style.opacity = '0'; }, 80);
      setTimeout(() => { el.style.opacity = '0.25'; }, 160);
      setTimeout(() => { el.style.opacity = '0.08'; }, 250);
      setTimeout(() => { el.style.opacity = '0'; }, 380);

      this.schedule();
    }

    destroy() {
      this.active = false;
    }
  }

  // ===== MOISTURE PARTICLES =====
  class ParticleSystem {
    constructor(container) {
      this.container = container;
      this.create();
    }

    create() {
      for (let i = 0; i < CONFIG.particles.count; i++) {
        const p = document.createElement('div');
        p.className = 'moisture-particle';

        const size = Math.random() * 3 + 1.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 12;
        const delay = Math.random() * duration;
        const startY = Math.random() * 100;

        p.style.cssText =
          'width:' + size + 'px;' +
          'height:' + size + 'px;' +
          'left:' + left + '%;' +
          'bottom:' + startY + '%;' +
          'animation-duration:' + duration + 's;' +
          'animation-delay:-' + delay + 's;' +
          'opacity:0;';

        this.container.appendChild(p);
      }
    }
  }

  // ===== INITIALIZATION =====
  function init() {
    // Rain Canvas
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;

    const rain = new RainSystem(canvas);

    // Lightning
    const lightningEl = document.getElementById('lightning-flash');
    let lightning = null;
    if (lightningEl) {
      lightning = new LightningSystem(lightningEl);
    }

    // Particles
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
      new ParticleSystem(particlesContainer);
    }

    // Animation Loop
    let animId;
    function animate() {
      rain.update();
      animId = requestAnimationFrame(animate);
    }
    animate();

    // Resize Handler (debounced)
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        rain.resize();
        rain.initDrops();
      }, 200);
    });

    // Cleanup on page hide for performance
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(animId);
        if (lightning) lightning.active = false;
      } else {
        animate();
        if (lightning) {
          lightning.active = true;
          lightning.schedule();
        }
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
