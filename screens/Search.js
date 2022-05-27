import React, {useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    StatusBar
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks,getGenre, searchGenre, addBookmark, removeBookmark, searchBook,cancelSearch } from '../redux/actions';

const Search = ({ navigation }) => {
    const { books, genres, booksSearch, search, bookmarks } = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();
  
    const fetchBooks = () => dispatch(getBooks());
    const fetchGenre = () => dispatch(getGenre());
    const SearchGenre = (genreName) => dispatch(searchGenre(genreName));

    const addToBookmarkList = book => dispatch(addBookmark(book));
    const SearchBook = text => dispatch(searchBook(text));
    const cancelSearchBook = () => dispatch(cancelSearch() );


    const removeFromBookmarkList = book => dispatch(removeBookmark(book));
  
    useEffect(() => {
      fetchBooks();
    }, []);

    useEffect(() => {
      fetchGenre();
    }, []);
    
    const handleAddBookmark = book => {
      addToBookmarkList(book);
    };
  
    const handleRemoveBookmark = book => {
      removeFromBookmarkList(book);
    };
  
    const ifExists = book => {
      if (bookmarks.filter(item => item.id === book.id).length > 0) {
        return true;
      }
      return false;
    };
    function handleGenreItem(item) {
        SearchGenre(item);
        console.log(item);
    }
  
    const renderItem = ({ item, index }) => {
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
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: index%2 ? COLORS.darkGreen: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                <Text style={{ ...FONTS.body3, color: index%2 ?COLORS.lightGreen: COLORS.lightRed }}>{item.genre}</Text>
                            </View>
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
                        backgroundColor: ifExists(item) ? '#F96D41' : '#2D3038', }}
                    onPress={() =>
                        ifExists(item)
                          ? handleRemoveBookmark(item)
                          : handleAddBookmark(item)
                      }
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
    
    const renderGenre = ({ item, index }) => (
      <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() =>  {handleGenreItem(item.name) }  }
      >
      <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
          <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>{item.name}</Text>
      </View>
      </TouchableOpacity>
    );
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
          <StatusBar backgroundColor='#64676D' barStyle="light-content"/>
          <View style={{ flex: 1, paddingHorizontal: 16 , marginTop: 2}}>
              <Text style={{ paddingRight: SIZES.padding, ...FONTS.h1, color: COLORS.white , paddingLeft:15}}>Tìm kiếm sách</Text>
              <View style={{flex: 1, flexDirection: 'row',minWidth:'95%', maxWidth:'95%', maxHeight:60}}>
                  <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => SearchBook(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                  />
                  <TouchableOpacity 
                  onPress={() => cancelSearchBook() }
                  style={styles.cancelSearch}>
                  <Text style={{...FONTS.h3, color: COLORS.white }}>Cancel</Text>
                  </TouchableOpacity>
              </View>
              <View>
                  <FlatList
                      data={genres}
                      keyExtractor={item => item.id.toString()}
                      renderItem={renderGenre}
                      showsVerticalScrollIndicator={false}
                      horizontal
                    />
              </View>
              <View style={{ flex: 1, marginTop: 8 }}>
                <FlatList
                  data={booksSearch}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
              </View>
        </View>
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 45,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
      borderRadius: 50,
      flex:5
    },
    cancelSearch: {
        borderColor: '#009688',
        backgroundColor: '#908e8e',
        borderRadius: 50,
        alignItems:'center',
        justifyContent:"center",
        paddingRight: SIZES.padding,
        height:35,
        ...FONTS.h2,
        color: COLORS.white,
        paddingLeft: 18,
        marginTop:10,
        marginBottom:10,
    }
  });

export default Search;