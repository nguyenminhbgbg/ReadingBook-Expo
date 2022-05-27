import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from "../constants";

const InfoProfile = () => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri:
            'https://i.pinimg.com/736x/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg',
        }}
        resizeMethod="resize"
        resizeMode="cover"
        style={styles.avatar}
      />
      <View style={styles.info}>
        <View style={styles.nameAndEdit}>
          <Text style={styles.name}>Sexy Cute Girl</Text>
          <TouchableOpacity
            color={COLORS.primary}
            style={styles.buttonEdit}
            onPress={() => console.log('edit my info')}>
            <Icon
              name="ios-pencil-outline"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>CuteSayHi@gmail.com</Text>
      </View>
    </View>
  );
};

export default InfoProfile;

const styles = StyleSheet.create({
  root: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: COLORS.while,
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
    fontSize: 20,
    fontFamily: FONTS.body1,
    color: COLORS.while,
  },
  email: {
    color: COLORS.while,
    fontFamily: FONTS.body1,
    fontSize: 15,
  },
});
