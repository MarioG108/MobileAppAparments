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
import { createPago } from '../controllers/PagoController'; //createPago

export default class CreatePagoView extends Component<Props> {  //CreateHeroView

    constructor(props: Props) {
        super(props);

        this.state = {
            pago: new Pago(0, { aptNum: '', fechaPago: '' }),
            disableButtonCreate: true,
            disableColor: '#2B2F33',
            enableColor: '#2B2F33',
            currentButtonColor: '#2B2F33',
            event: this.props.event,
        };
    }

    componentWillMount() {
        if (!this.state.pago)
            return;

        if (''.includes(this.state.pago.aptNum))
            this.setState({ disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    changeName = (aptNum: string) => {
        let pago = this.state.pago;
       
        if (!pago)
            return;

        pago.aptNum = aptNum;
      

        if (''.includes(this.state.pago.aptNum))
            this.setState({ pago, disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ pago, disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    createPago = () => {
        if (!this.state.pago || this.state.disableButtonCreate)
            return;

        createPago(this.state.pago)
            .then(({ result, message }) => {
                ToastAndroid.show('Se ha registrado el Pago', ToastAndroid.SHORT);
                if (result) {
                    Keyboard.dismiss();
                    this.setState({ pago: new Pago(0, { aptNum: '' }) })
                    if (this.state.event) {
                        this.state.event.emit('onCreatePago');//onCreateHero
                    }
                }
            })
    }

    render() {
        if (!this.state.pago)
            return

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
                    onSubmitEditing={this.createPago}
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
                    onPress={this.createPago}>
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