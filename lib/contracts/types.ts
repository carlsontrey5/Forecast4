export type InformationType = "Contracts" | "Financial Results" | "M&A" | "New Offerings" | "Partnerships";
export type RenewalStatus = "Renewal" | "Loss" | "No Renewal Insight";
export type CoverageSentiment = "Positive" | "Neutral" | "Negative";

export interface MediaCoverageItem {
  title: string;
  url: string;
  date: string;
  source: string;
  sentiment: CoverageSentiment;
}

export interface ContractRecord {
  id: string;
  title: string;
  body: string;
  articleUrl?: string;
  informationType: InformationType;
  serviceLine: string;
  industry: string;
  serviceProvider: string;
  geography: string;
  countrySigned: string;
  deliveryLocation: string;
  clientName: string;
  contractStartDate: string;
  contractLengthMonths: number;
  contractEndDate: string;
  contractEndEstimated: boolean;
  tcvUsd: number;
  tcvEstimated: boolean;
  contractType: string;
  platform: string;
  saasPlatform: boolean;
  incumbentProvider?: string;
  renewalStatus?: RenewalStatus;
  renewalConfidence?: number;
  renewalRationale?: string;
  dealTypeDetail?: string;
  mediaCoverageSentiment?: CoverageSentiment;
  mediaCoverageSummary?: string;
  mediaCoverage?: MediaCoverageItem[];
  source: string;
  aiConfidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContractFilters {
  freeText?: string;
  serviceLine?: string;
  industry?: string;
  serviceProvider?: string;
  geography?: string;
  informationTypes?: InformationType[];
  startDateFrom?: string;
  startDateTo?: string;
  renewalStatus?: RenewalStatus | "Any";
}

export interface ContractDraft {
  title: string;
  body: string;
  articleUrl?: string;
  informationType?: InformationType;
  serviceLine?: string;
  industry?: string;
  serviceProvider?: string;
  geography?: string;
  countrySigned?: string;
  deliveryLocation?: string;
  clientName?: string;
  contractStartDate?: string;
  contractLengthMonths?: number;
  contractEndDate?: string;
  contractEndEstimated?: boolean;
  tcvUsd?: number;
  tcvEstimated?: boolean;
  contractType?: string;
  platform?: string;
  saasPlatform?: boolean;
  incumbentProvider?: string;
  renewalStatus?: RenewalStatus;
  renewalConfidence?: number;
  renewalRationale?: string;
  dealTypeDetail?: string;
  mediaCoverageSentiment?: CoverageSentiment;
  mediaCoverageSummary?: string;
  mediaCoverage?: MediaCoverageItem[];
  source?: string;
  aiConfidence?: number;
}

export interface ContractDb {
  contracts: ContractRecord[];
}
