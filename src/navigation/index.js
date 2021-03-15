import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/account/login';
import Demo from '../components/Demo';
import Userinfo from '../pages/account/userinfo';

const Stack = createStackNavigator();

const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="Userinfo">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Userinfo" component={Userinfo} />
                <Stack.Screen name="Demo" component={Demo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Nav;
