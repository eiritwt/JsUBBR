export const acts = {
    act1: { 
        src: './assets/act1_beebee.png', 
        grid: { width: 4 }, anchor: { x: 273, y: 200 }, frame: { w: 720, h: 500 },
        frames: ["body_normal","body_fear","mouth_normal","mouth_normal_talk","eyes_normal","eyes_normal_right","body_panic*","body_panic_2*"],
        loops: [{ trigger: "panic*", sequence: ["body_panic*", "body_panic_2*"], wait: 0.07 }]
    },
    act2: { 
        src: './assets/battle_bb.png', 
        grid: { width: 10 }, anchor: { x: 292.5, y: 249.4 }, frame: { w: 720, h: 500 },
        frames: ["body_normal","body_judge_1","body_judge_2","eyes_judge","mouth_cry","mouth_right","eyes_normal_r","body_cry_6","eyes_cry","mouth_normal"],
        loops: [] 
    },
    act3: {
        src: './assets/fight_bb.png',
        grid: { width: 8 }, anchor: { x: 270, y: 223 }, frame: { w: 720, h: 500 },
        frames: ["body_normal_1","mouth_normal","eyes_normal"],
        loops: []
    },
    act4_convo: {
        src: './assets/bb_convo.png',
        grid: { width: 8 }, anchor: { x: 171, y: 242 }, frame: { w: 500, h: 500 },
        layers: ["coneb", "body", "mouth", "eyes", "cone"],
        frames: ["body_normal","mouth_normal","eyes_normal"],
        loops: []
    }
};
