import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  Text,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function MapScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <AntDesign name="search1" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Map Area with Placeholder */}
      <View style={styles.mapArea}>
        <View style={styles.mapPlaceholder}>
          <AntDesign name="enviromento" size={48} color="#FFFFFF" />
          <Text style={styles.placeholderTitle}>Map View</Text>
          <Text style={styles.placeholderSubtitle}>
            Interactive map will be displayed here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8f1fa",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: RFValue(16),
    fontFamily: "Regular",
    color: "#333",
  },
  mapArea: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 80,
    borderRadius: 16,
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderStyle: "dashed",
  },
  placeholderTitle: {
    fontSize: RFValue(20),
    fontFamily: "SemiBold",
    color: "#141819",
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#141819",
    opacity: 0.8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
