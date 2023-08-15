import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/stackNavigator';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
   <NavigationContainer> 
    <StackNavigator/>
   </NavigationContainer>
  );
}


