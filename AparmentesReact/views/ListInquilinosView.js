/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import Inquilino from '../models/Inquilino';
import InquilinoView from './InquilinoView';


export default class ListInquilinosView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inquilinos: this.props.inquilinos,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ inquilinos: nextProps.inquilinos });
    }

    renderListInquilinos = () => {
        let result;
        result = this.state.inquilinos.map((inquilino: Inquilino) => <InquilinoView key={inquilino.inquilinoId} inquilino={inquilino} event={this.props.event} />);
        return result;
    }
   

    render() {
        return (
            <ScrollView >
                {this.renderListInquilinos()}
            </ScrollView>
        );
    }
}
