let repos = [];
let themeSets = [];
let currentSetIndex = 0;

let themeCache = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

window.onload = function () {
  fetch("data/repos.txt")
    .then((res) => res.text())
    .then((data) => {
      repos = data.split("\n");
      console.log(repos);

      for (i = 0; i < repos.length; i++) {
        const repo = repos[i];
        fetch(repo)
          .then((res) => res.json())
          .then((data) => {
            console.log(JSON.stringify(data));
            themeSets.push(data);
            themeCache = [...themeSets[currentSetIndex].themes];
          });
      }
    });
};

window.onclick = function () {
  const titleElement = document.getElementById("theme-title");
  if (themeCache.length == 0) {
    themeCache = [...themeSets[currentSetIndex].themes];
    shuffleArray(themeCache);
    console.log(themeCache);
    titleElement.textContent = "画面をタッチすると お題が出てくる";
  } else {
    const theme = themeCache.pop();

    titleElement.textContent = theme.title;
  }
};
