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


import Inquilino from '../models/Inquilino';
import { createInquilino } from '../controllers/PagoController'; //createPago

export default class CreateInquilinoView extends Component<Props> {  //CreateHeroView

    constructor(props: Props) {
        super(props);

        this.state = {
            Inquilino: new Inquilino(0, { nombre: '', cedula: '',telefono: '',alquile: '',deposito: '',aptnum: '',contratonum: '',fecha: '' }),
            disableButtonCreate: true,
            disableColor: '#2B2F33',
            enableColor: '#2B2F33',
            currentButtonColor: '#2B2F33',
            event: this.props.event,
        };
    }

    componentWillMount() {
        if (!this.state.inquilino)
            return;

        if (''.includes(this.state.inquilino.nombre))
            this.setState({ disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    changeName = (nombre: string) => {
        let inquilino = this.state.inquilino;
        if (!inquilino)
            return;

        inquilino.nombre = nombre;

        if (''.includes(this.state.inquilino.nombre))
            this.setState({ inquilino, disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ inquilino, disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    createInquilino = () => {
        if (!this.state.inquilino || this.state.disableButtonCreate)
            return;

        createInquilino(this.state.inquilino)
            .then(({ result, message }) => {
                ToastAndroid.show('Se ha registrado el inquilino', ToastAndroid.SHORT);
                if (result) {
                    Keyboard.dismiss();
                    this.setState({ inquilino: new Inquilino(0, { nombre: '' }) })
                    if (this.state.event) {
                        this.state.event.emit('onCreateInquilino');//onCreateHero
                    }
                }
            })
    }

    render() {
        if (!this.state.inquilino)
            return

        return (
            <View style={{ backgroundColor: '#F8FBFD', flex: 1 }}>
                <Header
                    placement="right"
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.navigate('InquilinoViewHome') }}
                    centerComponent={{ text: 'Registro de Inquilino', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                    leftContainerStyle={{ marginLeft: 12 }}
                    centerContainerStyle={{ marginRight: 80 }}
                />
                <Input
                    onChangeText={(text) => this.changeName(text)} value={this.state.inquilino.nombre}
                    onSubmitEditing={this.createInquilino}
                    placeholder='Nombre del inquilino'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 45, width: 330, marginLeft: 30 }}
                    leftIcon={
                        <IconF
                            name='user' size={20} color='black' marginRight={4} />}
                />
                 <View style={styles.container}>
               <TouchableOpacity 
                    style={[styles.buttonContainer, { backgroundColor: this.state.currentButtonColor }]}
                    onPress={this.createInquilino}>
                    <Text style={[styles.buttonText, styles.generalFontSize]}>Registrar Inquilino</Text>
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