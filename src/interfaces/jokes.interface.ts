export enum ESource {
  Chuck = 'Chuck',
  Dad = 'Dad',
}
export interface IJoke {
  id: string;
  value: string;
  categories?: string[];
  createdAt?: string;
  iconUrl?: string;
  updatedAt?: string;
  url?: string;
  status?: number;
  source: ESource;
}
