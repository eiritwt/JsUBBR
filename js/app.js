import { acts } from './data.js';
import { state } from './state.js';

const canvas = document.getElementById('beebeeCanvas');
const ctx = canvas.getContext('2d');
const images = {};
let ticker = 0;

async function init() {
    // Load all images and wait for them
    const loadPromises = Object.keys(acts).map(key => {
        return new Promise((resolve) => {
            images[key] = new Image();
            images[key].onload = resolve;
            images[key].onerror = resolve; // Continue even if one fails
            images[key].src = acts[key].src;
        });
    });

    await Promise.all(loadPromises);
    setupUI();
    requestAnimationFrame(run);
}

function setupUI() {
    const actData = acts[state.act];
    const bSel = document.getElementById('bodySelect');
    const mSel = document.getElementById('mouthSelect');
    const eSel = document.getElementById('eyesSelect');
    const sSel = document.getElementById('specialSelect');

    [bSel, mSel, eSel, sSel].forEach(s => s.innerHTML = '');
    
    const noneOpt = document.createElement('option');
    noneOpt.value = 'none'; noneOpt.textContent = '-- Manual --';
    sSel.appendChild(noneOpt);

    actData.frames.forEach(f => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = f;
        if (f.includes('*')) sSel.appendChild(opt);
        else if (f.startsWith('body')) bSel.appendChild(opt);
        else if (f.startsWith('mouth')) mSel.appendChild(opt);
        else if (f.startsWith('eyes')) eSel.appendChild(opt);
    });

    // Default values if empty
    if (!bSel.value && bSel.options.length) state.body = bSel.options[0].value;
    if (!mSel.value && mSel.options.length) state.mouth = mSel.options[0].value;
    if (!eSel.value && eSel.options.length) state.eyes = eSel.options[0].value;

    document.getElementById('actSelect').onchange = (e) => { state.act = e.target.value; setupUI(); };
    bSel.onchange = (e) => { state.body = e.target.value; applyRules(); };
    mSel.onchange = (e) => { state.mouth = e.target.value; applyRules(); };
    eSel.onchange = (e) => { state.eyes = e.target.value; applyRules(); };
    sSel.onchange = (e) => { state.special = e.target.value; applyRules(); };
    
    document.getElementById('vibeToggle').onclick = (e) => {
        state.vibrate = !state.vibrate;
        e.target.textContent = `Vibrate: ${state.vibrate ? 'ON' : 'OFF'}`;
    };
    
    document.getElementById('loopBtn').onclick = (e) => {
        state.isLooping = !state.isLooping;
        e.target.textContent = state.isLooping ? 'Stop Loop' : 'Start Loop';
        e.target.classList.toggle('active', state.isLooping);
    };

    applyRules();
}

function applyRules() {
    const rules = state.getRestrictions();
    const mSel = document.getElementById('mouthSelect');
    const eSel = document.getElementById('eyesSelect');

    if (rules.lockEyes) eSel.value = rules.lockEyes;
    if (rules.lockMouth) mSel.value = rules.lockMouth;
    
    Array.from(mSel.options).forEach(opt => opt.disabled = rules.disableMouth(opt.value));
    Array.from(eSel.options).forEach(opt => opt.disabled = rules.disableEyes(opt.value));
}

function run(time) {
    ticker += 0.02;
    const act = acts[state.act];
    const img = images[state.act];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!img || !img.complete) {
        requestAnimationFrame(run);
        return;
    }

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    if (state.vibrate && state.isLooping) {
        ctx.scale(1, 1 + Math.sin(ticker * 10) * 0.01);
    }

    if (state.special !== 'none') {
        drawFrame(ctx, img, act, state.special);
    } else {
        drawFrame(ctx, img, act, state.body);
        drawFrame(ctx, img, act, state.mouth);
        drawFrame(ctx, img, act, state.eyes);
    }

    ctx.restore();
    requestAnimationFrame(run);
}

function drawFrame(ctx, img, act, name) {
    const idx = act.frames.indexOf(name);
    if (idx === -1) return;
    const col = idx % act.grid.width, row = Math.floor(idx / act.grid.width);
    ctx.drawImage(img, col*act.frame.w, row*act.frame.h, act.frame.w, act.frame.h, 
                  -act.anchor.x, -act.anchor.y, act.frame.w, act.frame.h);
}

init();
