/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Keyboard, ScrollView, Alert, Linking } from 'react-native';
import { Header, Input, SearchBar, Button } from 'react-native-elements';

/*   ICONOS   */
import IconF from 'react-native-vector-icons/FontAwesome';

import Pago from '../models/Pago';
import { updatePago } from '../controllers/PagoController';


export default class UpdatePagoView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        let pago, event;
        if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params) {
            pago = this.props.navigation.state.params.pago;
            event = this.props.navigation.state.params.event;
        }

        this.state = {
            pago: pago,
            disableButtonCreate: true,
            disableColor: '#2B2F33',
            enableColor: '#2B2F33',
            currentButtonColor: '#2B2F33',
            event: event,
        };
    }

    componentWillMount() {
        if (!this.state.pago)
            return;

        if (''.includes(this.state.pago.aptNum))
            this.setState({ disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    changeName = (aptnum: string) => {
        let pago = this.state.pago;
        if (!pago)
            return;
        pago.aptNum = aptnum;


        if (''.includes(this.state.pago.aptNum))
            this.setState({ pago, disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ pago, disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    updatePago = () => {
        if (!this.state.pago)
            return;

        updatePago(this.state.pago)
            .then(({ result, message }) => {
                ToastAndroid.show(message, ToastAndroid.SHORT);
                if (result && this.state.event)
                    this.state.event.emit('onUpdatePago');
            })
    }

    render() {
        if (!this.state.pago)
            return <Text style={styles.generalFontSize}>Invalid pago!</Text>

        return (
            <View style={{ backgroundColor: '#F8FBFD', flex: 1 }}>
                <Header
                    placement="right"
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.navigate('HomeView') }}
                    centerComponent={{ text: 'Registro de Pago', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                    leftContainerStyle={{ marginLeft: 12 }}
                    centerContainerStyle={{ marginRight: 80 }}
                />
                <Input
                    onChangeText={(text) => this.changeName(text)} value={this.state.pago.aptNum}
                    onSubmitEditing={this.updatePago}
                    placeholder='Numero de Apartamento'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 45, width: 330, marginLeft: 30 }}
                    leftIcon={
                        <IconF
                            name='user' size={20} color='black' marginRight={4} />}
                />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, { backgroundColor: this.state.currentButtonColor }]}
                        onPress={this.updatePago}>
                        <Text style={[styles.buttonText, styles.generalFontSize]}>Registrar Pago</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '90%',
        height: '10%',
        marginTop: 10,
    },
    generalFontSize: {
        fontSize: 20,
    },
    text: {
        width: '30%',
    },
    buttonContainer: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});
