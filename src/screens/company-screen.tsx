import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { getStats } from "@/api";
import { CompanyCard } from "@/components/company-card";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { PostCard } from "@/components/post-card";
import { Card } from "@/components/ui/card";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useGrispi } from "@/contexts/grispi-context";
import { CompanyStat, PostStat } from "@/types/bonvedi.type";

export const CompanyScreen = observer(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompanyStat[]>([]);
  const [posts, setPosts] = useState<PostStat[]>([]);
  const { ticket, bundle } = useGrispi();

  useEffect(() => {
    if (!bundle?.settings?.access_token) return;
    if (typeof ticket?.fieldMap["ts.subject"]?.value !== "string") return;

    const handleGetStats = async () => {
      try {
        setLoading(true);

        const { companies, posts } = await getStats(
          { searchTerm: ticket.fieldMap["ts.subject"]?.value },
          { Authorization: `Bearer ${bundle.settings.access_token}` }
        );

        setCompanies(companies ?? []);
        setPosts(posts ?? []);
      } catch (err) {
        console.error({ err });
      }

      setLoading(false);
    };

    handleGetStats();
  }, [ticket, bundle]);

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>İstatistikler</ScreenTitle>
      </ScreenHeader>
      <ScreenContent className="mb-14">
        {loading ? (
          <LoadingWrapper />
        ) : (
          <div className="space-y-6 py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h3 className="font-medium">İlgili Şirketler</h3>
                <span className="text-xs text-muted-foreground">
                  Son 1 yılın istatistikleri
                </span>
              </div>
              <div className="space-y-3">
                {companies.map((company) => (
                  <CompanyCard key={company.companyId} company={company} />
                ))}
                {companies.length === 0 && (
                  <Card className="rounded-none p-3 text-sm">
                    Bağlantılı şirket kaydı bulunamadı.
                  </Card>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h3 className="font-medium">İlgili İlanlar</h3>
                <span className="text-xs text-muted-foreground">
                  Son 1 yılın istatistikleri
                </span>
              </div>
              <div className="space-y-3">
                {posts.map((post) => (
                  <PostCard key={post.internalId} post={post} />
                ))}
                {posts.length === 0 && (
                  <Card className="rounded-none p-3 text-sm">
                    Bağlantılı ilan kaydı bulunamadı.
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
