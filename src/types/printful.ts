export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: PrintfulVariant[];
  synced: boolean;
  thumbnail_url: string;
  is_ignored: boolean;
  description?: string;
}

export interface PrintfulVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  sku: string;
  files: PrintfulFile[];
}

export interface PrintfulFile {
  id: number;
  type: string;
  hash: string;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi: number;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
}

export interface PrintfulError {
  code: number;
  result: null;
  error: {
    reason: string;
    message: string;
  };
}