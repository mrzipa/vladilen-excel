import { storage } from "../core/utils"

function toHTML(key, _) {
  const ref = key.replace(/:/g, '/')
  // Дата открытия подумать
  return `
  <li class="db__record">
    <a href="#${ref}">${getTableName(key)}</a>
    <strong>
      ${new Date(storage(key).openedDate).toLocaleDateString()}
      ${new Date(storage(key).openedDate).toLocaleTimeString()}
    </strong>
  </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

function getTableName(key) {
  return storage(key).currentName
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p> Вы пока не создали ни одной таблицы </p>`
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
