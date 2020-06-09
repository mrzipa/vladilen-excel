import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize"
import { shouldResize } from "./table.functions";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click']
    })
  }
  toHTML() {
    return createTable(25)
  }

  onClick(event) {
    console.log('click!', event.target)
  }

  onMousedown(event) {
    if (shouldResize) {
      resizeHandler(this.$root, event)
    }
  }
}
