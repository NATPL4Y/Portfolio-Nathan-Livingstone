/* ============================================
   PORTFOLIO – Navigation & Shared Scripts
   Luxury Editorial Edition
   ============================================ */

function createNav(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">N<span>.</span> Livingstone</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="${activePage === 'accueil' ? 'active' : ''}">Accueil</a></li>
        <li>
          <a href="#" class="dropdown-trigger ${['but1','but2','but3'].includes(activePage) ? 'active' : ''}">BUT TC</a>
          <div class="dropdown">
            <div class="dropdown-label">Année 1</div>
            <a href="but1.html">BUT 1 — Tronc commun</a>
            <a href="but1-stage.html" style="padding-left:1.8rem;font-size:.78rem;opacity:.7">↳ Stage — SEMLORE</a>
            <div class="dropdown-label" style="margin-top:.5rem">Année 2</div>
            <a href="but2.html">BUT 2 — Parcours MDEE</a>
            <a href="but2-stage.html" style="padding-left:1.8rem;font-size:.78rem;opacity:.7">↳ Stage — IUT Toulon</a>
            <div class="dropdown-label" style="margin-top:.5rem">Année 3</div>
            <a href="but3.html">BUT 3 — Parcours MDEE</a>
          </div>
        </li>
        <li>
          <a href="#" class="dropdown-trigger ${['hard','mad','soft'].includes(activePage) ? 'active' : ''}">Skills</a>
          <div class="dropdown">
            <a href="hard-skills.html">Hard Skills</a>
            <a href="soft-skills.html">Soft Skills</a>
            <a href="mad-skills.html">Mad Skills</a>
          </div>
        </li>
        <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
      </ul>
      <button class="nav-hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
  document.body.prepend(nav);

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        const dropdown = trigger.nextElementSibling;
        const isOpen = dropdown.style.display === 'block';
        // Close all dropdowns first
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
        dropdown.style.display = isOpen ? 'none' : 'block';
      }
    });
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <p>&copy; ${new Date().getFullYear()} Nathan Livingstone — Portfolio BUT TC</p>
      <ul class="footer-links">
        <li><a href="index.html">Accueil</a></li>
        <li><a href="but1.html">BUT</a></li>
        <li><a href="hard-skills.html">Skills</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  `;
  document.body.appendChild(footer);
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Smooth nav background on scroll
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.style.background = 'rgba(7, 13, 26, 0.96)';
          nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
        } else {
          nav.style.background = 'rgba(7, 13, 26, 0.88)';
          nav.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
});
