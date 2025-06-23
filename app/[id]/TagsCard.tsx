import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TagsCardProps {
  tags: string[];
}

const TagsCard = ({ tags }: TagsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">No tags</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsCard;
