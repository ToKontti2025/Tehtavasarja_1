import './scripts/theme.js'
import './scripts/search.js'    // exports only functions
import './scripts/history.js'   // imports searchImages + renderResults
import './scripts/counter.js'
import './scripts/clipboard.js'
import './scripts/observer.js'

// 0) helpers
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

// moved to own file - 1+2) theme
// moved to own file - 3) search
// moved to own file - 4) counter
// moved to own file - 5) clipboard
// moved to own file - 6) observer
// moved to own file - 7) history (url + popstate)
