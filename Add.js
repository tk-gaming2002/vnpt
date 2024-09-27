import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Component cho nhóm nút chọn mức độ
const ButtonGroup = ({ options, selected, onSelect }) => (
  <View style={styles.buttonGroup}>
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        style={selected === option ? styles.optionButtonSelected : styles.optionButton}
        onPress={() => onSelect(option)}
      >
        <Text style={selected === option ? styles.buttonTextSelected : styles.buttonText}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const Add = ({ modalVisible, onClose }) => {
  const [requestLevel, setRequestLevel] = useState('Thông thường');
  const [priorityLevel, setPriorityLevel] = useState('Thấp');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Chọn dịch vụ hỗ trợ</Text>

          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Tất cả các dịch vụ</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Mức độ yêu cầu</Text>
          <ButtonGroup
            options={['Thông thường', 'Lớn', 'Nghiêm trọng']}
            selected={requestLevel}
            onSelect={setRequestLevel}
          />

          <Text style={styles.sectionTitle}>Mức độ ưu tiên</Text>
          <ButtonGroup
            options={['Thấp', 'Trung bình', 'Cao']}
            selected={priorityLevel}
            onSelect={setPriorityLevel}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#0c76d3',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#0c76d3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionButtonSelected: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
  },
  buttonTextSelected: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Add;
