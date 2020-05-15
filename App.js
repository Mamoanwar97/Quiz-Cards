import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, MaterialIcons } from '@expo/vector-icons'; 
// You can import from local files
import  NewCard from './components/NewCard';
import  CardsDeck from './components/CardsDeck';
import  NewDeck from './components/NewDeck';
import  Home from './components/Home';
import  StartQuiz from './components/StartQuiz';
import cardReducer from './assets/reducer';
import { setLocalNotification } from './assets/helpers'


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Challenge" component={StartQuiz} />
      <HomeStack.Screen name="New Card" component={NewCard} />
      <HomeStack.Screen name="CardsDeck" component={CardsDeck} />
    </HomeStack.Navigator>
  );
}
function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default  class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
  return (
    <Provider store={createStore(cardReducer, applyMiddleware(thunk))}>
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={"#584871"} barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              return <Entypo name="home" size={size} color={color} />
            } 
            if (route.name === 'New Challenge') {
              return <MaterialIcons name="add-circle" size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#aaa',
          style:{
            backgroundColor: "#584871",
            padding: 5,
            fontWeight: "bold"
          }
        }}
      >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="New Challenge" component={NewDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  }
});
