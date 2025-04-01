(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/*checkbox for tax*/
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxinfo = document.getElementsByClassName("tax-info");
  for (info of taxinfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

/*filters*/
const filters = document.querySelector("#filters");
const arrowIcons = document.querySelectorAll(".icon i");
let isDragging = false;
let startX, startScrollLeft;

// Apply touch-action to prevent browser interference
filters.style.touchAction = "none";

// Function to show/hide arrow icons based on scroll position
const handleIcons = () => {
  let scrollValue = Math.round(filters.scrollLeft);
  let maxScrollableWidth = filters.scrollWidth - filters.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollValue > 0 ? "flex" : "none";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth > scrollValue ? "flex" : "none";
};

// Click event for left and right arrows (One-by-One Fast Scrolling)
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let scrollAmount = filters.clientWidth / 4; // Scroll one item at a time
    filters.scrollBy({
      left: icon.id === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(handleIcons, 300);
  });
});

// Drag start event (Works on both Mouse & Touch)
const startDrag = (e) => {
  isDragging = true;
  filters.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = filters.scrollLeft;
};

// Drag move event (Now Works on Mobile)
const onDrag = (e) => {
  if (!isDragging) return;
  e.preventDefault(); // Prevents browser scroll issues on mobile
  const x = e.pageX || e.touches[0].pageX;
  const walk = (x - startX) * 2.5; // Adjust speed for smooth experience
  filters.scrollLeft = startScrollLeft - walk;
  handleIcons();
};

// Drag stop event
const stopDrag = () => {
  isDragging = false;
  filters.classList.remove("dragging");
};

// Mouse events for dragging
filters.addEventListener("mousedown", startDrag);
filters.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", stopDrag);

// Touch events for dragging (Now 100% Working on Mobile)
filters.addEventListener("touchstart", startDrag, { passive: false });
filters.addEventListener("touchmove", onDrag, { passive: false });
filters.addEventListener("touchend", stopDrag);

// Smooth scrolling with trackpad (two-finger swipe)
filters.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaX === 0 && e.deltaY === 0) return;
    e.preventDefault();
    filters.scrollLeft += e.deltaX !== 0 ? e.deltaX * 2 : e.deltaY * 3;
    handleIcons();
  },
  { passive: false }
);

// Disable smooth behavior for fast snapping while dragging
filters.style.scrollBehavior = "auto";

/*preloader*/
window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});
