import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize"
import { shouldResize, isCell, 
  selecting, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {resizeActions, textActions} from '@/redux/actions'
import {$} from '@core/dom'
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options
    })
    this.rowCount = 25
  }

  toHTML() {
    return createTable(this.rowCount, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:enter', () => {
      this.selection.current.addFocus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(textActions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
    // $cell.dropFocus()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(textActions.changeStyles(styles))
  }

  onClick(event) {
    if (isCell(event)) {
      this.selectCell($(event.target))
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
    // this.$emit('table:input', $(event.target))
  }

  updateTextInStore(value) {
    this.$dispatch(textActions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  
  async resizeTable(event) {
    try {
      const {type, value, id} = await resizeHandler(this.$root, event)
      const method = type === 'col' 
      ? resizeActions.columnResize
      : resizeActions.rowResize
      this.$dispatch(method({value, id}))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    // event.preventDefault()
    if (shouldResize(event)) {
      this.resizeTable(event)
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
