export interface Product {
  name: string;
  description: string;
  price: string;
  quantity: string;
}

export interface OrderSummary {
  paymentInfo: string;
  shippingInfo: string;
  subtotal: number;
  tax: number;
  total: number;
}

export interface Price {
  price: number; 
}