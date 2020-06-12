import {$} from '@core/dom'

export function shouldResize(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}
export function matrix($currentCell, $nextCell) {
  const cols = range($nextCell.id(true).col, $currentCell.id(true).col)
  const rows = range($nextCell.id(true).row, $currentCell.id(true).row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
export function selecting(event, $root, selection) {
  const $currentCell = $(event.target)
  selection.select($currentCell)
  let $nextCell
  onmousemove = e => {
    if (event.target !== e.target && isCell(e)) {
      $nextCell = $(e.target)
    }
  }
  onmouseup = () => {
    onmousemove = null
    onmouseup = null
    if ($nextCell) {
      const $cells = matrix($currentCell, $nextCell)
          .map(id => $root.find(`[data-id="${id}"]`))
      selection.selectGroup($cells)
    }
  }
}
export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}
