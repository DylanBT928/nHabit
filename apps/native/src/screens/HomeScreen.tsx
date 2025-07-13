import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const handleInviteMember = () => {
    Alert.alert(
      "Invite Family Member",
      "Send an invitation to add a family member to your circle.",
      [{ text: "OK" }],
    );
  };

  const handleViewLocation = () => {
    Alert.alert(
      "View Location",
      "This will show detailed location information for a family member.",
      [{ text: "OK" }],
    );
  };

  const handleViewAllActivity = () => {
    Alert.alert(
      "View All Activity",
      "This will show all recent location activity for your family.",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Family Circle</Text>
          <Text style={styles.subtitle}>
            Stay connected with your loved ones
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Family Members</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Places Added</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Recent Updates</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={handleViewAllActivity}
          >
            <Text style={styles.viewAllButtonText}>View All Activity</Text>
            <AntDesign name="arrowright" size={16} color="#6D8AAF" />
          </TouchableOpacity>
        </View>

        <View style={styles.habitsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleInviteMember}
            >
              <AntDesign name="plus" size={20} color="#F7F7F7" />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyState}>
            <AntDesign name="team" size={48} color="#6D8AAF" />
            <Text style={styles.emptyStateTitle}>No family members yet</Text>
            <Text style={styles.emptyStateText}>
              Start your family circle by inviting your first member
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleInviteMember}
            >
              <Text style={styles.primaryButtonText}>Invite First Member</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>No recent activity</Text>
            <Text style={styles.activitySubtext}>
              Family location updates and notifications will appear here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E87E2", // Blue background
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
  sectionTitle: {
    fontSize: RFValue(20),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    marginBottom: 16,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statNumber: {
    fontSize: RFValue(24),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginBottom: 4,
  },
  statLabel: {
    fontSize: RFValue(12),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
    textAlign: "center",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  viewAllButtonText: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#6D8AAF", // Lighter Blue
  },
  habitsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#0F1E35", // Dark Blue
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#0F1E35", // Dark Blue
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
  },
  recentActivity: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityCard: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  activityText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginBottom: 4,
  },
  activitySubtext: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
    textAlign: "center",
  },
});
