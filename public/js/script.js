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

const handleIcons = () => {
  let scrollValue = Math.round(filters.scrollLeft);
  let maxScrollableWidth = filters.scrollWidth - filters.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollValue > 0 ? "flex" : "none";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth > scrollValue ? "flex" : "none";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // If clicked icon is left, reduce 350 from filters scrollLeft else add
    filters.scrollLeft += icon.id === "left" ? -350 : 350;
    handleIcons();
  });
});

// Dragging logic for mouse and touch events
const startDragging = (e) => {
  isDragging = true;
  filters.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = filters.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  let currentX = e.pageX || e.touches[0].pageX;
  let movement = currentX - startX;
  filters.scrollLeft = startScrollLeft - movement;
  handleIcons();
};

const stopDragging = () => {
  isDragging = false;
  filters.classList.remove("dragging");
};

// Mouse events
filters.addEventListener("mousedown", startDragging);
filters.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", stopDragging);

// Touch events for mobile support
filters.addEventListener("touchstart", startDragging);
filters.addEventListener("touchmove", dragging);
filters.addEventListener("touchend", stopDragging);
