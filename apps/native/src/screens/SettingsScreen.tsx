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

  const handleProfile = () => {
    Alert.alert(
      "Profile",
      "Profile settings will be available in a future update.",
      [{ text: "OK" }],
    );
  };

  const handleNotifications = () => {
    Alert.alert(
      "Notifications",
      "Notification settings will be available in a future update.",
      [{ text: "OK" }],
    );
  };

  const handlePrivacyData = () => {
    Alert.alert(
      "Privacy & Data",
      "Privacy and data settings will be available in a future update.",
      [{ text: "OK" }],
    );
  };

  const handleRateReview = () => {
    Alert.alert(
      "Rate & Review",
      "Thank you for your interest! Please rate us on the App Store.",
      [{ text: "OK" }],
    );
  };

  const handleHelp = () => {
    Alert.alert(
      "Help",
      "Help and support resources will be available in a future update.",
      [{ text: "OK" }],
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About nHabit",
      "nHabit helps you build better habits by tracking places you want to visit or avoid.",
      [{ text: "OK" }],
    );
  };

  const handlePremium = () => {
    Alert.alert(
      "Premium Membership",
      "Premium features will be available soon!",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Premium Membership Card */}
        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Premium Membership</Text>
          <Text style={styles.premiumSubtitle}>Upgrade for more features</Text>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={handlePremium}
          >
            <Text style={styles.premiumButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleProfile}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="user" size={20} color="#666" />
                <Text style={styles.settingText}>Profile</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleNotifications}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="notification" size={20} color="#666" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handlePrivacyData}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="lock" size={20} color="#666" />
                <Text style={styles.settingText}>Privacy & Data</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleRateReview}
            >
              <View style={styles.settingLeft}>
                <AntDesign name="star" size={20} color="#666" />
                <Text style={styles.settingText}>Rate & Review</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
              <View style={styles.settingLeft}>
                <AntDesign name="questioncircle" size={20} color="#666" />
                <Text style={styles.settingText}>Help</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
              <View style={styles.settingLeft}>
                <AntDesign name="infocirlce" size={20} color="#666" />
                <Text style={styles.settingText}>About nHabit</Text>
              </View>
              <AntDesign name="right" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E87E2",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFValue(28),
    fontFamily: "SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 30,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumTitle: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#0E87E2",
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#666",
    marginBottom: 16,
  },
  premiumButton: {
    backgroundColor: "#0E87E2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  premiumButtonText: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
    marginHorizontal: 20,
  },
  settingsGroup: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: RFValue(16),
    fontFamily: "Regular",
    color: "#333",
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 48,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 100,
    backgroundColor: "#DC3545",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
