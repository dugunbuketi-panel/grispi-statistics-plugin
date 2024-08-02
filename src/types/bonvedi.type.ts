export type CompanyStat = {
  averageReadTime: number;
  companyId: number;
  companyName: string;
  confirmedApplicationCount: number;
  formApplicationCount: number;
  newApplicationCount: number;
  phoneApplicationCount: number;
  totalApplicationCount: number;
  visitorCount: number;
  whatsappApplicationCount: number;
  postApplicationCountList: PostStat[];
};

export type PostStat = {
  postUrl: string;
  postTitle: string;
  externalId: number;
  internalId: number;
  visitorCount: number;
  formApplicationCount: number;
  phoneApplicationCount: number;
  totalApplicationCount: number;
  whatsappApplicationCount: number;
  confirmedApplicationCount: number;
};

export type PostStatPeriod = "CUSTOM" | "COMPANY_OPENING_DATE";
