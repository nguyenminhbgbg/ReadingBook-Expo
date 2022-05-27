import React from "react";
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/";
import { Search } from "../screens/";
import { Notification } from "../screens/";
import { Setting } from "../screens/";

import { icons, COLORS } from "../constants";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor:COLORS.black , height: "10%",},
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <Image
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Search":
                            return (
                                <Image
                                    source={icons.search_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Notification":
                            return (
                                <Image
                                    source={icons.notification_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Setting":
                            return (
                                <Image
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerStyle: {
                    backgroundColor: COLORS.black ,
                    height:'0%'
                    },
                    headerTintColor: COLORS.white, }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    headerStyle: {
                    backgroundColor: COLORS.black ,
                    height:'0%'
                    },
                    headerTintColor: COLORS.white, }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    headerStyle: {
                    backgroundColor: COLORS.black ,
                    height:'0%'
                    },
                    headerTintColor: COLORS.white, }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    headerStyle: {
                    backgroundColor: COLORS.black ,
                    height:'0%'
                    },
                    headerTintColor: COLORS.white, }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;