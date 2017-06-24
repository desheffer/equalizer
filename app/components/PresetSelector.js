import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './PresetSelector.css';

export default class PresetSelector extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        preset: PropTypes.string,
        disabled: PropTypes.bool,
        setPreset: PropTypes.func.isRequired,
    };

    handleChange = (evt) => {
        const { index, setPreset } = this.props;

        setPreset(evt.target.value);
    };

    render() {
        const { options, preset, disabled } = this.props;

        return (
            <select className={style.select} onChange={this.handleChange} value={preset} disabled={disabled}>
                <option value="">Manual</option>
                <option disabled="disabled">──────────</option>
                {options.map((option) =>
                    <option key={option.name} value={option.name}>{option.name}</option>
                )}
            </select>
        );
    }
}
