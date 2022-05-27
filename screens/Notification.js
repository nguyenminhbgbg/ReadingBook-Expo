import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import { removeBookmark } from '../redux/actions';

const Notification = ({ navigation }) => {
  const { bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const renderItem = ({ item }) => {
    return (
        <View style={{ marginVertical: SIZES.base }}>
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}
            >
                {/* Book Cover */}
                <Image
                    source={{uri: item.bookCover}}
                    resizeMode="cover"
                    style={{ width: 100, height: 150, borderRadius: 10 }}
                />

                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                    {/* Book name and author */}
                    <View>
                        <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                        <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                    </View>

                    {/* Book Info */}
                    <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                        <Image
                            source={icons.page_filled_icon}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                        <Image
                            source={icons.read_icon}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                    </View>

                    {/* Genre */}
                    <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                        {
                            item.genre.includes("Adventure") &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                            </View>
                        }
                        {
                            item.genre.includes("Romance") &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                            </View>
                        }
                        {
                            item.genre.includes("Drama") &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>

            {/* Bookmark Button */}
            <TouchableOpacity
                style={{ 
                    position: 'absolute', 
                    top: 5, 
                    right: 15, 
                    borderRadius: 20,
                    height: 40, 
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F96D41', }}
                    onPress={() => handleRemoveBookmark(item)}
            >
                <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.lightGray
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Thư Viện Sách</Text>
        <Text style={{ color: 'white', fontSize: 18 }}>Danh sách sách đã lưu:</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          {bookmarks.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              Add a book to bookmark list.
            </Text>
          ) : (
            <FlatList
              data={bookmarks}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Notification;
