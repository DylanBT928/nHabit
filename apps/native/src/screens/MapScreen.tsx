import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

export default function MapScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapUrl, setMapUrl] = useState("https://www.openstreetmap.org");
  const [lastSearched, setLastSearched] = useState(null); // { name, lat, lon }
  const [savedLocations, setSavedLocations] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setMapUrl(
          `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`
        );
        setLastSearched({ name: display_name, lat, lon });
        Keyboard.dismiss();
      } else {
        alert("Location not found.");
      }
    } catch (e) {
      alert("Error searching location.");
    }
  };

  const handleSaveLocation = () => {
    if (
      lastSearched &&
      !savedLocations.some(
        (loc) => loc.lat === lastSearched.lat && loc.lon === lastSearched.lon
      )
    ) {
      setSavedLocations([...savedLocations, lastSearched]);
    }
  };

  const handleSelectSaved = (loc) => {
    setMapUrl(
      `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lon}#map=15/${loc.lat}/${loc.lon}`
    );
    setSearchQuery(loc.name);
  };

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
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {/* Save button appears if a search was made */}
          {lastSearched && (
            <TouchableOpacity onPress={handleSaveLocation} style={styles.saveButton}>
              <AntDesign name="save" size={20} color="#0E87E2" />
            </TouchableOpacity>
          )}
        </View>
        {/* Saved Locations List */}
        {savedLocations.length > 0 && (
          <FlatList
            data={savedLocations}
            keyExtractor={(item) => `${item.lat},${item.lon}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.savedItem}
                onPress={() => handleSelectSaved(item)}
              >
                <AntDesign name="enviromento" size={16} color="#0E87E2" />
                <Text style={styles.savedText} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.savedList}
          />
        )}
      </View>

      {/* Map Area with WebView */}
      <View style={styles.mapArea}>
        <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
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
  saveButton: {
    marginLeft: 8,
    padding: 4,
  },
  savedList: {
    marginTop: 8,
    marginLeft: 4,
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    elevation: 2,
  },
  savedText: {
    marginLeft: 6,
    maxWidth: 180,
    color: "#0E87E2",
    fontSize: RFValue(13),
  },
});
