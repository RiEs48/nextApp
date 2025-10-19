export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
    }).format(amount)
}