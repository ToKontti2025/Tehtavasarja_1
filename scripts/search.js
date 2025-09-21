// scripts/search.js
// just functions: fetch + render, no events here

const resultsEl = document.getElementById('results')
const statusEl  = document.getElementById('status')

let currentCtrl = null

// get list and filter by query
export async function searchImages(query) {
  // cancel previous request if still running
  if (currentCtrl) {
    currentCtrl.abort()
  }
  currentCtrl = new AbortController()

  const url = 'https://api.sampleapis.com/coffee/hot'

  try {
    // tell user we are loading
    statusEl.textContent = 'ladataan…'

    const res = await fetch(url, { signal: currentCtrl.signal })
    if (!res.ok) {
      throw new Error('http ' + res.status)
    }

    const raw = await res.json()

    // make sure we have an array
    let list = []
    if (Array.isArray(raw)) {
      list = raw
    }

    // prepare query (lowercase + trim)
    let q = ''
    if (query) {
      q = query.toLowerCase().trim()
    }

    // filter by title when q given
    let filtered
    if (q) {
      filtered = list.filter(item => {
        let title = ''
        if (item.title) {
          title = item.title.toLowerCase()
        }
        return title.includes(q)
      })
    } else {
      filtered = list
    }

    // show count
    statusEl.textContent = filtered.length + ' tulosta'

    // keep first 12, return safe shape
    return filtered.slice(0, 12).map(item => {
      let safeTitle = 'nimetön'
      if (item.title) {
        safeTitle = item.title
      }
      return {
        title: safeTitle,
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

// render list items with image fallback, timeout + single retry
export function renderResults(items) {
  // clear old
  resultsEl.innerHTML = ''

  items.forEach(item => {
    const li = document.createElement('li')
    li.className = 'card'

    // title
    const strong = document.createElement('strong')
    if (item.title) {
      strong.textContent = item.title
    } else {
      strong.textContent = 'nimetön'
    }
    li.appendChild(strong)
    li.appendChild(document.createElement('br'))

    // image or fallback
    if (item.url) {
      const img = new Image()
      img.width = 160
      img.height = 120

      if (item.title) {
        img.alt = item.title
      } else {
        img.alt = ''
      }

      // help perf and hotlinking issues
      img.loading = 'lazy'
      img.decoding = 'async'
      img.referrerPolicy = 'no-referrer'

      // load
      img.src = item.url

      // if image is slow → retry once with cache buster, else fallback
      let triedOnce = false
      const TIMEOUT_MS = 8000
      let timer = setTimeout(() => {
        if (!triedOnce) {
          triedOnce = true
          // retry with cache-buster
          const sep = item.url.indexOf('?') >= 0 ? '&' : '?'
          img.src = item.url + sep + 't=' + Date.now()

          // second timeout → give up to fallback
          timer = setTimeout(() => {
            const em = document.createElement('em')
            em.textContent = 'no image (timeout)'
            img.replaceWith(em)
          }, TIMEOUT_MS)
        }
      }, TIMEOUT_MS)

      img.onload = () => {
        clearTimeout(timer)
      }

      img.onerror = () => {
        clearTimeout(timer)
        const em = document.createElement('em')
        em.textContent = 'no image'
        img.replaceWith(em)
      }

      li.appendChild(img)
    } else {
      const em = document.createElement('em')
      em.textContent = 'no image'
      li.appendChild(em)
    }

    resultsEl.appendChild(li)
  })
}
