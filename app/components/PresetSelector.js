import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './PresetSelector.css';

export default class PresetSelector extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        preset: PropTypes.string,
        setPreset: PropTypes.func.isRequired,
    };

    handleChange = (evt) => {
        const { index, setPreset } = this.props;

        setPreset(evt.target.value);
    };

    render() {
        const { options, preset } = this.props;

        return (
            <div className={style.selector}>
                <select onChange={this.handleChange} value={preset}>
                    <option value="">Manual</option>
                    {options.map((option) =>
                        <option key={option.name} value={option.name}>{option.name}</option>
                    )}
                </select>
            </div>
        );
    }
}
