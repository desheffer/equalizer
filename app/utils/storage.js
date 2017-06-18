function saveState(state) {
    chrome.storage.local.set({ state: JSON.stringify(state) });
}

function triggerUpdate() {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, 'update');
        });
    });
}

export default function () {
    return next => (reducer, initialState) => {
        const store = next(reducer, initialState);

        store.subscribe(() => {
            const state = store.getState();
            saveState(state);
            triggerUpdate();
        });

        return store;
    };
}
