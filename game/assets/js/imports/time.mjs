export function formatTime (timestamp) {
    const minutes = Math.floor(timestamp / 1000 / 60);
    const seconds = Math.floor((timestamp / 1000) % 60);
    const milliseconds = timestamp % 1000;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}:${milliseconds < 100 ? (milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}`) : milliseconds}`;
}