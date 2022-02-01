import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './screens/main-screen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="Main"
      screenOptions={{
        // headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Home" component={MainScreen} />
    </Drawer.Navigator>
  );
}

export default App