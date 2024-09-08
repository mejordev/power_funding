export type NewProjectData = {
  signer: string;
  projectName: string;
  imageUrl: string;
  goal: number;
  deadline: number;
  description: string;
  website: string;
};

export type Project = {
  address: string;
  name: string;
  description: string;
  goal: bigint;
  avatar_url?: string;
  website_url?: string;
  valid_to_timestamp: bigint;
  created_at?: Date;
  edited_at?: Date;
  percentage: number;
};

export type Donation = {
  transaction_hash: string;
  project_address: string;
  added_at: Date;
  edited_at: Date;
  amount: string;
  flat_fee_amount: string;
  valid_to_timestamp: bigint;
  sender_address: string;
  nonce: bigint;
  id: string;
};

export type TypedData = {
  domain: {
    name: string;
    version: string;
  };
  types: {
    NewProject: {
      name: string;
      type: string;
    }[];
  };
  message: {
    signer: string;
    projectName: string;
    imageUrl: string;
    goal: number;
    deadline: number;
    description: string;
    website: string;
  };
  primaryType: string;
};
