import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider, UserProvider} from '@realm/react';

import {appId, baseUrl} from './realm';
import {LogoutButton} from './LogoutButton';
import {Welcome} from './Welcome';
// import {ItemListView} from './ItemListView';
import Map from './Map';
import RealmContext from './RealmContext';
const {RealmProvider} = RealmContext;

const Stack = createNativeStackNavigator();

// const AppWrapper = () => {
//   return (
//     <AppProvider id={appId} baseUrl={baseUrl}>
//       <UserProvider fallback={Welcome}>
//         <App />
//       </UserProvider>
//     </AppProvider>
//   );
// };

const App = () => {
  return (
    <>
      {/* After login, user will be automatically populated in realm configuration */}
      <AppProvider id={appId} baseUrl={baseUrl}>
        <UserProvider fallback={Welcome}>
          <RealmProvider
            sync={{
              flexible: true,
              initialSubscriptions: {
                update: (subs, realm) => {
                  // subscribe to all of the logged in user's to-do items
                  subs.add(realm.objects('Item'), {name: 'ownItems'});
                },
              },
            }}
            fallback={() => (
              <View style={styles.activityContainer}>
                <ActivityIndicator size="large" />
              </View>
            )}>
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="E-Stations"
                    component={Map}
                    options={{
                      headerRight: () => {
                        return <LogoutButton />;
                      },
                    }}
                  />
                  <Stack.Screen name="Welcome" component={Welcome} />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 10,
    textAlign: 'center',
  },
  footer: {
    margin: 40,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
