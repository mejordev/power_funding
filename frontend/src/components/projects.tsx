import { SingleProject } from "./single-project";

interface ProjectsProps {}

export const Projects = (props: ProjectsProps) => {
  const {} = props;
  return (
    <div className="mx-auto pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SingleProject key={i} />
        ))}
      </div>
    </div>
  );
};
