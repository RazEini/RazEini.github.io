document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle?.querySelector('i');

  // 1. טען מצב Dark מה‑localStorage
  if(icon && localStorage.getItem('dark-theme') === 'true') {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // 2. Dark mode toggle עם אנימציה חלקה
  themeToggle?.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.add('theme-transition');
    setTimeout(() => document.body.classList.remove('theme-transition'), 500);

    document.body.classList.toggle('dark-theme');

    if(icon){
      icon.style.transform = 'rotate(20deg) scale(1.2)';
      setTimeout(() => icon.style.transform = '', 300);
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }

    localStorage.setItem('dark-theme', document.body.classList.contains('dark-theme'));
  });

  // 3. Hover אנימציה לכפתורים
  const buttons = document.querySelectorAll('.hero-section .links a, .contact-section button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        btn.style.transform = 'scale(1.05)';
        btn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      });
    });
    btn.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      });
    });
  });

  // 4. Hover אנימציה לכרטיסי פרויקטים
  const projects = document.querySelectorAll('.project');
  projects.forEach(card => {
    card.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
      });
    });
    card.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  });

  // 5. Hover אנימציה לכרטיסי skills
  const skillCells = document.querySelectorAll('.skills-section .cell');
  skillCells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        cell.style.transform = 'translateY(-5px) scale(1.03)';
        cell.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
      });
    });
    cell.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        cell.style.transform = '';
        cell.style.boxShadow = '';
      });
    });
  });

  // 6. Hover עדין על פסקאות
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        p.style.transform = 'translateY(-2px)';
        p.style.textShadow = '0 2px 5px rgba(0,0,0,0.1)';
      });
    });
    p.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        p.style.transform = '';
        p.style.textShadow = '0 1px 2px rgba(0,0,0,0.05)';
      });
    });
  });

  // 7. Hover עדין על לינקים בתוך פסקאות
  const paragraphLinks = document.querySelectorAll('p a');
  paragraphLinks.forEach(a => {
    a.addEventListener('mouseenter', () => {
      const hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--button-hover-color');
      requestAnimationFrame(() => {
        a.style.color = hoverColor;
        a.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
      });
    });
    a.addEventListener('mouseleave', () => {
      const linkColor = getComputedStyle(document.documentElement).getPropertyValue('--link-color');
      requestAnimationFrame(() => {
        a.style.color = linkColor;
        a.style.textShadow = '0 1px 2px rgba(0,0,0,0.05)';
      });
    });
  });

  // 8. אנימציה בעת גלילה - fade-in + slide-up
  const faders = document.querySelectorAll('.fade-in, .project, .skills-section .cell, p');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('fade-init'); // הכנה לאנימציה
    appearOnScroll.observe(fader);
  });

  // 9. Back-to-top button
  const backToTop = document.createElement('div');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '&#8679;';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
});

// DYNAMIC HOVER COLORS FOR DARK/LIGHT MODE
function getHoverColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--button-hover-color');
}

const dynamicButtons = document.querySelectorAll('.hero-section .links a, .contact-section button');
dynamicButtons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = `0 8px 20px rgba(0,0,0,0.1)`;
    btn.style.backgroundColor = getHoverColor();
    btn.style.color = '#fff';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
    btn.style.backgroundColor = '';
    btn.style.color = '';
  });
});

// FADE-IN FOR BUTTONS ON SCROLL
const faderButtons = document.querySelectorAll('.hero-section .links a, .contact-section button');
faderButtons.forEach(btn => {
  btn.classList.add('fade-init');
  appearOnScroll.observe(btn);
});
