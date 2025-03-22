export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: [{
    name: string;
    email: string;
    address: string;
    phone: string;
    imageUrl: string;
    token: string;
  }];
}