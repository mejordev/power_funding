import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface SingleProjectProps {
  project: Project;
  trending?: boolean;
}

export const SingleProject = (props: SingleProjectProps) => {
  const { project, trending = false } = props;

  return (
    <Link href={`/project/${project.address}`}>
      <Card
        className={cn(
          "overflow-hidden relative hover:translate-y-[-0.5rem] transition-transform duration-150 ease-linear shadow-md",
          trending && "border-blue-200 shadow-lg"
        )}
      >
        <CardHeader>
          <CardTitle className="flex flex-col gap-4">
            <div className="flex justify-between gap-1 items-center">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={project.avatar_url} />
                </Avatar>
                <p>{project.name}</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex  gap-1 items-center justify-end">
                  <div className="text-sm text-muted-foreground">Donors:</div>
                  <div className="flex gap-1 leading-none">200</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-sm text-muted-foreground">Raised:</div>
                  <div className="flex leading-none">50/200</div>
                  <p className="text-primary">GLM</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <Progress value={project.percentage} />
              <p className="text-center text-sm">{project.percentage}%</p>
            </div>
            <Separator />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{project.description.slice(0, trending ? 60 : 400)}...</p>
          <div className="flex justify-end mt-4">
            <Button>Details</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
