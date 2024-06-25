import { InfoCard } from "./info-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FC } from "react";

import { formatMinutes } from "@/lib/utils";
import { CompanyStat } from "@/types/bonvedi.type";

type CompanyCardProps = {
  company: CompanyStat;
};

export const CompanyCard: FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="rounded-none border-x-0">
      <CardHeader>
        <CardTitle>{company.companyName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <InfoCard
            label="Yeni"
            value={company.newApplicationCount}
            variant="primary"
          />
          <InfoCard
            label="Anlaşıldı"
            value={company.confirmedApplicationCount}
          />
          <InfoCard label="Başvuru" value={company.totalApplicationCount} />
          <InfoCard label="WhatsApp" value={company.whatsappApplicationCount} />
          <InfoCard label="Telefon" value={company.phoneApplicationCount} />
          <InfoCard label="Form" value={company.formApplicationCount} />
        </div>
        <div className="flex items-center gap-2">
          <InfoCard label="Ziyaretçi" value={company.visitorCount} />
          <InfoCard
            label="Okuma Hızı"
            value={formatMinutes(company.averageReadTime)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
