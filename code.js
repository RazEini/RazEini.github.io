document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle?.querySelector('i');

  // ====== DARK MODE LOAD ======
  if (icon && localStorage.getItem('dark-theme') === 'true') {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // ====== DARK MODE TOGGLE ======
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

  // ====== HOVER FUNCTION ======
  function addHoverEffect(elements, options) {
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
          Object.assign(el.style, options.enter);
        });
      });
      el.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
          Object.assign(el.style, options.leave);
        });
      });
    });
  }

  const hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--button-hover-color');

  // ====== BUTTONS HOVER ======
  const buttons = document.querySelectorAll('.hero-section .links a, .contact-section button');
  addHoverEffect(buttons, {
    enter: { transform: 'scale(1.05)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', backgroundColor: hoverColor, color: '#fff' },
    leave: { transform: '', boxShadow: '', backgroundColor: '', color: '' }
  });

  // ====== PROJECT CARDS HOVER ======
  const projects = document.querySelectorAll('.project');
  addHoverEffect(projects, {
    enter: { transform: 'translateY(-5px) scale(1.02)', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' },
    leave: { transform: '', boxShadow: '' }
  });

  // ====== SKILL CELLS HOVER ======
  const skillCells = document.querySelectorAll('.skills-section .cell');
  addHoverEffect(skillCells, {
    enter: { transform: 'translateY(-5px) scale(1.03)', boxShadow: '0 12px 25px rgba(0,0,0,0.15)' },
    leave: { transform: '', boxShadow: '' }
  });

  // ====== PARAGRAPHS HOVER ======
  const paragraphs = document.querySelectorAll('p');
  addHoverEffect(paragraphs, {
    enter: { transform: 'translateY(-2px)', textShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    leave: { transform: '', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }
  });

  // ====== LINKS IN PARAGRAPHS HOVER ======
  const paragraphLinks = document.querySelectorAll('p a');
  addHoverEffect(paragraphLinks, {
    enter: { color: hoverColor, textShadow: '0 1px 2px rgba(0,0,0,0.2)' },
    leave: { color: getComputedStyle(document.documentElement).getPropertyValue('--link-color'), textShadow: '0 1px 2px rgba(0,0,0,0.05)' }
  });

  // ====== FADE-IN + SLIDE-UP ON SCROLL ======
  const faders = document.querySelectorAll('.fade-in, .project, .skills-section .cell, p, .hero-section .links a, .contact-section button');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(el => {
    el.classList.add('fade-init');
    appearOnScroll.observe(el);
  });

  // ====== BACK TO TOP BUTTON ======
  const backToTop = document.createElement('div');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '&#8679;';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });

  // ====== CONTACT FORM ======
  const contactForm = document.querySelector('.contact-section form');

  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');

    const buttonText = document.createElement('span');
    buttonText.classList.add('button-text');
    buttonText.textContent = 'Send Message';

    const spinner = document.createElement('span');
    spinner.classList.add('spinner');
    spinner.style.display = 'none';
    spinner.style.marginLeft = '10px';
    spinner.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;

    submitButton.innerHTML = '';
    submitButton.appendChild(buttonText);
    submitButton.appendChild(spinner);

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        submitButton.disabled = true;
        buttonText.textContent = 'Sending';
        spinner.style.display = 'inline-block';

        // ====== EmailJS send ======
        await emailjs.send(
          'service_c29n8lo',    // Service ID
          'template_iuvar8s',   // Template ID
          { name, email, message },
          '7Z8ZD6P56jwwxljw5'   // Public Key
        );

        alert('Message sent successfully!');
        contactForm.reset();

      } catch (error) {
        console.error('Failed to send message:', error);
        alert('Failed to send message: ' + (error.text || error.message || 'Unknown error'));
      } finally {
        submitButton.disabled = false;
        buttonText.textContent = 'Send Message';
        spinner.style.display = 'none';
      }
    });
  }

  const btn = document.getElementById('download-cv');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    const spinner = btn.querySelector('.spinner');
    // show spinner to indicate the download started
    if (spinner) spinner.style.display = 'inline-block';

    // remove spinner after a short delay (download handled by browser)
    setTimeout(() => {
      if (spinner) spinner.style.display = 'none';
    }, 2000);

    // Note: when using "download" attribute, browsers will try to download the file.
    // If you prefer opening in a new tab instead of direct download, you can:
    // btn.setAttribute('target', '_blank');
  });
});
