export const gptToString = (input: string): string[] => {
    const items = input
        .split('\n')
        .map((item) => item.trim().replace(/^\d+\.\s/, ''));
    return items.filter((item) => item !== '');
};
