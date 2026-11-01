(function initHDUISystem() {
  /* 1. Background Slider */
  const slides = document.querySelectorAll('#nita-compact-hero .nita-slide');
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5500);
  }

  /* 2. High-Definition Retina / 4K Particle Engine */
  const canvas = document.getElementById('nita-compact-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    const particleCount = 65;
    const connectDist = 130;
    const mouse = { x: null, y: null, radius: 150 };
    let dpr = window.devicePixelRatio || 1;

    // High-DPI Canvas Setup for crisp rendering
    function resizeCanvasHD() {
      dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const displayWidth = parent.offsetWidth;
      const displayHeight = parent.offsetHeight;

      // Set actual bitmap dimensions scaled by device pixel ratio
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);

      // Keep CSS layout size consistent
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      // Normalize coordinate system back to CSS pixels
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

    class HDParticle {
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
        this.opacity = Math.random() * 0.45 + 0.35;
      }

      update() {
        const parent = canvas.parentElement;
        this.w = parent.offsetWidth;
        this.h = parent.offsetHeight;

        this.x += this.vx;
        this.y += this.vy;

        // Smooth wrapping
        if (this.x < 0) this.x = this.w;
        if (this.x > this.w) this.x = 0;
        if (this.y < 0) this.y = this.h;
        if (this.y > this.h) this.y = 0;

        // Interactive mouse physics
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
        // Crisp dual-layer glow circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
        particles.push(new HDParticle());
      }
    }

    function connectParticlesHD() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 1; // Ultra crisp 1px line
            ctx.stroke();
          }
        }
      }
    }

    function renderLoop() {
      const parent = canvas.parentElement;
      ctx.clearRect(0, 0, parent.offsetWidth, parent.offsetHeight);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticlesHD();
      requestAnimationFrame(renderLoop);
    }

    initParticles();
    renderLoop();
  }

  /* 3. Mindful Breath Cycle */
  const breathPill = document.getElementById('nita-breath-toggle');
  const breathText = document.getElementById('nita-breath-state');
  let breathing = false;

  if (breathPill && breathText) {
    breathPill.addEventListener('click', () => {
      if (breathing) return;
      breathing = true;
      breathPill.classList.add('active');
      breathText.textContent = 'Inhale...';

      setTimeout(() => {
        breathText.textContent = 'Hold...';
      }, 3500);

      setTimeout(() => {
        breathPill.classList.remove('active');
        breathText.textContent = 'Exhale...';
      }, 6000);

      setTimeout(() => {
        breathText.textContent = '10s Mindful Breath';
        breathing = false;
      }, 9500);
    });
  }

  /* 4. Soft Magnetic Tilt */
  const card = document.getElementById('nita-panel-tilt');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = -(y / (rect.height / 2)) * 3;
      const ry = (x / (rect.width / 2)) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }
})();

//Section 1 Starts

(function initUniversalScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Optional natural stagger if cards are clustered
        const target = entry.target;
        const parent = target.parentElement;
        
        if (parent && parent.classList.contains('nita-serv-grid')) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(target);
          target.style.transitionDelay = `${(index % 3) * 0.12}s`;
        }

        target.classList.add('revealed');
        observer.unobserve(target); // Unobserve so animation triggers once cleanly
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();