import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2F5aWhoYW16YSIsImEiOiJjbDZ3azdpNmUwankwM2RxbDc1b3Y0bGppIn0.-VJisKK9RbocLKMq52oC6Q',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              centerCoordinate={[-4.9889563, 34.0121715]}
              zoomLevel={11}
            />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}
