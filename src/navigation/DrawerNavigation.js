import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens';
const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
