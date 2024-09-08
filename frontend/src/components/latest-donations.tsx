import { EXPLORER_BASE_URL } from "@/constants";
import { shortenAddress } from "@/lib/utils";
import { Donation } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { formatEther } from "viem";
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
import { sortBy } from "lodash";

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

  const sortedData = sortBy(data, "added_at").reverse();

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
            {sortedData?.map((donation) => (
              <TableRow
                key={donation.transaction_hash}
                className="hover:bg-primary hover:text-white"
              >
                <TableCell>
                  {moment(donation.added_at).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
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
