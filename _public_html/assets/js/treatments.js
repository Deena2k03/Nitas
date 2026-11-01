(function initAccordionHero() {
  /* 1. Interactive 9-Panel Accordion Logic */
  const panels = document.querySelectorAll('#nita-treatment-accordion .nita-acc-panel');
  let autoTimer = null;
  let currentIndex = 0;

  function setActivePanel(index) {
    panels.forEach(p => p.classList.remove('active'));
    panels[index].classList.add('active');
    currentIndex = index;
  }

  panels.forEach((panel, idx) => {
    panel.addEventListener('mouseenter', () => {
      clearInterval(autoTimer);
      setActivePanel(idx);
    });

    panel.addEventListener('click', () => {
      clearInterval(autoTimer);
      setActivePanel(idx);
    });
  });

  function startAutoCycle() {
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % panels.length;
      setActivePanel(currentIndex);
    }, 5000);
  }

  startAutoCycle();

  /* 2. HD Synapse Constellation Canvas Engine */
  const canvas = document.getElementById('nita-acc-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    const particleCount = 65;
    const connectDist = 130;
    const mouse = { x: null, y: null, radius: 150 };
    let dpr = window.devicePixelRatio || 1;

    function resizeCanvasHD() {
      dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const displayWidth = parent.offsetWidth;
      const displayHeight = parent.offsetHeight;

      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', () => {
      resizeCanvasHD();
      initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvasHD();

    class AccParticle {
      constructor() {
        const parent = canvas.parentElement;
        this.w = parent.offsetWidth;
        this.h = parent.offsetHeight;
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.baseRadius = Math.random() * 1.8 + 1.2;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.45 + 0.3;
      }

      update() {
        const parent = canvas.parentElement;
        this.w = parent.offsetWidth;
        this.h = parent.offsetHeight;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = this.w;
        if (this.x > this.w) this.x = 0;
        if (this.y < 0) this.y = this.h;
        if (this.y > this.h) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.8;
            this.y -= (dy / dist) * force * 2.8;
            this.radius = this.baseRadius * 1.4;
          } else {
            this.radius = this.baseRadius;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
        ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
        ctx.shadowBlur = 6 * dpr;
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new AccParticle());
      }
    }

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      const parent = canvas.parentElement;
      ctx.clearRect(0, 0, parent.offsetWidth, parent.offsetHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      requestAnimationFrame(render);
    }

    initParticles();
    render();
  }
})();


//Section 1 starts

/* ===================================================
   UNIVERSAL SCROLL REVEAL OBSERVER
   =================================================== */
(function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const parent = target.parentElement;
        
        // Auto stagger siblings inside grid layouts
        if (parent && (parent.classList.contains('nita-anx-grid') || parent.classList.contains('nita-tx-grid'))) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(target);
          target.style.transitionDelay = `${(index % 2) * 0.15}s`;
        }

        target.classList.add('revealed');
        observer.unobserve(target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();