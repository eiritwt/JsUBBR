function run(time) {
    const delta = 0.016; // Approx 60fps
    animTimer += delta;
    
    const act = acts[state.act];
    const img = images[state.act];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!img || !img.complete) {
        requestAnimationFrame(run);
        return;
    }

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // AUTHENTIC VIBRATION: Seven vibes per second
    ticker += delta;
    let squash = 1;
    if (state.vibrate || state.isLooping) {
        squash = 1 + Math.sin(ticker * Math.PI * 2 * 7) * 0.01;
    }
    ctx.scale(1, squash);

    let displayBody = (state.special !== 'none') ? state.special : state.body;
    
    // HANDLE ANIMATION LOOPS
    const loop = act.loops.find(l => displayBody.includes(l.trigger));
    if (loop && state.isLooping) {
        if (animTimer >= loop.wait) {
            animIndex = (animIndex + 1) % loop.sequence.length;
            animTimer = 0;
        }
        displayBody = loop.sequence[animIndex];
    } else {
        animIndex = 0;
    }

    // DRAW LAYERS
    if (act.layers) {
        act.layers.forEach(layer => {
            if (layer === 'body') drawFrame(ctx, img, act, displayBody);
            else if (layer === 'mouth') drawFrame(ctx, img, act, (state.special !== 'none' ? 'mouth_blank' : state.mouth));
            else if (layer === 'eyes') drawFrame(ctx, img, act, (state.special !== 'none' ? 'eyes_blank' : state.eyes));
            // Cone logic for Act 4
            else if (layer.startsWith('cone')) drawFrame(ctx, img, act, layer + "_normal");
        });
    } else {
        drawFrame(ctx, img, act, displayBody);
        if (state.special === 'none') {
            drawFrame(ctx, img, act, state.mouth);
            drawFrame(ctx, img, act, state.eyes);
        }
    }

    ctx.restore();
    requestAnimationFrame(run);
}
