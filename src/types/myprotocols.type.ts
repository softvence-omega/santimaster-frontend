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

export type ProtocolStatus = "PUBLISHED" | "DRAFT" | "REJECTED" | "PENDING";

export interface MyProtocol {
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
  license: string;
  authors: string[];
  coAuthors: string[];
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  status: ProtocolStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProtocolsGrouped {
  draft: MyProtocol[];
  published: MyProtocol[];
  rejected: MyProtocol[];
  pending: MyProtocol[];
}

export interface ProtocolsOverview {
  total: number;
  published: number;
  rejected: number;
  pending: number;
  draft: number;
}

export interface GetProtocolsResponse {
  success: boolean;
  message: string;
  data: {
    protocols: ProtocolsGrouped;
    overview: ProtocolsOverview;
  };
  meta: any | null;
}
