import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

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

      {/* Map Area with WebView */}
      <View style={styles.mapArea}>
        <WebView
          source={{ uri: "https://www.openstreetmap.org" }}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E87E2",
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
});
