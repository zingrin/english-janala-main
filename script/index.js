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

const showLessonBtn = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all')
    const levels = await res.json();
    const allLevels = levels.data;
    const levelContainer = document.getElementById('levelContainer');
    allLevels.forEach(level => {
        const div = document.createElement('div');
        div.innerHTML = `
         <button
                    class="btn text-blue-800 border border-blue-500 flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-blue-700 hover:text-white">
                    <img src="./assets/fa-book-open.png" alt="" class="w-5 h-5 hover:text-white">
                    Lesson -${level.level_no}
                </button>
        `
        levelContainer.appendChild(div)
    });
}
showLessonBtn()