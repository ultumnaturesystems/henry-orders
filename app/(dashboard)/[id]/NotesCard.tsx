import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotesCardProps {
  notes: string;
}

const NotesCard = ({ notes }: NotesCardProps) => {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <span className={!notes ? "text-muted-foreground italic" : undefined}>
            {notes || "No notes from customer"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesCard;
