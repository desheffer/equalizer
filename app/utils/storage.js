function saveState(state) {
    chrome.storage.local.set({ state: JSON.stringify(state) });
}

function updatePage(state) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, 'update');
        });
    });
}

function updateIcon(state) {
    const path = state.equalizer.power ? 'img/icon-32.png' : 'img/icon-off-32.png';

    chrome.browserAction.setIcon({ path });
}

export default function () {
    return next => (reducer, initialState) => {
        const store = next(reducer, initialState);

        store.subscribe(() => {
            const state = store.getState();
            saveState(state);
            updatePage(state);
            updateIcon(state);
        });

        return store;
    };
}
