"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import { GolemLogo } from "./golem-logo";
import { AddProjectModal } from "./modals/add-project-modal";
import { Button } from "./ui/button";

interface TopbarProps {}

export const Topbar = (props: TopbarProps) => {
  const {} = props;

  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  return (
    <div className="flex justify-between items-center py-4">
      <AddProjectModal
        isOpen={showCreateProjectModal}
        close={() => setShowCreateProjectModal(false)}
      />
      <div>
        <div className="flex gap-4 items-center">
          <GolemLogo />
          <Link href="/">
            <p className="text-2xl font-extrabold">Power Funding</p>
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          onClick={() => setShowCreateProjectModal(true)}
        >
          Add project
        </Button>
        <Link href="/my-profile">
          <Button variant="outline">My profile</Button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};
