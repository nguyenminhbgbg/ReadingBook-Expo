import React, { useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking} from 'react-native';
import { AuthContext } from '../components/context';
import { icons, COLORS, SIZES, images } from "../constants";
import { useSelector, useDispatch } from 'react-redux';
import { logOutAction } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ navigation }) => {

  const dispatch = useDispatch();
  const LogOutAction = () => dispatch(logOutAction());

  const { signOut } = React.useContext(AuthContext);
  const arrInfoCard = [
    { _id:1 ,nameIcon: icons.Home_icon, name: 'Trang chủ', navi: 'Home'},
    { _id:2 ,nameIcon: icons.search_icon, name: 'Tìm kiếm', navi: 'Search'},
    { _id:3 ,nameIcon: icons.bookmark_icon , name: 'Thư viện sách', navi: 'Notification'},
    { _id:4 ,nameIcon: icons.fb_black_icon , name: 'Fanpage', link:'https://www.facebook.com/SayTruyenTeam'},
    { _id:5 ,nameIcon: icons.mess_icon , name: 'nhóm giao lưu', link:'https://reactnative.dev/docs/linking' },

  ];
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
      getDataUserInfo();
  }, [userInfo]);

  const getDataUserInfo = () =>{
      try {
        AsyncStorage.getItem("user_info").then((value) => {
            value != null ? setUserInfo(JSON.parse(value)) : null
        });
      } catch (error) {
          console.log(error);
      }
  }

  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity
          onPress={() => {
            item.navi? navigation.navigate(item.navi): Linking.openURL(item.link)} }
          >
          <View style={styles.rootList}>
            <Image
                source={ item.nameIcon }
                resizeMode="contain"
                style={{
                    width: 20,
                    height: 24,
                    tintColor: COLORS.lightGray3
                }}
              />
            <Text style={styles.nameItem}>{item.name} </Text>
        </View>
        </TouchableOpacity>
    )
}
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={styles.root}>
        <Image
          source={images.user}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.avatar}
        />
        { userInfo != null ?(
            <View style={styles.info}>
            <View style={styles.nameAndEdit}>
              <Text style={styles.name}>{userInfo.name}</Text>
              <TouchableOpacity
                color={COLORS.primary}
                style={styles.buttonEdit}
                onPress={() => console.log('edit my info')}>
                <Image
                  source={icons.Edit_icon}
                  resizeMode="contain"
                  style={{
                      width: 20,
                      height: 24,
                      tintColor: COLORS.lightGray
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
            ):
            null
        }
        
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
            <FlatList
              data={arrInfoCard}
              keyExtractor={item => item._id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
      <TouchableOpacity
        style={styles.logOut}
        onPress ={() =>{signOut(), LogOutAction()}}
      >
        <Image
            source={icons.logout_icon}
            resizeMode="contain"
            style={{
                width: 30,
                height: 30,
                tintColor: COLORS.lightGray2,
                marginRight: 10
            }}
          />
        <Text style={{color: COLORS.lightGray2, fontSize: SIZES.h2}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Setting;


const styles = StyleSheet.create({
  root: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
  logOut: {
    alignItems:'center', 
    justifyContent:'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  rootList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
    marginTop: -15,
  },
  nameAndEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonEdit: {
    borderRadius: 50,
    marginLeft: 10,
  },
  name: {
    fontSize: 21,
    color: COLORS.white,
  },
  email: {
    color: COLORS.white,
    fontSize: 15,
  },
  nameItem: {
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
    color: COLORS.white,
  },

});