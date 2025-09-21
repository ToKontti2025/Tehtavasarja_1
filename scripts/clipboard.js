// clipboard copy logic

const copyBtn = document.getElementById('copyBtn')
const statusEl = document.getElementById('status')

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.text

    // check https or localhost
    const secure = location.protocol === 'https:' || location.hostname === 'localhost'
    if (!secure) {
      statusEl.textContent = 'kopiointi toimii vain https tai localhost'
      return
    }

    try {
      // check permission if api exists
      if (navigator.permissions) {
        const perm = await navigator.permissions.query({ name: 'clipboard-write' })
        if (perm.state === 'denied') {
          statusEl.textContent = 'ei lupaa kirjoittaa leikepöydälle'
          return
        }
      }

      // try copy
      await navigator.clipboard.writeText(text)

      // success → show "copied" for 2s
      statusEl.textContent = 'kopioitu!'
      setTimeout(() => {
        statusEl.textContent = ''
      }, 2000)

    } catch (err) {
      console.error('clipboard fail', err)
      statusEl.textContent = 'kopiointi epäonnistui'
    }
  })
}
