import { Terminal, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardProps {
  title: string;
  href?: string;
  icon?: LucideIcon | string;
  color?: string;
  children?: React.ReactNode;
}

export const Card = ({ 
  title, 
  href, 
  icon, 
  color = "primary", 
  children 
}: CardProps) => {
  const IconComponent = typeof icon === 'string' ? () => <span>{icon}</span> : (icon || Terminal);
  
  const CardContent = (
    <div className={`border w-full px-6 py-4 flex flex-col gap-4 items-start bg-card text-card-foreground hover:shadow-md transition-shadow`}>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button
          size="icon"
          variant="outline"
          className={`bg-${color} text-background hover:bg-${color} hover:text-background cursor-default bg-opacity-50 border-${color}`}
        >
          <IconComponent className="w-[1.2rem] h-[1.2rem]" />
        </Button>
        <h4 className="font-semibold tracking-wide m-0 text-lg">
          {title}
        </h4>
      </div>
      {children && (
        <div className="text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline hover:no-underline">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};