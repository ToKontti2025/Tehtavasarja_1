// search with abort + errors + status

const form = document.getElementById('searchForm')
const resultsEl = document.getElementById('results')
const statusEl = document.getElementById('status')

// keep handle to current request so we can cancel it
let currentCtrl = null

// fetch list and filter by query
async function searchImages(query) {
  // cancel previous request if still running
  if (currentCtrl) currentCtrl.abort()
  currentCtrl = new AbortController()

  const url = 'https://api.sampleapis.com/coffee/hot' // returns array of {title,image,...}

  try {
    // show loading to user
    statusEl.textContent = 'ladataan…'

    const res = await fetch(url, { signal: currentCtrl.signal })
    if (!res.ok) throw new Error(`http ${res.status}`)

    const raw = await res.json()
    const list = Array.isArray(raw) ? raw : []

    // make query lowercase + trim
    let q = ''
    if (query) {
      q = query.toLowerCase().trim()
    }

    let filtered
    if (q) {
      // if query not empty → filter
      filtered = list.filter(item => {
        const title = item.title ? item.title.toLowerCase() : ''
        return title.includes(q)
      })
    } else {
      // if query empty → keep whole list
      filtered = list
    }

    statusEl.textContent = `${filtered.length} tulosta`

    // take first 12 and map to safe object
    return filtered.slice(0, 12).map(item => {
      return {
        title: item.title ? item.title : 'nimetön',
        url: item.image
      }
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      statusEl.textContent = 'peruutettu'
    } else {
      console.error(err)
      statusEl.textContent = 'haku epäonnistui'
    }
    return []
  } finally {
    currentCtrl = null
  }
}


// render results to list
function renderResults(items) {
  resultsEl.innerHTML = ''
  items.forEach(item => {
    const li = document.createElement('li')
    li.className = 'card'

    // if url is missing, show text instead of image
    if (item.url) {
      li.innerHTML = `
        <strong>${item.title}</strong><br>
        <img alt="" width="160" height="120" src="${item.url}">
      `
    } else {
      li.innerHTML = `
        <strong>${item.title}</strong><br>
        <em>no image</em>
      `
    }

    resultsEl.appendChild(li)
  })
}

// on submit: clear old, run search once, show status from searchImages
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  resultsEl.innerHTML = '' // clear old results
  const q = document.getElementById('q').value.trim()
  const items = await searchImages(q)
  renderResults(items)
})
