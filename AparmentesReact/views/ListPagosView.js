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
import Pago from '../models/Pago';
import PagoView from './PagoView';


export default class ListPagosView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            pagos: this.props.pagos,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pagos: nextProps.pagos });
    }

    renderListPagos = () => {
        let result;
        result = this.state.pagos.map((pago: Pago) => <PagoView key={pago.pagoId} pago={pago} event={this.props.event} />);
        return result;
    }
   

    render() {
        return (
            <ScrollView >
                {this.renderListPagos()}
            </ScrollView>
        );
    }
}
