import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as EqualizerActions from '../actions/equalizer';

@connect(
    state => ({
        equalizer: state.equalizer,
    }),
    dispatch => ({
        actions: bindActionCreators(EqualizerActions, dispatch),
    })
)
export default class App extends Component {
    static propTypes = {
        equalizer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { equalizer, actions } = this.props;

        return (
            <MainSection equalizer={equalizer} actions={actions} />
        );
    }
}
