export interface OrderItemDto {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export interface OrderItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
  color: string;
  size: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  orderCode: string;
  status: 'pending' | 'success' | 'cancel';
  totalAmount: number;
  orderDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateOrderRequest {
  items: OrderItemDto[];
  paymentMethod: 'payos' | 'cod';
  notes?: string;
  address: string;
  customerInfo?: {
    fullName: string;
    email: string;
  };
}

export interface PayOSPayment {
  checkoutUrl: string;
  qrCode: string;
  paymentId: string;
  orderCode: number;
  amount: number;
  formattedAmount: string;
  expiresAt: string;
}

export interface CreateOrderResponse {
  id: string;
  orderCode: string;
  items: OrderItem[];
  status: 'pending' | 'success' | 'cancel';
  totalAmount: number;
  paymentMethod: 'payos' | 'cod';
  orderDate: string;
  createdAt: string;
  payment?: PayOSPayment;
  // Fallback for different response structures
  checkoutUrl?: string;
}

export interface OrderTrackingInfo {
  status: string;
  updatedAt: string;
  location?: string;
  estimatedDelivery?: string;
}

export interface RefundRequest {
  reason: string;
}