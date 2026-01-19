/**
 * User interface
 * Represents a user in the system
 */
export interface User {
  name: string;
  email: string;
  role: string;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}
