// Typing Animation

const roles = [
  "Frontend Developer",
  "Web Designer",
  "Full Stack Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typingElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }

  } else {

    typingElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;
      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();


// Navbar Active Link

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.clientHeight;

    if (
      pageYOffset >= sectionTop
      &&
      pageYOffset <
      sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === "#" + current
    ) {
      link.classList.add("active");
    }

  });

});


// Smooth Scroll

navLinks.forEach(link => {

  link.addEventListener("click", e => {

    e.preventDefault();

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});


// Scroll Reveal Animation

const observer =
new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.style.opacity = "1";

      entry.target.style.transform =
      "translateY(0)";

    }

  });

},{
threshold:0.1
});

const cards =
document.querySelectorAll(
".skill-card,.project-card,.contact-card"
);

cards.forEach(card => {

  card.style.opacity = "0";

  card.style.transform =
  "translateY(50px)";

  card.style.transition =
  ".6s ease";

  observer.observe(card);

});


// Dark Mode Toggle

const toggle =
document.querySelector(".theme-toggle");

toggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});

/*Database*/

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.querySelector("[name='name']").value,
        email: document.querySelector("[name='email']").value,
        subject: document.querySelector("[name='subject']").value,
        message: document.querySelector("[name='message']").value
    };

    try {
        const response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();
        alert(result);

        document.getElementById("contactForm").reset();

    } catch (error) {
        alert("Server not running");
    }
});