const spinner = document.getElementById("wheel");
const pin = document.getElementById("pin");
const data = [
  "1 month comp",
  "1 month support plan",
  "1 month skin glow",
  "15 day post fes",
  "1 consultation with dt",
  "1 month yoga",
  "20% off on diet",
  "spin again",
];
let spinning = false;
let selectedValue = null;

pin.addEventListener("click", () => {
  selectedValue = null;
  if (!spinning) {
    spinning = true;
    const spinDuration = 8000; // 8 seconds
    const initialRotation = getRotationDegrees(spinner);
    const targetRotation = initialRotation + getRandomRotation();
    const selectedValue = lla(targetRotation);

    console.log({
      selectedValue: data[selectedValue],
      initialRotation,
      targetRotation,
    });

    spinner.style.transition = "transform 0s";
    spinner.style.transform = `rotate(${initialRotation}deg)`;

    // Trigger layout to ensure the initial rotation is applied
    spinner.getBoundingClientRect();

    spinner.style.transition = `transform ${spinDuration}ms cubic-bezier(0.4, 0.2, 0.2, 1)`;
    spinner.style.transform = `rotate(${targetRotation}deg)`;

    setTimeout(() => {
      spinning = false;
      spinner.style.transition = "";
    }, spinDuration);


    // console.log(selectedValue)
    // console.log(data[7])
    if (selectedValue == 7) {
      setTimeout(function () {
        window.location.reload();
        console.log('spin_againnn')
      },10000);
    } else {
      const closeBtn = document.querySelector("#closeModal");
      const modal = document.querySelector("#modal");
      setTimeout(function () {
        modal.classList.add("open");

        closeBtn.addEventListener("click", () => {
          modal.classList.remove("open");
          var formControl = document.querySelector(".form_start");
          formControl.scrollIntoView({ behavior: "smooth" });
        });
      }, 10000);
    }

  }
});

function getRotationDegrees(element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
}

function getRandomRotation() {
  const minRotations = 3; // Minimum number of rotations
  const maxRotations = 10; // Maximum number of rotations
  const randomRotations =
    Math.random() * (maxRotations - minRotations) + minRotations;
  return 360 * randomRotations; // rotate multiple times
}

function checkCurrentSection(currentRotation) {
  const sectionAngle = 360 / 8; // Angle of each section
  const normalizedRotation = ((currentRotation % 360) + 360) % 360; // Normalize to positive values

  const currentSectionIndex = Math.floor(normalizedRotation / sectionAngle);
  // console.log("Current Section Index:", currentSectionIndex);
  return currentSectionIndex;
}

function lla(final) {
  const absoluteAngle = final % 360;
  const index = Math.floor(absoluteAngle / 45);
  return index;
}
