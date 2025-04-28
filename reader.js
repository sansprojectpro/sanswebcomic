const urlParams = new URLSearchParams(window.location.search);
const komik = urlParams.get('komik') || 'satu';

let currentEpisode = null; // Awalnya kosong
const comicPages = document.getElementById("comicPages");
const episodeSelector = document.getElementById("episodeSelector");

// Jumlah halaman per episode dan per komik
const episodePages = {
  satu: { // Komik 1
    episode1: 51,
    episode2: 19,
    episode3: 23,
    episode4: 18,
    episode5: 19,
    episode6: 19,
    episode7: 19,
    episode8: 18,
    episode9: 19,
    episode10: 18,
    episode11: 19,
    episode12: 19
  },
  dua: { // Komik 2
    episode1: 33,
    episode2: 38,
    episode3: 12,
    episode4: 9,
    episode5: 30
  },
  tiga: { // Komik 3
    episode1: 38,
    episode2: 39,
    episode3: 29,
    episode4: 30,
    episode5: 28,
    episode6: 31,
    episode7: 30,
    episode8: 29,
    episode9: 30,
    episode10: 15,
    episode11: 14,
    episode12: 14,
    episode13: 16,
    episode14: 16,
    episode15: 31,
    episode16: 15,
    episode17: 14,
    episode18: 14,
    episode19: 16,
    episode20: 16,
    episode21: 31
  }
};

// Generate dropdown episode otomatis
function generateEpisodeList() {
  episodeSelector.innerHTML = "";

  const episodes = episodePages[komik];
  if (!episodes) return;

  Object.keys(episodes).forEach(ep => {
    const option = document.createElement("option");
    option.value = ep;
    option.textContent = ep.replace('episode', 'Episode ');
    episodeSelector.appendChild(option);
  });

  currentEpisode = Object.keys(episodes)[0]; // Pilih episode pertama saat awal
  episodeSelector.value = currentEpisode;
}

function loadEpisode() {
  comicPages.innerHTML = "";

  const totalPages = episodePages[komik]?.[currentEpisode] || 0;

  for (let i = 1; i <= totalPages; i++) {
    const img = document.createElement("img");
    img.src = `komik/${komik}/${currentEpisode}/${i}.kiryuu.id.jpg`; 
    img.alt = `Halaman ${i}`;
    img.className = "comic-page";
    comicPages.appendChild(img);
  }
  window.scrollTo(0, 0);
}

function goBack() {
  window.location.href = "index.html";
}

function changeEpisode() {
  currentEpisode = episodeSelector.value;
  loadEpisode();
}

window.onscroll = function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  document.getElementById("progressBar").style.width = scrollPercent + "%";
};

// Rating bintang
const starsContainer = document.getElementById("stars");
const yourRating = document.getElementById("yourRating");

// Generate 5 bintang
function generateStars() {
  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.classList.add("star");
    star.dataset.rating = i;
    star.addEventListener("click", setRating);
    starsContainer.appendChild(star);
  }
}

// Simpan rating ke localStorage
function setRating(event) {
  const selectedRating = event.target.dataset.rating;
  const ratingKey = `rating_${komik}`;
  localStorage.setItem(ratingKey, selectedRating);
  showRating();
}

// Tampilkan rating yang sudah dipilih
function showRating() {
  const ratingKey = `rating_${komik}`;
  const savedRating = localStorage.getItem(ratingKey);

  const allStars = document.querySelectorAll(".star");
  allStars.forEach(star => {
    if (savedRating && star.dataset.rating <= savedRating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });

  if (savedRating) {
    yourRating.textContent = `Kamu memberi rating: ${savedRating} / 5`;
  } else {
    yourRating.textContent = "Belum ada rating.";
  }
}

// Jalankan saat load halaman
generateStars();
showRating();

// Saat pertama kali
generateEpisodeList();
loadEpisode();
