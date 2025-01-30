const menu = document.getElementById('menu-id');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuIcon.addEventListener('click',()=>{
    menu.style.display="flex";
    menuIcon.style.display="none";
    closeIcon.style.display="block";
});

closeIcon.addEventListener('click',()=>{
    menu.style.display="none";
    menuIcon.style.display="flex";
    closeIcon.style.display="none";
});

