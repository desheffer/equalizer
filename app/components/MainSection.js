import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PowerSlider from '../components/PowerSlider';
import GainSlider from './GainSlider';
import PresetSelector from './PresetSelector';
import Bands from '../constants/Bands';
import Presets from '../constants/Presets';
import style from './MainSection.css';

export default class MainSection extends Component {
    static propTypes = {
        equalizer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { equalizer, actions } = this.props;

        return (
            <div>
                <header className={style.header}>
                    <h1>Equalizer</h1>
                    <PowerSlider power={equalizer.power} {...actions} />
                </header>
                <div className={style.equalizer}>
                    {Bands.map((band, i) =>
                        <GainSlider key={band.freq} index={i} label={band.label} gain={equalizer.gains[i]} disabled={!equalizer.power} {...actions} />
                    )}
                </div>
                <div className={style.presets}>
                    <PresetSelector options={Presets} preset={equalizer.preset} {...actions} />
                </div>
            </div>
        );
    }
}
