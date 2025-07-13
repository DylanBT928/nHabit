import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "34°45'00.2\" N",
    longitude: "103°45'58.0\" W",
  });

  const handleLocationPermission = () => {
    Alert.alert(
      "Location Access",
      "Enable location access to see your location and share it with family members.",
      [
        { text: "Not Now", style: "cancel" },
        {
          text: "Enable Location",
          onPress: () => console.log("Location enabled"),
        },
      ],
    );
  };

  const handleAddPlace = () => {
    Alert.alert(
      "Add Place",
      "Add a new place like Home, Work, or School to get arrival/departure notifications.",
      [{ text: "OK" }],
    );
  };

  const handleCenterLocation = () => {
    Alert.alert("Center Location", "Centering map on your current location", [
      { text: "OK" },
    ]);
  };

  const handleLayersToggle = () => {
    Alert.alert("Map Layers", "Toggle between different map views", [
      { text: "OK" },
    ]);
  };

  const handleCompass = () => {
    Alert.alert("Compass", "Reset map orientation to north", [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      {/* Map Area (Full Screen) */}
      <View style={styles.mapContainer}>
        {/* Placeholder for actual map */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Interactive Map Area</Text>
          <Text style={styles.mapSubtext}>
            Real map integration coming soon
          </Text>
        </View>

        {/* Coordinate Display */}
        <View style={styles.coordinateDisplay}>
          <AntDesign name="enviromento" size={16} color="#3D3D3D" />
          <Text style={styles.coordinateText}>
            {currentLocation.latitude}, {currentLocation.longitude}
          </Text>
          <TouchableOpacity style={styles.copyButton}>
            <AntDesign name="copy1" size={16} color="#3D3D3D" />
          </TouchableOpacity>
        </View>

        {/* Left Side Controls */}
        <View style={styles.leftControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleCenterLocation}
          >
            <AntDesign name="plus" size={20} color="#3D3D3D" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleLocationPermission}
          >
            <AntDesign name="minus" size={20} color="#3D3D3D" />
          </TouchableOpacity>
        </View>

        {/* Right Side Controls */}
        <View style={styles.rightControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleCompass}
          >
            <AntDesign name="reload1" size={20} color="#3D3D3D" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleLayersToggle}
          >
            <AntDesign name="appstore1" size={20} color="#3D3D3D" />
          </TouchableOpacity>
        </View>

        {/* Search/Location Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleCenterLocation}
        >
          <AntDesign name="search1" size={24} color="#F7F7F7" />
        </TouchableOpacity>

        {/* Scale Indicator */}
        <View style={styles.scaleContainer}>
          <AntDesign name="infocirlce" size={16} color="#3D3D3D" />
          <View style={styles.scaleBar}>
            <View style={styles.scaleLine} />
            <Text style={styles.scaleText}>2,580 ft</Text>
          </View>
        </View>
      </View>

      {/* Add Place Button - Now floating */}
      <TouchableOpacity style={styles.addPlaceButton} onPress={handleAddPlace}>
        <AntDesign name="plus" size={24} color="#F7F7F7" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#E8F4E8",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#3D3D3D",
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A",
  },
  coordinateDisplay: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coordinateText: {
    flex: 1,
    marginLeft: 8,
    fontSize: RFValue(12),
    fontFamily: "Regular",
    color: "#3D3D3D",
  },
  copyButton: {
    padding: 4,
  },
  leftControls: {
    position: "absolute",
    left: 20,
    top: "30%",
    gap: 12,
  },
  rightControls: {
    position: "absolute",
    right: 20,
    top: "20%",
    gap: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    bottom: 120,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3D3D3D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  scaleContainer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scaleBar: {
    alignItems: "flex-start",
  },
  scaleLine: {
    width: 60,
    height: 2,
    backgroundColor: "#3D3D3D",
    marginBottom: 2,
  },
  scaleText: {
    fontSize: RFValue(10),
    fontFamily: "Regular",
    color: "#3D3D3D",
  },
  addPlaceButton: {
    position: "absolute",
    bottom: 100, // Above the tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#28A745", // Success Green
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
