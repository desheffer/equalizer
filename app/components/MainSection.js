import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GainSlider from './GainSlider';
import Bands from '../constants/Bands';
import Presets from '../constants/Presets';
import style from './MainSection.css';

export default class MainSection extends Component {
    static propTypes = {
        equalizer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    // XXX
    handleReset = (evt) => {
        const { actions } = this.props;
        const index = evt.target.value;

        Presets[index].gains.forEach((gain, i) => {
            actions.setGain(i, gain);
        });
    }

    render() {
        const { equalizer, actions } = this.props;

        return (
            <div>
                <Header power={equalizer.power} {...actions} />
                <div className={style.equalizer}>
                    {Bands.map((band, i) =>
                        <GainSlider key={band.freq} index={i} label={band.label} gain={equalizer.gains[i]} disabled={!equalizer.power} {...actions} />
                    )}
                </div>
                <div className={style.presets}>
                    {Presets.map((preset, i) =>
                        <button key={preset.name} onClick={this.handleReset} value={i}>{preset.name}</button>
                    )}
                </div>
            </div>
        );
    }
}
