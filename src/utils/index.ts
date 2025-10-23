export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
    }).format(amount)
}

// ffuncion para condigionar la imagen si viene de local o de caludinary o otra

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath

    } else {
        return `/products/${imagePath}.jpg`
    }
}