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
arrowIcons = document.querySelectorAll(".icon i");
let isDragging = false;
let isPressed = false;
const handleIcons = () => {
  let scrollVlaue = Math.round(filters.scrollLeft);
  let maxScrollableWidth = filters.scrollWidth - filters.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVlaue > 0 ? "flex" : "none";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth > scrollVlaue ? "flex" : "none";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    //if clicked icon is left, reduce 350 from filters scrollleft else add
    filters.scrollLeft += icon.id === "left" ? -350 : 350;
    handleIcons();
  });
});
const dragging = (e) => {
  if (!isDragging) return;
  filters.classList.add("dragging");
  filters.scrollLeft -= e.movementX;
  handleIcons();
};

const dragStop = () => {
  isDragging = false;
  filters.classList.remove("dragging");
};
filters.addEventListener("mousedown", () => (isDragging = true));
filters.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
