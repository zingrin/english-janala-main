const logoutButton = document.getElementById("Logout");

const learnButton = document.getElementById("vacabularies");
const mainSection = document.getElementById("main");
const heroSection = document.getElementById("heroSection");


const passwordInput = document.getElementById("password")
const navButton = document.getElementById("navbar");

const loginButton = document.getElementById("login");
loginButton.onclick = function () {
    var password = passwordInput.value.trim();
    if (password === '123456') {
        navButton.classList.remove("hidden")
        heroSection.classList.add("hidden")
        mainSection.classList.remove("hidden")
    }
};
logoutButton.onclick =  function () {
        navButton.classList.add("hidden")
        heroSection.classList.remove("hidden")
        mainSection.classList.add("hidden")
    
};