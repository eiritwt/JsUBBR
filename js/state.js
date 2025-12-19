export const state = {
    act: 'act1',
    body: '', mouth: '', eyes: '', special: 'none',
    isLooping: false, vibrate: false, flipped: false,

    getRestrictions() {
        const isR = (v) => v && (v.includes('_r') || v.includes('_right'));
        const isCry = (v) => v && v.includes('cry') && !isR(v);
        const isJudge = (v) => v && v.includes('judge');

        let result = { lockEyes: null, lockMouth: null, disableMouth: () => false, disableEyes: () => false };

        if (isJudge(this.body) || isJudge(this.eyes)) {
            result.lockEyes = 'eyes_judge';
            if (isCry(this.mouth) || isR(this.mouth)) result.lockMouth = 'mouth_normal';
            result.disableMouth = (m) => isCry(m) || isR(m);
            result.disableEyes = (e) => !isJudge(e);
        } else if (isCry(this.body) || isCry(this.mouth) || isCry(this.eyes)) {
            result.disableMouth = (m) => !isCry(m);
        } else if (isR(this.mouth)) {
            result.lockEyes = 'eyes_normal_r';
        }
        return result;
    }
};
