// theme toggle logic

const THEME_KEY = 'theme-preference'
const themeBtn = document.querySelector('#themeToggle')

// put theme info to html
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

// save theme to localstorage
// bug fix: now uses same key as loadTheme
function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

// load theme from localstorage
// if nothing saved -> return light
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved) {
    return saved
  } else {
    return 'light'
  }
}

// switch between light and dark
// bug fix: only one event listener now
function toggleTheme() {
  const current = loadTheme()
  if (current === 'light') {
    applyTheme('dark')
    saveTheme('dark')
  } else if (current === 'dark') {
    applyTheme('light')
    saveTheme('light')
  }
}

// set theme when page loads
applyTheme(loadTheme())

// add click listener if button exists
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme)
}
