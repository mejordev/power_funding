import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SingleProjectProps {}

export const SingleProject = (props: SingleProjectProps) => {
  const {} = props;

  return (
    <Link href="/project/1">
      <Card className="overflow-hidden relative hover:translate-y-[-0.5rem] transition-transform duration-150 ease-linear">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4">
            <div className="flex justify-between gap-1 items-center">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA" />
                </Avatar>
                <p>Project name</p>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex  gap-1 items-center justify-end">
                  <div className="text-sm text-muted-foreground">Donors:</div>
                  <div className="flex gap-1 leading-none">200</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-sm text-muted-foreground">Raised:</div>
                  <div className="flex leading-none">50/200</div>
                  <p className="text-blue-500">GLM</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <Progress value={33} />
              <p className="text-center text-sm">31%</p>
            </div>
            <Separator />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lipsum dolor sit amet, consectetur adipiscing elit Lipsum dolor sit
            amet, consectetur adipiscing elit Lipsum dolor sit amet, consectetur
            amet, consectetur adipiscing elit Lipsum dolor sit amet, consectetur
            adipiscing elit Lipsum dolor sit amet, consectetur adipiscing
            elit...
          </p>
          <div className="flex justify-end mt-4">
            <Button>Details</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
