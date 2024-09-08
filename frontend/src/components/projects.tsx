import { projects } from "@/mocks";
import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SingleProject } from "./single-project";
import { SelectSeparator } from "./ui/select";

interface ProjectsProps {}

export const Projects = (props: ProjectsProps) => {
  const {} = props;

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      axios.get<Project[]>("/api/projects").then((res) => res.data),
  });

  return (
    <div className="mx-auto space-y-10">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Trending</p>
        {data?.length && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SingleProject project={projects[0]} trending />
            <SingleProject project={projects[1]} trending />
            <SingleProject project={projects[2]} trending />
          </div>
        )}
      </div>
      <SelectSeparator />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects?.map((project) => (
            <SingleProject key={project.address} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
