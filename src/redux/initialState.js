import { defaultStyles, defaultTitle } from "../constants"
import { clone } from "../core/utils"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'asd'}
  stylesState: {}, // {''}
  currentText: '',
  currentStyles: defaultStyles,
  currentName: defaultTitle,
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
