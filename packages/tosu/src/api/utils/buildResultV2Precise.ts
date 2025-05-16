import { ApiAnswerPrecise } from '@/api/types/v2';
import { InstanceManager } from '@/instances/manager';

export const buildResult = (
    instanceManager: InstanceManager
): ApiAnswerPrecise => {
    const osuInstance = instanceManager.getInstance(
        instanceManager.focusedClient
    );
    if (!osuInstance) {
        return { error: 'not_ready' };
    }

    const { global, gameplay, menu } = osuInstance.getServices([
        'gameplay',
        'global',
        'menu'
    ]);

    return {
        currentTime: global.playTime,
        epoch: Date.now(),
        three_hundred: gameplay.hit300,
        one_hundred: gameplay.hit100,
        fifty: gameplay.hit50,
        miss: gameplay.hitMiss,
        slider_break: gameplay.hitSB,
        score: gameplay.score,
        accuracy: gameplay.accuracy,
        unstableRate: gameplay.unstableRate,
        max_combo: gameplay.maxCombo,
        current_combo: gameplay.combo,
        title: menu.title,
        difficulty: menu.difficulty,
        checksum: menu.checksum,
        hitErrors: gameplay.hitErrors
    };
};
