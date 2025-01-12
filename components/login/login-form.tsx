"use client";
import { useAuthStore } from "@/utils/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { getAuth, handleLogin } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import useUserFirebaseStore from "@/stores/user-firebase-store";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const { login, updateProfile } = useAuthStore((store) => store);
  const { setUser } = useUserFirebaseStore((store) => store);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      isRemember: false,
    },
  });
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      try {
        const response = await handleLogin(data);

        if (!response) {
          throw new Error("Login response is undefined");
        }
        const authResponse = await getAuth(response.payload.res.token);
        if (
          authResponse?.payload.role !== "ADMIN" &&
          authResponse?.status === 200
        ) {
          const res = await signInWithEmailAndPassword(
            auth,
            authResponse?.payload.email,
            authResponse?.payload.password
          );

          setUser({
            id: res.user.uid,
            email: authResponse?.payload.email,
            avatar: authResponse?.payload.avatar,
          });
        }
        if (response) {
          login(response.payload.res.token);
          updateProfile(authResponse?.payload);
        }
        router.push("/program");
        toast.success("Login Successfuly!", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } catch (error) {
        toast.error("Login Failed!", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        console.log(error);
      }
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="E-mail"
                      className="bg-transparent hover:ring-1 hover:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="bg-transparent hover:ring-1 hover:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="isRemember"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="checkbox"
                          className="bg-transparent"
                          id="isRemember"
                          value={field.value ? "true" : "false"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <label
                  htmlFor="isRemember"
                  className="text-sm ml-1 cursor-pointer"
                >
                  Keep me signed in
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            variant="destructive"
            size="default"
            disabled={isPending}
          >
            Log in
          </Button>
          <div className="">
            <div className="flex items-center justify-center space-x-1">
              <div className="h-[1px] w-full bg-[#e0e0e0]"></div>
              <span className="text-sm">or</span>
              <div className="h-[1px] w-full bg-[#e0e0e0]"></div>
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="default"
            className="text-sm font-medium"
            disabled={isPending}
            onClick={() => signIn("google")}
          >
            <Image
              src="/google-c.svg"
              alt="Google"
              width={24}
              height={24}
              className="mr-2"
            />
            Log in with Google
          </Button>
          ;
        </form>
      </Form>
    </>
  );
};
