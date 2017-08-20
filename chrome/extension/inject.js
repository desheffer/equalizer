import Bands from '../../app/constants/Bands';

const context = new AudioContext();
const fanOut = context.createGain();
let filters;

// Create a new filter chain and attach it to the fan out.
const setFilters = (power, gains) => {
    if (filters === undefined) {
        // Create the chain of filters.
        filters = Bands.map((band, i) => {
            const filter = context.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0.0;
            filter.frequency.value = band.freq;
            filter.Q.value = 1;

            return filter;
        });

        // Connect the chain of filters.
        for (let i = 0; i < filters.length - 1; ++i) {
            filters[i].connect(filters[i + 1]);
        }

        // Connect the filter chain to the sink.
        filters[filters.length - 1].connect(context.destination);
    }

    // Set new gain on each filter.
    gains.forEach((gain, i) => {
        filters[i].gain.value = gain;
    });

    fanOut.disconnect();
    if (power) {
        fanOut.connect(filters[0]);
    } else {
        fanOut.connect(context.destination);
    }
};

// Find sources and attach them to the fan out.
const attachFilters = () => {
    const sources = [];

    // Find audio tags.
    const audioNodes = document.getElementsByTagName('audio');
    for (let i = 0; i < audioNodes.length; ++i) {
        sources.push(audioNodes[i]);
    }

    // Find video tags.
    const videoNodes = document.getElementsByTagName('video');
    for (let i = 0; i < videoNodes.length; ++i) {
        sources.push(videoNodes[i]);
    }

    // Connect each source to the filter chain.
    sources.forEach((el) => {
        try {
            const source = context.createMediaElementSource(el);
            source.connect(fanOut);
        } catch (e) {
        }
    });
};

// Update the current filter state.
const updateState = () => {
    chrome.storage.local.get('state', (obj) => {
        const state = JSON.parse(obj.state);

        const power = state.equalizer.power;
        const gains = state.equalizer.gains;

        setFilters(power, gains);
    });
};

window.addEventListener('load', () => {
    // Attach filters and update state on page load.
    attachFilters();
    updateState();

    // Attach filters on page mutation.
    const observer = new MutationObserver(attachFilters);
    observer.observe(document.body ? document.body : document, {
        childList: true,
        subtree: true,
    });

    // Update state on update event.
    chrome.runtime.onMessage.addListener((message) => {
        if (message === 'update') {
            updateState();
        }
    });
});
