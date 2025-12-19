export const acts = {
    act1: { 
        src: 'assets/act1_beebee.png', 
        grid: { width: 4 }, 
        anchor: { x: 273, y: 200 }, 
        frame: { w: 720, h: 500 },
        frames: ["body_normal","body_fear","mouth_normal","mouth_normal_talk","eyes_normal","eyes_normal_right","body_panic*","body_panic_2*"],
        loops: [{ trigger: "panic*", sequence: ["body_panic*", "body_panic_2*"], wait: 0.07 }]
    },
    act2: { 
        src: 'assets/battle_bb.png', 
        grid: { width: 10 }, 
        anchor: { x: 292.5, y: 249.4 }, 
        frame: { w: 720, h: 500 },
        frames: ["body_normal","body_judge_1","eyes_judge","mouth_cry","mouth_right","eyes_normal_r","body_cry_6","eyes_cry","mouth_normal"],
        loops: [] 
    }
    // Add Act 3 and 4 here similarly...
};
