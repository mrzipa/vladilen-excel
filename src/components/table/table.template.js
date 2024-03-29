import { toInlineStyles } from "../../core/utils"
import { defaultStyles } from "../../constants"
import { parse } from "../../core/parse"

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth(index, state) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(index, state) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(index, state)
    }
  }
}
function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    }) 
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${getWidth(col, state.colState)}"
      >${parse(data) || ''}</div>
    `
  }
}
function toColumn({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div 
        class="col-resize"
        data-resize="col"
      ></div>
    </div>
  `
}
function createRow(index, content, state={}) {
  const resize = index
  ? `<div class="row-resize" data-resize="row"></div>` 
  : '' 
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}"
      style="height: ${getHeight(index, state)}"
    >
      <div class="row-info">
        ${index ? index: ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount = 15, state) {
  const colState = state.colState
  const rowState = state.rowState
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(colState))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(row + 1, cells, rowState))
  }
  return rows.join('')
}
