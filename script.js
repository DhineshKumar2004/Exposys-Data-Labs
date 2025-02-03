const menu = document.getElementById('menu-id');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector('.cart-count').innerHTML = cart.length;

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
    const linkPath = new URL(link.href).pathname;

    if (currentPage.endsWith(linkPath) || (currentPage === '/' && linkPath.endsWith('index.html'))) {
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
const service = document.querySelectorAll('.service');
const courses = document.querySelectorAll('.course');
const clients = document.querySelectorAll('.client');
const careers = document.getElementById('careers');





//  Function to toggle dark mode
function toggleMode() {
    body.classList.toggle('light-mode-bg-color');
    name.classList.toggle('light-mode-font-color');
    header.classList.toggle('header-light-mode');

    span.forEach(span => span.classList.toggle('light-mode-font-color'));
    bolds.forEach(bold => bold.classList.toggle('light-mode-font-color'));

    if (currentPage.includes('index') || currentPage === '/') {
        about.classList.toggle('light-mode-font-color');
        section1.classList.toggle('light-mode-font-color');
    }

    service.forEach(service => {
        service.classList.toggle('light-mode-service-color');
    });

    courses.forEach(course => {
        course.classList.toggle('light-mode-service-color');
    })

    clients.forEach(client => {
        client.classList.toggle('light-mode-font-color');
    })

    if (currentPage.includes('careers')) {
        careers.classList.toggle('light-mode-font-color');
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

// courses


document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the course page before fetching courses
    const courseContainer = document.querySelector(".container");
    if (courseContainer) {
        fetchCourses(courseContainer);
    }

    // Check if we're on the cart page before loading cart items
    const cartContainer = document.querySelector(".cart-container");
    if (cartContainer) {
        loadCart();
    }
});

let datas = [];

function fetchCourses(courseContainer) {
    fetch('course.json').then((res) => res.json()).then((data => {
        datas = data;
        datas.forEach(data => {
            courseContainer.innerHTML += `<div class="course-container">
            <img src="${data.image} "alt="">
            <h2>${data.title}</h2>
            <p>${data.description}</p><br>
            <span style="color:#ccc;">Price: ₹${data.price}</span>
            <a href="#"><button class="btn add-to-cart" data-id=${data.id}>Add to cart</button></a>
            <h5 style="color:#ccc;">Published on ${data.published_date}</h5>
        </div>`;
        });
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = event.target.dataset.id;
                addToCart(courseId, data);
            });
        });
    }));
}

function addToCart(courseId, courses) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.innerHTML = cart.length + 1;
    if (!cart.some(course => course.id == courseId)) {
        const selectedCourse = courses.find(course => course.id == courseId);
        cart.push(selectedCourse);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${selectedCourse.title} added to cart!`);
    }
    else {
        alert("Course already in cart!");
    }
}

// Function to display cart items on another page
function loadCart() {
    const cartContainer = document.querySelector(".cart-container");
    const totalPrice = document.querySelector(".total");
    const buyNowBtn = document.querySelector(".buy-btn");
    let totalCost = 0;


    if (!cartContainer) {
        return; // Stop function execution if the cart container is not found
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];



    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        totalPrice.innerHTML = '';
        buyNowBtn.style.display = "none";

        return;
    }

    cartContainer.innerHTML = cart.map(course => `
      <div class="cart-item">
        <img class="cart-img" src="${course.image} "alt="">
        <h3>${course.title}</h3>
        <p>${course.description}</p><br>
        <span style="color: black;">Price: ₹${course.price}</span><br>
        <button class="remove-from-cart btn" data-id="${course.id}">Remove</button>
      </div>
    `).join("");

    cart.forEach((cart) => {
        totalCost += cart.price;
        totalPrice.innerHTML = `Total Cost: ₹${totalCost}`;
    });

    // Remove button event listeners
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const courseId = event.target.dataset.id;
            removeFromCart(courseId);
        });
    });
}

function removeFromCart(courseId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(course => course.id != courseId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
    loadCart();
}

// careers page

if (currentPage.includes('careers')) {
    jobFetch();
    const jobSection = document.querySelector('.openings');

    let jobDetails = [];

    function jobFetch() {
        fetch('jobs.json').then((res) => res.json()).then((data) => {
            jobDetails = data;
            
            jobDetails.forEach(job => {
                jobSection.innerHTML += `
                
                    <h1>${job.id}. ${job.title}</h1>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Type:</strong> ${job.type}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <p><strong>Requirements</strong></p>
                    <li>${job.requirements[0]}</li>
                    <li>${job.requirements[1]}</li>
                    <li>${job.requirements[2]}</li>
                    <li>${job.requirements[3]}</li><br>
                    <a class="apply" href="https://docs.google.com/forms/d/e/1FAIpQLSe690OuSNB_8Ba26Skpflweojxq8Zn5J6h-3CLKaKEvwLBnpw/viewform?usp=header">Apply here</a><br><br>
                    <hr>
            `
            });
        });
    }
}


// contact page
const submitBtn = document.getElementById("submit-btn");
const submitted = document.querySelector('.submitted');
if(currentPage.includes('contact')){
    submitBtn.addEventListener('click', (e)=>{
        const form = document.getElementById('fname');
        const value = form.value.trim();
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const number = document.getElementById('phone');
        const numberValue = number.value.trim();
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        e.preventDefault();
        if(value ===''|| emailValue ===''||numberValue===''){
            alert('Enter all the details');
            form.focus();
            return;
        }
        form.value='';
        email.value='';
        number.value='';
        menuIcon.value='';
        message.value='';
    
        submitted.style.display='block';
        setTimeout(()=>{
            submitted.style.display='none';
        },2000);
    });
}

















