/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ToastAndroid,
    ScrollView
} from 'react-native';
import CreatePagoView from './CreatePagoView';  // CreateHeroView
import ListPagosView from './ListPagosView'; // ListHeroesView
import Opciones from './Opciones'
import { EventEmitter } from 'events';
import { getAllPagos } from '../controllers/PagoController';
import { Header, Input, SearchBar, Button } from 'react-native-elements';

export default class HomeView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            pagos: [],
        };

        this.event = new EventEmitter();
    }

    componentWillMount() {
        this.initListPagos();
        this.event.addListener('onCreatePago', () => this.initListPagos());
        this.event.addListener('onUpdatePago', () => this.initListPagos());
        this.event.addListener('onDeletePago', () => this.initListPagos());
    }

    componentWillUnmount() {
        this.event.removeAllListeners();
    }

    initListPagos = () => {
        getAllPagos().then(({ result, message }) => this.setState({ pagos: result }));
    }

    

    render() {
        return (
            <View style={{ backgroundColor: '#F8FBFD', flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={{ text: '         Registrar Pago', style: { color: '#fff', fontSize: 19 } }}
                    centerComponent={{ icon: 'add-circle', color: '#fff', onPress: () => this.props.navigation.navigate('CreatePagoView')}}
                    rightComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('Opciones')}}
                    containerStyle={{ backgroundColor: '#2B2F33',marginBottom:50 }}
                    leftContainerStyle={{ marginLeft: 65 }}
                    rightContainerStyle={{ marginRight: 18 }}
                    centerContainerStyle={{ marginLeft: 45 }}
                />
                <ScrollView>
                    <View>
                        <ListPagosView pagos={this.state.pagos} event={this.event} />
                    </View>
                </ScrollView>

            </View>
        );
    }
}
