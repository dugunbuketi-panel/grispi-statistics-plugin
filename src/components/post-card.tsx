import { InfoCard } from "./info-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FC } from "react";

import { extractAndRemovePostTitle } from "@/lib/utils";
import { PostStat } from "@/types/bonvedi.type";

type PostCardProps = {
  post: PostStat;
};

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="rounded-none border-x-0">
      <CardHeader>
        <CardTitle>{post.postTitle}</CardTitle>
        <CardDescription>
          <a
            href={post.postUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-primary"
          >
            {extractAndRemovePostTitle(post.postUrl, post.postTitle)}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <InfoCard
            label="Başvuru"
            value={post.totalApplicationCount}
            variant="primary"
          />
          <InfoCard label="Anlaşıldı" value={post.confirmedApplicationCount} />
          <InfoCard label="Form" value={post.formApplicationCount} />
          <InfoCard label="WhatsApp" value={post.whatsappApplicationCount} />
          <InfoCard label="Telefon" value={post.phoneApplicationCount} />
          <InfoCard label="Ziyaretçi" value={post.visitorCount} />
        </div>
      </CardContent>
    </Card>
  );
};
