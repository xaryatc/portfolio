// Mode toggle
const modeToggle = document.getElementById("modeToggle");
const icon = modeToggle.querySelector("i");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// Animasi scroll diperluas
const revealElements = document.querySelectorAll("section, .fade-in");

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Debounce untuk optimalkan performa scroll
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    revealOnScroll();
    updateActiveNav();
  }, 50);
});
window.addEventListener("load", () => {
  revealOnScroll();
  typeWriter();
});

// Efek ketik
const typingText = document.getElementById("typing-text");
const texts = [
  "Hello, Welcome to My Portfolio.",
  "Network Engineer",
  "Transmission & Transport Network",
  "Front End Developer",
  "Problem Solver",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex--);
  } else {
    typingText.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1600);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, isDeleting ? 40 : 80);
  }
}

window.addEventListener("load", () => {
  typeWriter();
});

// Scroll-spy: Highlight link aktif saat scroll
const navLinkItems = document.querySelectorAll("nav a");

function updateActiveNav() {
  let fromTop = window.scrollY + 100;
  navLinkItems.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Mobile menu toggle
const toggleBtn = document.getElementById("menu-toggle");
const navLinksContainer = document.getElementById("nav-links");

toggleBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
  // Aksesibilitas
  const isExpanded = navLinksContainer.classList.contains("open");
  toggleBtn.setAttribute("aria-expanded", isExpanded);
});

// Tutup menu saat klik link di mobile
navLinksContainer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".toggle-detail").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button
      .closest(".project-card-container")
      .querySelector(".project-detail");
    detail.style.display = detail.style.display === "block" ? "none" : "block";
  });
});

// PROJECT IMAGE
function nextImage(button) {
  const container = button.closest(".project-image-carousel");
  const images = container.querySelectorAll("img");
  let current = Array.from(images).findIndex((img) =>
    img.classList.contains("active")
  );
  images[current].classList.remove("active");
  const next = (current + 1) % images.length;
  images[next].classList.add("active");
}

function prevImage(button) {
  const container = button.closest(".project-image-carousel");
  const images = container.querySelectorAll("img");
  let current = Array.from(images).findIndex((img) =>
    img.classList.contains("active")
  );
  images[current].classList.remove("active");
  const prev = (current - 1 + images.length) % images.length;
  images[prev].classList.add("active");
}
