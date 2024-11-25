const actualSrch = document.querySelector("#search");
const divSongs = document.querySelector("#songs");
const divLyrics = document.querySelector("#lyrics");

let debounceTimer;

document.addEventListener("DOMContentLoaded", () => {
  // Look if the user already stop typing to make the fetch
  actualSrch.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(app, 600);
  });
});
function app() {
  // Select the input value and see if there's a value
  const inputSearch = actualSrch.value;
  if (!inputSearch) return;

  limpiarDiv();
  limpiarLyrics();

  const url = `https://api.lyrics.ovh/suggest/${inputSearch}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        const song = data.data[i].title;
        const artist = data.data[i].artist.name;
        const divSong = document.createElement("DIV");
        divSong.classList.add("divSong");
        divSong.innerHTML = `
        <div class="shadow-md shadow-cyan-200 p-3 mb-2" onclick="mostrarLetras(event, '${song}', '${artist}')">
        <p class="text-white text-lg font-bold">${song} By ${artist}</P>
        </div>`;
        divSongs.appendChild(divSong);
      }
    });
}

function limpiarDiv() {
  const songs = document.querySelector("#songs");
  while (songs.firstChild) {
    songs.removeChild(songs.lastChild);
  }
}

function limpiarLyrics() {
  while (divLyrics.firstChild) {
    divLyrics.removeChild(divLyrics.firstChild);
  }
}

function mostrarLetras(e, song, artist) {
  e.preventDefault();
  limpiarDiv();
  limpiarLyrics();
  const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { lyrics } = data;
      divLyrics.innerHTML = `
      <p class="whitespace-pre-wrap font-bold">${lyrics}</p>
      `;
    });
}
