import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Drawer"
        component={DrawerNavigation}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
