document.addEventListener("DOMContentLoaded", () => {
  // --- SMOOTH SCROLL FOR NAVIGATION LINKS ---
  const navLinks = document.querySelectorAll(
    ".header__nav-link, .hero .button"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Ensure it's an on-page link
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start", // Ensure the element is at the top of the viewport
          });

          // For accessibility: give focus to the target section
          targetElement.setAttribute("tabindex", "-1");
          targetElement.focus();
          targetElement.removeAttribute("tabindex");
        }
      }
    });
  });

  // --- FADE-IN ANIMATION ON SCROLL (Generic for sections) ---
  const fadeElems = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null, // observes intersections relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // trigger when 10% of the element is visible
  };

  const generalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  fadeElems.forEach((elem) => {
    generalObserver.observe(elem);
  });

  // --- FADE-IN ANIMATION FOR ABOUT SECTION BULLET POINTS ---
  const bulletPoints = document.querySelectorAll(".about__bullet-item");

  const bulletObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% of the bullet point is visible
  };

  const bulletPointObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // You might keep observing here if you want them to fade out again,
        // but for a sequential reveal, unobserve is fine.
        // observer.unobserve(entry.target);
      } else {
        // Optional: if you want them to fade out when scrolling away
        // entry.target.classList.remove('is-visible');
      }
    });
  }, bulletObserverOptions);

  bulletPoints.forEach((point) => {
    bulletPointObserver.observe(point);
  });
});
