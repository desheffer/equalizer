import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './GainSlider.css';

export default class GainSlider extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        gain: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        setGain: PropTypes.func.isRequired,
    };

    handleSliderChange = (evt) => {
        const { index, setGain } = this.props;

        setGain(index, evt.target.value);
    };

    handleDoubleClick = () => {
        const { index, setGain } = this.props;

        setGain(index, 0.0);
    };

    render() {
        const { index, label, gain, disabled } = this.props;

        let text = "" + gain;
        if (gain > 0) {
            text = '+' + text;
        }
        if (!text.match(/\./)) {
            text = text + '.0';
        }

        return (
            <div className={style.slider}>
                <style dangerouslySetInnerHTML={{__html: `
                    div.${style.range} input[value="${gain}"]::-webkit-slider-runnable-track {
                        background-size: ${(gain + 12.0) / 24.0 * 100.0}% 100%, 100%;
                    }
                `}} />
                <label>
                    <div className={style.label}>{label}</div>
                    <div className={style.range + ' ' + (disabled ? style.disabled : '')}>
                        <input type="range" min="-12" max="12" step="0.1" value={gain} onChange={this.handleSliderChange} onDoubleClick={this.handleDoubleClick} />
                    </div>
                </label>
                <div className={style.value}>{text}</div>
            </div>
        );
    }
}
