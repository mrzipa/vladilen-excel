import { capitalize } from "./utils"

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]) {
        throw new Error(`Method ${method} is not 
        implemented in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      // ТОже самое, что и addEventListener
      // This указывает на Объект, в котором найдено событие
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (this[method]) {
        this.$root.off(listener, this[method])
        console.log(`Method ${method} has been deleted from ${this.name}`);  
      }
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
