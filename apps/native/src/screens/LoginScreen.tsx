import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
// Using solid color background for modern look

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const { isLoaded: userLoaded, user } = useUser();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();

  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  useEffect(() => {
    if (isSignedIn) {
      navigation.navigate("NotesDashboardScreen");
    }
  }, [userLoaded, authLoaded, isSignedIn, user]);

  const onPress = async (authType: string) => {
    try {
      if (authType === "google") {
        const result = await startGoogleAuthFlow();

        const { createdSessionId, setActive, signIn, signUp } = result;

        if (createdSessionId) {
          await setActive({ session: createdSessionId });
          navigation.navigate("NotesDashboardScreen");
        } else {
          // Handle sign-up flow for new users
          if (signUp && signUp.status === "missing_requirements") {
            // Check if phone number is truly required or optional
            const isPhoneRequired =
              signUp.requiredFields.includes("phone_number");

            if (isPhoneRequired) {
              // If phone is required, we need to handle this differently
              // For now, just try to create the account anyway
              try {
                await signUp.update({
                  phoneNumber: "+1234567890", // Dummy number - you should handle this properly
                });

                const { createdSessionId: newSessionId } = await signUp.create(
                  {},
                );

                if (newSessionId) {
                  await setActive({ session: newSessionId });
                  navigation.navigate("NotesDashboardScreen");
                }
              } catch (updateError) {
                Alert.alert(
                  "Configuration Issue",
                  "Your Clerk dashboard requires a phone number for sign-ups. Please update your Clerk dashboard settings to make phone number optional, or implement a phone number collection screen.",
                  [{ text: "OK" }],
                );
              }
            } else {
              // Phone is optional, just create the user
              try {
                const { createdSessionId: newSessionId } = await signUp.create(
                  {},
                );

                if (newSessionId) {
                  await setActive({ session: newSessionId });
                  navigation.navigate("NotesDashboardScreen");
                }
              } catch (signUpError) {
                // Sign-up error handled silently
              }
            }
          } else if (signIn && signIn.firstFactorVerification?.error) {
            Alert.alert(
              "Sign In Error",
              "This Google account is not associated with an existing user. Please sign up first.",
              [{ text: "OK" }],
            );
          }
        }
      } else if (authType === "apple") {
        const result = await startAppleAuthFlow();

        const { createdSessionId, setActive } = result;

        if (createdSessionId) {
          await setActive({ session: createdSessionId });
          navigation.navigate("NotesDashboardScreen");
        }
      }
    } catch (err) {
      Alert.alert(
        "Authentication Error",
        `Failed to sign in with ${authType}. Error: ${err.message || "Unknown error"}`,
        [{ text: "OK" }],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../assets/icons/logo.png")}
                  style={styles.logo}
                />
              </View>
              <Text style={styles.brandName}>nHabit</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Track your habits, discover patterns, and build better routines
                through smart location insights.
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonGoogle}
                  onPress={() => onPress("google")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      style={styles.googleIcon}
                      source={require("../assets/icons/google.png")}
                    />
                    <Text style={styles.buttonTextGoogle}>
                      Continue with Google
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonApple}
                  onPress={() => onPress("apple")}
                >
                  <View style={styles.buttonContent}>
                    <AntDesign name="apple1" size={24} color="#F7F7F7" />
                    <Text style={styles.buttonTextApple}>
                      Continue with Apple
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New to nHabit? </Text>
                <Text style={styles.signupLink}>Get started above.</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172F50", // Primary Deep Navy - fallback color
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: "#172F50", // Primary Deep Navy
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(200, 210, 224, 0.3)", // Lightest Blue with transparency
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  brandName: {
    fontSize: RFValue(28),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#F7F7F7", // Extra Light Gray
    borderRadius: 24,
    padding: 32,
    width: width - 40,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(26),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: RFValue(15),
    color: "#7A7A7A", // Dark Gray
    fontFamily: "Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 24,
  },
  buttonGoogle: {
    backgroundColor: "#E1E1E1", // Primary Light Gray
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#B3B3B3", // Medium Gray
    marginBottom: 16,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonApple: {
    backgroundColor: "#0F1E35", // Dark Blue
    borderRadius: 16,
    shadowColor: "#0A1424", // Deepest Blue
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonTextGoogle: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#3D3D3D", // Extra Dark Gray
  },
  buttonTextApple: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#F7F7F7", // Extra Light Gray
    marginLeft: 12,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    fontSize: RFValue(14),
    fontFamily: "Regular",
    color: "#7A7A7A", // Dark Gray
  },
  signupLink: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#6D8AAF", // Lighter Blue
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontFamily: "Regular",
    fontSize: RFValue(14),
  },
  buttonEmail: {
    backgroundColor: "#0D87E1",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 24,
    minHeight: 44,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "SemiBold",
    fontSize: RFValue(14),
  },
  buttonTextWithIcon: {
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#000",
    fontFamily: "Medium",
  },

  errorText: {
    fontSize: RFValue(14),
    color: "tomato",
    fontFamily: "Medium",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default LoginScreen;
