const API_KEY = "eV7skC9mSeg4Taz3evkKVHeCiq31K5pYkf7ytex8"
const content = document.getElementById("content");

document.addEventListener("DOMContentLoaded", renderSearchForm);

document.getElementById("home-link").addEventListener("click", e => {
    e.preventDefault();
    renderSearchForm();
});
document.getElementById("favourites-link").addEventListener("click", e => {
    e.preventDefault();
    renderFavourites();
});

function renderSearchForm() {
    content.innerHTML = `
        <main>
            <div class="date-container">
                <p>Choose the non-future day of the <br>astronomy picture you want to see</p>
                <div class="choose-date">
                    <input type="number" id="day" placeholder="15" min="1" max="31">
                    <input type="number" id="month" placeholder="05" min="1" max="12">
                    <input type="number" id="year" placeholder="2019" min="1995" max="${new Date().getFullYear()}">
                </div>
                <button id="confirm">Confirm</button>
            </div>

            <div class="image-example">
                <img id="example-picture" src="https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_960.jpg" 
                alt="An example of astronomy picture">
                <div class="info-example">
                    <p>Title: Titan Seas Reflect Sunlight</p>
                    <p>Date: 2022-03-27</p>
                </div>
            </div>
        </main>
    `;

    document.getElementById("confirm").addEventListener("click", handleDateSubmit);
}

function handleDateSubmit() {
    const day = document.getElementById("day").value.padStart(2, "0");
    const month = document.getElementById("month").value.padStart(2, "0");
    const year = document.getElementById("year").value;
    const date = `${year}-${month}-${day}`;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
        .then(res => res.json())
        .then(data => {
            if (data.media_type !== "image") {
                alert("This date is not linked to an image.");
                return;
            }
            renderAPOD(data);
        })
        .catch(err => console.error(err));
}

function renderAPOD(data) {
    content.innerHTML = `
        <div class="demo">
            <img id="apodImage" src="${data.url}" alt="${data.title}">
            <div class="info">
                <p>Title: ${data.title}</p>
                <p>Date: ${data.date}</p>
                <p>Explanation: ${data.explanation}</p>
            </div>
            <button id="add-fav">Add to My Favourites Pictures ❤️</button>
        </div>
    `;

    document.getElementById("add-fav").addEventListener("click", () => addToFavourites(data));

    const apodImage = document.getElementById("apodImage");

    function showHDImage() {
        content.innerHTML = `
            <div id="hdOverlay">
                <img src="${data.hdurl}" alt="${data.title}">
            </div>
        `;

        document.getElementById("hdOverlay").addEventListener("click", (e) => {
            if (e.target.id === "hdOverlay") {
                renderAPOD(data);
            }
        });
    }

    apodImage.addEventListener("click", showHDImage);
}


function renderFavourites() {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];


    content.innerHTML = `
        <main class="gallery">
            ${favs.map((item, i) => `
                <div class="card">
                    <img src="${item.url}" alt="${item.title}">               
                    <div class="heart" data-index="${i}">❤️</div>
                    <div class="info">
                        <p>Title: ${item.title}</p>
                        <p>Date: ${item.date}</p>
                    </div>
                </div>
            `).join("")}
        </main>
    `;

    document.querySelectorAll(".heart").forEach(btn => {
        btn.addEventListener("click", () => removeFavourite(btn.dataset.index));
    });
}

function addToFavourites(apod) {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favs.some(item => item.date === apod.date)) {
        favs.push(apod);
        localStorage.setItem("favourites", JSON.stringify(favs));
        alert("Added to My favourite Pictures");
    } 
}

function removeFavourite(index) {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    favs.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favs));
    renderFavourites();
}
