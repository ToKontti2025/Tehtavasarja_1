// counter button logic

// listen clicks on counter button
const counterArea = document.querySelector('.counter')
counterArea.addEventListener('click', (e) => {
  // always get button, even if child clicked
  const btn = e.target.closest('.counter')
  if (!btn) return

  // find span and read number
  const span = btn.querySelector('.count')
  let current = parseInt(span.textContent, 10)

  // if not a number, start from 0
  if (isNaN(current)) {
    current = 0
  }

  // add +1 and update text
  span.textContent = String(current + 1)
})