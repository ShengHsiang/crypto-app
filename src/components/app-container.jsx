import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import theme from '../theme';

export default function AppContainer({ children }) {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider> 
  );
}
