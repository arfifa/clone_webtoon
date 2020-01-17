import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class Banner extends Component {

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image
                    style={{ width: BannerWidth, height: BannerHeight }}
                    source={{ uri: image }} />
            </View>
        )
    }

    render() {
        return (
            <View>
                <Carousel
                    pageIndicatorOffset={16}
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}>
                    {this.props.comicData.map((comicData, index) => this.renderPage(comicData.imageUri, index))}
                </Carousel>
            </View>
        )
    }
}

export default Banner;
