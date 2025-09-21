 tehtäväsarja 1 – debug & browser apis

this project is split into small tasks. each feature is in its own file under `scripts/`.

## clone

to get the project on your machine:

git clone https://github.com/ToKontti2025/Tehtavasarja_1.git
cd Tehtavasarja_1
then open index.html in your browser.

files
index.html
main page with form, buttons and containers.

app.js
entry point, imports all scripts.

scripts/theme.js
theme toggle (light/dark). uses localstorage.
fixed: wrong key + double event listener.

scripts/search.js
fetch coffee api, filter by query, show results.
uses abortcontroller, try/catch and status text.
safe render with fallback if no image.

scripts/history.js
sync search term with url.
supports page reload and back/forward buttons.

scripts/counter.js
click counter.
fixed bubbling so both button and span clicks count once.

scripts/clipboard.js
copy text to clipboard.
checks https/permission and shows feedback message.

scripts/observer.js
intersectionobserver demo.
shows “näkyvissä!” once when box is 25% visible, then stops observing.

tasks done
task 1–2: theme fixes (localstorage key, remove duplicate listener).

task 3: search with api + error handling + abortcontroller.

task 4: counter bubbling fix with closest().

task 5: clipboard api with https/permission + feedback.

task 6: intersectionobserver with threshold + cleanup.

task 7: history api sync with url + back/forward.

extras not yet done
debounce input search

drag & drop demo

usage
clone repo (see above) or copy project folder

open index.html in your browser

works with just file://

for full clipboard support, use https or localhost server

open devtools (f12) to see console logs, errors, breakpoints

testing
how each task was tested in browser:

theme (task 1–2)
click "vaihda teema" → background + text color changes.
reload page → saved theme restored from localstorage.
checked application > local storage in devtools.

search (task 3)
submit form with keywords like latte, americano.
loading text shown, results rendered with titles + images.
fast repeat search cancels previous (abortcontroller).
broken/missing image replaced by “no image”.

counter (task 4)
click button text or the number → count goes up by 1.
verified no double counting.

clipboard (task 5)
click "kopioi tervehdys" → message shows “kopioitu!”.
tested with navigator.clipboard.readText() in console.
verified errors handled if not https.

observer (task 6)
scroll until box visible → after 1s text changes to “näkyvissä!”.
only happens once (observer disconnect).

history (task 7)
make a search → url updates with ?q=term.
reload page → input filled and search auto-runs.
back/forward buttons → input + results update.

I used openai chatgpt (gpt-5) to help me with:  
- splitting code into separate files (theme.js, search.js, history.js, etc.)  
- fixing bugs (like wrong localstorage key, duplicate listeners, search errors)  
- writing simpler comments in english (not formal, easy style)  
- learning how to debug with browser devtools (breakpoints, console, network)  
- suggesting commit messages and project structure  

all code was tested and adjusted by me during the work.