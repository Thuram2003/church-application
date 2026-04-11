import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

export function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
      size="sm"
      className="cursor-pointer"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}
