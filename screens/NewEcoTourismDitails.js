import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import BtnBack from '../components/BtnBack';

const NewEcoTourismDitails = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  console.log('route==>', route.params);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  {route.params.name}
                </Text>
                <Image
                  style={{
                    width: width * 0.9,
                    height: 200,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                  source={{uri: route.params.image}}
                />

                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                  {route.params.discription}
                </Text>
              </View>

              <View style={{height: 100}}></View>
            </ScrollView>
          </View>
          {/**BtnBAck */}
          <BtnBack navigation={navigation} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default NewEcoTourismDitails;
