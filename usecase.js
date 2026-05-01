function showStep(n) {
    let steps = document.querySelectorAll(".step");
    let buttons = document.querySelectorAll(".sidebar button");

    steps.forEach(step => step.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById("step" + n).classList.add("active");
    buttons[n - 1].classList.add("active");
}

window.onload = function() {
    showStep(1);
};