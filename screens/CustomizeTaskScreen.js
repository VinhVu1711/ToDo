import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
//import DateTimePicker from "@react-native-community/datetimepicker";
//import { DateTimePicker } from "react-native-material-datetime-picker";
import DateTimePicker from "react-native-community/datetimepicker";
export default function CustomizeTaskScreen() {
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Hàm thêm Task mới
  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTaskItems([
      ...taskItems,
      { name: newTask, priority, description, dueDate, completed: false },
    ]);
    setNewTask("");
    setPriority("Medium");
    setDescription("");
    setDueDate(new Date());
    setModalVisible(false);
  };

  // Hàm hoàn thành Task (xoá sau khi hoàn thành)
  const handleCompleteTask = (index) => {
    Alert.alert("Task Completed", "You have completed a task. Good Job! 🎉", [
      {
        text: "OK",
        onPress: () => {
          const updatedTasks = taskItems.filter((_, i) => i !== index);
          setTaskItems(updatedTasks);
        },
      },
    ]);
  };

  // Hàm xoá Task
  const handleDeleteTask = (index) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedTasks = taskItems.filter((_, i) => i !== index);
          setTaskItems(updatedTasks);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Nút mở Modal thêm Task */}
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>

      {/* Danh sách Task */}
      <View>
        <FlatList
          data={[...taskItems].sort((a, b) => {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sắp xếp từ cao -> thấp
          })}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              {/* Dấu tick hoàn thành Task */}
              <TouchableOpacity onPress={() => handleCompleteTask(index)}>
                <Text style={styles.completeText}>
                  {item.completed ? "✅" : "✅"}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.taskDetails}>
                  Priority: {item.priority}
                </Text>
                <Text style={styles.taskDetails}>
                  Due: {item.dueDate.toDateString()}
                </Text>
                <Text style={styles.taskDetails}>
                  Description: {item.description}
                </Text>
              </View>
              {/* Dấu X xoá Task */}
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Modal Thêm Task */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Dấu ❌ để đóng Modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>❌</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Task</Text>

            {/* Nhập Task Name */}
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              value={newTask}
              onChangeText={setNewTask}
            />

            {/* Chọn Ngày Hoàn Thành */}
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerText}>
                {dueDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDueDate(selectedDate);
                }}
              />
            )}

            {/* Chọn Độ Ưu Tiên */}
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {["High", "Medium", "Low"].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.priorityButton,
                    priority === level && styles.selectedPriority,
                  ]}
                  onPress={() => setPriority(level)}
                >
                  <Text>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Nhập Mô Tả Task */}
            <TextInput
              style={styles.input}
              placeholder="Task Description"
              value={description}
              onChangeText={setDescription}
            />

            {/* Nút Tạo Task */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleAddTask}
            >
              <Text style={styles.createButtonText}>Create Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "white", fontSize: 30 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerText: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  priorityButton: { padding: 10, borderWidth: 1, borderRadius: 5 },
  selectedPriority: { backgroundColor: "lightblue" },
  createButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: { color: "white", fontWeight: "bold" },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  deleteText: { color: "red" },
  completeText: { marginRight: 10 },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
