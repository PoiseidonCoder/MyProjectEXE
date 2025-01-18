const apiEndpoints = {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      logout: '/api/auth/logout',
    },
    users: {
      getProfile: '/api/users/profile',
      updateProfile: '/api/users/update',
      getUserById: (id: number) => `/api/users/${id}`, 
    },
    products: {
      getAll: '/api/products',
      getById: (id: number) => `/api/products/${id}`,
      create: '/api/products/create',
      update: (id: number) => `/api/products/update/${id}`,
      delete: (id: number) => `/api/products/delete/${id}`,
    },
    orders: {
      getAll: '/api/orders',
      create: '/api/orders/create',
      getById: (id: number) => `/api/orders/${id}`,
    },
  };
  
  export default apiEndpoints;
  