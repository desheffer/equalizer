import * as ActionTypes from '../constants/ActionTypes';
import Presets from '../constants/Presets';

const initialState = {
    power: true,
    gains: Presets[0].gains,
};

const actionsMap = {
    [ActionTypes.SET_POWER](state, action) {
        state.power = action.power ? true : false;

        return state;
    },
    [ActionTypes.SET_GAIN](state, action) {
        if (state.power) {
            state.gains[action.index] = parseFloat(action.gain);
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
