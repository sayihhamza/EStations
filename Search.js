/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Searchbar, Button} from 'react-native-paper';
import Geocoder from '@timwangdev/react-native-geocoder';

export const SearchPlace = ({searchQuery, setSearchQuery}) => {
  // const [searchQuery, setSearchQuery] = useState("");

  const [searchGeocoder, setSearchGeocoder] = useState(null);

  const onChangeSearch = async e => {
    if (e !== '') {
      setSearchQuery(e);
      console.log(e);
      setSearchGeocoder(await Geocoder.geocodeAddress(searchQuery));
      console.log(searchGeocoder);
    } else {
      setSearchQuery('');
      setSearchGeocoder(null);
    }
  };

  // useEffect(() => {
  //   console.log(textArray);
  // }, [textArray]);
  //   useEffect(() => {
  //     fetchPlaces() ? fetchPlaces().map((place) => console.log(place)) : null;
  //   }, [fetchPlaces]);
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 80,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Searchbar
        placeholder="Search place"
        onChangeText={onChangeSearch}
        value={searchQuery}
        // icon={IconCamera}
        iconColor="white"
        // onIconPress={() => setVisible(true)}
        theme={{
          dark: true,
          colors: {
            primary: 'white',
            text: 'white',
            placeholder: 'white',
          },
          roundness: 50,
        }}
        style={{
          width: 350,
          height: 42,
          backgroundColor: 'black',
          elevation: 4,
          zIndex: 4,
          // opacity: 0.7,
        }}
      />
      {searchQuery !== '' ? (
        <></>
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            elevation: 5,
            zIndex: 5,
            opacity: 0.8,
          }}></TouchableOpacity>
      )}
      {searchQuery !== '' && searchGeocoder ? (
        <View
          style={{
            width: 350,
            padding: 10,
            position: 'absolute',
            top: 17,
            paddingTop: 17,
            backgroundColor: 'black',
            elevation: 3,
            zIndex: 3,
            borderRadius: 10,
          }}></View>
      ) : (
        <></>
      )}
    </View>
  );
};
