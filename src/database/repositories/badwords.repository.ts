import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

interface dataHandler {
    content: string;
}

export const badWordsRepository = {
    async FindBadWords(data: dataHandler) {
        try {
            let words = data.content.split(' ');

            const badWords = await db.BadWords.findAll({
                where: {
                    words: {
                        [Op.in]: words,
                    },
                },
            });

            return badWords;
        } catch (err) {
            return dbException(err);
        }
    },
};
