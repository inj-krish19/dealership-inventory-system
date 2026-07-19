export interface EndpointDoc {
  method: string;
  path: string;
  description: string;
  auth: 'None' | 'Authenticated' | 'Admin only';
  body?: string;
}

export const apiDocs: EndpointDoc[] = [
  { method: 'GET', path: '/', description: 'API info and welcome message', auth: 'None' },
  { method: 'GET', path: '/health', description: 'Server health check (uptime, timestamp)', auth: 'None' },

  { method: 'POST', path: '/api/auth/register', description: 'Register a new user account', auth: 'None', body: '{ name, email, password }' },
  { method: 'POST', path: '/api/auth/login', description: 'Log in and receive a JWT', auth: 'None', body: '{ email, password }' },

  { method: 'GET', path: '/api/vehicles', description: 'List all available vehicles', auth: 'Authenticated' },
  { method: 'GET', path: '/api/vehicles/search', description: 'Search vehicles by make, model, category, or price range (query params)', auth: 'Authenticated' },
  { method: 'POST', path: '/api/vehicles', description: 'Add a new vehicle', auth: 'Authenticated', body: '{ make, model, category, price, quantity }' },
  { method: 'PUT', path: '/api/vehicles/:id', description: "Update a vehicle's details", auth: 'Authenticated', body: '{ make?, model?, category?, price?, quantity? }' },
  { method: 'DELETE', path: '/api/vehicles/:id', description: 'Delete a vehicle', auth: 'Admin only' },

  { method: 'POST', path: '/api/vehicles/:id/purchase', description: "Purchase a vehicle, decreasing its stock quantity", auth: 'Authenticated', body: '{ quantity }' },
  { method: 'POST', path: '/api/vehicles/:id/restock', description: "Restock a vehicle, increasing its stock quantity", auth: 'Admin only', body: '{ quantity }' },
];