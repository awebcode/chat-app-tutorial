import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
export default function Index() {
  return (
    <Card className="max-w-[450px] mx-auto mt-20 shadow-lg">
      <CardHeader>
        <CardTitle>Join a Room</CardTitle>
        <CardDescription>Enter your username and room ID to proceed.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={`/chat`}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="roomId">Room ID</Label>
              <Input id="roomId" name="roomId" placeholder="Enter the room ID" required />
            </div>
            <Input className="hidden" name="userId" defaultValue={randomUUID()} />

            <Input className="hidden" name="avatar" defaultValue={faker.image.avatar()} />
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">
              Join Room <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
