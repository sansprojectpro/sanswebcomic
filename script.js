const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

// Data komik
const comics = [
  { title: "Sakamoto Days", folder: "satu", cover: "komik/satu/cover.jpg", genre: "Aksi" },
  { title: "Mercenary Enrollment", folder: "dua", cover: "komik/dua/cover1.jpg", genre: "Fantasi" },
  { title: "“Honyaku” no Sainou de Ore Dake ga Sekai wo Kaihen Dekiru Ken", folder: "tiga", cover: "komik/tiga/cover2.jpg", genre: "Fantasi" }
];

function renderComics(list) {
  const comicList = document.querySelector(".comic-list");
  comicList.innerHTML = "";

  list.forEach(comic => {
    const card = document.createElement("div");
    card.className = "comic-card";
    card.innerHTML = `
      <img src="${comic.cover}" alt="${comic.title}">
      <h2>${comic.title}</h2>
    `;
    card.onclick = () => {
      window.location.href = `reader.html?komik=${comic.folder}`;
    };
    comicList.appendChild(card);
  });
}

function filterComics() {
  const keyword = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedGenre = genreFilter ? genreFilter.value : "all";

  const filtered = comics.filter(comic => {
    const matchTitle = comic.title.toLowerCase().includes(keyword);
    const matchGenre = selectedGenre === "all" || comic.genre === selectedGenre;
    return matchTitle && matchGenre;
  });

  renderComics(filtered);
}

// Event listeners
if (searchInput) {
  searchInput.addEventListener("input", filterComics);
}
if (genreFilter) {
  genreFilter.addEventListener("change", filterComics);
}

// Load semua komik di awal
renderComics(comics);
