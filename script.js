const menu = document.getElementById('menu-id');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuIcon.addEventListener('click', () => {
    menu.style.display = "flex";
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
});

closeIcon.addEventListener('click', () => {
    menu.style.display = "none";
    menuIcon.style.display = "flex";
    closeIcon.style.display = "none";
});


//currentPage Highlight
const currentPage = window.location.pathname;
const links = document.querySelectorAll('.links');
links.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active');
    }
});



// darkmode-lightmode toggle

const mode = document.getElementById('mode');
const body = document.body;
const name = document.getElementById('name');
const section1 = document.getElementById('section1');
const header = document.getElementById('header');
const modeIcon = document.getElementById('mode-icon');
const about = document.querySelector('#about');
const span = document.querySelectorAll('.spans');
const bolds = document.querySelectorAll('.bold');


//  Function to toggle dark mode
function toggleMode() {
    body.classList.toggle('light-mode-bg-color');
    name.classList.toggle('light-mode-font-color');
    header.classList.toggle('header-light-mode');

    span.forEach(span => span.classList.toggle('light-mode-font-color'));
    bolds.forEach(bold => bold.classList.toggle('light-mode-font-color'));

    if (currentPage.includes('index.html') || currentPage === '/') {
        about.classList.toggle('light-mode-font-color');
        section1.classList.toggle('light-mode-font-color');
    }

    // Save user preference in localStorage
    const isLightMode = body.classList.contains('light-mode-bg-color');
    localStorage.setItem('lightMode', isLightMode ? 'enabled' : 'disabled');

    // Change mode icon
    modeIcon.setAttribute('src', isLightMode ? 'images/darkmode.png' : 'images/lightmode.png');
}

// Apply saved preference on page load
if (localStorage.getItem('lightMode') === 'enabled') {
    toggleMode(); // Apply dark mode if previously enabled
}

// Add event listener to toggle mode
mode.addEventListener('click', toggleMode);


//name,links,section1,h2,about,p,.img1-content>p>span,.img2-content>p>span,.section2>p>span,.section3>p>span


