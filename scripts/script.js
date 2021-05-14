// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener("click", () => {
          setState('single-entry', entry);
        })
      });
    });
});

document.querySelector("header img").addEventListener("click", () => {
  setState("settings");
});

document.querySelector("header h1").addEventListener("click", () => {
  setState("home");
});

window.onpopstate = function() {
  if(location.hash == "") {
    console.log("going home");
    setState("home")
  }
  else if(location.hash == "#settings") {
    setState("settings");
  }
  else{
    console.log("going to an entry");
    console.log("location.hash[6] - 1");
    let allEntries = document.querySelectorAll('journal-entry'); 

    setState("entry-page", allEntries[location.hash[6] - 1]);
  }
};