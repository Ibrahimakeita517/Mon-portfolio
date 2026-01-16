document.getElementById("annee").innerText = new Date().getFullYear();

// Mode sombre / clair
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Formulaire dynamique
const form = document.getElementById("contact-form");
const result = document.getElementById("form-result");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (nom === "" || email === "" || message === "") {
      result.innerText = "Veuillez remplir tous les champs.";
      result.style.color = "red";
      return;
    }

    result.innerText = "Message envoyé avec succès !";
    result.style.color = "green";
    form.reset();
  });
}

// Animation au scroll
const fadeEls = document.querySelectorAll(".fade-in");

function handleScroll() {
  fadeEls.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();
// EFFET "TRAÎNÉE DE SOURIS"
// On active ces effets uniquement sur PC (écrans > 768px) pour la performance mobile
if (window.matchMedia("(min-width: 768px)").matches) {
document.addEventListener('DOMContentLoaded', () => {
  const trailer = document.createElement('div');
  trailer.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(253, 255, 253, 1) 0%, rgba(0,150,255,0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
  `;
  document.body.appendChild(trailer);

  document.addEventListener('mousemove', e => {
  trailer.style.left = `${e.pageX}px`;
  trailer.style.top = `${e.pageY}px`;
  
  // Interaction avec les éléments cliquables
  const target = e.target.closest('a, button, .btn');
  if (target) {
    trailer.style.width = '40px';
    trailer.style.height = '40px';
    trailer.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,150,255,0) 70%)';
  } else {
    trailer.style.width = '20px';
    trailer.style.height = '20px';
    trailer.style.background = 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(0,150,255,0) 70%)';
  }
}); // EFFET "TYPING" POUR LES TITRES ET SOUS-TITRES
  const titles = document.querySelectorAll('h1, h2, .subtitle');
  titles.forEach(title => {
    const text = title.innerText;
    title.innerText = '';
    
    let i = 0;
    const typing = setInterval(() => {
      title.innerText += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typing);
        title.classList.add('blink-cursor');
      }
    }, 100);
  });

  // EFFET "PARALLAX 3D"
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      project.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
      `;
    });
    
    project.addEventListener('mouseleave', () => {
      project.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
  });
});
}
// ================= EFFETS AVANCÉS =================
// 1. Détection du scroll pour animations
document.addEventListener('DOMContentLoaded', () => {
  // Ajoute la classe "loaded" au body après chargement
  document.body.classList.add('loaded');

  // EFFET TYPING (Machine à écrire) pour le sous-titre
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    const text = subtitle.innerText;
    subtitle.innerText = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.innerText += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Vitesse de frappe (ms)
      } else {
        subtitle.classList.add('blink-cursor'); // Ajoute le curseur clignotant à la fin
      }
    }
    setTimeout(typeWriter, 500); // Petit délai avant de commencer
  }

  // 2. Effet de vague sur les inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentNode.style.transform = 'scale(1.02)';
      input.style.borderColor = '#08f';
    });
    input.addEventListener('blur', () => {
      input.parentNode.style.transform = 'scale(1)';
      input.style.borderColor = '#ccc';
    });
  });

  // 3. Confetti sur l'envoi du formulaire
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.7) 100%);
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 1000);
    });
  }

  // 4. Effet de lumière dynamique
  if (window.matchMedia("(min-width: 768px)").matches) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.setProperty('--mouse-x', x);
    document.body.style.setProperty('--mouse-y', y);
  });
  }
});
// À ajouter dans votre script.js
document.addEventListener('DOMContentLoaded', () => {
  // Force le mode sombre
  document.body.classList.add('dark-mode');
  
  // Stocke la préférence
  localStorage.setItem('darkMode', 'enabled');
});

// Animation des barres de progression au scroll
const progressBars = document.querySelectorAll('.progress');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const bar = entry.target;
    if (entry.isIntersecting) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;

      // Changement de couleur selon le pourcentage
      const percent = parseInt(width);
      if (percent > 80) {
        bar.style.backgroundColor = '#2ecc71'; // Vert pour expert
      } else if (percent < 50) {
        bar.style.backgroundColor = '#e67e22'; // Orange pour débutant/intermédiaire
      } else {
        bar.style.backgroundColor = ''; // Couleur par défaut (Bleu) pour le reste
      }
    } else {
      bar.style.width = '0';
    }
  });
}, { threshold: 0.1 }); // Se déclenche quand 10% de la barre est visible

progressBars.forEach(bar => {
  observer.observe(bar);
});

// Bouton Retour en haut
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Mise en surbrillance du menu actif au scroll
const sections = document.querySelectorAll("#about, #skills, #projects, #contact");
const navLinks = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) { // 150px de marge pour compenser la navbar
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Gestion de la transparence de la navbar
const navbar = document.querySelector(".navbar");
function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateNavbar);
updateNavbar(); // Appel initial au chargement

// ================= GESTION PAGE PROJET (Détails) =================
const projectsData = {
  "anwkasugu": {
    title: "Anw Ka Sugu",
    description: "Anw Ka Sugu est une boutique en ligne locale qui permet aux clients de découvrir et commander facilement des produits courants du Mali. Grâce à un système de panier, de livraison et de paiement mobile, l’application rend les achats rapides, pratiques et accessibles à tous. J'ai utilisé des technologies modernes pour assurer une expérience fluide.",
    techs: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    images: [
      "img/anwkasugu-accueil.jpg", 
      "img/anwkasugu-panier.jpg", 
      "img/anwkasugu-mobile.jpg"
    ]
  },
  "malicraft": {
    title: "MaliCraft",
    description: "MaliCraft (Créations Artisanales) est une boutique en ligne conçue pour aider les jeunes artisans maliens à vendre leurs créations. Le site inclut une galerie interactive, un panier d'achat et une intégration de paiement mobile.",
    techs: ["WordPress", "WooCommerce", "CSS Personnalisé", "Payment API"],
    images: ["https://via.placeholder.com/800x400?text=MaliCraft+1", "https://via.placeholder.com/800x400?text=MaliCraft+2"]
  },
  "jobgo": {
    title: "JobGo",
    description: "JobGo est une plateforme innovante de mise en relation entre demandeurs d'emploi et recruteurs au Mali. Elle propose des filtres avancés, un système de CV en ligne et une messagerie instantanée.",
    techs: ["React.js", "Node.js", "MongoDB", "Express"],
    images: ["https://via.placeholder.com/800x400?text=JobGo+1", "https://via.placeholder.com/800x400?text=JobGo+2"]
  },
  "agriconseil": {
    title: "AgriConseil",
    description: "Plateforme dédiée à l'agriculture, AgriConseil fournit des outils de suivi de culture et des conseils personnalisés aux agriculteurs pour optimiser leurs rendements.",
    techs: ["Vue.js", "Firebase", "PWA (Progressive Web App)"],
    images: ["https://via.placeholder.com/800x400?text=AgriConseil+1", "https://via.placeholder.com/800x400?text=AgriConseil+2"]
  },
  "malischox": {
    title: "Malischox",
    description: "L'agenda culturel du Mali. Malischox permet de découvrir les événements festifs et culturels à venir. Intègre un calendrier dynamique et des fonctionnalités sociales.",
    techs: ["HTML", "SASS", "JavaScript Vanilla", "API Google Calendar"],
    images: ["https://via.placeholder.com/800x400?text=Malischox+1", "https://via.placeholder.com/800x400?text=Malischox+2"]
  },
  "sikaa": {
    title: "Sikaa",
    description: "Application mobile de livraison urbaine. Elle connecte commerçants et livreurs indépendants avec un suivi GPS en temps réel des colis.",
    techs: ["Flutter", "Dart", "Google Maps API", "Firebase Auth"],
    images: ["https://via.placeholder.com/800x400?text=Sikaa+1", "https://via.placeholder.com/800x400?text=Sikaa+2"]
  }
};

// Si on est sur la page project.html
const projectTitleEl = document.getElementById('project-title');
if (projectTitleEl) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const project = projectsData[projectId];

  if (project) {
    projectTitleEl.innerText = project.title;
    document.getElementById('project-description').innerText = project.description;
    
    // --- GESTION DU SLIDER ---
    if (project.images && project.images.length > 0) {
      const descEl = document.getElementById('project-description');
      
      // Création du conteneur du slider
      const sliderWrapper = document.createElement('div');
      sliderWrapper.className = 'slider-wrapper';
      
      let slidesHTML = '<div class="slides-container">';
      project.images.forEach(imgSrc => {
        slidesHTML += `<div class="slide"><img src="${imgSrc}" alt="Capture d'écran ${project.title}"></div>`;
      });
      slidesHTML += '</div>';
      
      // Ajout des boutons si plus d'une image
      if (project.images.length > 1) {
        slidesHTML += `
          <button class="slider-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="slider-btn next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
      }
      
      sliderWrapper.innerHTML = slidesHTML;
      // Insère le slider avant la description
      descEl.parentNode.insertBefore(sliderWrapper, descEl);

      // Logique du slider
      if (project.images.length > 1) {
        const slidesContainer = sliderWrapper.querySelector('.slides-container');
        const prevBtn = sliderWrapper.querySelector('.prev-btn');
        const nextBtn = sliderWrapper.querySelector('.next-btn');
        let currentSlide = 0;

        const updateSlide = () => {
          slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % project.images.length;
          updateSlide();
        });

        prevBtn.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + project.images.length) % project.images.length;
          updateSlide();
        });
      }
    }

    const techList = document.getElementById('project-techs');
    project.techs.forEach(tech => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-primary-light); margin-right: 10px;"></i> ${tech}`;
      techList.appendChild(li);
    });
  } else {
    projectTitleEl.innerText = "Projet non trouvé";
    document.getElementById('project-description').innerText = "Désolé, ce projet n'existe pas ou a été supprimé.";
  }
}