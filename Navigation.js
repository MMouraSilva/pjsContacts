import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import ContactInfos from './ContactInfos';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="App" 
                        component={App} 
                        options={{ 
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="ContactInfos" 
                        component={ContactInfos} 
                        options={{ 
                            title: '',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}