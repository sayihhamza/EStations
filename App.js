import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';
import Stations from './Stations.js';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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

export default function App() {
  const [currentPosition, setCurrentPosition] = useState([
    -4.9889563, 34.0121715,
  ]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setCurrentPosition([location.longitude, location.latitude]);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  });
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          onPress={event => {
            setCurrentPosition(event.geometry.coordinates);
          }}>
          <MapboxGL.UserLocation />

          <MapboxGL.Camera centerCoordinate={currentPosition} zoomLevel={15} />

          {Stations?.map((station, index) => (
            <MapboxGL.PointAnnotation
              id={station.address}
              key={index}
              coordinate={[station.location[1], station.location[0]]}>
              <MapboxGL.Callout title={station.address} />
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
      </View>
    </View>
  );
}
