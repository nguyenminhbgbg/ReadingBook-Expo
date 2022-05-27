import React, {useEffect} from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { choiceChapterList } from '../redux/actions';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const AllChapter = ({ route, navigation }) => {

    const { chapterReading } = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();
    const GetChapterReading = chap => dispatch(choiceChapterList(chap));

    const [chapter, setChapter] = React.useState(null);
    useEffect(() => {
        let { chapter } = route.params;
            setChapter(chapter)
    }, [chapter]);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            onPress={() => (GetChapterReading(item), navigation.goBack())}
            >
                <View style={{ paddingVertical: SIZES.h4, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                <Text style={{fontSize: 18, marginLeft: 20}}>{item.NumberChapter}. {item.chapterName}</Text>
            </View>
            </TouchableOpacity>
        )
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        {/* Navigation header */}
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: '8%',justifyContent:'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ flex:1, marginLeft: SIZES.base }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back_arrow_icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.black
                    }}
                />
            </TouchableOpacity>
            <View style={{ flex: 2,padding: 8, alignItems: 'center', borderRadius:50,justifyContent: 'center', backgroundColor: 'blueviolet' }}>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Contents</Text>
            </View>
            <View style={{ flex: 1, }}>
            </View>
        </View>

        <View style={{ flex: 1, marginTop: 8 }}>
            <FlatList
              data={chapter}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
        </View>
      </SafeAreaView>
  );
}

export default AllChapter;