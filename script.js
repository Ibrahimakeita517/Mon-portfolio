/**
 * Script principal du portfolio
 *
 * Ce script gère toutes les interactions et animations du site.
 * Il est structuré en modules initialisés au chargement du DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- INITIALISATIONS GÉNÉRALES ---
  initAnnee();
  initDarkMode();
  initNavbarBehavior();
  initScrollAnimations();
  initBackToTopButton();

  // --- INITIALISATIONS SPÉCIFIQUES AUX PAGES ---
  if (document.getElementById('contact-form')) {
    initContactForm();
    initTypewriterEffect(); // Ajout de l'effet machine à écrire sur la page d'accueil
  }
  if (document.getElementById('project-title')) {
    initProjectPage();
  }

  // --- EFFETS VISUELS AVANCÉS (pour desktop) ---
  if (window.matchMedia("(min-width: 768px)").matches) {
    initAdvancedEffects();
  }
});

/**
 * Ajoute un effet "machine à écrire" au titre principal de la page d'accueil.
 */
function initTypewriterEffect() {
  const titleElement = document.querySelector('header .header-content h1');
  // S'assure que l'élément existe et que nous sommes sur la page d'accueil (pas la page projet)
  if (!titleElement || !document.getElementById('about')) return;

  // Garde le texte original en mémoire et vide l'élément
  const originalText = titleElement.textContent;
  titleElement.textContent = '';
  let i = 0;

  function type() {
    if (i < originalText.length) {
      titleElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(type, 100); // Vitesse de frappe (en ms)
    } else {
      // Une fois le texte écrit, ajoute la classe pour le curseur clignotant
      titleElement.classList.add('blink-cursor');
    }
  }

  // Démarre l'animation après un court délai pour un meilleur effet visuel
  setTimeout(type, 500);
}
/**
 * Met à jour l'année dans le footer.
 */
function initAnnee() {
  const anneeEl = document.getElementById("annee");
  if (anneeEl) {
    anneeEl.innerText = new Date().getFullYear();
  }
}

/**
 * Gère le mode sombre/clair, avec sauvegarde dans le localStorage.
 */
function initDarkMode() {
  const toggleButton = document.getElementById("toggle-mode");
  if (!toggleButton) return;

  const updateButtonText = (isDark) => {
    toggleButton.innerHTML = isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre';
  };

  // Appliquer le thème au chargement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  let isDarkMode = savedMode ? savedMode === 'enabled' : prefersDark;

  document.body.classList.toggle('dark-mode', isDarkMode);
  updateButtonText(isDarkMode);

  // Gérer le clic sur le bouton
  toggleButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    updateButtonText(isDarkMode);
  });
}

/**
 * Gère le comportement de la barre de navigation au scroll.
 * (transparence et mise en surbrillance du lien actif)
 */
function initNavbarBehavior() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const sections = document.querySelectorAll("section[id]");

  if (!navbar) return;

  const onScroll = () => {
    // Gérer la transparence
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Gérer le lien actif
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      // Vérifie si l'attribut href se termine par l'ID de la section
      if (link.getAttribute("href").endsWith("#" + currentSectionId)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Appel initial
}

/**
 * Initialise les animations qui se déclenchent au scroll
 * (barres de progression, apparition d'éléments).
 * Utilise IntersectionObserver pour la performance.
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        // Animation pour les barres de progression
        if (target.classList.contains('progress')) {
          target.style.width = target.getAttribute('data-width');
        }
        // Animation pour les éléments en fondu
        if (target.classList.contains('fade-in')) {
          target.classList.add('visible');
          observer.unobserve(target); // Optimisation: ne plus observer une fois visible
        }
      } else {
        // Optionnel: réinitialiser l'animation quand l'élément sort de l'écran
        if (entry.target.classList.contains('progress')) {
          entry.target.style.width = '0';
        }
      }
    });
  };

  const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

  document.querySelectorAll('.progress, .fade-in').forEach(el => {
    animationObserver.observe(el);
  });
}

/**
 * Gère l'apparition et la fonctionnalité du bouton "Retour en haut".
 */
function initBackToTopButton() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 300);
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Gère la soumission du formulaire de contact.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const result = document.getElementById("form-result");
  if (!form || !result) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const nom = formData.get('nom').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!nom || !email || !message) {
      result.textContent = "Veuillez remplir tous les champs.";
      result.style.color = "red";
      return;
    }

    // Ici, vous pourriez ajouter un envoi de données via fetch()

    result.textContent = "Message envoyé avec succès !";
    result.style.color = "green";
    form.reset();

    // Réinitialiser le message après quelques secondes
    setTimeout(() => {
      result.textContent = "";
    }, 4000);
  });
}

/**
 * Gère les effets visuels avancés pour les écrans larges.
 * (lumière suivant la souris, effet parallax sur les projets)
 */
function initAdvancedEffects() {
  // Effet de lumière dynamique
  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX / window.innerWidth);
    document.body.style.setProperty('--mouse-y', e.clientY / window.innerHeight);
  });

  // Effet "Parallax 3D" sur les cartes de projet
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mousemove', (e) => {
      const rect = project.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      project.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.05)`;
      project.style.transition = 'transform 0.1s';
    });

    project.addEventListener('mouseleave', () => {
      project.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
      project.style.transition = 'transform 0.5s';
    });
  });
}


// ===================================================================
// ================= GESTION DE LA PAGE PROJET (project.html) ========
// ===================================================================

const projectsData = {
  "anwkasugu": {
    title: "Anw Ka Sugu",
    description: "Anw Ka Sugu est une boutique en ligne locale qui permet aux clients de découvrir et commander facilement des produits courants du Mali. Grâce à un système de panier, de livraison et de paiement mobile, l’application rend les achats rapides, pratiques et accessibles à tous. J'ai utilisé des technologies modernes pour assurer une expérience fluide.",
    techs: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "React Native", "Java"],
    images: ["img/anwkasugu-accueil.jpg", "img/anwkasugu-panier.jpg", "img/anwkasugu-mobile.jpg"]
  },
  "malicraft": {
    title: "MaliCraft",
    description: "MaliCraft (Créations Artisanales) est une boutique en ligne conçue pour aider les jeunes artisans maliens à vendre leurs créations. Le site inclut une galerie interactive, un panier d'achat et une intégration de paiement mobile.",
    techs: ["WordPress", "WooCommerce", "CSS Personnalisé"],
    images: ["https://via.placeholder.com/800x400?text=MaliCraft+1", "https://via.placeholder.com/800x400?text=MaliCraft+2"]
  },
  "jobgo": {
    title: "JobGo",
    description: "JobGo est une plateforme innovante de mise en relation entre demandeurs d'emploi et recruteurs au Mali. Elle propose des filtres avancés, un système de CV en ligne et une messagerie instantanée.",
    techs: ["React.js", "Node.js", "MongoDB", "Express", "SQL"],
    images: ["https://via.placeholder.com/800x400?text=JobGo+1", "https://via.placeholder.com/800x400?text=JobGo+2"]
  },
  "agriconseil": {
    title: "AgriConseil",
    description: "Plateforme dédiée à l'agriculture, AgriConseil fournit des outils de suivi de culture et des conseils personnalisés aux agriculteurs pour optimiser leurs rendements.",
    techs: ["Vue.js", "Firebase", "PWA"],
    images: ["https://via.placeholder.com/800x400?text=AgriConseil+1", "https://via.placeholder.com/800x400?text=AgriConseil+2"]
  },
  "malischox": {
    title: "Malischox",
    description: "L'agenda culturel du Mali. Malischox permet de découvrir les événements festifs et culturels à venir. Intègre un calendrier dynamique et des fonctionnalités sociales.",
    techs: ["HTML", "SASS", "JavaScript", "API Google Calendar"],
    images: ["https://via.placeholder.com/800x400?text=Malischox+1", "https://via.placeholder.com/800x400?text=Malischox+2"]
  },
  "sikaa": {
    title: "Sikaa",
    description: "Application mobile de livraison urbaine. Elle connecte commerçants et livreurs indépendants avec un suivi GPS en temps réel des colis.",
    techs: ["Flutter", "Dart", "Google Maps API", "Firebase", "Supabase"],
    images: ["https://via.placeholder.com/800x400?text=Sikaa+1", "https://via.placeholder.com/800x400?text=Sikaa+2"]
  }
};

const techIcons = {
  "HTML5": "fab fa-html5", "CSS3": "fab fa-css3-alt", "JavaScript": "fab fa-js", "PHP": "fab fa-php",
  "MySQL": "fas fa-database", "WordPress": "fab fa-wordpress", "WooCommerce": "fas fa-shopping-cart",
  "React.js": "fab fa-react", "Node.js": "fab fa-node-js", "MongoDB": "fas fa-database",
  "Vue.js": "fab fa-vuejs", "Firebase": "fas fa-fire", "SASS": "fab fa-sass", "Flutter": "fas fa-mobile-alt",
  "Dart": "fas fa-code", "React Native": "fab fa-react", "Java": "fab fa-java", "SQL": "fas fa-database",
  "Supabase": "fas fa-bolt", "PWA": "fas fa-mobile-screen-button", "API Google Calendar": "fab fa-google",
  "CSS Personnalisé": "fab fa-css3", "Express": "fas fa-server"
};

/**
 * Peuple la page de détail du projet avec les données correspondantes.
 */
function initProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const project = projectsData[projectId];

  const titleEl = document.getElementById('project-title');
  const descriptionEl = document.getElementById('project-description');
  const techListEl = document.getElementById('project-techs');

  if (project) {
    document.title = `${project.title} - Ibrahima Keïta`;
    titleEl.textContent = project.title;
    descriptionEl.textContent = project.description;

    // Créer le slider d'images
    if (project.images && project.images.length > 0) {
      createImageSlider(project.images, project.title);
    }

    // Afficher les technologies
    project.techs.forEach(tech => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="${techIcons[tech] || 'fas fa-check-circle'}"></i> ${tech}`;
      techListEl.appendChild(li);
    });

  } else {
    titleEl.textContent = "Projet non trouvé";
    descriptionEl.textContent = "Désolé, le projet que vous cherchez n'existe pas ou a été déplacé.";
  }
}

/**
 * Crée et insère un slider d'images dans la page.
 * @param {string[]} images - Un tableau d'URL d'images.
 * @param {string} projectTitle - Le titre du projet pour le texte alt.
 */
function createImageSlider(images, projectTitle) {
  const sliderWrapper = document.createElement('div');
  sliderWrapper.className = 'slider-wrapper';

  let slidesHTML = '<div class="slides-container">';
  images.forEach(imgSrc => {
    slidesHTML += `<div class="slide"><img src="${imgSrc}" alt="Capture d'écran ${projectTitle}"></div>`;
  });
  slidesHTML += '</div>';

  if (images.length > 1) {
    slidesHTML += `
      <button class="slider-btn prev-btn" aria-label="Image précédente"><i class="fas fa-chevron-left"></i></button>
      <button class="slider-btn next-btn" aria-label="Image suivante"><i class="fas fa-chevron-right"></i></button>
    `;
  }
  sliderWrapper.innerHTML = slidesHTML;

  // Insère le slider avant la description
  const descriptionEl = document.getElementById('project-description');
  descriptionEl.parentNode.insertBefore(sliderWrapper, descriptionEl);

  // Logique du slider
  if (images.length > 1) {
    const slidesContainer = sliderWrapper.querySelector('.slides-container');
    const prevBtn = sliderWrapper.querySelector('.prev-btn');
    const nextBtn = sliderWrapper.querySelector('.next-btn');
    let currentSlide = 0;

    const updateSlidePosition = () => {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % images.length;
      updateSlidePosition();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      updateSlidePosition();
    });
  }
}