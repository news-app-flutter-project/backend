declare global {
    type ConvertedCategory =
        | Exclude<Category, 'lifestyle'>
        | 'environment'
        | 'food'
        | 'top'
        | 'tourism'
        | 'health';
}

export const lifeStyleConvert = (
    categories: Category[]
): ConvertedCategory[] => {
    const newCategories = categories.filter((c) => c !== 'lifestyle');
    const convertedCategories: ConvertedCategory[] = [];

    if (categories.includes('lifestyle')) {
        convertedCategories.push(
            'environment',
            'food',
            'top',
            'tourism',
            'health'
        );
    }

    return [...newCategories, ...convertedCategories] as ConvertedCategory[];
};
