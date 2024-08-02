import { CompanyStat, PostStat } from "./types/bonvedi.type";

export type GetStatsRequest = {
  searchTerm: string;
  startDate: string | null;
  endDate: string | null;
};

export const getStats = async (
  payload: GetStatsRequest,
  headers: Record<string, string>
) => {
  const params: any = {
    search_term: payload.searchTerm,
  };

  if (payload.startDate && payload.endDate) {
    params["start_date"] = payload.startDate;
    params["end_date"] = payload.endDate;
  }

  const queryParams = new URLSearchParams(params).toString();
  const url = `https://admin.bonvedi.com/api/dugunbuketi/statistics?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (response.ok) {
    return (await response.json()) as CompanyStat[];
  }

  throw Error("Failed to fetch.");
};
