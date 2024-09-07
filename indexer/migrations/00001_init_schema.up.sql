CREATE TABLE "project" (
  "address" varchar(42) PRIMARY KEY,
  "name" varchar(42) NOT NULL,
  "description" varchar(256) NOT NULL DEFAULT '',
  "goal" bigint NOT NULL DEFAULT 1,
  "avatar_url" varchar(128),
  "website_url" varchar(128),
  "valid_to_timestamp" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "edited_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "donation" (
  "transaction_hash" varchar(66) PRIMARY KEY,
  "project_address" varchar(42) NOT NULL,
  "added_at" timestamptz NOT NULL DEFAULT 'now()',
  "edited_at" timestamptz NOT NULL DEFAULT 'now()',
  "amount" varchar(64) NOT NULL,
  "flat_fee_amount" varchar(64) NOT NULL,
  "valid_to_timestamp" bigint NOT NULL,
  "sender_address" varchar(42) NOT NULL,
  "nonce" bigint NOT NULL,
  "id" varchar(128) NOT NULL
);

CREATE INDEX ON "donation" ("project_address");
CREATE INDEX ON "donation" ("sender_address");