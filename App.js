
import React from "react";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import AppNavigator from "./app/navigation/AppNavigator";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {

    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}