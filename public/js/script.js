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
    filters.scrollLeft += icon.id === "left" ? -350 : 350;
    handleIcons();
  });
});

const startDrag = (e) => {
  isDragging = true;
  filters.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = filters.scrollLeft;
};

const onDrag = (e) => {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const walk = (x - startX) * 1.5; // Adjust speed
  filters.scrollLeft = startScrollLeft - walk;
  handleIcons();
};

const stopDrag = () => {
  isDragging = false;
  filters.classList.remove("dragging");
};

// Mouse events
filters.addEventListener("mousedown", startDrag);
filters.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", stopDrag);

// Touch events
filters.addEventListener("touchstart", startDrag);
filters.addEventListener("touchmove", onDrag);
filters.addEventListener("touchend", stopDrag);

// Two-finger scroll behavior
filters.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    filters.scrollLeft += e.deltaY > 0 ? 200 : -200;
    handleIcons();
  },
  { passive: false }
);
