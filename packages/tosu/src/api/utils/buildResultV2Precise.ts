import { ApiAnswerPrecise as ApiAnswer, PreciseTourney } from '@/api/types/v2';
import { InstanceManager } from '@/instances/manager';
 
export const buildResult = (instanceManager: InstanceManager): ApiAnswer => {
    const osuInstance = instanceManager.getInstance(
        instanceManager.focusedClient
    );
    if (!osuInstance) {
        return { error: 'not_ready' };
    }

    const { global, gameplay, menu, beatmapPP } = osuInstance.getServices([
        'gameplay',
        'global',
        'menu',
        'beatmapPP'
    ]);


    return {
        currentTime: global.playTime,
        hits: {
            three_hundred: gameplay.hit300,
            one_hundred: gameplay.hit100,
            fifty: gameplay.hit50,
            miss: gameplay.hitMiss,
            slider_break: gameplay.hitSB
        },
        scores: {
            score: gameplay.score
        },
        precisions: {
            precision: gameplay.accuracy,
            accuracy: gameplay.accuracy,
            unstableRate: gameplay.unstableRate,
            max_combo: gameplay.maxCombo,
            current_combo: gameplay.combo,
            current_score: gameplay.score
        },
        beatmap: {
            title: menu.title,
            difficulty: menu.difficulty,
            checksum: menu.checksum,
            time: {
                live: global.playTime,
                first_object_time: beatmapPP.timings.firstObj,
                last_object_time: beatmapPP.timings.full
            }
        },
        hitErrors: gameplay.hitErrors,
    };
};
