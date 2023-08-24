import { createStackNavigator } from '@react-navigation/stack';
import update from '../screens/update';
import issLocation from '../screens/issLocation';
import meteors from '../screens/meteors';
import home from '../screens/home';

const Stack = createStackNavigator();



export default function StackNavigatork() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Meteors" component={meteors} />
      <Stack.Screen name="issLocation" component={issLocation} />
      <Stack.Screen name="Update" component={update} />
    </Stack.Navigator>
  );
}