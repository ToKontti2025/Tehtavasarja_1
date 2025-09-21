import './scripts/theme.js'

// 0) Pieni apu
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// "Moved to its own file"  1) Teema — virhe: localStorage avain sekoilee, event listener duplikoituu


// 2) Haku — korjaus: oikea endpoint + AbortController + try/catch + lataustila
const form = document.getElementById('searchForm');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');

// added abort controller
let currentCtrl = null; // add nearby beginning of file

// Coffee http-rajapinnan dokumentaatio: https://sampleapis.com/api-list/coffee
async function searchImages(query) {
  if (currentCtrl) currentCtrl.abort(); // cancel prev request
  currentCtrl = new AbortController();
  
  // endpoint to one that returns an array of items with {title,image}
  const url = `https://api.sampleapis.com/coffee/hot`; // returns list
  try {
    statusEl.textContent = 'Ladataan…'; //state to user
    const res = await fetch(url, { signal: currentCtrl.signal }); //pass signal to abort controller
    if (!res.ok) throw new Error(`HTTP ${res.status}`); //http error check

    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : []; //quard
    const q = (query || '').toLowerCase();
    const filtered = q ? list.filter(x => x.title?.toLowerCase().includes(q)) : list;

    //status with count
    statusEl.textContent = `${filtered.length} tulosta`;
    return filtered.slice(0, 12).map(x => ({
      title: x.title || 'Nimetön',
      url: x.image
    }));
  } catch (err) { // handling for cancellation
    if (err.name === 'AbortError') {
      statusEl.textContent = 'Peruutettu';
      return [];
    }
    console.error(err);
    statusEl.textContent = 'Haku epäonnistui.'; //show result instead of crash
    return [];
  } finally {
    //clear controller handle
    currentCtrl = null;
  }
}

// try/catch, clear results first, call searchImages once
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultsEl.innerHTML = ''; // clear previous results 
  const q = $('#q').value.trim();
  try {
    const items = await searchImages(q);
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `<strong>${item.title}</strong><br><img alt="" width="160" height="120" src="${item.url}">`;
      resultsEl.appendChild(li);
    });
    // statusEl päivitetään searchImages-funktiossa
  } catch (err) {
    //last resort guard so that UI doesn't break
    console.error(err);
    statusEl.textContent = 'Tuntematon virhe haussa.';
  }
});

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
