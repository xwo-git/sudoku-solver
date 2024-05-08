function nValide(y, x, n, grille) {
    for (let x0 = 0; x0 < 9; x0++) {
        if (grille[y][x0] === n) {
            return false;
        }
    }

    for (let y0 = 0; y0 < 9; y0++) {
        if (grille[y0][x] === n) {
            return false;
        }
    }

    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grille[y0 + i][x0 + j] === n) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(grille) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (grille[y][x] === 0) {
                for (let n = 1; n <= 9; n++) {
                    if (nValide(y, x, n, grille)) {
                        grille[y][x] = n;
                        if (solveSudoku(grille)) {
                            return true;
                        }
                        grille[y][x] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function printGrille(grille) {
    for (let row of grille) {
        console.log(row.join(" | "));
        console.log("- - - - - - - - - - - - - - - - - ");
    }
}

function clearUserGrid() {
    const inputs = document.querySelectorAll(".input-grid");
    inputs.forEach(input => {
        input.value = '';
    });
}

document.getElementById('clear-btn').addEventListener("click", function() {
    clearUserGrid();
});

function updateInputs(grille) {
    const inputs = document.querySelectorAll(".input-grid");
    let index = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[index].value = grille[i][j];
            index++;
        }
    }
}

document.getElementById("solve-btn").addEventListener("click", function() {
    const inputs = document.querySelectorAll(".input-grid");
    let grille = [];

    for (let i = 0; i < 9; i++) {
        grille.push([]);
        for (let j = 0; j < 9; j++) {
            const inputValue = parseInt(inputs[i * 9 + j].value.trim()) || 0;
            grille[i][j] = inputValue;
        }
    }

    if (solveSudoku(grille)) {
        console.log("La grille résolue est :");
        printGrille(grille);
        updateInputs(grille);
    } else {
        console.log("Aucune solution trouvée.");
    }
});