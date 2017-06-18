import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Header.css';

export default class Header extends Component {
    static propTypes = {
        power: PropTypes.bool.isRequired,
        setPower: PropTypes.func.isRequired,
    };

    handlePowerToggle = (evt) => {
        const { setPower } = this.props;

        setPower(evt.target.checked);
    };

    render() {
        const { power } = this.props;

        return (
            <header className={style.header}>
                <h1>Equalizer</h1>
                <label className={style.switch}>
                    <input type="checkbox" checked={power} onChange={this.handlePowerToggle} />
                    <div className={style.slider}></div>
                </label>
            </header>
        );
    }
}
