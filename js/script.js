(function () {

  // ---------- SKILL BARS (skills.html) ----------
  function animateSkillBars() {
    const fillBars = document.querySelectorAll('#skills .progress-fill');
    fillBars.forEach(bar => {
      const targetPercent = bar.getAttribute('data-skill');
      if (targetPercent && bar.style.width !== targetPercent + '%') {
        setTimeout(() => {
          bar.style.width = targetPercent + '%';
        }, 100);
      } else if (targetPercent && bar.style.width === '0%') {
        bar.style.width = targetPercent + '%';
      }
    });
  }

  // ---------- INTERSECTION OBSERVER ---------
  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated && entry.target.id === 'skills') {
          animateSkillBars();
          skillsAnimated = true;
          observer.unobserve(skillsSection);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  } else {
    // Если мы на странице skills, сразу анимируем
    if (window.location.pathname.includes('skills.html')) {
      setTimeout(animateSkillBars, 200);
    }
  }

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById('contactForm');
  const feedbackDiv = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('msg').value.trim();

      feedbackDiv.classList.remove('feedback-error', 'feedback-success');

      if (name === '' || email === '' || message === '') {
        feedbackDiv.innerHTML = ' Please fill out all required fields.';
        feedbackDiv.classList.add('feedback-error');
      } else if (!email.includes('@') || !email.includes('.')) {
        feedbackDiv.innerHTML = ' Please enter a valid email address.';
        feedbackDiv.classList.add('feedback-error');
      } else {
        feedbackDiv.innerHTML = ' Thank you ' + name + '! I will get back to you soon.';
        feedbackDiv.classList.add('feedback-success');
        contactForm.reset();

        setTimeout(() => {
          feedbackDiv.innerHTML = '';
          feedbackDiv.classList.remove('feedback-success');
        }, 4000);
      }
    });
  }

  // ---------- BACK TO TOP ----------
  const backTopBtn = document.getElementById('backToTopBtn');

  if (backTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backTopBtn.classList.add('show');
      } else {
        backTopBtn.classList.remove('show');
      }
    });

    backTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- FOOTER YEAR ----------
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
  }

  // ----------  ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-btn');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });

})();