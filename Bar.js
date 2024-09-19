import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ListScreen from '../vnpt/List';

function HomeScreen() {
  return (
    <View style={styles.screen}>
      {/* Nội dung */}
    </View>
  );
}

function AddScreen() {
  return (
    <View style={styles.screen}>
      {/* Nội dung */}
    </View>
  );
}

function TaskScreen() {
  return (
    <View style={styles.screen}>
      {/* Nội dung */}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      {/* Nội dung */}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Nút giữa
        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.addButton}
            >
              <Image source={require('../vnpt/asset/list/add.png')} style={styles.iconAdd} />
            </TouchableOpacity>
          );
        }
      
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            {isFocused && <View style={styles.activeLine} />}
            <Image
              source={
                label === 'Home'
                  ? require('../vnpt/asset/list/home.png')
                  : label === 'List'
                  ? require('../vnpt/asset/list/checklist.png')
                  : label === 'Tasks'
                  ? require('../vnpt/asset/list/add_task.png')
                  : require('../vnpt/asset/list/check_box.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Bar} />
    </Stack.Navigator>
  );
}
export default function Bar() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} options={{ headerShown: false }} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Add" component={AddScreen} options={{ tabBarLabel: 'Thêm', headerShown: false }} />
      <Tab.Screen name="Tasks" component={TaskScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#0066b8',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,  
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconAdd: {
    width: 40,
    height: 40,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  activeLine: {
    height: 5,  // dày
    width: '75%',  // rộng ngang tab
    backgroundColor: '#E4711B', 
    position: 'absolute',
    top: -12,  // line màu
  },
});
