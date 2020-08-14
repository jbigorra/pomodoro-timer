export function secToMin (seconds) {
  return Math.floor(seconds / 60);
}

export function printMinutesFrom (secondsLeft) {
  const minutes = secToMin(secondsLeft);
  const seconds = secondsLeft % 60;

  return `${
    minutes < 10
    ? '0' + minutes
    : minutes}:${
    seconds < 10
    ? '0' + seconds
    : seconds}`;
}
