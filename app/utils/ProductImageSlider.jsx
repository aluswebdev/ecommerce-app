import { View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const ProductImageSlider = ({ images }) => {


  const renderItem = ({ item }) => {
    console.log(item)
    return (
    <Image
      source={{ uri: item }}
      style={{
        width: '100%',
        height: '100%',
      }}
      resizeMode="cover"
    />
    );
  };


  // console.log(images)
  return (
    <View style={{ height: 300 }}>3
    
      <Carousel
        loop
        width={width}
        height={300}
        autoPlay
        data={images} // Handle both single URL and array of URLs
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProductImageSlider;