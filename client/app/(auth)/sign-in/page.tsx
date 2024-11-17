import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import React from "react";

const page = () => {
  const handleGoogleLogin = async () => {
    "use server";
    await signIn("google", { redirectTo: "/user" });
  };
  return (
    <form action={handleGoogleLogin} className="container flex flex-col justify-center items-center gap-2 p-4">
      <Card className="max-w-[500px] shadow-lg">
        <Button>
          <Mail className="mr-2" /> Sign In with Google
        </Button>
      </Card>
    </form>
  );
};

export default page;
