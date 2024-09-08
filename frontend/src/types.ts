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
  address: string; // varchar(42), primary key
  name: string; // varchar(42), not null
  description: string; // varchar(256), not null, default ''
  goal: bigint; // bigint, not null, default 1
  avatar_url?: string; // varchar(128), nullable
  website_url?: string; // varchar(128), nullable
  valid_to_timestamp: bigint; // bigint, not null
  created_at?: Date; // timestamptz, not null, default now()
  edited_at?: Date; // timestamptz, not null, default now()
  percentage: number;
};

export type Donation = {
  transaction_hash: string; // varchar(66), primary key
  project_address: string; // varchar(42), not null (foreign key to Project)
  added_at: Date; // timestamptz, not null, default now()
  edited_at: Date; // timestamptz, not null, default now()
  amount: string; // varchar(64), not null
  flat_fee_amount: string; // varchar(64), not null
  valid_to_timestamp: bigint; // bigint, not null
  sender_address: string; // varchar(42), not null
  nonce: bigint; // bigint, not null
  id: string; // varchar(128), not null
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
