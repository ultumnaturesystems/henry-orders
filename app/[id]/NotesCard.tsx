import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotesCardProps {
  notes: string;
}

const NotesCard = ({ notes }: NotesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <span>{notes || "—"}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesCard;
