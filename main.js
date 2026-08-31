document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. ANIMACIÓN DE SCROLL (Intersection Observer)
       ========================================================================== */
    const style = document.createElement('style');
    style.innerHTML = `
        .section-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .section-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 
    });

    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach(section => {
        observer.observe(section);
    });

    /* ==========================================================================
       2. CURSOR VERDE GLOBAL (Funciona en todas las páginas)
       ========================================================================== */
    const cursor = document.getElementById('cursor');
    
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
          gsap.set(cursor, {
            x: e.clientX,
            y: e.clientY
          });
        });

        document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
        document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));
    }

    /* ==========================================================================
       3. ANIMACIÓN DE IMÁGENES DEL HERO (Solo funciona si hay un Hero)
       ========================================================================== */
    const hero = document.querySelector('.hero');

    if (hero && cursor) {
        const images = [
        'img/ELEMENTOS/Recurso%2022.png',
        'img/ELEMENTOS/Recurso%2023.png',
        'img/ELEMENTOS/Recurso%2024.png',
        'img/ELEMENTOS/Recurso%2027.png',
        'img/ELEMENTOS/Recurso%2028.png',
        'img/ELEMENTOS/Recurso%2029.png',
        'img/ELEMENTOS/Recurso%2030.png',
        'img/ELEMENTOS/Recurso%2031.png',
        'img/ELEMENTOS/Recurso%2032.png',
        'img/ELEMENTOS/Recurso%2033.png',
        'img/ELEMENTOS/Recurso%2034.png',
        'img/ELEMENTOS/Recurso%2035.png',
        'img/ELEMENTOS/Recurso%2036.png',
        'img/ELEMENTOS/Recurso%2037.png',
        'img/ELEMENTOS/Recurso%2038.png'
    ];

        images.forEach(src => {
          const img = new Image();
          img.src = src;
        });

        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const smoothMouse = { x: mouse.x, y: mouse.y };
        let lastSpawn = { x: mouse.x, y: mouse.y };

        let lastIndex = -1;
        let zIndex = 1;
        const threshold = 140;   
        const lerpFactor = 0.14; 
        let isHoveringHero = false;

        hero.addEventListener('mousemove', (e) => {
          const rect = hero.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          isHoveringHero = true;
        });

        hero.addEventListener('mouseleave', () => {
          isHoveringHero = false;
        });

        function getRandomImage() {
          let index;
          do {
            index = Math.floor(Math.random() * images.length);
          } while (index === lastIndex && images.length > 1);
          lastIndex = index;
          return images[index];
        }

        function createSmoothTrail(x, y, vx, vy) {
          const img = document.createElement('img');
          img.src = getRandomImage();
          img.className = 'trail-image';
          img.style.zIndex = ++zIndex;

          hero.appendChild(img);

          const driftDistance = 0.8;
          const targetX = x + vx * driftDistance;
          const targetY = y + vy * driftDistance;
          const targetRotation = gsap.utils.clamp(-18, 18, vx * 0.35);

          gsap.set(img, {
            xPercent: -50,
            yPercent: -50,
            x: x,
            y: y,
            scale: 0.8,
            opacity: 0,
            rotation: targetRotation * 0.3
          });

          gsap.to(img, {
            x: targetX,
            y: targetY,
            rotation: targetRotation,
            duration: 1.5,
            ease: "power3.out"
          });

          const tl = gsap.timeline({ onComplete: () => img.remove() });

          tl.to(img, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" })
            .to(img, { scale: 0.92, opacity: 0, duration: 0.85, ease: "power2.inOut", delay: 0.2 });
        }

        function render() {
          smoothMouse.x += (mouse.x - smoothMouse.x) * lerpFactor;
          smoothMouse.y += (mouse.y - smoothMouse.y) * lerpFactor;

          const dx = smoothMouse.x - lastSpawn.x;
          const dy = smoothMouse.y - lastSpawn.y;
          const distance = Math.hypot(dx, dy);

          if (distance > threshold && isHoveringHero) {
            createSmoothTrail(smoothMouse.x, smoothMouse.y, dx, dy);
            lastSpawn.x = smoothMouse.x;
            lastSpawn.y = smoothMouse.y;
          }

          requestAnimationFrame(render);
        }

        render();
    }

    /* ==========================================================================
       4. ROTACIÓN DE VALORES (Box 361)
       ========================================================================== */
    const boxContainer = document.getElementById('valores-box');
    const boxContent = document.getElementById('valores-content');
    
    if (boxContainer && boxContent) {
        
        const valores = [
            {
                title: "PROPÓSITO",
                sub: "Descubrir lo que hace única a cada marca",
                bg: "var(--color-green)",
                text: "var(--color-white)",
                arrow: "→"
            },
            {
                title: "INNOVACIÓN",
                sub: "Soluciones con visión",
                bg: "var(--color-purple)",
                text: "var(--color-black)", 
                arrow: "←"
            },
            {
                title: "MISIÓN",
                sub: "Acompañar marcas en su identidad",
                bg: "var(--color-green)",
                text: "var(--color-white)",
                arrow: "↓"
            },
            {
                title: "EMPATÍA",
                sub: "Escuchamos antes de crear",
                bg: "var(--color-purple)",
                text: "var(--color-black)",
                arrow: "→"
            },
            {
                title: "CREATIVIDAD",
                sub: "Ideas que transforman",
                bg: "var(--color-green)",
                text: "var(--color-white)",
                arrow: "←"
            }
        ];
        
        let currentIndex = 0;

        function updateBoxContent(index) {
            const data = valores[index];
            boxContainer.style.backgroundColor = data.bg;
            boxContent.innerHTML = `
                <div class="valores-arrow" style="color: ${data.text}">${data.arrow}</div>
                <div class="valores-title" style="color: ${data.text}">${data.title}</div>
                <div class="valores-subtitle" style="color: ${data.text}">${data.sub}</div>
            `;
        }

        updateBoxContent(currentIndex);

        setInterval(() => {
            boxContent.style.opacity = 0;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % valores.length;
                updateBoxContent(currentIndex);
                boxContent.style.opacity = 1;
            }, 500); 
        }, 3000); 
    }
});

/* ==========================================================================
       5. EFECTO SCROLL: HERO DE PROYECTOS (Achicar y desaparecer)
       ========================================================================== */
    const projectsHero = document.querySelector('.projects-hero');
    const heroText = document.getElementById('hero-text-content');

    // Solo ejecutamos este código si estamos en la página de proyectos
    if (projectsHero && heroText) {
        window.addEventListener('scroll', () => {
            // Usamos requestAnimationFrame para que la animación fluya a 60fps sin tirones
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = projectsHero.offsetHeight;
                
                // Calculamos el progreso (de 0 a 1) sobre el 70% del alto de la pantalla
                let progress = scrollY / (heroHeight * 0.7);
                if (progress > 1) progress = 1;
                if (progress < 0) progress = 0;
                
                // La opacidad va de 1 a 0
                const opacity = 1 - progress;
                // La escala va de 1 a 0.7 (se achica un 30%)
                const scale = 1 - (progress * 0.3);
                
                // Aplicamos los valores al contenedor
                // El translateY(scrollY * 0.4) hace un efecto parallax suave hacia abajo
                heroText.style.opacity = opacity;
                heroText.style.transform = `scale(${scale}) translateY(${scrollY * 0.4}px)`;
            });
        });
    }