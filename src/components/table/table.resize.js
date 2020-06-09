import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const resizerWidth = $resizer.getCoords().width
  const resizerHeight = $resizer.getCoords().height
  const $parent = $resizer.closest('[data-type="resizable"]')
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value = 0
  $resizer.css({
    opacity: '1',
    [sideProp]: '-100vh'
  })
  
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right - resizerWidth
      value = coords.width + delta
      $resizer.css({
        right: `${-delta}px`
      })
    } else {
      const delta = e.pageY - coords.bottom - resizerHeight
      value = coords.height + delta
      $resizer.css({
        bottom: `${-delta}px`
      })
    }
  }
  document.onmouseup = () => {   
    document.onmousemove = null
    document.onmouseup = null   
    if (type === 'col') {
      $parent.css({width: `${value}px`})
      cells.forEach(el => $(el).css({width: `${value}px`}))
    } else {
      $parent.css({height: `${value}px`})
    }
    $resizer.css({
      opacity: '0',
      bottom: `${0}px`,
      right: `${0}px`
    })   
  }
}
