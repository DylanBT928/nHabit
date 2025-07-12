import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { useUser, useAuth } from "@clerk/clerk-expo";

export default function SettingsScreen({ navigation }) {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out of nHabit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.");
          }
        },
      },
    ]);
  };

  const handleNotifications = () => {
    Alert.alert(
      "Notifications",
      "Notification settings will be available in a future update.",
      [{ text: "OK" }],
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy",
      "Privacy settings and data management options coming soon.",
      [{ text: "OK" }],
    );
  };

  const handleSupport = () => {
    Alert.alert(
      "Support",
      "Need help? Contact our support team at support@nhabit.app",
      [{ text: "OK" }],
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About nHabit",
      "nHabit v1.0.0\nGeolocation-based habit tracking\n\nBuild better habits through smart location insights.",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <AntDesign name="user" size={32} color="#6D8AAF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.fullName ||
                  user?.emailAddresses?.[0]?.emailAddress ||
                  "User"}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.emailAddresses?.[0]?.emailAddress || "No email"}
              </Text>
            </View>
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleNotifications}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="notification" size={20} color="#6D8AAF" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <AntDesign name="right" size={16} color="#7A7A7A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handlePrivacy}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="lock" size={20} color="#6D8AAF" />
                <Text style={styles.settingText}>Privacy & Data</Text>
              </View>
              <AntDesign name="right" size={16} color="#7A7A7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Info</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleSupport}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="customerservice" size={20} color="#6D8AAF" />
                <Text style={styles.settingText}>Help & Support</Text>
              </View>
              <AntDesign name="right" size={16} color="#7A7A7A" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
              <View style={styles.settingLeft}>
                <AntDesign name="infocirlce" size={20} color="#6D8AAF" />
                <Text style={styles.settingText}>About nHabit</Text>
              </View>
              <AntDesign name="right" size={16} color="#7A7A7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <AntDesign name="logout" size={20} color="#F7F7F7" />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172F50", // Primary Deep Navy
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: RFValue(28),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    marginBottom: 4,
  },
  subtitle: {
    fontSize: RFValue(16),
    fontFamily: "Regular",
    color: "#C8D2E0", // Lightest Blue
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C8D2E0", // Lightest Blue
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
  },
  settingsGroup: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1", // Primary Light Gray
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingText: {
    fontSize: RFValue(16),
    fontFamily: "Regular",
    color: "#3D3D3D", // Extra Dark Gray
  },
  logoutButton: {
    backgroundColor: "#DC3545", // Error Red
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
  },
});
