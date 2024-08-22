const API_KEY = "pub_29952b5b918fc1ecc3d960b7548609b2000bc";
const url = "https://newsdata.io/api/1/news?";

window.addEventListener("load", () => fetchNews("India"));

let currentQuery = "India"; 

async function fetchNews(query) {
    currentQuery = query; 
    try {
        const res = await fetch(`${url}apikey=${API_KEY}&q=${query}`);
        const data = await res.json();
        console.log(data);
        bindData(data.results);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(results) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.querySelector("#template-news-card");

    cardsContainer.innerHTML = "";

    results.forEach((article) => {
        if (!article.image_url) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title || "No Title Available"; 
    newsDesc.innerHTML = article.description || "No Description Available";

    newsSource.innerHTML = `Published: ${new Date(article.pubDate).toLocaleDateString()}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.link, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    let query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function reload() {
    window.location.reload();
}

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => fetchNews(currentQuery)); 
