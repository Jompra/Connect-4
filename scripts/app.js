function init() {
  console.log('js running')

  const grid = document.querySelector('.grid')
  const gridWrapper = document.querySelector('.grid-wrapper')
  const winnerDisplay = document.querySelector('.winner')

  const cells = []
  const gridWidth = 7
  const gridHeight = 6
  const cellSize = 50
  const cellCount = gridHeight * gridWidth
  const trackerCells = []

  let currentPlayer = 1

  const createGrid = () => {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      cell.style.height = `${cellSize}px`
      cell.style.width = `${cellSize}px`
      grid.appendChild(cell)
      cells.push(cell)
      trackerCells.push(0)
    }
    gridWrapper.style.width = `${(cellSize + 10) * (gridWidth)}px`
    gridWrapper.style.height = `${(cellSize + 10) * (gridHeight)}px`

    cells.forEach(cell => {
      cell.addEventListener('click', handleClickedCell)
    })
  }

  const handleClickedCell = event => {
    if (winnerDisplay.innerHTML.length > 0) return
    const clickedCell = parseInt(event.target.id)
    const highestAvailableCell = findHighestEmptyCellInColumn(getColumn(clickedCell))

    addCoin(currentPlayer, highestAvailableCell)

    checkWinCondition(currentPlayer)
    currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1
  }

  const addCoin = (player, cell) => {
    trackerCells[cell.id] = player
    cell.style.backgroundColor = player === 1 ? 'red' : 'yellow'
    cell.classList.add(`p${player}-coin`)
  }

  const checkWinCondition = (currentPlayer) => {
    function isWinningPattern(player, space, str) {
      return (
        (new RegExp(`${player}[0-2]{${space}}${player}[0-2]{${space}}${player}[0-2]{${space}}${player}`)).test(str) ||
        (new RegExp(`${player}{4}`).test(str))
      )
    }
    for (let i = gridWidth - 2; i <= gridWidth; i++) {
      if (isWinningPattern(currentPlayer, i, trackerCells.join(''))) {
        winnerDisplay.innerHTML = `Player ${currentPlayer} Has Won!!!`
      }
    }
  }

  const findHighestEmptyCellInColumn = column => {
    const cellNumbersInColumn = cells.filter(cell => {
      return cell.id % gridWidth === column && cell.classList.length === 0
    })
    return cellNumbersInColumn[cellNumbersInColumn.length - 1]
  }

  const getColumn = cellNumber => {
    return cellNumber % gridWidth
  }
  createGrid()
}

window.addEventListener('DOMContentLoaded', init)