
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden')
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden')
}

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
logoutButton.onclick = function () {
    navButton.classList.add("hidden")
    heroSection.classList.remove("hidden")
    mainSection.classList.add("hidden")

};

const displaywordCard = async (id) => {
    try {
        showLoader()
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
        const data = await res.json()
        const words = data.data
        const wordsContainer = document.getElementById('wordCards');
        wordsContainer.innerHTML = '';
        if (words.length === 0) {
            wordsContainer.innerHTML = `
                     <div class="text-center col-span-3 py-8">
                                <img class="max-w-xl mx-auto" src="assets/alert-error.png" alt="এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।">
                                <small>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                                <p class="font-bold text-xl">নেক্সট Lesson এ যান</p>
                            </div>
                    `
        }
        words.forEach((word) => {
            const div = document.createElement('div');

            div.innerHTML = `
           <div class="bg-white p-6 text-center rounded-lg h-[200px] relative"> 
        <p onclick="pronounceWord('${word.word}')" class="font-bold text-3xl">${word.word}</p>
        <p class="font-semibold text-sm">Meaning /Pronounciation</p>
        <p  class="bangla font-bold text-2xl">"${word.meaning == null ? 'অর্থ নেই' : word.meaning}/${word.pronunciation}"</p>
        <div class="absolute bottom-3 left-0 w-full flex justify-between items-center px-4">
            <i id="info-${word.id}" onclick="fetchWordDetails(${word.id})" class="fa-solid fa-circle-info bg-slate-100 p-2 cursor-pointer rounded-sm"></i>
            <i onclick="pronounceWord('${word.word}')" class="fa-solid fa-volume-high bg-slate-100 p-2 cursor-pointer rounded-sm"></i>
        </div>
    </div>


           `;

            wordsContainer.appendChild(div)
        })

    } catch (error) {

    } finally {
        hideLoader()
    } 
    
}


const showLessonBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all')
    const levels = await res.json();
    const allLevels = levels.data;
    const levelContainer = document.getElementById('levelContainer');
    allLevels.forEach(level => {
        const div = document.createElement('div');
        div.innerHTML = `
         <button onclick='displaywordCard(${level.level_no})'
                    class="btn text-blue-800 border border-blue-500 flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-blue-700 hover:text-white">
                    <img src="./assets/fa-book-open.png" alt="" class="w-5 h-5 hover:text-white">
                    Lesson -${level.level_no}
                </button>
        `
        levelContainer.appendChild(div)
    });
}
showLessonBtn()