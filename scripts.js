const container = document.getElementById("container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");

const normButton = document.getElementById("normButton");
const rainbowButton = document.getElementById("rainbowButton");
const eraserButton = document.getElementById("eraserButton");
const clearButton = document.getElementById("clearButton");

let currentMode = 'normal'; // 'normal', 'rainbow', 'eraser'
let isDrawing = false;

// Initialize
createGrid(16);
sliderValue.textContent = slider.value;

// Mouse Event Listeners for Drawing
document.body.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.body.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Event Listeners
slider.addEventListener("input", () => {
    sliderValue.textContent = slider.value;
});

slider.addEventListener("change", () => {
    createGrid(slider.value);
});

clearButton.addEventListener("click", clearBoard);

normButton.addEventListener("click", () => {
    currentMode = 'normal';
});

rainbowButton.addEventListener("click", () => {
    currentMode = 'rainbow';
});

eraserButton.addEventListener("click", () => {
    currentMode = 'eraser';
});

// Event Delegation for better performance
container.addEventListener("mouseover", (e) => {
    if (!isDrawing) return;
    if (!e.target.classList.contains("box")) return;
    draw(e.target);
});

container.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("box")) return;
    draw(e.target);
});

// Prevent default drag behavior
container.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

// Touch support for mobile
container.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling
    isDrawing = true;
    handleTouch(e);
}, { passive: false });

container.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling
    if (isDrawing) handleTouch(e);
}, { passive: false });

container.addEventListener("touchend", () => {
    isDrawing = false;
});

function handleTouch(e) {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (target && target.classList.contains("box")) {
        draw(target);
    }
}

function draw(target) {
    if (currentMode === 'rainbow') {
        target.style.backgroundColor = getRandomColor();
    } else if (currentMode === 'eraser') {
        target.style.backgroundColor = "white";
    } else {
        target.style.backgroundColor = "black";
    }
}

function clearBoard() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.innerHTML = "";
    
    // Use CSS Grid for layout
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const totalBoxes = size * size;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        fragment.appendChild(box);
    }
    
    container.appendChild(fragment);
}
