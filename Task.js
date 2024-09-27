import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Image as RNImage } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Task = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`https://hotro.vnptnghean.com.vn:90/api/rest?filter_id=reported`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hệ thống hỗ trợ dịch vụ VNPT Nghệ An</Text>
      </View>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownButtonText}>Tất cả dịch vụ</Text>
        <RNImage
          source={require('../vnpt/asset/list/arrow_dropdown.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[styles.dropdownContent, { position: 'absolute', top: 130, zIndex: 10 }]}>
          <ScrollView style={{ maxHeight: 200 }}>
            {["Hỗ trợ hệ thống văn bản nội bộ VNPT eOffice", 
              "Cổng thông tin du lịch Nghệ An VNPT Smart Tourism", 
              "HNTT & ATBMTT", 
              "Hỗ trợ hệ thống văn bản nội bộ VNPT eOffice",
              "Cổng thông tin du lịch Nghệ An VNPT Smart Tourism",
              "HNTT & ATBMTT",
              "Quản trị mạng",
              "Sổ tay đảng viên",
              "TT ĐH an toàn - an ninh mạng (SOC)",
              "Dịch vụ IT Professionnal Services",
              "Dịch vụ phòng chống tấn công VNPT antiDDOS",
              "Giải pháp VNPT DNS Protection",
              "Giải pháp VNPT Smart IR",
              "Giám sát ATTT - VNPT MSS",
              "Kiếm tử thâm nhập - VNPT Pentest",
              "Tư vấn ATTT",
              "Đào tạo ATTT",
              "Hệ thống CSKH tự động",
              "Hệ thống hỗ trợ dịch vụ VNPT Nghệ An",
              "Hệ thống hỗ trợ ONE BSS TTKD",
              "Hệ thống hỗ trợ ONE BSS VTT",
              "Hệ thống phần mềm dữ liệu nội bộ",
              "Hệ thống Quiz daily VNPT Nghệ An",
              "Biên lai điện tử VNPT eReceipt",
              "Camera giám sát thông minh VNPT AI Camera",
              "Cổng thông tin điện tử vnPortal/VNPT Portal",
              "Dịch vụ lắng nghe xã hội vnSocial",
             
            ].map((service, index) => (
              <Text key={index} style={styles.serviceItem}>{service}</Text>
            ))}
          </ScrollView>
        </View>
      )}

      <Text style={styles.subtitle}>Yêu cầu phân công xử lý</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Image
          source={require('../vnpt/asset/error.png')} 
          style={styles.errorImage}
          resizeMode="contain" 
        />
      ) : (
        <FlatList
          data={issues}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          contentContainerStyle={styles.list}
        />
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c76d3',
    textAlign: 'left',
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
 
});

export default Task;