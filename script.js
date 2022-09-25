const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerHeight * 0.7
canvas.height = window.innerHeight * 0.7

const size = 14

const lineWidth = canvas.width / (size*10)
const tileSize = (canvas.width - lineWidth*(size+1)) / size

const grid = [
 [2, 2, 1, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2]
,[1, 2, 2, 2, 0, 2, 2, 2, 1, 2, 2, 2, 2, 1]
,[2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
,[0, 2, 2, 2, 0, 2, 2, 0, 1, 2, 0, 2, 2, 2]
,[2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2]
,[2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2]
,[2, 0, 2, 2, 2, 2, 1, 2, 2, 0, 2, 2, 2, 2]
,[2, 0, 0, 2, 2, 2, 1, 2, 0, 2, 2, 2, 2, 2]
,[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0]
,[2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2]
,[0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2]
,[2, 1, 1, 2, 2, 2, 2, 0, 2, 2, 2, 1, 2, 2]
,[2, 2, 1, 2, 2, 0, 2, 0, 2, 2, 1, 1, 2, 2]
,[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2]]

// for (let i = 0; i < size; i++) {
//     const row = []
//     for (let j = 0; j < size; j++) {
//         row.push(2)
//     }
//     grid.push(row)
// }


function draw() {

    ctx.fillStyle = "#222"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid.length; x++) {
            if (grid[y][x] == 0) {
                ctx.fillStyle = "black"
            }
            else if (grid[y][x] == 1) {
                ctx.fillStyle = "white"
            }
            else {
                ctx.fillStyle = "gray"
            }
            ctx.fillRect(lineWidth + x*(tileSize+lineWidth), lineWidth + y*(tileSize+lineWidth), tileSize, tileSize)
        }
    }
}

draw()

canvas.addEventListener("click", event => {
    const x = Math.floor(event.offsetX/(tileSize+lineWidth))
    const y = Math.floor(event.offsetY/(tileSize+lineWidth))

    grid[y][x] = (grid[y][x]+1)%3

    draw()

})


function possible(x, y, n) {
    
    grid[y][x] = n
    
    let rowSumBlack = 0
    let rowSumBlackCon = 0

    let rowSumWhite = 0
    let rowSumWhiteCon = 0

    let columnSumBlack = 0
    let columnSumBlackCon = 0

    let columnSumWhite = 0
    let columnSumWhiteCon = 0

    for (let i = 0; i < size; i++) {

        if (grid[y][i] == 0) {
            rowSumBlack++
            rowSumBlackCon++
            if (rowSumBlackCon == 3) {
                grid[y][x] = 2
                return false
            }
        }
        else {
            rowSumBlackCon = 0
        }

        if (grid[y][i] == 1) {
            rowSumWhite++
            rowSumWhiteCon++
            if (rowSumWhiteCon == 3) {
                grid[y][x] = 2
                return false
            }
        }
        else {
            rowSumWhiteCon = 0
        }

        if (grid[i][x] == 0) {
            columnSumBlack++
            columnSumBlackCon++
            if (columnSumBlackCon == 3) {
                grid[y][x] = 2
                return false
            }
        }
        else {
            columnSumBlackCon = 0
        }

        if (grid[i][x] == 1) {
            columnSumWhite++
            columnSumWhiteCon++
            if (columnSumWhiteCon == 3) {
                grid[y][x] = 2
                return false
            }
        }
        else {
            columnSumWhiteCon = 0
        }
    }

    grid[y][x] = 2

    if (rowSumBlack > size/2) {
        return false
    }
    if (rowSumWhite > size/2) {
        return false
    }
    if (columnSumBlack > size/2) {
        return false
    }
    if (columnSumWhite > size/2) {
        return false
    }
    return true
}

function bruteSolve() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (grid[y][x] == 2) {
                for (let n = 0; n < 2; n++) {
                    if (possible(x, y, n)) {
                        grid[y][x] = n
                        bruteSolve()
                        grid[y][x] = 2
                    }
                }
                return
            }
        }
    }
    draw()
    for (row of grid) {
        console.log(row)
    }
}


function solve() {

    for (y = 0; y < size; y++) {
        for (x = 0; x < size; x++) {

            // Check if two horizontal tiles are the same
            if (x > 0) {
                if (grid[y][x] == grid[y][x-1] & grid[y][x] != 2) {

                    if (x < size-1) {
                        grid[y][x+1] = (grid[y][x]+1)%2
                    }
                    if (x > 1) {
                        grid[y][x-2] = (grid[y][x]+1)%2
                    }

                }
            }

            // Check if two vertical tiles are the same
            if (y > 0) {

                if (grid[y][x] == grid[y-1][x] & grid[y][x] != 2) {

                    if (y < size-1) {
                        grid[y+1][x] = (grid[y][x]+1)%2
                    }
                    if (y > 1) {
                        grid[y-2][x] = (grid[y][x]+1)%2
                    }

                }
            }

            // Check if tile is between two of the same color horizontally
            if (x > 0 & x < size-1) {
                if (grid[y][x-1] == grid[y][x+1] & grid[y][x-1] != 2) {
                    grid[y][x] = (grid[y][x-1]+1)%2
                }
            }

            // Check if tile is between two of the same color vertically
            if (y > 0 & y < size-1) {
                if (grid[y-1][x] == grid[y+1][x] & grid[y-1][x] != 2) {
                    grid[y][x] = (grid[y-1][x]+1)%2
                }
            }

        }
    }

    // Check the total number of black and white tiles in each row and column
    for (let i = 0; i < size; i++) {

        let rowSumBlack = 0
        let rowSumWhite = 0

        let columnSumBlack = 0
        let columnSumWhite = 0

        for (let n = 0; n < size; n++) {

            // Check rows
            if (grid[i][n] == 0) {
                rowSumBlack++
            }
            else if (grid[i][n] == 1) {
                rowSumWhite++
            }

            // Check columns
            if (grid[n][i] == 0) {
                columnSumBlack++
            }
            else if (grid[n][i] == 1) {
                columnSumWhite++
            }
        }

        if (rowSumBlack == size/2) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] == 2) {
                    grid[i][j] = 1
                }
            }
        }

        else if (rowSumWhite == size/2) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] == 2) {
                    grid[i][j] = 0
                }
            }
        }

        if (columnSumBlack == size/2) {
            for (let j = 0; j < size; j++) {
                if (grid[j][i] == 2) {
                    grid[j][i] = 1
                }
            }
        }

        else if (columnSumWhite == size/2) {
            for (let j = 0; j < size; j++) {
                if (grid[j][i] == 2) {
                    grid[j][i] = 0
                }
            }
        }
    }

    draw()
}