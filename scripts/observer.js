// observer.js

const box = document.querySelector('.observe-box')

if (box) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // wait 1s before changing text
        setTimeout(() => {
          box.textContent = 'näkyvissä!'
          observer.unobserve(entry.target) // stop watching after first trigger
          observer.disconnect()
        }, 1000)
      }
    })
  }, { threshold: 0.25 }) // run when 25% visible

  io.observe(box)
}
