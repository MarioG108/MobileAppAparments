import { createStackNavigator, createAppContainer,createSwitchNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import HomeView from '../views/HomeView';
import UpdatePagoView from '../views/UpdatePagoView';
import CreatePagoView from '../views/CreatePagoView';
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
          tabBarLabel: 'Lista de Pagos',
          tabBarIcon: ({ tintColor }) => (
            <IconF name="money" color='#FAFAFA' size={18} />
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
    Opciones: { screen: Opciones }
  });

  /* CONTAINER OF THE APP */
  const AppContainer = createAppContainer(AppSwitchNavigator);