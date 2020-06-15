export function isInput(event) {
  return event.target.dataset.type === 'input'
}

export function isExit(event) {
  const value = event.target.dataset.value
  if (value) {
    return JSON.parse(value) === 'exit'
  }
}

export function isDelete(event) {
  const value = event.target.dataset.value
  if (value) {
    return JSON.parse(value) === 'deletePage'
  }
}
