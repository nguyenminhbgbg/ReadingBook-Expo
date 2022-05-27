import React, {useEffect} from 'react';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    LogBox,
    StatusBar
  } from "react-native";
import { AuthContext } from './components/context';
import { BookDetail } from "./screens/";
import { ReadingBook } from "./screens/";
import { AllChapter } from "./screens/";

import  RootStackScreen  from "./screens/RootStackScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from "./navigation/tabs";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import { icons, COLORS } from "./constants";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createNativeStackNavigator ();

const App = () => {
    const [isloading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    useEffect(() => {
        setTimeout( async () => {
        setIsLoading(false);
        }, 1000);
        getDataUserToken();
    }, [userToken]);
    
    useEffect(() => {
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

    const getDataUserToken = () =>{
      try {
        AsyncStorage.getItem("userToken").then((value) => {
          if (value != null) {
            setUserToken(value);
            console.log('data user token APP:' +userToken+ '')
          }
        });
      } catch (error) {
        console.log(error);
      }
      try {
        AsyncStorage.getItem("user_info").then((value) => {
          if (value != null) {
            console.log('data user info APP:' + value + '')
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    const removeUserToken  = async () =>{
        try {
          await AsyncStorage.removeItem('userToken')
        } catch(e) {
          // remove error
        }
        console.log('Done.')
    }
    
    const authContext = React.useMemo(() => ({
        signIn: async () => {
        getDataUserToken();
        setIsLoading(false);
        },
        signOut: async () => {
        removeUserToken();
        setUserToken(null);
        setIsLoading(false);
        },
    }) ,[]);

    if (isloading) {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>loading data!!!</Text>
          </View>
        );
      }
      return (
        <AuthContext.Provider theme={theme} value={authContext}>
          <StatusBar backgroundColor='#64676D' barStyle="light-content"/>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
            <NavigationContainer>
            {userToken != null ?(
              <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'HomeApp'}
                >
                {/* Tabs */}
                <Stack.Screen name="HomeApp" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
                <Stack.Screen name="ReadingBook" component={ReadingBook} options={{ headerShown: false }} />
                <Stack.Screen name="AllChapter" component={AllChapter} options={{ headerShown: false }} />

            </Stack.Navigator>
            ):
            <RootStackScreen />
            }
          </NavigationContainer>
            </PersistGate>
          </Provider>
        </AuthContext.Provider>
      );
}

export default App;