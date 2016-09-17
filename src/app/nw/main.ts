
var win = typeof window['nw'] == 'undefined' ? window : window['nw']['Window'].get();

// NW.js fix
// window.nw_global = window.global
// window.global = undefined

win.App = {
  name : 'EziNote'
}

export let Window = win
