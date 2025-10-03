// Material used in protocol
export interface Material {
  itemName: string;
  quantity: number;
  catalog: string;
  supplier: string;
}

// Equipment used in protocol
export interface Equipment {
  equipmentName: string;
  note: string;
}

// Author type
export interface Author {
  _id: string;
  fullName: string;
  affiliation: string;
  orcid?: string;
  email: string;
  isDeleted: boolean;
  accountStatus: string;
  isTermAgree: boolean;
  role: string;
  additionalInfo?: {
    isAgree: boolean;
  };
  createdAt: string;
  updatedAt: string;
  lastLoginTime?: string;
  profileImage?: string;
  bio?: string;
}

// Protocol type
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
  authors: Author;        
  coAuthors: Author[];   
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
