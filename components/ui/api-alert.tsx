import { Copy, Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "./use-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin',
};


const textMap: Record<ApiAlertProps["variant"], string> = {
  public: 'Public',
  admin: 'Admin'
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: 'secondary',
  admin: 'destructive'
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public"
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast({
        title: "Copied to clipboard",
        description: "The API URL has been copied to your clipboard.",
       
    })
  }

  return ( 
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center gap-5">
        <code className="text-ellipsis overflow-hidden relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm  font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
   );
};