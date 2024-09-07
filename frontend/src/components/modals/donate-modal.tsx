import { GLM_CONTRACT, LOCK_CONTRACT, rainbowConfig } from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect } from "react";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";

const formSchema = z.object({
  amount: z.number().positive(),
  deadline: z.date(),
});

type DepositParams = {
  address: string;
  budget: number;
  fee: number;
  expirationSec: BigInt;
};

interface DonateModalProps {
  isOpen: boolean;
  close: () => void;
}

export const DonateModal = (props: DonateModalProps) => {
  const { isOpen, close } = props;

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });

  const { address: walletAddress, chain } = useAccount();

  // useEffect(() => {
  //   if (isConfirmed) {
  //     createDeposit({
  //       address: "0x2B898dE2b742922d891559b2C287f09978bB740c",
  //       budget: form.getValues("amount"),
  //       fee: 0.1,
  //       expirationSec: BigInt(form.getValues("deadline").getDate()),
  //     });
  //   }
  // }, [isConfirmed]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      deadline: undefined,
    },
  });

  const createAllowance = async ({
    budget,
    fee,
  }: {
    budget: number;
    fee: number;
  }) => {
    const amountWei = parseEther(`${budget}`);
    const flatFeeAmountWei = parseEther(`${fee}`);
    const allowanceBudget = amountWei + flatFeeAmountWei;

    const response = await writeContract(rainbowConfig, {
      address: GLM_CONTRACT.address as `0x${string}`,
      abi: GLM_CONTRACT.abi,
      functionName: "increaseAllowance",
      args: [LOCK_CONTRACT.address, allowanceBudget],
    });

    return response;
  };

  async function createDeposit({
    address,
    budget,
    fee,
    expirationSec,
  }: DepositParams) {
    const nonce = Math.floor(Math.random() * 1000000);
    const validToTimestamp = expirationSec.toString();
    const args = [
      BigInt(nonce),
      address,
      parseEther(`${budget}`),
      parseEther(`${fee}`),
      BigInt(validToTimestamp),
    ];

    const res = await writeContract(rainbowConfig, {
      address: LOCK_CONTRACT.address as `0x${string}`,
      abi: LOCK_CONTRACT.abi,
      functionName: "createDeposit",
      args,
    });

    // const depositId = await getDepositID();
    // const depositDetails = await getDepositDetails();
    // return {
    //   id: "0x" + depositId.toString(16),
    //   amount: depositDetails.amount,
    //   contract: config.lockPaymentContract.holeskyAddress,
    // };
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const hash = await createAllowance({ budget: values.amount, fee: 0.1 });

    await waitForTransactionReceipt(rainbowConfig, {
      hash,
    });

    await createDeposit({
      address: "0x2B898dE2b742922d891559b2C287f09978bB740c",
      budget: form.getValues("amount"),
      fee: 0.1,
      expirationSec: BigInt(form.getValues("deadline").getDate()),
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent onInteractOutside={close}>
        <DialogHeader>
          <DialogTitle>Donate</DialogTitle>
          <DialogDescription className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input
                            placeholder="200"
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                          <Button variant="ghost" disabled>
                            GLM
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">Donate</Button>
                </div>
              </form>
            </Form>
            {/* {isConfirming && <div>Waiting for confirmation... </div>}
            {isConfirmed && <div>Transaction confirmed: </div>} */}
            {/* {hash && (
              <Button variant="link">
                <Link
                  target="_blank"
                  href={`${chain!.blockExplorers?.default.url}/tx/${hash}`}
                >
                  Check tx block explorer
                </Link>
              </Button>
            )}
            {error && (
              <div>
                Error: {(error as BaseError).shortMessage || error.message}
              </div>
            )} */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
