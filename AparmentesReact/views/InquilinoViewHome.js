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
import CreateInquilinoView from './CreateInquilinoView';  // CreateHeroView
import ListInquilinosView from './ListInquilinosView'; // ListHeroesView
import Opciones from './Opciones'
import { EventEmitter } from 'events';
import { getAllInquilinos } from '../controllers/PagoController';
import { Header, Input, SearchBar, Button } from 'react-native-elements';

export default class InquilinoViewHome extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inquilinos: [],
        };

        this.event = new EventEmitter();
    }

    componentWillMount() {
        this.initListInquilinos();
        this.event.addListener('onCreateInquilino', () => this.initListInquilinos());
        this.event.addListener('onUpdateInquilino', () => this.initListInquilinos());
        this.event.addListener('onDeleteInquilino', () => this.initListInquilinos());
    }

    componentWillUnmount() {
        this.event.removeAllListeners();
    }

    initListInquilinos = () => {
        getAllInquilinos().then(({ result, message }) => this.setState({ inquilinos: result }));
    }

    

    render() {
        return (
            <View style={{ backgroundColor: '#F8FBFD', flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={{ text: '         Registrar de Inquilinos', style: { color: '#fff', fontSize: 19 } }}
                    centerComponent={{ icon: 'add-circle', color: '#fff', onPress: () => this.props.navigation.navigate('CreateInquilinoView')}}
                    rightComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('Opciones')}}
                    containerStyle={{ backgroundColor: '#2B2F33',marginBottom:50 }}
                    leftContainerStyle={{ marginLeft: 65 }}
                    rightContainerStyle={{ marginRight: 18 }}
                    centerContainerStyle={{ marginLeft: 45 }}
                />
                <ScrollView>
                    <View>
                        <ListInquilinosView inquilinos={this.state.inquilinos} event={this.event} />
                    </View>
                </ScrollView>

            </View>
        );
    }
}
