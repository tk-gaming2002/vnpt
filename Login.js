import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    try {
      const response = await axios.post('https://hotro.vnptnghean.com.vn:90/api/rest/users/logmein', {
        username,
        password,
      });

      console.log('API Response:', response.data);

      if (response.data.status === 'success') {
        Alert.alert('Đăng nhập thành công!');

        // Lưu trạng thái đăng nhập và username vào AsyncStorage
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('username', username);

        navigation.navigate('Bar');
      } else {
        Alert.alert('Đăng nhập thất bại', response.data.message || 'Mật khẩu hoặc tên đăng nhập không đúng.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      Alert.alert('Đã có lỗi xảy ra', 'Không thể kết nối đến máy chủ.');
    }
  };

  return (
   <ImageBackground
      source={require('../vnpt/asset/back.png')}
      style={styles.background}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require('../vnpt/asset/login/logoo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>VNPT NGHỆ AN{'\n'}</Text>
        <Text style={styles.text1}>HỆ THỐNG HỖ TRỢ DỊCH VỤ{'\n'} CÔNG NGHỆ THÔNG TIN</Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Email đăng nhập không bao gồm @vnpt.vn</Text>
          <TouchableOpacity style={styles.infoo}>
            <Image
              source={require('../vnpt/asset/login/info.png')}
              style={styles.iconn}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email đăng nhập"
          value={username}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={setUsername}
          autoCapitalize="none"
        />
           
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Image
              source={isPasswordVisible ? require('../vnpt/asset/login/visibilityOP.png') : require('../vnpt/asset/login/visibilityCL.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.vantay}>
            <Image
              source={require('../vnpt/asset/login/vantay.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );    
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text1: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 90,
  },
  titleContainer: {
    flexDirection: 'row',
    //alignItems: 'flex-start',
    marginBottom: 1,
    width: '100%',
  },
  infoo: {
    //marginLeft: 10,
    //marginRight: 100,
  },
  iconn: {
    width: 21,
    height: 21,
  },
  title: {
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
    textAlign: 'left',
    width: '95%',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: 'white',
 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#07639c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    marginTop: 13,
  },
  eyeIcon: {
    width: 30,
    height: 30,
  },
  vantay: {
    width: 40,
    height: 45,
    backgroundColor: '#eb1260',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 39,
    height: 41,
  },
});

export default App;

// Đã xong