import * as types from '../constants/ActionTypes';

export function setPower(power) {
    return { type: types.SET_POWER, power };
}
export function setGain(index, gain) {
    return { type: types.SET_GAIN, index, gain };
}
