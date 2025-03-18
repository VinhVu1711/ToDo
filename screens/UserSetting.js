import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

export default function UserSettingsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
        <SettingItem icon="user" text="Edit Profile" />
        <SettingItem icon="shield" text="Security" />
        <SettingItem icon="bell" text="Notifications" />
        <SettingItem icon="" text="Theme" />
      </View>

      {/* Actions Section */}
      <Text style={styles.sectionTitle}>Actions</Text>
      <View style={styles.section}>
        <SettingItem icon="flag" text="Report a problem" />
        <SettingItem icon="user-plus" text="Add account" />
        <SettingItem icon="sign-out" text="Log out" />
      </View>
    </ScrollView>
  );
}

// Component hiển thị từng mục cài đặt
const SettingItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.settingItem}>
    <FontAwesome name={icon} size={20} color="black" style={styles.icon} />
    <Text style={styles.settingText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 16,
  },
});
