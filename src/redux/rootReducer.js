import { COLUMN_RESIZE, ROW_RESIZE, CHANGE_TEXT, 
  CHANGE_STYLES, APPLY_STYLE, CHANGE_NAME, UPDATE_DATE } from "./types"

export function rootReducer(state, action) {
  let prevState
  let val
  let field
  switch (action.type) {
    case COLUMN_RESIZE:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState} // id, value
    case ROW_RESIZE:
      prevState = state.rowState || {}
      prevState[action.data.id] = action.data.value
      return {...state, rowState: prevState} // id, value
    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, dataState: prevState}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value} 
      })
      return {
        ...state, 
        [field]: val, 
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_NAME:
      return {...state, currentName: action.data}
    case UPDATE_DATE:
      return {...state, openedDate: new Date().toJSON()}
    default: return state
  }
}
