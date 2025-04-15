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
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

// Define form validation schema
const formSchema = z.object({
    invitation_code: z.string()
        .min(1, "Invitation code is required"),
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username cannot exceed 50 characters"),
    email: z.string()
        .email("Please enter a valid email address"),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage: FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [verifyingInvitation, setVerifyingInvitation] = useState(false);
    const [invitationValid, setInvitationValid] = useState(false);

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invitation_code: "",
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Verify invitation code when it changes
    // 正确的验证函数实现
    const verifyInvitationCode = async (code: string) => {
        if (!code || code.length < 3) return;

        setVerifyingInvitation(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://intelligence-spend.onrender.com";
        const url = `${baseUrl}/api/v1/invitations/${code}/validate`;
        console.log("验证URL:", url);

        try {
            console.log("开始验证邀请码:", code);
            const response = await axios.get(url);
            console.log("验证响应:", response.data);

            if (response.data.valid) {
                console.log("邀请码有效");
                setInvitationValid(true);
            } else {
                console.log("邀请码无效");
                setInvitationValid(false);
                form.setError("invitation_code", {
                    message: "Invalid invitation code"
                });
            }
        } catch (err) {
            console.error("Error verifying invitation code:", err);

            // 记录详细错误信息
            if (axios.isAxiosError(err)) {
                console.error("状态码:", err.response?.status);
                console.error("错误响应:", err.response?.data);
            }

            setInvitationValid(false);
            form.setError("invitation_code", {
                message: "Could not verify invitation code"
            });
        } finally {
            setVerifyingInvitation(false);
        }
    };

    // Submit form
    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Submit registration data to backend
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            await axios.post(
                `${baseUrl}/api/v1/register`,
                {
                    invitation_code: values.invitation_code,
                    username: values.username,
                    email: values.email,
                    first_name: values.first_name || "",
                    last_name: values.last_name || "",
                    bio: "",
                    avatar_url: "",
                    is_active: true,
                    is_superuser: false,
                    is_verified: false,
                    password: values.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Show success message
            setSuccess("Registration successful! You can now log in.");

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err: unknown) {
            console.error("Registration error:", err);
            if (axios.isAxiosError(err)) {
                // Handle detailed error information
                const errorDetail = err.response?.data?.detail ||
                    err.response?.data?.message ||
                    "Registration failed. Please try again.";

                // Try to extract validation errors if available
                if (err.response?.status === 422 && err.response?.data?.detail) {
                    try {
                        const fieldErrors = err.response.data.detail;
                        if (Array.isArray(fieldErrors)) {
                            const errorMessages = fieldErrors.map(e => `${e.loc[1]}: ${e.msg}`).join(', ');
                            setError(errorMessages);
                        } else {
                            setError(errorDetail);
                        }
                    } catch (error) {
                        console.error("Error parsing validation errors:", error);
                        setError(errorDetail);
                    }
                } else if (err.response?.status === 400 && err.response?.data?.detail === "Invalid invitation code") {
                    setError("Invalid or expired invitation code.");
                    form.setError("invitation_code", {
                        message: "Invalid or expired invitation code"
                    });
                } else {
                    setError(errorDetail);
                }
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[550px] shadow-lg">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information and invitation code to register
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-6 bg-green-100 border-green-400 text-green-800">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="invitation_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invitation Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your invitation code"
                                                {...field}
                                                disabled={isLoading}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (e.target.value.length >= 6) {
                                                        verifyInvitationCode(e.target.value);
                                                    }
                                                }}
                                                className={invitationValid ? "border-green-500" : ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {verifyingInvitation ? "Verifying code..." :
                                                invitationValid ? "Valid invitation code" :
                                                    "Please enter the invitation code you received"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter username"
                                                {...field}
                                                disabled={isLoading}
                                                autoComplete="username"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter email"
                                                {...field}
                                                disabled={isLoading}
                                                type="email"
                                                autoComplete="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="First name (optional)"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Last name (optional)"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                                                autoComplete="new-password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm your password"
                                                {...field}
                                                disabled={isLoading}
                                                autoComplete="new-password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Registering...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-center py-6">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary font-medium underline underline-offset-2"
                        >
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;