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
                    <div className={style.left}>
                        <PowerSlider power={equalizer.power} {...actions} />
                    </div>
                    <div className={style.left}>
                        <h1>Equalizer</h1>
                    </div>
                    <div className={style.right}>
                        <PresetSelector options={Presets} preset={equalizer.preset} disabled={!equalizer.power} {...actions} />
                    </div>
                </header>
                <div className={style.equalizer}>
                    {Bands.map((band, i) =>
                        <GainSlider key={band.freq} index={i} label={band.label} gain={equalizer.gains[i]} disabled={!equalizer.power} {...actions} />
                    )}
                </div>
            </div>
        );
    }
}
