import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SummaryCardProps {
  title: string;
  emptyIcon: React.ElementType;
  emptyText: string;
  hasData?: boolean;
  onSeeAll?: () => void;
  children?: React.ReactNode;
}

export function SummaryCard({
  title,
  emptyIcon: Icon,
  emptyText,
  hasData = false,
  onSeeAll,
  children,
}: SummaryCardProps) {
  return (
    <Card className="border-gray-100 bg-white">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {hasData && onSeeAll && (
            <Button 
              onClick={onSeeAll}
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
            >
              See all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        {hasData && children ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">{emptyText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
