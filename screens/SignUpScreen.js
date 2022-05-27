import React,{ useRef,useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    Keyboard, 
    TouchableWithoutFeedback
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { COLORS, icons } from '../constants';
import { useTheme } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { signUpAction } from '../redux/actions';

const SignInScreen = ({navigation}) => {

    const { mesRegister } = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();

    const SignUpAction = (name, email, pass) => dispatch(signUpAction( name ,email, pass));

    const txtNameRef = useRef();
    const txtEmailRef = useRef();
    const txtPassWordRef = useRef();
    const txtConPassWordRef = useRef();

    const [data, setData] = React.useState({
        name: '',
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,

        isValidName: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    function SigUpUserPost() {
        if(data.isValidName && data.isValidUser && data.isValidPassword && data.isValidConfirmPassword){
            SignUpAction(data.name , data.username, data.password);
        }
    }

    const textInputChange = (val) => {
        const re = /\S+@\S+\.\S+/;
        if( val.trim().length >= 6 && re.test(val) ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const NameInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                name: val,
                isValidName: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidName: false
            });
        }
    }


    const handlePasswordChange = (val) => {
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

    const handleConfirmPasswordChange = (val) => {
        if( val.trim().length >= 6 && val.localeCompare(data.password)==0 ) {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Đăng ký tài khoản!</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <ScrollView>
                    <Text style={styles.text_footer}>Tên người dùng</Text>
                    <View style={styles.action}>
                        <Image
                        source={icons.user_icon}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.lightGreen
                        }}
                        />
                        <TextInput 
                            placeholder="Tên đầy đủ"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => NameInputChange(val)}
                            returnKeyType="next"
                            onSubmitEditing={() => txtEmailRef.current.focus()}
                            ref={txtNameRef}
                        />
                    </View>
                    { data.isValidName ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Tên người dùng có độ tài tối thiểu 4 ký tự!</Text>
                    </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Tài khoản</Text>
                    <View style={styles.action}>
                        <Image
                            source={icons.email_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGreen
                            }}
                        />
                        <TextInput 
                            placeholder="Your Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            returnKeyType="next"
                            onSubmitEditing={() => txtPassWordRef.current.focus()}
                            ref={txtEmailRef}
                        />
                        {data.check_textInputChange ? 
                        <View
                            animation="bounceIn"
                        >
                            <Image
                                source={icons.check_icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.lightGreen
                                }}
                            />
                        </View>
                        : null}
                    </View>
                    { data.isValidUser ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Tài khoản có độ dài tối thiểu 6 kí tự và dạng email!</Text>
                        </Animatable.View>
                        }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
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
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                            onSubmitEditing={() => txtConPassWordRef.current.focus()}
                            returnKeyType="next"
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
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.lightGreen
                                }}
                            />
                            :
                            <Image
                                source={icons.eys_icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.lightGreen
                                }}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    { data.isValidPassword ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Mật khẩu có độ tài tối thiểu 6 ký tự!</Text>
                        </Animatable.View>
                        }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Xác nhận mật khẩu</Text>
                    <View style={styles.action}>
                        <Image
                            source={icons.pass_word}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGreen
                            }}
                            />
                        <TextInput 
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            ref={txtConPassWordRef}
                            returnKeyType="go"
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ? 
                            <Image
                                source={icons.unEye_icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.lightGreen
                                }}
                            />
                            :
                            <Image
                                source={icons.eys_icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.lightGreen
                                }}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    { data.isValidConfirmPassword ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Xác nhận mật khẩu chưa trùng khớp!</Text>
                        </Animatable.View>
                        }
                    { mesRegister !=='Thêm tài khoản thành công!' ? <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{mesRegister}</Text>
                        </Animatable.View> : null
                    }
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                SigUpUserPost()
                                if(mesRegister === 'Thêm tài khoản thành công!'){
                                    navigation.goBack()
                                }
                            }  }
                            
                        >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Đăng Ký tài khoản</Text>
                        </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
    color_textPrivate: {
        color: 'grey'
    }
  });
