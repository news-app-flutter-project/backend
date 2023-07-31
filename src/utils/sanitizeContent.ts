// This function removes unwanted characters from the provided text
export const sanitizeContent = (text: string) => {
    // Remove all forward slashes and backslashes
    const sanitizedText = text.replace(/[\/\\]/g, '');

    return sanitizedText;
};
