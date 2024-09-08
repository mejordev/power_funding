import { PRIMARY_TYPE } from "@/constants";
import { NewProjectData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createTypedProjectData = async (projectData: NewProjectData) => {
  try {
    const domain = {
      name: "PowerFunding",
      version: "1",
    };

    const types = {
      NewProject: [
        { name: "signer", type: "string" },
        { name: "projectName", type: "string" },
        { name: "imageUrl", type: "string" },
        { name: "goal", type: "uint256" },
        { name: "deadline", type: "string" },
        { name: "description", type: "string" },
        { name: "website", type: "string" },
      ],
    };

    const message = {
      signer: projectData.signer,
      projectName: projectData.projectName,
      imageUrl: projectData.imageUrl,
      goal: projectData.goal,
      deadline: projectData.deadline,
      description: projectData.description,
      website: projectData.website,
    };

    const payload = {
      domain,
      types,
      message,
      primaryType: PRIMARY_TYPE,
    };
    return payload;
  } catch (error) {
    console.error("Error signing typed data:", error);
  }
};

export const shortenAddress = (address: string, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
