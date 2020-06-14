import { storage } from "../core/utils"
import { defaultStyles, defaultTitle } from "../constants"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'asd'}
  stylesState: {}, // {''}
  currentText: '',
  currentStyles: defaultStyles,
  currentName: defaultTitle
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') 
    ? normalize(storage('excel-state') )
    : defaultState
