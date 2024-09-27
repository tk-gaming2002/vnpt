import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [issues, setIssues] = useState([]);

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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item?.summary || 'Không có tiêu đề'}</Text>
      <Text style={styles.service}>Dịch vụ: {item?.project?.name || 'Không có dự án'}</Text>
      <Text style={styles.date}>Ngày tạo: {item?.created_at || 'Không có ngày tạo'}</Text>
      <Text style={styles.status}>Trạng thái: {item?.status?.id?.name?.label?.color || 'Không có trạng thái'}</Text>
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
        <Image
            source={require('../vnpt/asset/list/arrow_dropdown.png')}
            style={styles.arrow}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[styles.dropdownContent, { position: 'absolute', top: 130, zIndex: 10 }]}>
          <ScrollView style={{ maxHeight: 200 }}>
            <Text style={styles.serviceItem}>Hỗ trợ hệ thống văn bản nội bộ VNPT eOffice</Text>
            <Text style={styles.serviceItem}>Cổng thông tin du lịch Nghệ An VNPT Smart Tourism</Text>
            <Text style={styles.serviceItem}>HNTT & ATBMTT</Text>
            <Text style={styles.serviceItem}>Quản trị mạng</Text>
            <Text style={styles.serviceItem}>Sổ tay đảng viên</Text>
            <Text style={styles.serviceItem}>TT ĐH an toàn - an ninh mạng (SOC)</Text>
            <Text style={styles.serviceItem}>Dịch vụ IT Professionnal Services</Text>
            <Text style={styles.serviceItem}>Dịch vụ phòng chống tấn công VNPT antiDDOS</Text>
            <Text style={styles.serviceItem}>Giải pháp VNPT DNS Protection</Text>
            <Text style={styles.serviceItem}>Giải pháp VNPT Smart IR</Text>
            <Text style={styles.serviceItem}>Giám sát ATTT - VNPT MSS</Text>
            <Text style={styles.serviceItem}>Kiếm tử thâm nhập - VNPT Pentest</Text>
            <Text style={styles.serviceItem}>Tư vấn ATTT</Text>
            <Text style={styles.serviceItem}>Đào tạo ATTT</Text>
            <Text style={styles.serviceItem}>Hệ thống CSKH tự động</Text>
            <Text style={styles.serviceItem}>Hệ thống hỗ trợ dịch vụ VNPT Nghệ An</Text>
            <Text style={styles.serviceItem}>Hệ thống hỗ trợ ONE BSS TTKD</Text>
            <Text style={styles.serviceItem}>Hệ thống hỗ trợ ONE BSS VTT</Text>
            <Text style={styles.serviceItem}>Hệ thống phần mềm dữ liệu nội bộ</Text>
            <Text style={styles.serviceItem}>Hệ thống Quiz daily VNPT Nghệ An</Text>
            <Text style={styles.serviceItem}>Biên lai điện tử VNPT eReceipt</Text>
            <Text style={styles.serviceItem}>Camera giám sát thông minh VNPT AI Camera</Text>
            <Text style={styles.serviceItem}>Cổng thông tin điện tử vnPortal/VNPT Portal</Text>
            <Text style={styles.serviceItem}>Dịch vụ lắng nghe xã hội vnSocial</Text>
            <Text style={styles.serviceItem}>Dịch vụ phần mềm dữ liệu mở</Text>
            <Text style={styles.serviceItem}>Dịch vụ và dự án chính quyền số khác</Text>
            <Text style={styles.serviceItem}>Dịch vụ xác thực định danh KYC IDCheck</Text>
            <Text style={styles.serviceItem}>Hệ thống báo cáo thông minh VNPT VSR(LRIS)</Text>
            <Text style={styles.serviceItem}>Hệ thống CSDL quốc gia về dân cư</Text>
            <Text style={styles.serviceItem}>Hệ thống một cửa hàng liên thông VNPT iGate</Text>
            <Text style={styles.serviceItem}>Hệ thống nền tảng tích hợp và chia sẻ dữ liệu VXP</Text>
            <Text style={styles.serviceItem}>Hệ thống nền tảng tích hợp và chia sẻ dữ liệu cấp tỉnh (LGSP) tỉnh Nghệ An</Text>
            <Text style={styles.serviceItem}>Hệ thống phòng họp không giấy tờ VNPT eCabinet</Text>
            <Text style={styles.serviceItem}>Hệ thống quản lý công chức viên chức CCVC</Text>
            <Text style={styles.serviceItem}>Hệ thống quản lý phản ảnh và tương tác trực tuyến VNPT ORIM-X</Text>
            <Text style={styles.serviceItem}>Hệ thống quản lý văn bản điều hành VNPT iOffice</Text>
            <Text style={styles.serviceItem}>Hệ thống quản lý đất đai VNPT iLIS</Text>
            <Text style={styles.serviceItem}>Trung tâm điều hành thông minh VNPT IOC</Text>
            <Text style={styles.serviceItem}>Nên tảng kết nối internet vạn vật VNPT IOT Platfrom</Text>
          </ScrollView>
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
