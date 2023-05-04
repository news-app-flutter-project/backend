const iconv = require('iconv-lite');

const convertKorean = (text: string) => {
    const utfPattern =
        /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]+/g;
    const containsUtf = utfPattern.test(text);

    if (containsUtf) {
        return text;
    } else {
        const encodedText = Buffer.from(text, 'binary');
        const decodedText = iconv.decode(encodedText, 'EUC-KR');
        const reencodedText = iconv.encode(decodedText, 'UTF-8');
        return reencodedText.toString();
    }
};

export default convertKorean;
