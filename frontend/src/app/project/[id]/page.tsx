"use client";

import { DonateModal } from "@/components/modals/donate-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useState } from "react";
import { FiLink } from "react-icons/fi";

interface ProjectDetailsProps {
  params: {
    id: string;
  };
}

const ProjectDetails = (props: ProjectDetailsProps) => {
  const {
    params: { id },
  } = props;

  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <DonateModal
        isOpen={showDonateModal}
        close={() => setShowDonateModal(false)}
      />

      <Card className="overflow-hidden max-w-[600px] p-10 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA"
                className="rounded-full w-[50px] h-[50px]"
              />
            </Avatar>
            <p className="text-lg text-black font-bold">Project name {id}</p>
          </div>
          <Link
            href="https://www.google.com"
            target="_blank"
            className="flex gap-1 items-center text-blue-500 font-bold"
          >
            <FiLink />
            Website
          </Link>
        </div>

        <Separator />
        {/* <div className="flex justify-between items-center">
          <div className="grid items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">Raised</div>
              <div className="flex items-baseline gap-1 text-lg font-bold tabular-nums leading-none">
                50/200
                <span className="text-sm font-normal text-muted-foreground">
                  GLM
                </span>
              </div>
            </div>
            <ProgressChart />
          </div>
          <div className="grid items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">Donors</div>
              <div className="flex items-baseline gap-1 text-lg font-bold tabular-nums leading-none justify-end">
                300
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex justify-between flex-1 auto-rows-min gap-0.5">
          <div className="flex flex-col gap-1 ites-center">
            <div className="text-sm text-muted-foreground">Raised</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              50/200
              <span className="text-sm font-normal text-muted-foreground">
                GLM
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-sm text-muted-foreground">Donors</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              200
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-1">
          <Progress value={33} />
          <p className="text-center text-sm">31%</p>
        </div>
        <Separator />

        <p>
          Lipsum dolor sit amet, consectetur adipiscing elit Lipsum dolor sit
          amet, consectetur adipiscing elit Lipsum dolor sit amet, consectetur
          amet, consectetur adipiscing elit Lipsum dolor sit amet, consectetur
          adipiscing elit Lipsum dolor sit amet, consectetur adipiscing elit...
        </p>

        <div className="flex pt-5">
          <Button
            className="ml-auto mr-0 w-full"
            onClick={() => setShowDonateModal(true)}
            size="lg"
          >
            Donate
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetails;
