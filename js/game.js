const game = createObjects();
let selectedPosition = "";
let mask;
createCellsOnGame();

function createCellsOnGame() {
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
    fillCells();
    mask = createMask();
    removeExceptMask(mask);
    openShownNumbers();
    checkGame();
}

function cleaning() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            game.rows[i - 1][j - 1] = undefined;
            game.cols[i - 1][j - 1] = undefined;
            game.squares[i - 1][j - 1] = undefined;

            document.getElementById("p" + i + j).innerHTML = "";
            document.getElementById("p" + i + j).style.fontSize = "25px";
            document.getElementById("p" + i + j).style.color = "#3d3d3d";
            document.getElementById("p" + i + j).style.opacity = 100;
            document.getElementById("p" + i + j).classList.remove("shown");
            document.getElementById("p" + i + j).classList.remove("selected");
        }
    }

    for (let i = 1; i < 10; i++) {
        document.getElementById("num" + i).style.color = "#cccccc";
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
    let level = setLevel();
    while (level > 0) {
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                if ((Math.random() * 100) > 80 && !shown["" + i + j]) {
                    shown["" + i + j] = true;
                    shown["" + (10 - i) + (10 - j)] = true;
                    level--;

                    if (level === 0) {
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
            let position = document.getElementById("p" + i + j);
            position.innerHTML = game.rows[i - 1][j - 1];
            position.classList.add("shown");
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

function changeLevel() {
    let level = document.getElementById("rangeLevel").value;
    let lvlMessage;
    switch (+level) {
        case 0:
            lvlMessage = "для детей";
            break;
        case 1:
            lvlMessage = "для умных детей";
            break;
        case 2:
            lvlMessage = "легко";
            break;
        case 3:
            lvlMessage = "легко, но надо думать";
            break;
        case 4:
            lvlMessage = "средне";
            break;
        case 5:
            lvlMessage = "выше среднего";
            break;
        case 6:
            lvlMessage = "тяжело";
            break;
        case 7:
            lvlMessage = "очень тяжело";
            break;
        case 8:
            lvlMessage = "для профессионалов";
            break;
    }
    document.getElementById('levelText').innerHTML = lvlMessage;
}

function setLevel() {
    const gameLevel = [33, 30, 27, 24, 21, 18, 15, 12, 9];
    let level = document.getElementById("rangeLevel").value;
    return gameLevel[level];
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
    let value = (isNaN(+elem.innerHTML)) ? "" : +elem.innerHTML;
    document.getElementById(selectedPosition).innerHTML = value;
    addValueToObj(value, selectedPosition[1] - 1, selectedPosition[2] - 1);
    setTimeout(checkGame, 100);
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
        changeColor(i, count);
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

function changeColor(i, count) {
    document.getElementById("num" + i).style.color = (count == 9) ? "#cccccc" : "black";
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