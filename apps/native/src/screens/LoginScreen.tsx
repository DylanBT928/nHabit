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
      navigation.navigate("MainTabs");
    }
  }, [userLoaded, authLoaded, isSignedIn, user]);

  const onPress = async (authType: string) => {
    try {
      if (authType === "google") {
        const result = await startGoogleAuthFlow();

        const { createdSessionId, setActive, signIn, signUp } = result;

        if (createdSessionId) {
          await setActive({ session: createdSessionId });
          navigation.navigate("MainTabs");
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
                  navigation.navigate("MainTabs");
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
                  navigation.navigate("MainTabs");
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
          navigation.navigate("MainTabs");
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Logo and Brand Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/icons/logo.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.brandName}>nHabit</Text>
          </View>

          {/* Spacer to push buttons to bottom */}
          <View style={styles.spacer} />

          {/* Authentication Buttons */}
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
                <AntDesign name="apple1" size={24} color="#000000" />
                <Text style={styles.buttonTextApple}>Continue with Apple</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By using this app, you agree to nHabit's{"\n"}
              <Text style={styles.termsLink}>Terms of Use</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8f1fa",
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  brandName: {
    fontSize: RFValue(32),
    fontFamily: "SemiBold",
    color: "#141819",
    letterSpacing: 1,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 32,
  },
  buttonGoogle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonApple: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
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
    color: "#000000",
  },
  buttonTextApple: {
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
    color: "#000000",
    marginLeft: 12,
  },
  termsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: RFValue(11),
    fontFamily: "Regular",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 18,
    opacity: 0.8,
  },
  termsLink: {
    color: "#000000",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
