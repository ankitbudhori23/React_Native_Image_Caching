import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
const HomeScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cachedImages = await AsyncStorage.getItem('cachedImages');
        cachedImages && setImages(JSON.parse(cachedImages));

        const response = await fetch(
          'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s',
        );
        const data = await response.json();
        const newImages = data.photos.photo;

        if (cachedImages !== JSON.stringify(newImages)) {
          setImages(newImages);
          AsyncStorage.setItem('cachedImages', JSON.stringify(newImages));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const renderImageItem = ({item}) => (
    <FastImage
      key={item.id}
      style={styles.image}
      source={{
        uri: item.url_s,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
    borderRadius: 10,
  },
});

export default HomeScreen;
