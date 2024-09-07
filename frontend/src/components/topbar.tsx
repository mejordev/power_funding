"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Button } from "./ui/button";
import { AddProjectModal } from "./modals/add-project-modal";
import { useState } from "react";

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
        <Link href="/">
          <p className="text-xl text-blue-500 font-bold">Power Funding</p>
        </Link>
        {/* <p>by </p>
        <Image
          src="https://cdn.prod.website-files.com/62446d07873fde065cbcb8d5/62446d07873fde3688bcb8f6_Golem_Logo_Negative_RGB.svg"
          width={100}
          height={100}
          alt="Golem"
          className="invert"
        /> */}
      </div>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          onClick={() => setShowCreateProjectModal(true)}
        >
          Add project
        </Button>
        <Link href="/my-projects">
          <Button variant="outline">My projects</Button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
};
