import * as ActionTypes from '../constants/ActionTypes';
import Presets from '../constants/Presets';

const initialState = {
    power: true,
    gains: Presets[0].gains,
    preset: Presets[0].name,
};

const actionsMap = {
    [ActionTypes.SET_POWER](state, action) {
        state.power = action.power ? true : false;

        return state;
    },
    [ActionTypes.SET_GAIN](state, action) {
        if (state.power) {
            state.preset = "";
            state.gains[action.index] = parseFloat(action.gain);
        }

        return state;
    },
    [ActionTypes.SET_PRESET](state, action) {
        if (state.power) {
            const preset = Presets.filter((preset) => {
                return preset.name === action.name;
            }).pop();

            if (preset) {
                state.preset = preset.name;

                preset.gains.forEach((gain, index) => {
                    state.gains[index] = gain;
                });
            }
        }

        return state;
    },
};

export default function equalizer(state = initialState, action) {
    state = Object.assign({}, state);

    const reduceFn = actionsMap[action.type];
    if (!reduceFn) {
        return state;
    }

    return reduceFn(state, action);
}
