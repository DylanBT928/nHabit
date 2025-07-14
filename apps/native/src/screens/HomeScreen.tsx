import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [places, setPlaces] = useState([
    { id: 1, name: "Gym", type: "visit" },
    { id: 2, name: "McDonald's", type: "avoid" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [selectedType, setSelectedType] = useState("visit");

  const addPlace = () => {
    if (newPlaceName.trim()) {
      const newPlace = {
        id: Date.now(),
        name: newPlaceName.trim(),
        type: selectedType,
      };
      setPlaces([...places, newPlace]);
      setNewPlaceName("");
      setModalVisible(false);
    }
  };

  const removePlace = (id) => {
    Alert.alert("Remove Place", "Are you sure you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setPlaces(places.filter((place) => place.id !== id)),
      },
    ]);
  };

  const visitPlaces = places.filter((place) => place.type === "visit");
  const avoidPlaces = places.filter((place) => place.type === "avoid");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Habits</Text>
        </View>

        {/* Add Place Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Place</Text>
        </TouchableOpacity>

        {/* Visit Places Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator}>
              <View style={[styles.indicator, styles.visitIndicator]} />
              <Text style={styles.sectionTitle}>Places to Visit</Text>
            </View>
            <Text style={styles.sectionCount}>{visitPlaces.length}</Text>
          </View>

          {visitPlaces.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No places to visit yet</Text>
            </View>
          ) : (
            visitPlaces.map((place) => (
              <View key={place.id} style={[styles.placeCard, styles.visitCard]}>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removePlace(place.id)}
                  style={styles.removeButton}
                >
                  <AntDesign name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Avoid Places Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator}>
              <View style={[styles.indicator, styles.avoidIndicator]} />
              <Text style={styles.sectionTitle}>Places to Avoid</Text>
            </View>
            <Text style={styles.sectionCount}>{avoidPlaces.length}</Text>
          </View>

          {avoidPlaces.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No places to avoid yet</Text>
            </View>
          ) : (
            avoidPlaces.map((place) => (
              <View key={place.id} style={[styles.placeCard, styles.avoidCard]}>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removePlace(place.id)}
                  style={styles.removeButton}
                >
                  <AntDesign name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Place Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Place</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter place name"
              value={newPlaceName}
              onChangeText={setNewPlaceName}
              autoFocus
            />

            {/* Type Selection */}
            <View style={styles.typeSelection}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  styles.visitButton,
                  selectedType === "visit" && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType("visit")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === "visit" && styles.selectedTypeText,
                  ]}
                >
                  Visit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  styles.avoidButton,
                  selectedType === "avoid" && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType("avoid")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === "avoid" && styles.selectedTypeText,
                  ]}
                >
                  Avoid
                </Text>
              </TouchableOpacity>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setNewPlaceName("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={addPlace}>
                <Text style={styles.confirmButtonText}>Add Place</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8f1fa",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFValue(28),
    fontFamily: "SemiBold",
    color: "#141819",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: RFValue(16),
    color: "#141819",
    fontFamily: "Regular",
    textAlign: "center",
    opacity: 0.9,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#0E87E2",
    marginLeft: 8,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  visitIndicator: {
    backgroundColor: "#28A745",
  },
  avoidIndicator: {
    backgroundColor: "#DC3545",
  },
  sectionTitle: {
    fontSize: RFValue(20),
    fontFamily: "SemiBold",
    color: "#141819",
  },
  sectionCount: {
    fontSize: RFValue(16),
    fontFamily: "Medium",
    color: "#141819",
    opacity: 0.8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: "#141819",
    opacity: 0.7,
    fontFamily: "Regular",
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#28A745",
  },
  avoidCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#DC3545",
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#333",
  },
  removeButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontFamily: "SemiBold",
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    fontSize: RFValue(16),
    fontFamily: "Regular",
    marginBottom: 24,
  },
  typeSelection: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  visitButton: {
    borderColor: "#28A745",
    backgroundColor: "#F8F9FA",
  },
  avoidButton: {
    borderColor: "#DC3545",
    backgroundColor: "#F8F9FA",
  },
  selectedTypeButton: {
    backgroundColor: "#0E87E2",
    borderColor: "#0E87E2",
  },
  typeButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#666",
  },
  selectedTypeText: {
    color: "#FFFFFF",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#666",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0E87E2",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#FFFFFF",
  },
});
