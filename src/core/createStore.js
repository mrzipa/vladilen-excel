export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT' })
  let listeners = []
  return {
    subscribe(fn) {
      listeners.push(fn)
      // Вернуть только нужного listener'а, остальных filter
      return {
        unsibscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      // Только не используя сложные структуры данных
      return JSON.parse(JSON.stringify(state))
    }
  }
}

export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.initialState = initialState
    this.state = rootReducer({ ...initialState }, { type: '__INIT' })
    this.listeners = []
  }
  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsibscribe() {
        this.listeners = this.listeners.filter(listener => listener !== fn)
      }
    }
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }
  getState() {
    return this.state
  }
}

// Extra Task - Переписать на класс
// reducer - принимает action и изменяет state
// reducer(state, action)
