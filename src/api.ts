import { CompanyStat, PostStat } from "./types/bonvedi.type";

type GetStatsRequest = {
  searchTerm: string;
  postIds?: number[];
};

interface GetStatsResponse extends Response {
  companies: CompanyStat[];
  posts: PostStat[];
}

export const getStats = async (
  payload: GetStatsRequest,
  headers: Record<string, string>
) => {
  const params: any = {
    search_term: payload.searchTerm,
  };

  const postIds = payload.postIds ? payload.postIds.join(",") : "";

  if (postIds) {
    params["post_id"] = postIds;
  }

  const queryParams = new URLSearchParams(params).toString();
  const url = `https://admin.bonvedi.com/api/dugunbuketi/statistics?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (response.ok) {
    return (await response.json()) as GetStatsResponse;
  }

  throw Error("Failed to fetch.");
};
