import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import TodayTaskScreen from "../screens/TodayTaskScreen";
import CustomizeTaskScreen from "../screens/CustomizeTaskScreen"; // Giả sử có màn hình này
import UserSettingsScreen from "../screens/UserSetting";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerContentStyle: {
            paddingTop: 50, // Dịch các mục xuống
          },
        }}
      >
        <Drawer.Screen name="Today's Task" component={TodayTaskScreen} />
        <Drawer.Screen name="Customize Task" component={CustomizeTaskScreen} />
        <Drawer.Screen name="User Setting" component={UserSettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
