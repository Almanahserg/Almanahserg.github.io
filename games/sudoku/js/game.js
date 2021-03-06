const gameLevel = [33, 29, 25, 21, 17, 13, 9];
const game = createObjects();
let mask, level = 0, selectedPosition;
insertTags();
previousLevel();

function insertTags() {
    insertMenu();
    insertButtons();
    insertGameCells();
}

function insertMenu() {
    let template = `<p>оставшиеся цифры:</p>`;
    for (let i = 1; i < 10; i++) {
        template += `<b id="num${i}">${i}</b>`;
    }

    template += `<div style="height: 37px;"></div>
        <div class="box">
            <div class="level">
                <p>Уровень игры:</p>`;

    for (let i = 0; i < 7; i++) {
        template += `<span id="star${i}" onmouseover="fillStars(this)" onmouseout="previousLevel()" onclick="setLevel(this)">★</span>`;
    }
    template += `</div></div><p>
    <div class="layer"></div>
    <div class="button big" onclick="newGame()">новая игра</div>
    </p>`;


    let divNums = document.getElementById('menu');
    divNums.insertAdjacentHTML('beforeend', template);
}

function insertGameCells() {
    let template = ``;
    for (let i = 1; i < 10; i++) {
        template += `<div class="row">`;
        for (let j = 1; j < 10; j++) {
            let position = getPositionInSquare(i - 1, j - 1);
            template += `<div id="p${i}${j}" class="margin-${position[1] + 1}" onclick="clickOn(this);"></div>`
        }
        template += `</div>`;
    }

    let divGame = document.getElementById('game');
    divGame.insertAdjacentHTML('beforeend', template);
}

function insertButtons() {
    let template = ``;
    for (let i = 1; i < 10; i++) {
        template += `<div class="button" onclick="pasteValue(this);">${i}</div>`;
    }
    template += `<div class="button big" onclick="pasteValue(this);">очистить</div>`;

    let divNums = document.getElementById('buttons');
    divNums.insertAdjacentHTML('beforeend', template);
}

function createObjects() {
    let rows = {};
    let cols = {};
    let squares = {};
    for (let i = 0; i < 9; i++) {
        rows[i] = new Array(8);
        cols[i] = new Array(8);
        squares[i] = new Array(8);
    }
    return {rows, cols, squares};
}

function newGame() {
    cleaning();
    setWinnerBackground();
    moveMenuToCenter();
}

function startGame() {
    fillCells();
    mask = createMask();
    removeExceptMask(mask);
    openShownNumbers();
    checkGame();
}

function cleaning() {
    mask = undefined;
    selectedPosition = undefined;

    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            game.rows[i - 1][j - 1] = undefined;
            game.cols[i - 1][j - 1] = undefined;
            game.squares[i - 1][j - 1] = undefined;

            document.getElementById("p" + i + j).innerHTML = "";
            document.getElementById("p" + i + j).style.fontSize = "25px";
            document.getElementById("p" + i + j).style.color = "#3d3d3d";
            document.getElementById("p" + i + j).style.opacity = 100;
            document.getElementById("p" + i + j).style.fontWeight = "none";
            document.getElementById("p" + i + j).classList.remove("shown");
            document.getElementById("p" + i + j).classList.remove("selected");
            document.getElementById("p" + i + j).removeAttribute("style");
        }
    }

    for (let i = 1; i < 10; i++) {
        document.getElementById("num" + i).style.color = "#FF92AC";
        document.getElementById("num" + i).style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
    }

}

function fillCells() {
    for (let i = 0; i < 9; i++) {
        let countIterations = 0;
        for (let j = 0; j < 9; j++) {
            let randomValue = Math.floor(Math.random() * 9) + 1;
            let position = getPositionInSquare(i, j);
            if (checkNumber(game, i, j, position, randomValue)) {
                game.rows[i][j] = randomValue;
                game.cols[j][i] = randomValue;
                game.squares[position[0]][position[1]] = randomValue;
            } else {
                j--;
                countIterations++;
            }
            if (countIterations > 100) {
                i = takeStepBack(game, i);
                break;
            }
        }
    }
}

function createMask() {
    let shown = {};
    let countSownCells = gameLevel[level];
    while (countSownCells > -1) {
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                if ((Math.random() * 100) > 80 && !shown["" + i + j]) {
                    shown["" + i + j] = true;
                    shown["" + (10 - i) + (10 - j)] = true;
                    countSownCells--;

                    if (countSownCells === 0) {
                        return shown;
                    }
                }
            }
        }
    }
}

function removeExceptMask(mask) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!mask["" + (i + 1) + (j + 1)]) {
                game.rows[i][j] = "";
                game.cols[j][i] = "";

                let pos = getPositionInSquare(i, j);
                game.squares[pos[0]][pos[1]] = "";
            }
        }
    }
}

function openShownNumbers() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            if (game.rows[i - 1][j - 1]) {
                let position = document.getElementById("p" + i + j);
                position.innerHTML = game.rows[i - 1][j - 1];
                position.classList.add("shown");
            }
        }
    }
}

function checkNumber(obj, i, j, p, r) {
    return (
        obj.rows[i].indexOf(r) == -1 &&
        obj.cols[j].indexOf(r) == -1 &&
        obj.squares[p[0]].indexOf(r) == -1);
}

function getPositionInSquare(i, j) {
    const array = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    let x = (i < 3) ? 0 : (i < 6) ? 1 : 2;
    let y = (i == 0 || i == 3 || i == 6) ? 0 : (i == 1 || i == 4 || i == 7) ? 1 : 2;

    let num = (j < 3) ? array[x][0] : (j < 6) ? array[x][1] : array[x][2];
    let index = (j == 0 || j == 3 || j == 6) ? array[y][0] : (j == 1 || j == 4 || j == 7) ? array[y][1] : array[y][2];

    return [num, index];
}

function takeStepBack(obj, index) {
    let squareRow = (index < 3) ? 0 : (index < 6) ? 3 : 6;
    do {
        for (let i = 0; i < 9; i++) {
            obj.rows[index][i] = undefined;
            obj.cols[i][index] = undefined;

            let position = getPositionInSquare(index, i);
            obj.squares[position[0]][position[1]] = undefined;
        }
        index--;
    }
    while (index > squareRow);

    return index;
}

function fillStars(element) {
    let index = element.id.slice(-1);
    for (let i = 0; i < 7; i++) {
        if (+index >= i) {
            document.getElementById("star" + i).style.color = "#FF92AC";
            document.getElementById("star" + i).style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
        } else {
            document.getElementById("star" + i).style.color = "transparent";
            document.getElementById("star" + i).style.textShadow = "1px 1px 2px rgba(255, 255, 255, 0.5)";
        }
    }
}

function previousLevel() {
    for (let i = 0; i < 7; i++) {
        if (i > level) {
            document.getElementById("star" + i).removeAttribute("style");
        } else {
            document.getElementById("star" + i).style.color = "#FF92AC";
            document.getElementById("star" + i).style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
        }
    }
}

function setLevel(element) {
    level = +element.id.slice(-1);
    moveMenuBack();
}

function clickOn(element) {
    if (mask !== undefined && !mask[element.id.slice(1)]) {
        if (selectedPosition) {
            document.getElementById(selectedPosition).classList.remove("selected");
        }

        selectedPosition = (element.id === selectedPosition) ? "" : element.id;

        if (selectedPosition) {
            document.getElementById(selectedPosition).classList.add("selected");
        }
    }
}

function pasteValue(elem) {
    if (selectedPosition) {
        let value = (isNaN(+elem.innerHTML)) ? "" : +elem.innerHTML;
        document.getElementById(selectedPosition).innerHTML = value;
        addValueToObj(value, selectedPosition[1] - 1, selectedPosition[2] - 1);
        setTimeout(checkGame, 100);
    }
}

function addValueToObj(value, i, j) {
    game.rows[i][j] = value;
    game.cols[j][i] = value;

    let p = getPositionInSquare(i, j);
    game.squares[p[0]][p[1]] = value;
}

function checkGame() {
    let allCount = 0;
    for (let i = 1; i < 10; i++) {
        let count = 0;
        for (let j = 0; j < 9; j++) {
            if (game.rows[j].indexOf(i) != -1 &&
                game.cols[j].indexOf(i) != -1 &&
                game.squares[j].indexOf(i) != -1) {
                count++;
            }
        }
        removeClassLeftNums(i, count);
        allCount += count;
    }
    if (allCount == 81) {
        removeClassSelected();
        endGame();
    }
}

function endGame() {
    let tempObject = {};
    for (let i = 1; i < 10; i++) {
        tempObject[i] = [];
        let k = i;
        for (let j = 1; j < i + 1; j++) {
            tempObject[i][j - 1] = [k, j];
            k--;
        }
        if (i > 5) {
            tempObject[i].splice(0, i - 5);
            tempObject[i].splice(10 - i);
        }
    }

    for (let i = 1; i < 10; i++) {
        let tempArray = tempObject[i].slice();
        tempObject[i].length = 0;
        for (let j = 0; j < tempArray.length; j++) {

            tempObject[i].push("" + tempArray[j][0] + tempArray[j][1]);
            tempObject[i].push("" + tempArray[j][0] + (10 - tempArray[j][1]));
            tempObject[i].push("" + (10 - tempArray[j][0]) + tempArray[j][1]);
            tempObject[i].push("" + (10 - tempArray[j][0]) + (10 - tempArray[j][1]));

        }
    }

    let sequence = {};
    for (let i = 1; i < 10; i++) {
        sequence[i] = [...new Set(tempObject[i])];
    }

    doWithTimeout(sequence);
}

function doWithTimeout(obj) {
    let t = 400;
    for (let i = 9; i > 0; i--) {
        for (let j = 0; j < obj[i].length; j++) {
            setTimeout(fontSizeToZero, t, obj[i][j]);
        }
        t += 400;
    }
    t = 800;
    for (let i = 9; i > 0; i--) {
        for (let j = 0; j < obj[i].length; j++) {
            setTimeout(opacityToZero, t, obj[i][j]);
        }
        t += 400;
    }
}

function removeClassLeftNums(i, count) {
    if (count == 9) {
        document.getElementById("num" + i).removeAttribute("style");
    }
}

function removeClassSelected() {
    document.getElementById(selectedPosition).classList.remove("selected");
}

function fontSizeToZero(pos) {
    document.getElementById("p" + pos).style.fontSize = "40px";
    document.getElementById("p" + pos).style.color = "rgb(0, 0, 0, 0)";
    document.getElementById("p" + pos).style.transition = "500ms";
}

function opacityToZero(pos) {
    document.getElementById("p" + pos).style.opacity = 0;
}

function moveMenuToCenter() {
    let layer = document.getElementsByClassName("layer");
    layer[0].style.height = "110px";

    let boxLevel = document.querySelector('.level');
    let getUp = boxLevel.animate([
        {boxShadow: '0 0 0 black'},
        {boxShadow: '0 0 10px black'}
    ], 400);

    getUp.addEventListener('finish', function() {
        boxLevel.style.boxShadow = '0 0 10px black';
        let moveToCenter = boxLevel.animate([
            {transform: 'translateX(5px)'},
            {transform: 'translateX(315px)'}
        ], 600);

        moveToCenter.addEventListener('finish', function() {
            boxLevel.style.transform = 'translateX(315px)';
        });
    });
}

function moveMenuBack() {
    let layer = document.getElementsByClassName("layer");
    layer[0].style.height = "40px";

    let boxLevel = document.querySelector('.level');
    let getUp = boxLevel.animate([
        {transform: 'translateX(315px)'},
        {transform: 'translateX(5px)'}
    ], 600);

    getUp.addEventListener('finish', function() {
        boxLevel.style.transform = 'translateX(5px)';
        let moveToCenter = boxLevel.animate([
            {boxShadow: '0 0 10px black'},
            {boxShadow: '0 0 0 black'}
        ], 400);

        moveToCenter.addEventListener('finish', function() {
            boxLevel.style.boxShadow = '0 0 0 black';
            startGame();
        });
    });
}

function setWinnerBackground() {
    let classGame = document.getElementsByClassName("game");
    let randomValue = Math.floor(Math.random() * 6) + 1;
    classGame[0].style.background = `url('images/${randomValue}.jpg')`;
    classGame[0].style.backgroundSize = '100% 100%';
}

