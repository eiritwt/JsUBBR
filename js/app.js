// At the very top of js/app.js, make sure the imports look exactly like this:
import { acts } from './data.js';
import { state } from './state.js';

// Add this error logger to help us find the break
window.onerror = function(msg, url, line) {
    alert("Error: " + msg + "\nurl: " + url + "\nline: " + line);
};

// Ensure the canvas is ready
const canvas = document.getElementById('beebeeCanvas');
const ctx = canvas.getContext('2d');
