import './scripts/theme.js'
import './scripts/search.js'
import './scripts/counter.js'
import './scripts/clipboard.js'
import './scripts/observer.js'

// 0) Pieni apu
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// moved to own file - 1+2) theme: localstorage key + double listener fix

// moved to own file - 3) search: abortcontroller + try/catch + loading state

// moved to own file - 4) counter: fix bubbling so whole button works

// Moved to its own file - 5) clipboard

// Moved to its own file - 6) observer

