import {$} from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const resizerWidth = $resizer.getCoords().width
    const resizerHeight = $resizer.getCoords().height
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({
      opacity: '1',
      [sideProp]: '-1000px'
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
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => $(el).css({width: `${value}px`}))
      } else {
        $parent.css({height: `${value}px`})
      }
      resolve({
        value,
        id: $parent.data[type],
        type: type
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })   
    }
  })
}
