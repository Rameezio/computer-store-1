export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_COLORS = {
  pending:    'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  confirmed:  'bg-blue-500/20 text-blue-500 border-blue-500/30',
  processing: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  shipped:    'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
  delivered:  'bg-green-500/20 text-green-500 border-green-500/30',
  cancelled:  'bg-red-500/20 text-red-500 border-red-500/30',
};

export const PAYMENT_METHODS = {
  COD: 'cod',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const DELIVERY_FEE = 0;

export const CATEGORIES = [
  { id: 'controller',  name: 'PlayStation' },
  { id: 'controller',  name: 'Xbox'        },
  { id: 'controller',  name: 'Controllers' },
  { id: 'headset',     name: 'Headsets'    },
  { id: 'keyboard',    name: 'Keyboards'   },
  { id: 'mouse',       name: 'Mouse'       },
  { id: 'mousepad',    name: 'Mousepads'   },
  { id: 'accessories', name: 'Networking'  },
  { id: 'accessories', name: 'Accessories' },
];

export const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Sargodha', 'Hyderabad', 'Other',
];
