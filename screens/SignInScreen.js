import React,{ useRef,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Keyboard, 
  TouchableWithoutFeedback
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { COLORS, icons } from '../constants';

import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions';
import { useTheme } from 'react-native-paper';

const SignInScreen = ({ navigation }) => {

  const { userToken, mesLogin, userInfo } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const LoginAction = (email, pass) => dispatch(loginAction(email, pass));

  const txtPassWordRef = useRef();

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();
  const { signIn } = React.useContext(AuthContext);

  useEffect(() => {
    UserToken();
  }, [userToken, mesLogin]);

  function LoginActionDone() {
    if(data.email && data.password){
      LoginAction(data.email, data.password)
      setTimeout( async () => {
        signIn()
      }, 1000);
    }
}

  const UserToken = async () =>{
    try {
      await AsyncStorage.setItem("userToken", userToken );
      await AsyncStorage.setItem("user_info", JSON.stringify(userInfo) );
      console.log("login userToken async :" + userToken)
      console.log("login user_info async :" + JSON.stringify(userInfo) )
    } catch (error) {
      console.log(error);
    }
  }
  
  const textInputChange = (val) => {
      const re = /\S+@\S+\.\S+/;
      if( val.trim().length >= 6 && re.test(val) ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: true,
            isValidUser: true
        });
      } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: false,
            isValidUser: false
        });
      }
  }
  const handlerPasswordChange = (val) => {
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            password: val,
            isValidPassword: true
        });
    } else {
        setData({
            ...data,
            password: val,
            isValidPassword: false
        });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Xin chào đến với Unicorn!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig"
              style={[styles.footer, {
                  backgroundColor: colors.background
              }]}>
          <Text style={styles.text_footer}>Tài khoản</Text>
          <View style={styles.action}>
          <Image
              source={icons.email_icon}
              resizeMode="contain"
              style={{
                  width: 28,
                  height: 28,
                  tintColor: COLORS.lightGreen
              }}
          />
            <TextInput
              placeholder="Your Email"
              onChangeText={(val) => textInputChange(val)}
              style={styles.textInput}
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={() => txtPassWordRef.current.focus()}
            />
            {data.check_textInputChange ?
              <Image
              source={icons.check_icon}
              resizeMode="contain"
              style={{
                  width: 28,
                  height: 28,
                  tintColor: COLORS.lightGreen
              }}
            />
              : null}
          </View>
          { data.isValidUser ? null : 
              <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Tài khoản có độ dài tối thiểu 6 kí tự và dạng email!</Text>
              </Animatable.View>
              }
          <Text style={[styles.text_footer, {
            marginTop: 30
          }]}>Mật khẩu</Text>
          <View style={styles.action}>
          <Image
              source={icons.pass_word}
              resizeMode="contain"
              style={{
                  width: 28,
                  height: 28,
                  tintColor: COLORS.lightGreen
              }}
            />
            <TextInput
              placeholder="Your Password"
              onChangeText={(val) => handlerPasswordChange(val)}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              ref={txtPassWordRef}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ?
                <Image
                source={icons.unEye_icon}
                resizeMode="contain"
                style={{
                    width: 28,
                    height: 28,
                    tintColor: COLORS.lightGreen
                }}
              />
                :
                <Image
                source={icons.eys_icon}
                resizeMode="contain"
                style={{
                    width: 28,
                    height: 28,
                    tintColor: COLORS.lightGreen
                }}
              />}
            </TouchableOpacity>
          </View>
          { data.isValidPassword ? null : 
              <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Mật khẩu có độ tài tối thiểu 6 ký tự!</Text>
              </Animatable.View>
              }

          { mesLogin !== 'Đăng nhập thành công!' ? <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{mesLogin}</Text>
            </Animatable.View> : null
          }
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={ ()=> {LoginActionDone() }  }
              // onPress={() => { signIn() }}
              // , signIn()
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign} >Đăng nhập</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginTop: 15
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#009387'
                }]}>Đăng kí tài khoản</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signInW}>

            <TouchableOpacity
              onPress={() => Alert.alert(
                "Thông báo",
                'Tính năng đang được phát triển thêm',
                [
                    {
                    text: 'Xác nhận',
                    }
                ],
              )}
              style={[styles.signInWith, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
                flexDirection: 'row',
                flex: 1,
                marginLeft: 5,
                marginRight: 5
              }]}
            >
              <Image
                source={icons.face_book_icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                }}
              />
              <Text style={[styles.textSign, {
                color: '#385592'
              }]}>FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert(
                "Thông báo",
                'Tính năng đang được phát triển thêm',
                [
                    {
                    text: 'Xác nhận',
                    }
                ],
              )}
              style={[styles.signInWith, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
                flex: 1,
                flexDirection: 'row',
                marginLeft: 5,
                marginRight: 5
              }]}
            >
              <Image source={require('./google.png')}
                  style={{width:28,height:24 , marginRight:5, marginLeft: 5}}            
              />
              <Text style={[styles.textSign, {
                color: '#666664'
              }]}>GOOGLE</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>

  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signInW: {
    flex: 1, flexDirection: 'row', justifyContent: "space-around",
    marginTop: 50,
  },
  signInWith: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
