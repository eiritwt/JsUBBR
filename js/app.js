import { acts } from './data.js';
import { state } from './state.js';

const canvas = document.getElementById('beebeeCanvas');
const ctx = canvas.getContext('2d');
const images = {};
let ticker = 0, animIndex = 0, animTimer = 0;

async function init() {
    // Load images
    for (let key in acts) {
        images[key] = new Image();
        images[key].src = acts[key].src;
    }

    setupUI();
    requestAnimationFrame(run);
}

function setupUI() {
    const actData = acts[state.act];
    const selects = {
        body: document.getElementById('bodySelect'),
        mouth: document.getElementById('mouthSelect'),
        eyes: document.getElementById('eyesSelect'),
        spec: document.getElementById('specialSelect')
    };

    // Clear and Fill Selects
    Object.values(selects).forEach(s => s.innerHTML = '');
    const noneOpt = document.createElement('option'); noneOpt.value = 'none'; noneOpt.text = '-- Manual --';
    selects.spec.appendChild(noneOpt);

    actData.frames.forEach(f => {
        const opt = document.createElement('option'); opt.value = opt.text = f;
        if (f.includes('*')) selects.spec.appendChild(opt);
        else if (f.startsWith('body')) selects.body.appendChild(opt);
        else if (f.startsWith('mouth')) selects.mouth.appendChild(opt);
        else if (f.startsWith('eyes')) selects.eyes.appendChild(opt);
    });

    // Update state on change
    document.getElementById('actSelect').onchange = (e) => { state.act = e.target.value; setupUI(); };
    selects.body.onchange = (e) => { state.body = e.target.value; applyRules(); };
    selects.mouth.onchange = (e) => { state.mouth = e.target.value; applyRules(); };
    selects.eyes.onchange = (e) => { state.eyes = e.target.value; applyRules(); };
    selects.spec.onchange = (e) => { state.special = e.target.value; };
    
    document.getElementById('loopBtn').onclick = () => { state.isLooping = !state.isLooping; };
    document.getElementById('vibeToggle').onclick = () => { state.vibrate = !state.vibrate; };

    applyRules();
}

function applyRules() {
    const rules = state.getRestrictions();
    const mSel = document.getElementById('mouthSelect');
    if (rules.lockEyes) document.getElementById('eyesSelect').value = rules.lockEyes;
    if (rules.lockMouth) mSel.value = rules.lockMouth;
    
    Array.from(mSel.options).forEach(opt => opt.disabled = rules.disableMouth(opt.value));
}

function run(time) {
    ticker += 0.02;
    const act = acts[state.act];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    let currentBody = (state.special !== 'none') ? state.special : state.body;
    
    // Draw logic
    drawFrame(ctx, images[state.act], act, currentBody);
    if (state.special === 'none') {
        drawFrame(ctx, images[state.act], act, state.mouth);
        drawFrame(ctx, images[state.act], act, state.eyes);
    }

    ctx.restore();
    requestAnimationFrame(run);
}

function drawFrame(ctx, img, act, name) {
    const idx = act.frames.indexOf(name);
    if (idx === -1) return;
    const col = idx % act.grid.width, row = Math.floor(idx / act.grid.width);
    ctx.drawImage(img, col*act.frame.w, row*act.frame.h, act.frame.w, act.frame.h, -act.anchor.x, -act.anchor.y, act.frame.w, act.frame.h);
}

init();
