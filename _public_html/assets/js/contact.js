(function initRippleHero() {
  /* 1. Background Cinematic Crossfader & Interactive Slider */
  const slides = document.querySelectorAll('#nita-ripple-contact-hero .nita-ripple-slide');
  const panels = document.querySelectorAll('#nita-ripple-contact-hero .nita-rcard-panel');
  const dotButtons = document.querySelectorAll('#nita-ripple-contact-hero .nita-dot-btn');
  let currentSlide = 0;
  let autoTimer = null;

  function setSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    dotButtons.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    panels[index].classList.add('active');
    dotButtons[index].classList.add('active');
    currentSlide = index;
  }

  function startAutoSlider() {
    autoTimer = setInterval(() => {
      let nextIndex = (currentSlide + 1) % slides.length;
      setSlide(nextIndex);
    }, 6000);
  }

  dotButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      clearInterval(autoTimer);
      setSlide(idx);
      startAutoSlider();
    });
  });

  startAutoSlider();

  /* 2. HD Synapse Constellation Particle Canvas */
  const canvas = document.getElementById('nita-ripple-canvas');
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

    class RippleParticle {
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
        particles.push(new RippleParticle());
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


//Section 1

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
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();