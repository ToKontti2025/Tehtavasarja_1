// scripts/history.js
// wire url + history to search.js

import { searchImages, renderResults } from './search.js'

const form  = document.getElementById('searchForm')
const input = document.getElementById('q')

// run search and sync ?q= to url (push by default, replace on init/back)
async function runSearch(q, opts = {}) {
  const items = await searchImages(q)
  renderResults(items)

  const url = new URL(location.href)
  if (q && q.length > 0) {
    url.searchParams.set('q', q)
  } else {
    url.searchParams.delete('q')
  }

  if (opts.replace === true) {
    history.replaceState({ q: q }, '', url)
  } else {
    history.pushState({ q: q }, '', url)
  }
}

// submit → push and search
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let q = ''
  if (input) {
    q = input.value.trim()
  }
  runSearch(q)
})

// first load → read ?q= or input, replace and search
window.addEventListener('DOMContentLoaded', () => {
  let q = ''
  const url = new URL(location.href)
  const fromUrl = url.searchParams.get('q')

  if (fromUrl) {
    q = fromUrl
  } else if (input) {
    q = input.value.trim()
  }

  if (input) {
    input.value = q
  }

  runSearch(q, { replace: true })
})

// back/forward → use state, fill input, replace and search
window.addEventListener('popstate', (ev) => {
  let q = ''
  if (ev.state && typeof ev.state.q === 'string') {
    q = ev.state.q
  }

  if (input) {
    input.value = q
  }

  runSearch(q, { replace: true })
})
