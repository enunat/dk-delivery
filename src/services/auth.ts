import api from "./api";

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  preferredLanguage: "amharic" | "english";
  avatar?: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  preferredLanguage?: "amharic" | "english";
}

// Local storage keys
const TOKEN_KEY = "dk_delivery_token";
const USER_KEY = "dk_delivery_user";

// Authentication service
export const authService = {
  // Register a new user
  register: async (userData: RegisterData): Promise<User> => {
    try {
      const response = await api.post("/auth/register", userData);
      const user = response.data;

      // Save user data and token to local storage
      localStorage.setItem(TOKEN_KEY, user.token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const user = response.data;

      // Save user data and token to local storage
      localStorage.setItem(TOKEN_KEY, user.token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current user from local storage
  getCurrentUser: (): User | null => {
    try {
      const userJson = localStorage.getItem(USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const token = authService.getToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.put("/auth/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data;

      // Update local storage
      localStorage.setItem(TOKEN_KEY, updatedUser.token);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    try {
      const token = authService.getToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },
};

// Add token to all API requests if user is authenticated
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default authService;
