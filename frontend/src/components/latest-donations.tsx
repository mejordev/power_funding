import { Donation } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import moment from "moment";
import { shortenAddress } from "@/lib/utils";
import Link from "next/link";
import { EXPLORER_BASE_URL } from "@/constants";
import { formatEther, parseEther } from "viem";

interface LatestDonationsProps {
  address?: string;
}

export const LatestDonations = (props: LatestDonationsProps) => {
  const {} = props;

  const { data } = useQuery({
    queryKey: ["latest-donations"],
    queryFn: () =>
      axios.get<Donation[]>("/api/donations").then((res) => res.data),
  });

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Recent donations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((donation) => (
              <TableRow
                key={donation.transaction_hash}
                className="hover:bg-primary hover:text-white"
              >
                <TableCell>{moment(donation.added_at).fromNow()}</TableCell>
                <TableCell>
                  <Link
                    href={`${EXPLORER_BASE_URL}/address/${donation.transaction_hash}`}
                    target="_blank"
                  >
                    {shortenAddress(donation.transaction_hash)}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={`${EXPLORER_BASE_URL}/address/${donation.project_address}`}
                    target="_blank"
                  >
                    {shortenAddress(donation.project_address)}
                  </Link>
                </TableCell>

                <TableCell className="text-center">
                  {formatEther(BigInt(donation.amount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

{
  /* <div className="grid grid-cols-4 px-4 py-2 text-sm">
<p>Created at</p>
<p>Hash</p>
<p>User</p>
<p>Amount</p>
</div>
<div className="flex flex-col h-[500px] overflow-y-auto">
<div className="grid grid-cols-4 gap-2 px-4">
  {data?.map((donation) => (
    <Fragment key={donation.transaction_hash}>
      <p>{moment(donation.added_at).fromNow()}</p>
      <Link
        href={`${EXPLORER_BASE_URL}/tx/${donation.transaction_hash}`}
        className="text-primary"
        target="_blank"
      >
        {shortenAddress(donation.transaction_hash)}
      </Link>

      <Link
        href={`${EXPLORER_BASE_URL}/address/${donation.project_address}`}
        className="text-primary"
        target="_blank"
      >
        {shortenAddress(donation.project_address)}
      </Link>
      <p>{formatEther(BigInt(donation.amount))} GLM</p>
    </Fragment>
  ))}
</div>
</div> */
}
