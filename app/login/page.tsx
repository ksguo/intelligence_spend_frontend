"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Define form validation schema
const formSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm: FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Submit form
    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            // Build form data (backend might require x-www-form-urlencoded format)
            const formData = new URLSearchParams();
            formData.append("username", values.username);
            formData.append("password", values.password);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/token`,
                formData.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // 在 try 块内，成功登录后添加:

            // 保存token和用户信息
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            //localStorage.setItem("username", values.username);

            // 触发登录状态变化事件
            window.dispatchEvent(new Event("login-state-changed"));

            // 然后重定向
            router.push("/");
            router.refresh();
        } catch (err: Error | unknown) {
            console.error("Login error:", err);
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.detail ||
                    "Login failed, please check your username and password"
                );
            } else {
                setError("Login failed, please check your username and password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Card className="w-[350px] shadow-lg">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-xl">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the system
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter username" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Log in"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-center py-6">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary underline underline-offset-2"
                        >
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignInForm;