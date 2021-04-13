import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/account/login';
import Demo from '../components/Demo';
import Userinfo from '../pages/account/userinfo';
import Tabbar from './tabs/tabbar';
import {inject, observer} from 'mobx-react';

const Stack = createStackNavigator();

const Nav = (props) => {
    const [initialRouteName, setInitialRouteName] = React.useState('');

    React.useEffect(() => {
        if (props.RootStore.token) {
            setInitialRouteName('Tabbar')
        } else {
            setInitialRouteName('Login')
        }
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
                <Stack.Screen name="Tabbar" component={Tabbar}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Userinfo" component={Userinfo}/>
                <Stack.Screen name="Demo" component={Demo}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default inject('RootStore')(observer(Nav));
