export function removeApostrophe(str: string): Category {
    const cleanedStr = str.replace(/'/g, '');
    // Determine the category based on the cleaned string
    let category: Category;

    if (cleanedStr === 'business') {
        category = 'business';
    } else if (cleanedStr === 'entertainment') {
        category = 'entertainment';
    } else if (cleanedStr === 'politics') {
        category = 'politics';
    } else if (cleanedStr === 'science') {
        category = 'science';
    } else if (cleanedStr === 'sports') {
        category = 'sports';
    } else if (cleanedStr === 'technology') {
        category = 'technology';
    } else if (cleanedStr === 'world') {
        category = 'world';
    } else if (cleanedStr === 'lifestyle') {
        category = 'lifestyle';
    } else {
        // Handle the case where the cleaned string does not match any category
        // You can throw an error, return a default category, or handle it in any other way as per your needs.
        // For now, let's assume it falls under 'unknown' category.
        category = 'lifestyle';
    }

    return category;
}
