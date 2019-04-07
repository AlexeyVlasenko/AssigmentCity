import { createAppContainer, createStackNavigator } from "react-navigation";
import { CityScreen, ListScreen } from "#screens";

const AppNavigator = createStackNavigator({
    List: { screen: ListScreen },
    City: { screen: CityScreen }
});

export default createAppContainer(AppNavigator);
