"use client";

import { LatestDonations } from "@/components/latest-donations";
import { SingleProject } from "@/components/single-project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/mocks";
import { FaStar, FaStarHalf } from "react-icons/fa6";

interface MyProfileProps {}

const MyProfile = (props: MyProfileProps) => {
  const {} = props;
  return (
    <div className="space-y-14">
      <div className="flex gap-4 justify-between">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">213</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Donations volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.130</div>
            <p className="text-xs text-muted-foreground">
              +20.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected GLM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3214</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-1 items-center">
              <FaStar className="text-yellow-400" />{" "}
              <FaStar className="text-yellow-400" />{" "}
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStarHalf className="text-yellow-400" />
              <p className="text-md">4.5/5</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <p className="text-2xl font-bold">My donations</p>
        <div>
          <LatestDonations />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-2xl font-bold">My projects</p>
        <div className="grid grid-cols-2 gap-4">
          {projects.slice(0, 2)?.map((project) => (
            <SingleProject key={project.address} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
