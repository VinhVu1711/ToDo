import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  FlatList,
} from "react-native";

export default function TodayTaskScreen() {
  const [categoryName, setCategoryName] = useState(""); // Tên category nhập vào
  const [categories, setCategories] = useState([]); // Danh sách category
  const [selectedCategory, setSelectedCategory] = useState(null); // Category đang hiển thị task
  const [task, setTask] = useState(""); // Task nhập vào

  // Thêm một Category mới
  const handleAddCategory = () => {
    if (!categoryName.trim()) return; // Không thêm nếu trống
    Keyboard.dismiss();
    setCategories([...categories, { name: categoryName, tasks: [] }]); // Thêm category mới
    setCategoryName("");
  };

  // Xóa một Category
  const handleDeleteCategory = (categoryName) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setCategories(
              categories.filter((cat) => cat.name !== categoryName)
            );
            setSelectedCategory(null);
          },
        },
      ]
    );
  };

  // Thêm task vào Category hiện tại
  const handleAddTask = () => {
    if (!task.trim() || !selectedCategory) return; // Không thêm nếu trống hoặc không chọn Category
    Keyboard.dismiss();
    const updatedCategories = categories.map((cat) =>
      cat.name === selectedCategory
        ? { ...cat, tasks: [...cat.tasks, task] }
        : cat
    );
    setCategories(updatedCategories);
    setTask("");
  };

  // Xử lý khi hoàn thành Task (bấm vào ✔️)
  const handleCompleteTask = (taskIndex) => {
    Alert.alert("Task Completed", "You have completed a task. Good Job! 🎉", [
      {
        text: "OK",
        onPress: () => {
          const updatedCategories = categories.map((cat) =>
            cat.name === selectedCategory
              ? {
                  ...cat,
                  tasks: cat.tasks.filter((_, index) => index !== taskIndex),
                }
              : cat
          );
          setCategories(updatedCategories);
        },
      },
    ]);
  };

  // Xóa một Task khỏi Category
  const handleDeleteTask = (taskIndex) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedCategories = categories.map((cat) =>
            cat.name === selectedCategory
              ? {
                  ...cat,
                  tasks: cat.tasks.filter((_, index) => index !== taskIndex),
                }
              : cat
          );
          setCategories(updatedCategories);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          YOU HAVE TO COMPLETE IT TODAY 😊
        </Text>

        {/* Danh sách Category */}
        {selectedCategory === null ? (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSelectedCategory(item.name)}
              >
                <Text style={styles.categoryText}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.deleteCategory}
                  onPress={() => handleDeleteCategory(item.name)}
                >
                  <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        ) : (
          <>
            {/* Hiển thị các Task trong Category được chọn */}
            <Text style={styles.selectedCategoryTitle}>
              {selectedCategory} Tasks:
            </Text>
            <FlatList
              data={
                categories.find((cat) => cat.name === selectedCategory)
                  ?.tasks || []
              }
              keyExtractor={(item, index) => `${selectedCategory}-${index}`}
              renderItem={({ item, index }) => (
                <View style={styles.taskItem}>
                  <Text style={styles.taskText}>{item}</Text>
                  <View style={styles.taskActions}>
                    {/* Nút hoàn thành ✔️ */}
                    <TouchableOpacity onPress={() => handleCompleteTask(index)}>
                      <Text style={styles.completeText}>✔️</Text>
                    </TouchableOpacity>
                    {/* Nút xóa ❌ */}
                    <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                      <Text style={styles.deleteText}>❌</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.backButtonText}>← Back to Categories</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Nhập Category hoặc Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={selectedCategory ? "Write a task" : "Create a category"}
          value={selectedCategory ? task : categoryName}
          onChangeText={(text) =>
            selectedCategory ? setTask(text) : setCategoryName(text)
          }
        />
        <TouchableOpacity
          onPress={selectedCategory ? handleAddTask : handleAddCategory}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -10,
    marginTop: -45,
    textAlign: "left",
  },
  categoryItem: {
    backgroundColor: "#FFF",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteCategory: {
    padding: 5,
  },
  selectedCategoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    fontSize: 16,
  },
  taskActions: {
    flexDirection: "row",
    gap: 10,
  },
  completeText: {
    fontSize: 18,
    color: "green",
    marginRight: 10,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
  backButton: {
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007BFF", // Màu xanh nổi bật
    borderRadius: 20, // Bo góc
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Hiệu ứng đổ bóng trên Android
  },
  backButtonText: {
    fontSize: 16,
    color: "#FFF", // Chữ màu trắng cho dễ nhìn
    fontWeight: "bold",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    marginRight: 30,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
