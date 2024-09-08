import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { holesky } from "viem/chains";
import { GLM_ABI } from "./contracts/glmAbi";
import { LOCK_ABI } from "./contracts/lockAbi";

export const PRIMARY_TYPE = "NewProject";

export const rainbowConfig = getDefaultConfig({
  appName: "Power Funding",
  projectId: "935e78ee89230eb8d1d73d98b48d0055",
  chains: [holesky],
  ssr: true,
});

export const GLM_CONTRACT = {
  address: "0x8888888815bf4DB87e57B609A50f938311EEd068",
  abi: GLM_ABI,
};

export const LOCK_CONTRACT = {
  address: "0x63704675f72A47a7a183112700Cb48d4B0A94332",
  abi: LOCK_ABI,
};

export const EXPLORER_BASE_URL = "https://holesky.etherscan.io";
