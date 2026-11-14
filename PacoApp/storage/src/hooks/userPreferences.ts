import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserPreferences {
  theme: "dark" | "light";
  notificationsEnabled: boolean;
  fontSize: number;
}

const PREFS_KEY = "@user_preferences_v1";

export const saveUserPreferences = async (
  prefs: UserPreferences,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(prefs);
    await AsyncStorage.setItem(PREFS_KEY, jsonValue);
  } catch (error) {
    console.error("Failed to save preferences:", error);
  }
};

export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PREFS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load preferences:", error);
    return null;
  }
};
