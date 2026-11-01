(function initAboutSplitHero() {
  /* 1. Background Slider & Sync with Central Optical Lens */
  const slides = document.querySelectorAll('#nita-about-split-hero .nita-split-slide');
  const lensBg = document.querySelector('.nita-portal-live-bg');
  let currentSlide = 0;

  const bgUrls = [
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80'
  ];

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');

      if (lensBg) {
        lensBg.style.backgroundImage = `url('${bgUrls[currentSlide]}')`;
      }
    }, 5500);
  }

  /* 2. HD Floating Wave Particle Canvas */
  const canvas = document.getElementById('nita-about-wave-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    const particleCount = 70;
    const connectDist = 130;
    const mouse = { x: null, y: null, radius: 160 };
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

    class HDHelixParticle {
      constructor() {
        const parent = canvas.parentElement;
        this.w = parent.offsetWidth;
        this.h = parent.offsetHeight;
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.baseRadius = Math.random() * 1.8 + 1.2;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.45 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        const parent = canvas.parentElement;
        this.w = parent.offsetWidth;
        this.h = parent.offsetHeight;

        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.02;

        this.radius = this.baseRadius + Math.sin(this.angle) * 0.4;

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
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
            this.radius = this.baseRadius * 1.5;
          }
        }
      }

      draw() {
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
        particles.push(new HDHelixParticle());
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

  /* 3. 3D Magnetic Sculpture Tilt */
  const sculpture = document.getElementById('nita-sculpture-tilt');
  if (sculpture) {
    sculpture.parentElement.addEventListener('mousemove', (e) => {
      const rect = sculpture.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = -(y / (rect.height / 2)) * 6;
      const ry = (x / (rect.width / 2)) * 6;

      sculpture.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    sculpture.parentElement.addEventListener('mouseleave', () => {
      sculpture.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }
})();


//Section 1 Starst

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
        const target = entry.target;
        const parent = target.parentElement;
        
        // Natural stagger effect for sibling cards
        if (parent && (parent.classList.contains('nita-mv-grid') || parent.classList.contains('nita-serv-grid'))) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(target);
          target.style.transitionDelay = `${(index % 2) * 0.15}s`;
        }

        target.classList.add('revealed');
        observer.unobserve(target); // Animate once smoothly
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();