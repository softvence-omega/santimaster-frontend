// types/userDashboard.ts
export interface Material {
  itemName: string;
  quantity: number;
  catalog: string;
  supplier: string;
}

export interface Equipment {
  equipmentName: string;
  note: string;
}

export type ProtocolStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

export interface Protocol {
  _id: string;
  protocolTitle: string;
  protocolDescription: string;
  category: string;
  tags: string[];
  technique: string;
  modality: string;
  organism: string;
  phase: string;
  estimatedTime: string;
  difficulty: string;
  bslLevel: string;
  materials: Material[];
  equipment: Equipment[];
  doiLink?: string;
  additionalReference?: string;
  stepProcedure: string;
  attachment?: string;
  license?: string;
  authors: string;
  coAuthors: string[];
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  status: ProtocolStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProtocolsData {
  draft: Protocol[];
  published: Protocol[];
  rejected: Protocol[];
  pending: Protocol[];
}

export interface ProtocolOverview {
  total: number;
  published: number;
  rejected: number;
  pending: number;
  draft: number;
}

export interface UserDashboardResponse {
  success: boolean;
  message: string;
  data: {
    protocols: ProtocolsData;
    overview: ProtocolOverview;
  };
  meta: any | null;
}
