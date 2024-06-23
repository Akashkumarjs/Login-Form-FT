// scripts.js

// Function to create progressive writing placeholder
function setProgressivePlaceholder(inputElement, text, delay = 100) {
    let currentIndex = 0;

    const typeText = () => {
        if (currentIndex < text.length) {
            inputElement.placeholder += text[currentIndex];
            currentIndex++;
            setTimeout(typeText, delay);
        }
    };

    // Reset placeholder before starting
    inputElement.placeholder = '';
    typeText();
}

// Function to handle progressive writing for all inputs simultaneously
function applyProgressivePlaceholders() {
    const inputs = [
        { id: 'urname', text: 'Example' },
        { id: 'gid', text: 'Example@xyz.com' },
        { id: 'password', text: 'Example$123' },
        { id: 'adno', text: 'XXXX XXXX XXXX' },
        { id: 'cots', text: 'Your thoughts here' },
    ];

    // Start the progressive placeholder for all inputs simultaneously
    inputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            setProgressivePlaceholder(element, input.text);
        }
    });
}

// Execute the function on page load
window.onload = applyProgressivePlaceholders;

let parameters = {
    count: false,
    letters: false,
    numbers: false,
    special: false
};
let strengthBar = document.getElementById("strength-bar");
let msg = document.getElementById("msg");

function strengthChecker() {
    let password = document.getElementById("password").value;

    parameters.letters = (/[A-Za-z]+/.test(password)) ? true : false;
    parameters.numbers = (/[0-9]+/.test(password)) ? true : false;
    parameters.special = (/[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)) ? true : false;
    parameters.count = (password.length > 7) ? true : false;

    let barLength = Object.values(parameters).filter(value => value);

    console.log(Object.values(parameters), barLength);

    strengthBar.innerHTML = "";
    for (let i in barLength) {
        let span = document.createElement("span");
        span.classList.add("strength");
        strengthBar.appendChild(span);
    }

    let spanRef = document.getElementsByClassName("strength");
    for (let i = 0; i < spanRef.length; i++) {
        switch (spanRef.length - 1) {
            case 0:
                spanRef[i].style.background = "#ff3e36";
                msg.textContent = "Your password is very weak";
                break;
            case 1:
                spanRef[i].style.background = "#ff691f";
                msg.textContent = "Your password is weak";
                break;
            case 2:
                spanRef[i].style.background = "#ffda36";
                msg.textContent = "Your password is good";
                break;
            case 3:
                spanRef[i].style.background = "#0be881";
                msg.textContent = "Your password is strong";
                break;
        }
    }
}

function toggle() {
    let password = document.getElementById("password");
    let eye = document.getElementById("toggle");

    if (password.getAttribute("type") == "password") {
        password.setAttribute("type", "text");
        eye.style.color = "rgb(106 159 165)";
    } else {
        password.setAttribute("type", "password");
        eye.style.color = "#808080";
    }
}

let message = document.getElementById("message");

let messageOnline = () => {
    message.textContent = "Connected";
    message.style.cssText = "background-color: #e7f6d5; color: #689f38";
};
let messageOffline = () => {
    message.textContent = "No Internet Connection";
    message.style.cssText = "background-color: #ffdde0; color: #d32f2f";
};

if (window.navigator.onLine) {
    messageOnline();
} else {
    messageOffline();
}

window.addEventListener("online", messageOnline);
window.addEventListener("offline", messageOffline);
