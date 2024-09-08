"use client";

import { LatestDonations } from "@/components/latest-donations";
import { DonateModal } from "@/components/modals/donate-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FiLink } from "react-icons/fi";

interface UserProps {
  params: {
    id: string;
  };
}

const User = (props: UserProps) => {
  const {
    params: { id },
  } = props;

  const [showDonateModal, setShowDonateModal] = useState(false);

  const { data: project } = useQuery({
    queryKey: ["project", `${id}`],
    queryFn: () =>
      axios
        .get<Project>("/api/project", { params: { address: id } })
        .then((res) => res.data),
  });

  if (!project) {
    return null;
  }

  return (
    <div className="flex items-center justify-center pb-10">
      <DonateModal
        isOpen={showDonateModal}
        close={() => setShowDonateModal(false)}
      />

      <div className="flex flex-col gap-8">
        <Card className="overflow-hidden w-[600px] p-10 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={project.avatar_url}
                  className="rounded-full w-[50px] h-[50px]"
                />
              </Avatar>
              <p className="text-lg text-black font-bold">{project.name}</p>
            </div>
            {project.website_url && (
              <Link
                href={project.website_url}
                target="_blank"
                className="flex gap-1 items-center text-primary font-bold"
              >
                <FiLink />
                Website
              </Link>
            )}
          </div>

          <Separator />

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

          <p>{project.description}</p>

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

        <LatestDonations />
      </div>
    </div>
  );
};

export default User;
