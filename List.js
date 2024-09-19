import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [issues, setIssues] = useState([]);
  const navigation = useNavigation();

  // Lấy tên người dùng từ AsyncStorage
  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Lỗi', error);
      }
    };

    getUsername();
  }, []);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('https://hotro.vnptnghean.com.vn:90/api/rest/issues', {
          headers: {
            Authorization: '',  //token
          },
          params: {
            page_size: 10,
            page: 1,
          },
        });

        setIssues(response.data.issues);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchIssues();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('username');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Lỗi khi đăng xuất:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.summary}</Text>
      <Text style={styles.service}>Mã vấn đề: {item.id}</Text>
      <Text style={styles.date}>Người báo cáo: {item.reporter.name}</Text>
      <Text style={styles.status}>Dự án: {item.project.name}</Text>
      <Text style={styles.status}>Mô tả: {item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hệ thống hỗ trợ dịch vụ VNPT Nghệ An</Text>
        <TouchableOpacity style={styles.userIcon} onPress={handleLogout}>
          <Image
            source={require('../vnpt/asset/list/account.png')}
            style={styles.logoutimg}
            />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownButtonText}>Tất cả dịch vụ</Text>
        <Image
            source={require('../vnpt/asset/list/arrow_dropdown.png')}
            style={styles.arrow}
            />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[styles.dropdownContent, { position: 'absolute', top: 130, zIndex: 10 }]}>
          <Text style={styles.serviceItem}>Dịch vụ 1: Công việc thường kỳ khác</Text>
          <Text style={styles.serviceItem}>Dịch vụ 2: Công việc theo dự án</Text>
          <Text style={styles.serviceItem}>Dịch vụ 3: Dịch vụ tư vấn</Text>
        </View>
      )}

      <Text style={styles.subtitle}>Danh sách yêu cầu</Text>
      <FlatList
        data={issues}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c76d3',
  },
  logoutimg: {
    width: 30,  
    height: 30, 
  },
  userIcon: {
    padding: 5,
  },
  arrow: {
    width: 30,  
    height: 30,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#0c76d3',
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 15,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#0c76d3',
  },
  dropdownContent: {
    position: 'absolute',
  top: 100,
  left: 15,
  right: 15,
  borderWidth: 1,
  borderColor: '#0c76d3',
  borderRadius: 10, 
  backgroundColor: '#fff',
  zIndex: 10,
  },
  serviceItem: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c76d3',
    paddingHorizontal: 15,
    paddingTop: 10,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderRightWidth: 5,
    borderColor: '#0c76d3',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5aa5e7',
  },
  service: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
});

export default App;
