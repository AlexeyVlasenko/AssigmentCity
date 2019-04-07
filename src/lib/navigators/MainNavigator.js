import { createAppContainer, createStackNavigator } from "react-navigation";
import { CityScreen, ListScreen } from "#screens";
import { Theme } from "#theme";

const AppNavigator = createStackNavigator({
        List: { screen: ListScreen },
        City: { screen: CityScreen }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Theme.HEADER_BG,
                borderBottomColor: Theme.HEADER_LINE
            },
            headerMode: 'screen'
        }
    });

export default createAppContainer(AppNavigator);
