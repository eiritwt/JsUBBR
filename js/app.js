import { acts } from './data.js';
import { state } from './state.js';

const canvas = document.getElementById('beebeeCanvas');
const ctx = canvas.getContext('2d');
const images = {};
let ticker = 0, animTimer = 0, animIndex = 0;

async function init() {
    for (let key in acts) {
        images[key] = new Image();
        images[key].src = acts[key].src;
    }
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
    sSel.innerHTML = '<option value="none">-- Manual --</option>';

    actData.frames.forEach(f => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = f;
        if (f.includes('*')) sSel.appendChild(opt);
        else if (f.startsWith('body')) bSel.appendChild(opt);
        else if (f.startsWith('mouth')) mSel.appendChild(opt);
        else if (f.startsWith('eyes')) eSel.appendChild(opt);
    });

    state.body = bSel.options[0]?.value || "";
    state.mouth = mSel.options[0]?.value || "";
    state.eyes = eSel.options[0]?.value || "";

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
    };

    applyRules();
}

function applyRules() {
    const rules = state.getRestrictions();
    if (rules.lockEyes) document.getElementById('eyesSelect').value = rules.lockEyes;
    if (rules.lockMouth) document.getElementById('mouthSelect').value = rules.lockMouth;
}

function run() {
    ticker += 0.016;
    const act = acts[state.act];
    const img = images[state.act];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.complete) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Seven vibes per second squash
        const squash = (state.vibrate || state.isLooping) ? 1 + Math.sin(ticker * Math.PI * 2 * 7) * 0.01 : 1;
        ctx.scale(1, squash);

        let bodyFrame = (state.special !== 'none') ? state.special : state.body;
        
        // Loop Logic
        const loop = act.loops.find(l => bodyFrame.includes(l.trigger));
        if (loop && state.isLooping) {
            animTimer += 0.016;
            if (animTimer >= loop.wait) {
                animIndex = (animIndex + 1) % loop.sequence.length;
                animTimer = 0;
            }
            bodyFrame = loop.sequence[animIndex];
        }

        if (act.layers) {
            act.layers.forEach(l => {
                let f = (l === 'body') ? bodyFrame : (state.special !== 'none' ? l + '_blank' : state[l]);
                drawFrame(ctx, img, act, f);
            });
        } else {
            drawFrame(ctx, img, act, bodyFrame);
            if (state.special === 'none') {
                drawFrame(ctx, img, act, state.mouth);
                drawFrame(ctx, img, act, state.eyes);
            }
        }
        ctx.restore();
    }
    requestAnimationFrame(run);
}

function drawFrame(ctx, img, act, name) {
    const idx = act.frames.indexOf(name);
    if (idx === -1) return;
    const col = idx % act.grid.width, row = Math.floor(idx / act.grid.width);
    ctx.drawImage(img, col*act.frame.w, row*act.frame.h, act.frame.w, act.frame.h, -act.anchor.x, -act.anchor.y, act.frame.w, act.frame.h);
}

init();
