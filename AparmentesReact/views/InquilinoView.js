/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Alert
} from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';

import { Spinner, ListItem, Separator } from 'native-base';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Header, Input, SearchBar,Button } from 'react-native-elements';


import { withNavigation } from 'react-navigation';
import { deleteInquilino } from '../controllers/PagoController';


const AlertMsg = 'Estas seguro que deseas eliminar la informacion';
const AlertCancel = 'Ha cancelado la eliminacion';
class InquilinoView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inquilino: this.props.inquilino,
            event: this.props.event
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ inquilino: nextProps.inquilino });
    }

    goToScreenUpdateInquilino = () => {
        if (!this.state.inquilino || !this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('UpdateInquilino', { inquilino: this.state.inquilino.clone(), event: this.props.event })
    }

    deleteInquilino = () => {
        if (!this.state.inquilino)
            return;

            deleteInquilino(this.state.inquilino.inquilinoId)
        .then(({ result , message }) => {
            ToastAndroid.show(message , ToastAndroid.SHORT);
            if(result && this.state.event)
            this.state.event.emit('onDeleteInquilino');
        })
    }

    render() {
        if (!this.state.inquilino)
            return 

        return (
            <View>
            <Collapse style={{ marginBottom: 10, marginTop: 10 }}>
              <CollapseHeader>
                <Separator bordered>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, color: '#000000' }}>{this.state.inquilino.aptnum}</Text>
                    <Button
                      onPress={() => this.goToScreenUpdateInquilino()}
                      icon={<IconF name='eye' color='#2B2F33' size={21} />}
                      iconContainerStyle={{ marginRight: 20 }}
                      buttonStyle={{ height: 20, width: 80, backgroundColor: '#F0EEF4', marginLeft: 100 }}
                      titleStyle={{ fontSize: 11, color: '#000000' }}
                      title='  Actualizar'
                    />
                    <Button
                      onPress={() =>
                        Alert.alert('AVISO', AlertMsg, [
                          { text: 'Cancel', onPress: () => Alert.alert(AlertCancel) },
                          { text: 'ok', onPress: () =>this.deleteInquilino() },
    
                        ])
                      }
                      icon={<IconF name='trash' color='#2B2F33' size={21} />}
                      buttonStyle={{ height: 20, width: 80, backgroundColor: '#F0EEF4', marginLeft: 15 }}
                      titleStyle={{ fontSize: 12, color: '#000000' }}
                      title='  Borrar' />
                  </View>
                </Separator>
              </CollapseHeader>
              <CollapseBody>
              <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Nombre : </Text>{this.state.inquilino.nombre}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Cedula : </Text>{this.state.inquilino.cedula}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Telefono : </Text>{this.state.inquilino.telefono}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Alquiler : </Text>{this.state.inquilino.alquile}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Depositos : </Text>{this.state.inquilino.deposito}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Numero de Contrato : </Text>{this.state.inquilino.contratonum}</Text>
                </ListItem>
                <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                  <Text><Text> Fecha de Inicio : </Text>{this.state.inquilino.fecha}</Text>
                </ListItem>
              </CollapseBody>
            </Collapse>
          </View>
        );
    }
}

export default withNavigation(InquilinoView);

