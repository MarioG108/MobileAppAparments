import { createStackNavigator, createAppContainer,createSwitchNavigator,createMaterialTopTabNavigator } from 'react-navigation';
//Pago screens
import HomeView from '../views/HomeView';
import UpdatePagoView from '../views/UpdatePagoView';
import CreatePagoView from '../views/CreatePagoView';

//Inquilino screens
import InquilinoViewHome from '../views/InquilinoViewHome';
import UpdateInquilinoView from '../views/UpdateInquilinoView';
import CreateInquilinoView from '../views/CreateInquilinoView';


import Opciones from '../views/Opciones';

import React, { Component } from 'react';


export default class App extends Component<Props> {
    render() {
        return <AppContainer/>
    }
}
/* NAVIGATOR OF THE SCREENS TABS   */
const DashboardTabNavigator = createMaterialTopTabNavigator(
  {
    HomeView: {
      screen: HomeView,
      navigationOptions: {
        tabBarLabel: 'Pagos',
        tabBarIcon: ({ tintColor }) => (
          <IconF name="money" color='#FAFAFA' size={18} />
        )
      }
    },
    InquilinoViewHome: {
      screen: InquilinoViewHome,
      navigationOptions: {
        tabBarLabel: 'Inquilinos',
        tabBarIcon: ({ }) => (
          <IconM name="person-add" color='#FAFAFA' size={18} />
        )
      }
    },
  },
    {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#b3b5b5',
        style: {
          backgroundColor: '#2B2F33',
        },
        indicatorStyle: {
          backgroundColor: '#fff'
        }
  
      },
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          header: null,
          headerTitle: routeName,
        };
      }
    }
  );

const DashboardStackNavigator = createStackNavigator(
    {
      DashboardTabNavigator: DashboardTabNavigator
    },
  );
/*   ALL NAVIGATION OF THE APP   */
const AppSwitchNavigator = createSwitchNavigator({
    Dashboard: { screen: DashboardStackNavigator },
    UpdatePago: { screen: UpdatePagoView },
    CreatePagoView: { screen: CreatePagoView },
    UpdateInquilinoView: { screen: UpdateInquilinoView },
    CreateInquilinoView: { screen: CreateInquilinoView },
    Opciones: { screen: Opciones }
  });

  /* CONTAINER OF THE APP */
  const AppContainer = createAppContainer(AppSwitchNavigator);