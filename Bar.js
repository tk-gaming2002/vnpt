import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListScreen from '../vnpt/List';
import AccountScreen from '../vnpt/Account';
import AddScreen from '../vnpt/Add';
import TaskScreen from '../vnpt/Task';
import HomeScreen from './Home';


const MainScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Mở Modal</Text>
      </TouchableOpacity>

      <Add modalVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};



function CheckScreen() {
  return (
    <View style={styles.screen}>
      <Text> check add</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress} // Điều hướng đến Add
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
              source={getIconForTab(label)}
              style={styles.icon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getIconForTab = (label) => {
  switch (label) {
    case 'Home':
      return require('../vnpt/asset/list/home.png');
    case 'List':
      return require('../vnpt/asset/list/checklist.png');
    case 'Tasks':
      return require('../vnpt/asset/list/add_task.png');
    default:
      return require('../vnpt/asset/list/check_box.png');
  }
};

function AccountButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.accountButton}>
      <Image source={require('../vnpt/asset/list/account.png')} style={styles.iconAccount} />
    </TouchableOpacity>
  );
}

export default function Bar() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountScreen}
      options={{ headerShown: true, title: 'Thông tin cá nhân', headerStyle: {backgroundColor: '#1e76da'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}, headerTitleAlign: 'center'}} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Add" component={AddScreen} options={{ tabBarLabel: 'Thêm', headerShown: false }} /> 
        <Tab.Screen name="Task" component={TaskScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Check" component={CheckScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
      <AccountButton />
    </>
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
    height: 5,
    width: '75%',
    backgroundColor: '#D21316',
    position: 'absolute',
    top: -12,
  },
  accountButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  iconAccount: {
    width: 30,
    height: 30,
  },
});
