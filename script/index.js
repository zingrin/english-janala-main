const showLoader = () => document.getElementById('loader').classList.remove('hidden');
const hideLoader = () => document.getElementById('loader').classList.add('hidden');

// Smooth Scroll for Sections
const scrollToSection = (buttonId, sectionId) => {
    document.getElementById(buttonId).addEventListener('click', () => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
};
scrollToSection('faqSection', 'accordianSection');
scrollToSection('vacabularies', 'vacabulariescontainer');

// Authentication Logic
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("Logout");
const mainSection = document.getElementById("main");
const heroSection = document.getElementById("heroSection");
const navButton = document.getElementById("navbar");

loginButton.onclick = () => {
    const name = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!name) return alert('Please Enter Your Name');
    if (password === '123456') {
        navButton.classList.remove("hidden");
        heroSection.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }
};

logoutButton.onclick = () => {
    navButton.classList.add("hidden");
    heroSection.classList.remove("hidden");
    mainSection.classList.add("hidden");
};

// Fetch and Display Words
const displaywordCard = async (id) => {
    try {
        showLoader();
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
        const { data: words } = await res.json();
        const wordsContainer = document.getElementById('wordCards');

        wordsContainer.innerHTML = words.length ? 
            words.map(word => `
                <div class="bg-white p-6 text-center rounded-lg h-[200px] relative"> 
                    <p onclick="pronounceWord('${word.word}')" class="font-bold text-3xl">${word.word}</p>
                    <p class="font-semibold text-sm">Meaning /Pronunciation</p>
                    <p class="bangla font-bold text-2xl">"${word.meaning || 'অর্থ নেই'}/${word.pronunciation || ''}"</p>
                    <div class="absolute bottom-3 left-0 w-full flex justify-between items-center px-4">
                        <i onclick="wordDetails(${word.id})" class="fa-solid fa-circle-info bg-slate-100 p-2 cursor-pointer rounded-sm"></i>
                        <i class="fa-solid fa-volume-high bg-slate-100 p-2 cursor-pointer rounded-sm"></i>
                    </div>
                </div>
            `).join('') :
            `<div class="text-center col-span-3 py-8">
                <img class="max-w-xl mx-auto" src="assets/alert-error.png" alt="এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।">
                <small>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                <p class="font-bold text-xl">নেক্সট Lesson এ যান</p>
            </div>`;
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
};

// Fetch and Show Lesson Buttons
const showLessonBtn = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
        const { data: allLevels } = await res.json();
        const levelContainer = document.getElementById('levelContainer');

        levelContainer.innerHTML = allLevels.map(level => `
            <button onclick='displaywordCard(${level.level_no})'
                class="btn text-blue-800 border border-blue-500 flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-blue-700 hover:text-white">
                <img src="./assets/fa-book-open.png" alt="" class="w-5 h-5">
                Lesson - ${level.level_no}
            </button>
        `).join('');
        
    } catch (error) {
        console.error('Error fetching lessons:', error);
    }
};
showLessonBtn();

// Fetch and Display Word Details
const wordDetails = async (id) => {
    try {
        showLoader();
        const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
        const { data: details } = await res.json();
        
        if (!details) return;

        document.getElementById('wordDetails').showModal();
        document.getElementById('detailsContainer').innerHTML = `
            <p onclick="pronounceWord('${details.word}')" class="cursor-pointer font-bold text-xl">
                ${details.word} (<i class="fa-solid fa-microphone"></i> ${details.pronunciation || ''})
            </p>
            <p class="font-bold">Meaning</p>
            <p class="font-bold text-sm">${details.meaning || 'অর্থ নেই'}</p>
            <p class="font-bold text-xl">Example</p>
            <p class="text-gray-700">${details.sentence || 'No example available'}</p>
            <p class="font-bold text-xl">সমার্থক শব্দ গুলোঃ</p>
            <div class="flex items-center flex-wrap gap-3">
                ${(details.synonyms || []).map(word => 
                    `<p class="cursor-pointer bg-slate-100 p-2 rounded-sm">${word}</p>`
                ).join('')}
            </div>
        `;
        
    } catch (error) {
        console.error('Error fetching word details:', error);
    } finally {
        hideLoader();
    }
};
