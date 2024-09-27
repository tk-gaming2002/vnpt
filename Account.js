import React, { useEffect, useState } from 'react';
import { View, Text, Image, Switch, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function AccountScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    unit: '',
    real_name: '',
    email: '',
    unit: '',
    mobile: ''
  }); 
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://hotro.vnptnghean.com.vn:90/api/rest/users/me');
        setUserData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleBiometric = () => {
    setIsBiometricEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.profileSection}>
        <Image source={{ uri: userData.avatar || 'https://example.com/default_avatar.png' }} style={styles.avatar} />
        <Text style={styles.username}>{userData.name}</Text>
        <Text style={styles.unit}>{userData.unit}</Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tài khoản:</Text>
          <Text style={styles.infoText}>{userData.real_name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Đơn vị:</Text>
          <Text style={styles.infoText}>{userData.unit}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.infoText}>{userData.mobile}</Text>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Đăng nhập bằng vân tay/khuôn mặt:</Text>
          <Switch value={isBiometricEnabled} onValueChange={toggleBiometric} />
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FF',
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  unit: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
