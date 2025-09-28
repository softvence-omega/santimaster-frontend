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
  license: string;
  authors: string;       
  coAuthors: string[];   
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  createdAt: string;
  updatedAt: string;
}
