import { defaultTitle } from "../../constants"

export function createHeader(state) {
  const input = {
    type: 'text',
    value: state['currentName'] || defaultTitle
  }
  
  const buttons = [
    {
      icon: 'delete',
      value: 'deletePage'
    },
    {
      icon: 'exit_to_app',
      value: 'exit'
    },
  ]
  return `
  <input 
    type=${input.type} 
    class="input" 
    data-type="input" 
    value="${input.value}" 
  />
  <div>
    ${buttons.map(toButton).join('')}
  </div>
  `
}

function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `
  return `
    <div 
      class="button"
      ${meta}
    >
      <i 
        class="material-icons"
        ${meta}
        >${button.icon}</i>
    </div>
  `
}
