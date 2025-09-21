import './scripts/theme.js'
import './scripts/search.js'

// 0) Pieni apu
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// "Moved to its own file"  1) Teema — virhe: localStorage avain sekoilee, event listener duplikoituu


// "Moved to its own file" 2) Haku — korjaus: oikea endpoint + AbortController + try/catch + lataustila

// 4) fixed conter area whole button
const counterBtn = $('.counter');
counterBtn.addEventListener('click', (e) => {
  const span = $('.count', counterBtn);
  span.textContent = String(parseInt(span.textContent, 10) + 1);
});
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
