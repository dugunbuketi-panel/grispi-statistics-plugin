import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { getStats } from "@/api";
import { InfoCard } from "@/components/info-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useGrispi } from "@/contexts/grispi-context";
import { extractAndRemovePostTitle, formatMinutes } from "@/lib/utils";
import { CompanyStat, PostStat } from "@/types/bonvedi.type";

export const CompanyScreen = observer(() => {
  const [companies, setCompanies] = useState<CompanyStat[]>([]);
  const [posts, setPosts] = useState<PostStat[]>([]);
  const { ticket, settings } = useGrispi();

  useEffect(() => {
    if (!settings?.access_token) return;
    if (typeof ticket?.fieldMap["ts.subject"]?.value !== "string") return;

    getStats(
      { searchTerm: ticket.fieldMap["ts.subject"]?.value },
      { Authorization: `Bearer ${settings.access_token}` }
    )
      .then(({ posts, companies }) => {
        setCompanies(companies);
        setPosts(posts);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, [ticket, settings]);

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>İstatistikler</ScreenTitle>
      </ScreenHeader>
      <ScreenContent className="mb-14">
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
                <Card className="rounded-none border-x-0">
                  <CardHeader>
                    <CardTitle>{company.companyName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <InfoCard
                        label="Okunmamış"
                        value={company.newApplicationCount}
                        variant="primary"
                      />
                      <InfoCard
                        label="Anlaşılmış"
                        value={company.confirmedApplicationCount}
                      />
                      <InfoCard
                        label="Form"
                        value={company.formApplicationCount}
                      />
                      <InfoCard
                        label="WhatsApp"
                        value={company.whatsappApplicationCount}
                      />
                      <InfoCard
                        label="Telefon"
                        value={company.phoneApplicationCount}
                      />
                      <InfoCard
                        label="Toplam"
                        value={company.totalApplicationCount}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <InfoCard
                        label="Ziyaretçi"
                        value={company.visitorCount}
                      />
                      <InfoCard
                        label="Okuma Hızı"
                        value={formatMinutes(company.averageReadTime)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <Card className="rounded-none border-x-0">
                  <CardHeader>
                    <CardTitle>{post.postTitle}</CardTitle>
                    <CardDescription>
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="nofollow noopener"
                        className="text-primary"
                      >
                        {extractAndRemovePostTitle(
                          post.postUrl,
                          post.postTitle
                        )}
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <InfoCard
                        label="Toplam"
                        value={post.totalApplicationCount}
                        variant="primary"
                      />
                      <InfoCard
                        label="Anlaşılmış"
                        value={post.confirmedApplicationCount}
                      />
                      <InfoCard
                        label="Form"
                        value={post.formApplicationCount}
                      />
                      <InfoCard
                        label="WhatsApp"
                        value={post.whatsappApplicationCount}
                      />
                      <InfoCard
                        label="Telefon"
                        value={post.phoneApplicationCount}
                      />
                      <InfoCard label="Ziyaretçi" value={post.visitorCount} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScreenContent>
    </Screen>
  );
});
