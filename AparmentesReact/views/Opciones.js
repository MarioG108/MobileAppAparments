
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* IMPORT DE REACT */
import React, { Component } from 'react';
/* IMPORT COMPONENTS */
import { View, ScrollView, Linking, } from 'react-native';
import { Header } from 'react-native-elements';
import { Cell, Section, TableView } from "react-native-tableview-simple";
import email from 'react-native-email'

export default class Opciones extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    handleEmail = () => {
        const to = ['brianfortuna97@gmail.com']
        email(to, {
            cc: ['brianfortuna97@gmail.com'],
            bcc: 'brianfortuna97@gmail.com',
            subject: 'Necesito soporte en la aplicacion de Administration-Business',
            body: ''
        }).catch(console.error)
    }
    render() {
        return (
            <View style={{ backgroundColor: '#F8FBFD' }}>
            <ScrollView>
                <Header
                    placement="center"
                    centerComponent={{ text: 'Opciones', style: { color: '#fff', fontSize: 20, fontWeight: '900' } }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () =>  this.props.navigation.navigate('HomeView') }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                />
                <TableView>
                    <Section header="Redes">
                        <Cell
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            title="Instagram"
                            onPress={() => Linking.openURL("https://www.instagram.com/developer.tuna/")}
                        />


                    </Section>
                    <Section header="Soporte ">
                        <Cell
                            cellStyle="Basic"
                            accessory="DisclosureIndicator"
                            title="Enviar Correo"
                            onPress={ handleEmail = () => {
                                const to = ['brianfortuna97@gmail.com']
                                email(to, {
                                    cc: ['brianfortuna97@gmail.com'],
                                    bcc: 'brianfortuna97@gmail.com',
                                    subject: 'Necesito soporte en la aplicacion de Administration-Business',
                                    body: ''
                                }).catch(console.error)
                            }}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </View>
        );
    }
}
