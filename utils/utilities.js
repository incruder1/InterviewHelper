export function toTitleCase(str) {
    // Check if the input is valid
    if (!str) return '';

    // Split the string by spaces
    return str
        .split(' ') // Split by spaces
        .map(word => {
            // Capitalize the first letter and make the rest lowercase
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' '); // Join all parts together with a space
}

 
