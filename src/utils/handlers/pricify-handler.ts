export const pricifyHandler = (amount: number): string => {
    const formatted = amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatted.split('$')[1];
};