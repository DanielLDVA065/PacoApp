// services/authSecureStorage.ts
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_auth_jwt_token";

// Save Auth Token
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token, {
      keychainAccessibility: SecureStore.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.error("Error saving secure token:", error);
    throw new Error("Secure storage write failed");
  }
};

// Retrieve Auth Token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error reading secure token:", error);
    return null;
  }
};

// Delete Auth Token (Logout)
export const deleteAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
