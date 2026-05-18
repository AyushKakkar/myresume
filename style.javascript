// script.js

// LOADER

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200);
});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// CLOSE MENU ON CLICK

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// REVEAL ANIMATION

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const revealTop = item.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ACTIVE NAVBAR

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// TYPING EFFECT

const typingText = document.getElementById("typing-text");

const words = [
  "Building AI-powered experiences.",
  "Learning Machine Learning.",
  "Creating modern websites.",
  "Exploring startups & technology.",
  "Learning prompt engineering."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingText.textContent = currentWord.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// CURSOR GLOW

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// SKILL ANIMATION

const progressBars = document.querySelectorAll(".progress");

function animateSkills() {

  progressBars.forEach((bar) => {

    const rect = bar.getBoundingClientRect();

    if (rect.top < window.innerHeight - 50) {
      bar.style.width = bar.dataset.width;
    }
  });
}

window.addEventListener("scroll", animateSkills);
animateSkills();

// STATS COUNTER

const counters = document.querySelectorAll("[data-target]");

let counted = false;

function runCounter() {

  if (counted) return;

  counters.forEach((counter) => {

    const rect = counter.getBoundingClientRect();

    if (rect.top < window.innerHeight) {

      counted = true;

      const target = +counter.dataset.target;
      let current = 0;

      const increment = target / 80;

      const updateCounter = () => {

        current += increment;

        if (current < target) {
          counter.innerText = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    }
  });
}

window.addEventListener("scroll", runCounter);

// CONTACT FORM VALIDATION

const form = document.getElementById("contact-form");
const message = document.querySelector(".form-message");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const text = document.getElementById("message").value.trim();

  if (!name || !email || !text) {
    message.textContent = "Please fill all fields.";
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    message.textContent = "Enter a valid email.";
    return;
  }

  message.textContent = "Message sent successfully.";

  form.reset();
});

// SMOOTH FLOAT EFFECT

const cards = document.querySelectorAll(
  ".project-card, .skill-card, .stat-card"
);

cards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform =
      `perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
