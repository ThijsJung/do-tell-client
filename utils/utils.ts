export function epochToDateString(epoch: number) {
    const d = new Date(epoch * 1000);
    return `${d.toLocaleString('en-US', { weekday: 'long' })}, ${d.toLocaleString('nl-NL')}`;
}