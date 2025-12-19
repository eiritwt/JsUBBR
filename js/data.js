export const acts = {
    act1: { 
        src: './assets/act1_beebee.png', 
        grid: { width: 4, height: 8 }, 
        anchor: { x: 273, y: 200 }, 
        frame: { w: 720, h: 500 },
        frames: [
            "body_normal", "body_fear", "body_point_crotch", "body_point_heart", "body_sing",
            "mouth_normal", "mouth_normal_talk", "mouth_small", "mouth_small_talk", "mouth_small_lock",
            "eyes_normal", "eyes_normal_right", "eyes_uncertain", "eyes_uncertain_right", "eyes_narrow",
            "eyes_narrow_eyebrow", "eyes_fear", "eyes_pretty", "eyes_wat", "eyes_wat_2",
            "body_panic*", "body_panic_2*", "body_scream_anger*", "body_scream_anger_2*", "body_scream*", "body_scream_2*",
            "body_flail*", "body_flail2*", "body_flail3*", "body_flail4*",
            "mouth_smile", "mouth_smile_talk", "mouth_smile_lock", "eyes_smile", "eyes_look", "eyes_look_sad", 
            "eyes_look_sad_smile", "eyes_pained1", "eyes_pained2", "mouth_shut", "eyes_anger",
            "body_meta*", "body_laugh*", "body_pride_talk*", "body_pride*", "body_squeeze_talk*", "body_squeeze*"
        ],
        loops: [
            { trigger: "panic*", sequence: ["body_panic*", "body_panic_2*"], wait: 0.07 },
            { trigger: "scream_anger*", sequence: ["body_scream_anger*", "body_scream_anger_2*"], wait: 0.1 },
            { trigger: "scream*", sequence: ["body_scream*", "body_scream_2*"], wait: 0.1 },
            { trigger: "flail*", sequence: ["body_flail*", "body_flail2*", "body_flail3*", "body_flail4*"], wait: 0.05 }
        ]
    },
    act2: { 
        src: './assets/battle_bb.png', 
        grid: { width: 10, height: 8 }, 
        anchor: { x: 292.5, y: 249.4 }, 
        frame: { w: 720, h: 500 },
        frames: [
            "body_normal", "body_two_up", "body_chest", "body_point", "body_one_up", "body_scream_a_1*", "body_scream_a_2*", "body_shocked*", "mouth_small", "mouth_small_talk",
            "mouth_normal", "mouth_normal_talk", "mouth_smile", "mouth_smile_talk", "eyes_normal", "eyes_normal_r", "eyes_suspect", "eyes_suspect_r", "eyes_sad", "eyes_sad_r",
            "eyes_shock", "eyes_happy", "eyes_happy_r", "eyes_closed", "eyes_eyes_judge", "body_judge_1", "body_judge_2", "body_scream_b_1*", "body_scream_b_2*", "body_scream_c_1*",
            "body_scream_c_2*", "body_cry_1*", "body_cry_2*", "body_cry_3*", "body_cry_4", "mouth_cry_talk", "mouth_cry", "eyes_cry", "eyes_cry_2", "body_cry_5*",
            "body_cry_6", "mouth_right", "mouth_right_talk", "eyes_cry_r_1", "eyes_cry_r_2", "eyes_cry_r_3", "eyes_cry_r_4", "mouth_blank", "eyes_blank", "eyes_asdf",
            "eyes_angry", "eyes_sad_2", "eyes_wat", "body_attacked*", "body_frazzled", "mouth_frazzled_talk", "mouth_frazzled", "eyes_frazzled", "body_panicked", "mouth_panicked",
            "mouth_panicked_talk", "eyes_panicked", "body_special_a*", "body_special_b_1*", "body_special_b_2*", "body_special_b_3*", "body_special_c*", "body_final_1*", "body_final_2*", "body_final_3*",
            "body_final_4*", "body_yell_1*", "body_yell_2*", "body_yell_angry_1*", "body_yell_angry_2*"
        ],
        loops: [
            { trigger: "scream_a_", sequence: ["body_scream_a_1*", "body_scream_a_2*"], wait: 0.1 },
            { trigger: "scream_b_", sequence: ["body_scream_b_1*", "body_scream_b_2*"], wait: 0.1 },
            { trigger: "scream_c_", sequence: ["body_scream_c_1*", "body_scream_c_2*"], wait: 0.07 },
            { trigger: "special_b_", sequence: ["body_special_b_1*", "body_special_b_2*", "body_special_b_3*"], wait: 0.1 },
            { trigger: "final_", sequence: ["body_final_1*", "body_final_2*", "body_final_3*", "body_final_4*"], wait: 0.05 }
        ] 
    },
    act3: {
        src: './assets/fight_bb.png',
        grid: { width: 8, height: 3 }, 
        anchor: { x: 270, y: 223 }, 
        frame: { w: 720, h: 500 },
        frames: [
            "body_normal_1", "body_normal_2", "body_normal_3", "body_normal_4", "mouth_sorry", "mouth_sorry_talk", "eyes_sorry_down", "eyes_sorry",
            "eyes_sorry_up", "mouth_normal", "mouth_normal_talk", "eyes_oh_crap", "eyes_start", "eyes_normal", "eyes_angry", "eyes_sad",
            "mouth_ignore", "mouth_ignore_talk", "eyes_ignore", "eyes_ignore_oh_crap", "body_attacked*", "body_dead*", "body_special_attack*"
        ],
        loops: []
    },
    act4_convo: {
        src: './assets/bb_convo.png',
        grid: { width: 8, height: 9 }, 
        anchor: { x: 171, y: 242 }, 
        frame: { w: 500, h: 500 },
        layers: ["coneb", "body", "mouth", "eyes", "cone"],
        frames: [
            "body_normal", "body_chest", "body_two_up", "body_one_up", "body_paw", "cone_normal", "coneb_normal", "mouth_normal",
            "mouth_normal_talk", "mouth_narrow", "mouth_narrow_talk", "mouth_smile", "mouth_smile_talk", "mouth_scream", "mouth_scream_talk", "cone_scream",
            "coneb_scream", "eyes_normal", "eyes_normal_r", "eyes_normal_u", "eyes_normal_d", "eyes_look_down", "eyes_scream", "eyes_scream_sad",
            "eyes_super_sad", "eyes_closed", "eyes_closed_annoyed", "eyes_sexy", "eyes_smile", "eyes_smile_r", "eyes_smile_u", "eyes_smile_d",
            "eyes_angry", "eyes_angry_r", "eyes_angry_u", "eyes_angry_d", "eyes_surprise", "eyes_surprise_r", "eyes_surprise_u", "eyes_surprise_d",
            "eyes_annoyed", "eyes_annoyed_r", "eyes_annoyed_u", "eyes_annoyed_d", "eyes_sad", "eyes_sad_r", "eyes_sad_u", "eyes_sad_d",
            "eyes_suspect", "eyes_suspect_r", "body_karate_1*", "body_karate_2*", "cone_karate", "coneb_karate", "body_yap_1*", "body_yap_2*",
            "body_yap_3*", "body_yap_4*", "cone_yap_1", "cone_yap_2", "cone_yap_3", "cone_yap_4", "eyes_blank", "mouth_blank", "coneb_blank"
        ],
        loops: [
            { trigger: "yap_", sequence: ["body_yap_1*", "body_yap_2*", "body_yap_3*", "body_yap_4*"], wait: 0.04 }
        ]
    }
};
