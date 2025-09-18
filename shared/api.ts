/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: number | string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
}
