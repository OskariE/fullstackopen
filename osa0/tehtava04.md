browser > server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

browser > server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server > browser: HTML dokumentti

browser > server: GET 
https://studies.cs.helsinki.fi/exampleapp/main.css
server > browser: CSS tiedosto

browser > server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server > browser: JS tiedosto

browser > server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server > browser: JSON tiedosto joka sisältää lisätyn muistiinpanon

selain renderöi päivitetyn sivun.