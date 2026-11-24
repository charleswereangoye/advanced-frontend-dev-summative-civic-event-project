// Auth helper to manage token and user data in storage
const Auth = {
  // Save user session based on remember-me choice
  setAuth: function (token, user, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    // Clear opposite storage to prevent stale sessions
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
  },

  // Get stored token
  getToken: function () {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  // Get stored user profile
  getUser: function () {
    const raw = localStorage.getItem('user') || sessionStorage.getItem('user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  // Check if logged in
  isAuthenticated: function () {
    return !!this.getToken();
  },

  // RBAC guard: check if active user is an administrator
  isAdmin: function () {
    const user = this.getUser();
    return user && user.role === 'admin';
  },

  // Sign out and redirect to login
  logout: function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
  }
};
