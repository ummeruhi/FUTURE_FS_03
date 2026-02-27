// 1) Set year
document.getElementById("year").textContent = new Date().getFullYear();

// 2) Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a link (mobile)
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("show"));
});

// 3) Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// 4) Menu filter
const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".menu-item");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.getAttribute("data-filter");
    items.forEach(item => {
      const cat = item.getAttribute("data-category");
      item.style.display = (filter === "all" || filter === cat) ? "block" : "none";
    });
  });
});

// 5) Reviews auto-rotate
const reviews = [
  { text: "“Amazing coffee and cozy vibe. Loved the brownie!”", author: "— Ayesha" },
  { text: "“Best cold coffee in the area. Great service!”", author: "— Rahim" },
  { text: "“Perfect place to sit and work. Wi-Fi is good too.”", author: "— Sana" }
];

let i = 0;
const reviewText = document.getElementById("reviewText");
const reviewAuthor = document.getElementById("reviewAuthor");

setInterval(() => {
  i = (i + 1) % reviews.length;
  reviewText.textContent = reviews[i].text;
  reviewAuthor.textContent = reviews[i].author;
}, 3500);

// 6) Contact form validation
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2) return showMsg("Please enter a valid name.");
  if (!/^[0-9]{10}$/.test(phone)) return showMsg("Enter a valid 10-digit phone number.");
  if (message.length < 5) return showMsg("Message should be at least 5 characters.");

  showMsg("✅ Message submitted!", true);
  form.reset();
});

function showMsg(msg, ok=false){
  formMsg.textContent = msg;
  formMsg.style.color = ok ? "#7dd3fc" : "#f4b24a";
}

// 7) WhatsApp order buttons (EDIT YOUR NUMBER)
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Example: 919876543210

function makeWhatsAppLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const orderText = "Hi! I want to place an order from Ralph’s Coffee.";
document.getElementById("whatsAppOrderTop").href = makeWhatsAppLink(orderText);
document.getElementById("whatsAppOrderMenu").href = makeWhatsAppLink("Hi! Please share today's full menu & offers.");
document.getElementById("whatsAppOrderContact").href = makeWhatsAppLink("Hi! I want to know your location and timings.");
document.getElementById("whatsAppFloat").href = makeWhatsAppLink("Hi! I have a query about Ralph’s Coffee.");

// 8) Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navA = document.querySelectorAll("#navLinks a[href^='#']");

function setActiveLink() {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 140;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });

  navA.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// 9) Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
});