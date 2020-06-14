import { COLUMN_RESIZE, ROW_RESIZE, CHANGE_TEXT,
  CHANGE_STYLES, APPLY_STYLE, CHANGE_NAME } from "./types";

// Action Creators
export const resizeActions = {
  columnResize(data) {
    return {
      type: COLUMN_RESIZE,
      data
    }
  },
  rowResize(data) {
    return {
      type: ROW_RESIZE,
      data
    }
  }
}

export const textActions = {
  changeText(data) {
    return {
      type: CHANGE_TEXT,
      data
    }
  },
  changeStyles(data) {
    return {
      type: CHANGE_STYLES,
      data
    }
  },
  // value, ids
  applyStyle(data) {
    return {
      type: APPLY_STYLE,
      data
    }
  },
  changeName(data) {
    return {
      type: CHANGE_NAME,
      data
    }
  }
}
