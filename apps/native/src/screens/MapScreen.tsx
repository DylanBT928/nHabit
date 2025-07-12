import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function MapScreen({ navigation }) {
  const handleLocationPermission = () => {
    Alert.alert(
      "Location Access",
      "nHabit needs location access to track your habits and provide location-based insights.",
      [
        { text: "Not Now", style: "cancel" },
        {
          text: "Enable Location",
          onPress: () => console.log("Location enabled"),
        },
      ],
    );
  };

  const handleAddHabitLocation = () => {
    Alert.alert(
      "Add Habit Location",
      "Tap on the map to mark a location where you practice a habit.",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Map View</Text>
        <Text style={styles.subtitle}>Track your habits by location</Text>
      </View>

      <View style={styles.mapContainer}>
        {/* Placeholder for map component */}
        <View style={styles.mapPlaceholder}>
          <AntDesign name="enviromento" size={64} color="#6D8AAF" />
          <Text style={styles.mapPlaceholderTitle}>Map Coming Soon</Text>
          <Text style={styles.mapPlaceholderText}>
            Interactive map for tracking habit locations will be available here
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLocationPermission}
        >
          <AntDesign name="enviromento" size={20} color="#F7F7F7" />
          <Text style={styles.actionButtonText}>Enable Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddHabitLocation}
        >
          <AntDesign name="plus" size={20} color="#F7F7F7" />
          <Text style={styles.actionButtonText}>Add Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Location-Based Insights</Text>
        <View style={styles.infoItem}>
          <AntDesign name="clockcircle" size={16} color="#6D8AAF" />
          <Text style={styles.infoText}>
            Track when habits occur at specific locations
          </Text>
        </View>
        <View style={styles.infoItem}>
          <AntDesign name="barschart" size={16} color="#6D8AAF" />
          <Text style={styles.infoText}>
            Discover patterns in your habit locations
          </Text>
        </View>
        <View style={styles.infoItem}>
          <AntDesign name="star" size={16} color="#6D8AAF" />
          <Text style={styles.infoText}>
            Build location-triggered habit reminders
          </Text>
        </View>
      </View>
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
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#C8D2E0", // Lightest Blue
    textAlign: "center",
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Extra Light Gray
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  mapPlaceholderTitle: {
    fontSize: RFValue(20),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginTop: 16,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
    textAlign: "center",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#0F1E35", // Dark Blue
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
  },
  infoCard: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoTitle: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
    flex: 1,
  },
});
