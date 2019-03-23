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
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';


import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

import { Spinner, ListItem, Separator } from 'native-base';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Header, Input, SearchBar,Button } from 'react-native-elements';


import { withNavigation } from 'react-navigation';
import { deletePago } from '../controllers/PagoController';


const AlertMsg = 'Estas seguro que deseas eliminar la informacion';
const AlertCancel = 'Ha cancelado la eliminacion';
class PagoView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            pago: this.props.pago,
            event: this.props.event
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pago: nextProps.pago });
    }

    goToScreenUpdatePago = () => {
        if (!this.state.pago || !this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('UpdatePago', { pago: this.state.pago.clone(), event: this.props.event })
    }

    deletePago = () => {
        if (!this.state.pago)
            return;

        deletePago(this.state.pago.pagoId)
        .then(({ result , message }) => {
            ToastAndroid.show(message , ToastAndroid.SHORT);
            if(result && this.state.event)
            this.state.event.emit('onDeletePago');
        })
    }

    render() {
        if (!this.state.pago)
            return 

        return (
            <View>
            <Collapse style={{ marginBottom: 10, marginTop: 10 }}>
              <CollapseHeader>
                <Separator bordered>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, color: '#000000' }}>{this.state.pago.aptNum}</Text>
                    <Button
                      onPress={() => this.goToScreenUpdatePago()}
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
                          { text: 'ok', onPress: () =>this.deletePago() },
    
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
                  <Text><Text> Fecha de Pago : </Text>{this.state.pago.fechaPago}</Text>
                </ListItem>
              </CollapseBody>
            </Collapse>
          </View>
        );
    }
}

export default withNavigation(PagoView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
    },
    generalFontSize: {
        fontSize: 20,
    },
    icon: {
        marginHorizontal: 5,
    },
});
