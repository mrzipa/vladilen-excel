import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize"
import { shouldResize, isCell, 
  selecting, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.rowCount = 25
  }

  toHTML() {
    return createTable(this.rowCount)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:enter', () => {
      this.selection.current.addFocus()
    })
    // $cell.dropFocus()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  onMousedown(event) {
    // event.preventDefault()
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      selecting(event, this.$root, this.selection)
      this.$emit('table:select', $(event.target))
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 
      'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
}

// todo
// 1. Границы всех сторон продумать (правая, нижняя)
// 2. Подумать над редактированием по double-click, но не по click
// 3. Подумать над красивым выделением
// 4. Сделать выделение с shift
// 5. Стрелочки для навигации внутри ячейки
