import { PRIMARY_TYPE } from "@/constants";
import { cn, createTypedProjectData } from "@/lib/utils";
import { Project, TypedData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useSignTypedData } from "wagmi";
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
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  projectName: z.string(),
  imageUrl: z.string().max(128),
  goal: z.number(),
  deadline: z.date(),
  description: z.string(),
  website: z.string(),
});

interface AddProjectModalProps {
  isOpen: boolean;
  close: () => void;
}

export const AddProjectModal = (props: AddProjectModalProps) => {
  const { isOpen, close } = props;

  const queryClient = useQueryClient();

  const { address } = useAccount();

  const { signTypedDataAsync } = useSignTypedData();

  const router = useRouter();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["add-project"],
    mutationFn: ({
      payload,
      signature,
    }: {
      payload: TypedData;
      signature: string;
    }) =>
      axios
        .post("/api/project", { payload, signature })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.refetchQueries({ queryKey: ["projects"] });

      close();

      router.replace(`/project/${address}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      imageUrl: "",
      goal: 0,
      deadline: new Date(),
      description: "",
      website: "",
    },
  });

  const onAdd = async (values: z.infer<typeof formSchema>) => {
    const projectData: Omit<Project, "percentage"> = {
      address: address as `0x${string}`,
      name: values.projectName,
      avatar_url: values.imageUrl,
      goal: BigInt(values.goal),
      valid_to_timestamp: BigInt(values.deadline.getTime()),
      description: values.description,
      website_url: values.website,
    };

    const payload: TypedData | undefined = await createTypedProjectData({
      signer: address! as string,
      projectName: projectData.name,
      imageUrl: projectData.avatar_url ?? "",
      goal: Number(projectData.goal),
      deadline: values.deadline.getTime(),
      description: values.description,
      website: values.website,
    });

    const signature = await signTypedDataAsync({
      domain: payload!.domain,
      types: payload!.types,
      message: payload!.message,
      primaryType: PRIMARY_TYPE,
    });

    if (payload && address) {
      mutate({ payload, signature });
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent onInteractOutside={close}>
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAdd)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image url</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal</FormLabel>
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="shadcn" {...field} rows={6} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
