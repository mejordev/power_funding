import { GLM_CONTRACT, LOCK_CONTRACT, rainbowConfig } from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
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
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  amount: z.number().positive(),
  deadline: z.date(),
});

type DepositParams = {
  address: string;
  budget: number;
  fee: number;
  expirationSec: bigint;
};

interface DonateModalProps {
  isOpen: boolean;
  close: () => void;
}

export const DonateModal = (props: DonateModalProps) => {
  const { isOpen, close } = props;
  const queryClient = useQueryClient();

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

    await writeContract(rainbowConfig, {
      address: LOCK_CONTRACT.address as `0x${string}`,
      abi: LOCK_CONTRACT.abi,
      functionName: "createDeposit",
      args,
    });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

    queryClient.refetchQueries({ queryKey: ["latest-donations"] });

    close();
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
