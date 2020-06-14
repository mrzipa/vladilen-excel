import { ExcelStateComponent } from "@core/ExcelStateComponent";
import {createHeader} from "./header.template"
import { isInput } from "./header.functions";
import {$} from '@core/dom'
import { textActions } from "../../redux/actions";
import { debounce } from "../../core/utils";

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
    }
  }

  onInput(event) {
    this.$dispatch(textActions.changeName($(event.target).text()))
  }

  // storeChanged(currentName) {
  //   this.state.currentName = currentName
  // }
}
