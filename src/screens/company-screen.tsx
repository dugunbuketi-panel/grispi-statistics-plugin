import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";

import { GetStatsRequest, getStats } from "@/api";
import { CompanyCard } from "@/components/company-card";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { PostCard } from "@/components/post-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGrispi } from "@/contexts/grispi-context";
import { formatDateToYmd } from "@/lib/utils";
import { CompanyStat, PostStat, PostStatPeriod } from "@/types/bonvedi.type";

export const CompanyScreen = observer(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompanyStat[]>([]);
  const [period, setPeriod] = useState<PostStatPeriod>("COMPANY_OPENING_DATE");
  const { ticket, bundle } = useGrispi();

  const handleGetStats = useCallback(
    async (period: PostStatPeriod) => {
      if (!bundle?.settings?.access_token) return;
      if (typeof ticket?.fieldMap["tu.ilan_ad"]?.value !== "string") return;

      try {
        setLoading(true);

        const params: GetStatsRequest = {
          searchTerm: ticket.fieldMap["tu.ilan_ad"]?.value,
          startDate: null,
          endDate: null,
        };

        if (period === "CUSTOM") {
          const startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);

          params["startDate"] = formatDateToYmd(startDate);
          params["endDate"] = formatDateToYmd(new Date());
        }

        let companies = await getStats(params, {
          Authorization: `Bearer ${bundle.settings.access_token}`,
        });

        companies = companies?.map((company) => {
          company.postApplicationCountList =
            company.postApplicationCountList.filter((post) =>
              post.postUrl.includes("dugunbuketi.com")
            );

          return company;
        });

        setCompanies(companies ?? []);
      } catch (err) {
        console.error({ err });
      }

      setLoading(false);
    },
    [bundle, ticket]
  );

  const handlePeriodChange = useCallback(
    (value: string) => {
      setPeriod(value as PostStatPeriod);
      handleGetStats(value as PostStatPeriod);
    },
    [bundle, ticket]
  );

  useEffect(() => {
    handleGetStats(period);
  }, [ticket, bundle]);

  return (
    <Screen>
      <ScreenContent className="mb-14">
        {loading ? (
          <LoadingWrapper />
        ) : (
          <div className="space-y-6 py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3 px-4">
                <h3 className="font-medium">İstatistikler</h3>
                <Select value={period} onValueChange={handlePeriodChange}>
                  <SelectTrigger className="bg-white">
                    <span>
                      {period === "CUSTOM"
                        ? "Son 1 yıl"
                        : "Şirket açılışına göre"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOM">Son 1 yıl</SelectItem>
                    <SelectItem value="COMPANY_OPENING_DATE">
                      Şirket açılışına göre
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-10">
                {companies.map((company, i) => (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <CompanyCard key={company.companyId} company={company} />
                      {company.postApplicationCountList.length > 0 && (
                        <div className="mt-[-1px] h-6 w-2 border-x bg-white shadow"></div>
                      )}
                      {company.postApplicationCountList.map((post, i) => (
                        <>
                          <PostCard key={post.internalId} post={post} />
                          {company.postApplicationCountList[i + 1] && (
                            <div className="mt-[-1px] h-6 w-2 border-x bg-white shadow"></div>
                          )}
                        </>
                      ))}
                    </div>
                    {companies[i + 1] && (
                      <div className="flex items-center gap-3">
                        <div className="h-1 flex-1 bg-primary"></div>
                        <span className="text-sm font-bold uppercase">
                          Sonraki Şirket
                        </span>
                        <div className="h-1 flex-1 bg-primary"></div>
                      </div>
                    )}
                  </>
                ))}
                {companies.length === 0 && (
                  <Card className="rounded-none p-3 text-sm">
                    Bağlantılı şirket kaydı bulunamadı.
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </ScreenContent>
    </Screen>
  );
});
