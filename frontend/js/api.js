// Central API wrapper with token attachment and 401 handling
const API = {
  // Generic request method
  request: function (options) {
    const token = Auth.getToken();
    const headers = options.headers || {};

    // Attach Bearer token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return $.ajax({
      url: options.url,
      type: options.type || 'GET',
      headers: headers,
      contentType: options.contentType !== undefined ? options.contentType : 'application/json',
      processData: options.processData !== undefined ? options.processData : true,
      data: options.data,
      dataType: options.dataType || 'json'
    }).fail(function (xhr) {
      // Auto logout on expired or invalid token (401 Unauthorized)
      if (xhr.status === 401) {
        console.warn('Session expired. Redirecting to login.');
        Auth.logout();
      }
    });
  },

  // Helper shortcuts
  get: function (endpoint, queryParams = {}) {
    let url = `${API_BASE_URL}${endpoint}`;
    const query = $.param(queryParams);
    if (query) url += `?${query}`;
    return this.request({ url: url, type: 'GET' });
  },

  post: function (endpoint, data) {
    return this.request({
      url: `${API_BASE_URL}${endpoint}`,
      type: 'POST',
      data: JSON.stringify(data)
    });
  },

  put: function (endpoint, data) {
    return this.request({
      url: `${API_BASE_URL}${endpoint}`,
      type: 'PUT',
      data: JSON.stringify(data)
    });
  },

  patch: function (endpoint, data = {}) {
    return this.request({
      url: `${API_BASE_URL}${endpoint}`,
      type: 'PATCH',
      data: JSON.stringify(data)
    });
  },

  delete: function (endpoint) {
    return this.request({
      url: `${API_BASE_URL}${endpoint}`,
      type: 'DELETE'
    });
  },

  // File upload helper for multipart/form-data
  upload: function (endpoint, formData, method = 'POST') {
    const token = Auth.getToken();
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return $.ajax({
      url: `${API_BASE_URL}${endpoint}`,
      type: method,
      headers: headers,
      data: formData,
      processData: false,
      contentType: false
    }).fail(function (xhr) {
      if (xhr.status === 401) {
        Auth.logout();
      }
    });
  }
};
