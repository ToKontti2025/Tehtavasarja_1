import './scripts/theme.js'
import './scripts/search.js'
import './scripts/counter.js'

// 0) Pieni apu
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// moved to own file - 1+2) theme: localstorage key + double listener fix

// moved to own file - 3) search: abortcontroller + try/catch + loading state

// moved to own file - 4) counter: fix bubbling so whole button works


// 4) Clipboard — virhe: ei permissioiden / https tarkistusta
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#copyBtn').dataset.text;
  await navigator.clipboard.writeText(text); // BUG: voi heittää virheen
  alert('Kopioitu!');
});

// 5) IntersectionObserver — virhe: threshold/cleanup puuttuu
const box = document.querySelector('.observe-box');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0.25) {
      box.textContent = 'Näkyvissä!';
    }
  });
});
io.observe(box);
