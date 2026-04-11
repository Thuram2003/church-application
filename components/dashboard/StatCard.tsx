import { Plus } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  count?: number;
  onAdd?: () => void;
}

export function StatCard({ icon: Icon, label, value, count, onAdd }: StatCardProps) {
  return (
    <Card className="p-4 flex items-center justify-between hover:shadow-md transition-all border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-lighter border border-primary-light rounded-sm flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">
            {count !== undefined ? count : value || ""}
          </p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
      {onAdd && (
        <Button 
          onClick={onAdd}
          variant="ghost"
          size="icon-sm"
          className="text-gray-400 hover:text-primary hover:bg-primary-lighter"
        >
          <Plus className="w-5 h-5" />
        </Button>
      )}
    </Card>
  );
}
