import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    kakaoIdAuth,
    queryValidation,
    profileValidation,
    newsSentenceNoValidation,
} from '@/middlewares/index';
import { manage_highlight } from './highlight.validation';

export function createHighlightRoutes(
    path: string,
    highlightHandler: any
): AuthRoutes {
    return {
        highlight: {
            method: 'post',
            path: `${path}`,
            middleware: [
                bodyValidation(manage_highlight),
                kakaoIdAuth(),
                profileValidation(),
                newsIdValidation(),
                newsSentenceNoValidation(),
            ],
            handler: highlightHandler,
        },
    };
}
