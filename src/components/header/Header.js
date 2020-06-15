import { ExcelStateComponent } from "@core/ExcelStateComponent";
import {createHeader} from "./header.template"
import { isInput, isDelete, isExit } from "./header.functions";
import {$} from '@core/dom'
import { textActions } from "../../redux/actions";
import { debounce, deleteFromStorage } from "../../core/utils";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class Header extends ExcelStateComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
    this.initState({currentName: this.store.getState().currentName})
  }

  get template() {
    return createHeader(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    if (isInput(event)) {
      event.target.select()
    } else if (isDelete(event)) {
      const decision = confirm('Вы действительно хотите удалить таблицу?')
      if (decision) {
        deleteFromStorage(`excel:${ActiveRoute.param}`)
        ActiveRoute.deletePath()
      }
    } else if (isExit(event)) {
      console.log('qqqq')
      ActiveRoute.deletePath()
    }
  }

  onInput(event) {
    this.$dispatch(textActions.changeName($(event.target).text()))
  }

  // storeChanged(currentName) {
  //   this.state.currentName = currentName
  // }
}
