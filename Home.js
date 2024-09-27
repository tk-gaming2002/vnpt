import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';

const Home = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const renderRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <Text style={styles.requestTitle}>[TT CNTT] [AGG][IOFFICEv4] {item.service}</Text>
      <Text>Dịch vụ: {item.service}</Text>
      <Text>Ngày tạo: {item.date}</Text>
      <Text style={styles.status}>Trạng thái: <Text style={styles.statusNew}>{item.status}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Yêu cầu phân công xử lý */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yêu cầu phân công xử lý</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Task')}>
            <Text style={styles.moreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // data={assignments}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Giới hạn chỉ 2 yêu cầu
        />
      </View>

      {/* Yêu cầu của tôi */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yêu cầu của tôi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('trong')}>
            <Text style={styles.moreText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // data={myRequests}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Giới hạn chỉ 2 yêu cầu
        />
      </View>
    </View>
  );
};

// Styles
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
  section: { 
    marginBottom: 20 
  },
  sectionHeader: { 
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 0, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: 'black',
    borderRadius: 0, 
    backgroundColor: '#0c76d3', 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'white',
  },
  moreText: { 
    color: 'white' 
  },
  requestContainer: { 
    marginLeft: 15,
    marginRight: 15,
    padding: 15, 
    borderWidth: 1, 
    borderColor: 'Black', 
    borderRadius: 0, 
    marginBottom: 0, 
    backgroundColor: '#f9f9f9', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestTitle: { 
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  status: { 
    fontWeight: 'bold',
    marginTop: 10, 
  },
  statusNew: { 
    color: 'red' 
  },
  arrow: {
    width: 16,
    height: 16,
  },
});

export default Home;
