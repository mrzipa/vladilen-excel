export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  // $el instance of DOM === true
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addFocus().addClass(TableSelection.className)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach(el => el.addClass(TableSelection.className))
  }
}
