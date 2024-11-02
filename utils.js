/**
 * Function which generates a random color of GREEN, YELLOW, RED, BLUE
 */
export function getRandomColor() {
    const colors = ['red', 'green', 'yellow', 'blue', 'lightgreen', 'pink'];
    const rndIndex = Math.floor(Math.random() * colors.length);
    return colors[rndIndex];
}
