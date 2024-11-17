import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const User = async () => {
  const session = await auth();
  const handleLogout = async () => {
    "use server";
    await signOut();
  };
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <Card>
      <CardHeader>User Profile</CardHeader>
      <CardContent>
        <h1>{session?.user?.name}</h1>
        <p>{session?.user?.email}</p>
        <Image
          src={session?.user?.image || ""}
          alt="user"
          width={100}
          height={100}
          className="object-cover rounded-full"
        />

        <form>
          {" "}
          <Button formAction={handleLogout} variant={"destructive"}>
            <LogOut className="mr-2" /> Logout
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default User;
