let repos = [];
let themeSets = [];
let currentSetIndex = 0;

let themeCache = [];
let challangeResult;

let resultDisplay;

const initResultText = "結果判定";

let resultDice;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

window.onload = function () {
  resultDisplay = document.getElementById("result");
  resultDisplay.textContent = initResultText;
  resetDice();

  const setSelect = document.getElementById("set-select");

  fetch("data/sets.txt")
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
            const setName = data.name;
            const setOption = new Option(setName, i);
            setSelect.appendChild(setOption);
            pushThemes();
          });
      }
    });
};

function pushThemes() {
  themeCache = [...themeSets[currentSetIndex].themes];
  shuffleArray(themeCache);
  console.log(themeCache);
}

function onTitleClick() {
  const titleElement = document.getElementById("title");
  if (themeCache.length == 0) {
    titleElement.textContent = "（もうお題は無いようだ）";
    pushThemes();
  } else {
    const theme = themeCache.pop();

    titleElement.textContent = theme.title;
  }
  challangeResult = null;
  resultDisplay.textContent = initResultText;
}

function onSetChange(value) {
  currentSetIndex = value;
  pushThemes();
}

function resetDice() {
  resultDice = Array.from({ length: 5 }, (v, k) => k);
  shuffleArray(resultDice);
}

function onChallange() {
  if (challangeResult == null) {
    challangeResult = resultDice.pop() != 0;
    if (resultDice.length == 0) {
      resetDice();
    }
  }
  resultDisplay.textContent = challangeResult ? "成功！" : "失敗…";
}
