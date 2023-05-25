import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

interface dataHandler {
    sentence: string;
}

export const badWordsRepository = {
    async FindBadWords(data: dataHandler) {
        try {
            // Split the user's sentence into individual words
            let words = data.sentence.split(' ');

            // Search for any of those words in the bad_words table
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
