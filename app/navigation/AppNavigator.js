import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';


export default function AppNavigator() {
    const user = useSelector(selectUser)



    return (
        <NavigationContainer>
            {user ? (
                <HomeNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    )


}
