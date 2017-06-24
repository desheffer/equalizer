chrome.storage.local.get('state', (obj) => {
    const state = JSON.parse(obj.state);

    const path = state.equalizer.power ? 'img/icon-32.png' : 'img/icon-off-32.png';

    chrome.browserAction.setIcon({ path });
});

if (process.env.NODE_ENV === 'development') {
    chrome.browserAction.setBadgeText({ text: 'DEV' });
}
