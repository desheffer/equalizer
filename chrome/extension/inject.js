import Bands from '../../app/constants/Bands';

var context;
var filters;

var init = () => {
    if (context === undefined) {
        context = new AudioContext();
    }

    if (filters === undefined) {
        // Create the chain of filters.
        filters = Bands.map((band) => {
            var filter = context.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0.0;
            filter.frequency.value = band.freq;
            filter.Q.value = 1;

            return filter;
        });

        // Connect the chain of filters.
        for (var i = 0; i < filters.length - 1; ++i) {
            filters[i].connect(filters[i + 1]);
        }

        // Connect the filter chain to the sink.
        filters[filters.length - 1].connect(context.destination);
    }
};

var attach = () => {
    init();

    var i;
    var sources = [];

    // Find audio tags.
    var audioNodes = document.getElementsByTagName('audio');
    for (i = 0; i < audioNodes.length; ++i) {
        sources.push(audioNodes[i]);
    }

    // Find video tags.
    var videoNodes = document.getElementsByTagName('video');
    for (i = 0; i < videoNodes.length; ++i) {
        sources.push(videoNodes[i]);
    }

    // Connect each source to the filter chain.
    sources.forEach((el) => {
        try {
            var source = context.createMediaElementSource(el);
            source.connect(filters[0]);

            console.log('EQ: Attached');
        } catch (e) {
        }
    });
};

window.addEventListener('load', () => {
    attach();

    var observer = new MutationObserver(attach);
    observer.observe(document.body ? document.body : document, {
        childList: true,
        subtree: false,
        attributes: false,
        characterData: false
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message === 'update') {
            chrome.storage.local.get('state', (obj) => {
                const state = JSON.parse(obj.state || '{}');

                const power = state.equalizer.power;
                const gains = state.equalizer.gains;

                // Reset gain on each filter.
                filters.forEach((filter) => {
                    filter.gain.value = 0.0;
                });

                // End here if the power is off.
                if (!power) {
                    return;
                }

                // Set new gain on each filter.
                gains.forEach((gain, i) => {
                    filters[i].gain.value = gain;
                });
            });
        }
    });
});
