window.lastTouchTimestamp = 0;

document.addEventListener('touchstart', function (event) {
    const nowTouchTimestamp = new Date().getTime();
    const tapDelayThreshold = 300;
    const tapDelay = nowTouchTimestamp - window.lastTouchTimestamp;
    if (tapDelay <= tapDelayThreshold) {
        event.preventDefault();
    }
    window.lastTouchTimestamp = nowTouchTimestamp;
}, { passive: false });