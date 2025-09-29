/* eslint-disable @typescript-eslint/no-explicit-any */
// --------------------- Overview ---------------------
export interface Overview {
  pendingProtocol: number;
  draftProtocol: number;
  totalUser: number;
  totalDonation: number;
}

// --------------------- Materials & Equipment ---------------------
export interface Material {
  itemName: string;
  quantity: number;
  catalog: string;
  supplier: string;
}

export interface Equipment {
  equipmentName: string;
  note?: string;
}

// --------------------- Protocol ---------------------
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
  doiLink: string;
  additionalReference: string;
  stepProcedure: string;
  attachment: string;
  license: string;
  authors: any;
  coAuthors: string[];
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------- Recent Activity ---------------------
export interface ActivityItem {
  name: string;
  time: string;
}

export interface Chart {
  totalSubmission: number;
  approvedRate: number;
  todaySubmission: number;
}

export interface RecentActivity {
  activity: ActivityItem[];
  chart: Chart;
}

// --------------------- Donation ---------------------
export interface RecentDonar {
  _id: string;
  donationType: string;
  amount: number;
  donarName: string;
  donarEmail: string;
  country: string;
  tribute?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
 
}

export interface Donation {
  totalDonar: number;
  avgDonation: string;
  recentDonar: RecentDonar[];
}

// --------------------- User ---------------------
export interface AdditionalInfo {
  isAgree: boolean;
}

export interface User {
  _id: string;
  fullName: string;
  affiliation: string;
  orcid: string;
  email: string;
  password: string;
  isDeleted: boolean;
  accountStatus: string;
  isTermAgree: boolean;
  role: string;
  additionalInfo: AdditionalInfo;
  createdAt: string;
  updatedAt: string;
  lastLoginTime?: string;
  lastPasswordChange?: string;
  profileImage?: string;
  bio?: string;
}

// --------------------- Response ---------------------
export interface UserDashboardData {
  overview: Overview;
  pendingProtocol: Protocol[];
  recentActivity: RecentActivity;
  donation: Donation;
  users: User[];
}

export interface UserDashboardResponse {
  success: boolean;
  message: string;
  data: UserDashboardData;
  meta?: any;
}
