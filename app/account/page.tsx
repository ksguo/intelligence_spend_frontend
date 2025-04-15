"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Define the user type based on the API response
type UserProfile = {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    avatar_url: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
};

// Define form validation schema
const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AccountPage: FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            bio: "",
            avatar_url: "",
        },
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
                
                // Set form default values
                form.reset({
                    username: response.data.username,
                    email: response.data.email,
                    first_name: response.data.first_name || "",
                    last_name: response.data.last_name || "",
                    bio: response.data.bio || "",
                    avatar_url: response.data.avatar_url || "",
                });
                
                // Set avatar preview
                if (response.data.avatar_url) {
                    setAvatarPreview(response.data.avatar_url);
                }
            } catch (err: unknown) {
                console.error("Error fetching user data:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    // Unauthorized, redirect to login
                    localStorage.removeItem("token");
                    window.dispatchEvent(new Event("login-state-changed"));
                    router.push("/login");
                } else {
                    setError("Failed to load user profile");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router, form]);

    // Handle avatar file upload
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (e) => {
                if (e.target?.result) {
                    setAvatarPreview(e.target.result as string);
                    form.setValue("avatar_url", e.target.result as string);
                }
            };
            
            reader.readAsDataURL(file);
        }
    };

    // Submit form
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                router.push("/login");
                return;
            }

            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me`, // Endpoint to update current user
                {
                    username: values.username,
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    bio: values.bio,
                    avatar_url: values.avatar_url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess("Profile updated successfully!");
        } catch (err: unknown) {
            console.error("Error updating profile:", err);
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.dispatchEvent(new Event("login-state-changed"));
                    router.push("/login");
                } else {
                    const errorDetail = err.response?.data?.detail || 
                                    err.response?.data?.message || 
                                    "Failed to update profile";
                    setError(errorDetail);
                }
            } else {
                setError("Failed to update profile");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading state while fetching user data
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[550px] shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-full flex-1" />
                                <Skeleton className="h-10 w-full flex-1" />
                            </div>
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-28" />
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-10">
            <Card className="w-[550px] shadow-lg">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl">My Account</CardTitle>
                    <CardDescription>
                        View and update your profile information
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert className="mb-6 bg-green-100 border-green-400 text-green-800">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-2 border-primary">
                                <AvatarImage src={avatarPreview || ""} />
                                <AvatarFallback>
                                    <User className="h-12 w-12 text-gray-400" />
                                </AvatarFallback>
                            </Avatar>
                            <label 
                                htmlFor="avatar-upload" 
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                            >
                                <Upload size={16} />
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                disabled={isSubmitting}
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
                                                type="email"
                                                {...field} 
                                                disabled={isSubmitting}
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
                                                    {...field} 
                                                    disabled={isSubmitting}
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
                                                    {...field} 
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                {...field} 
                                                placeholder="Tell us about yourself"
                                                className="resize-none h-24"
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-between py-6">
                    <div className="text-sm text-muted-foreground">
                        {user && (
                            <>Member since {new Date(user.created_at).toLocaleDateString()}</>
                        )}
                    </div>
                    {user?.is_verified ? (
                        <span className="text-sm text-green-600 font-medium">Verified Account</span>
                    ) : (
                        <Button variant="outline" size="sm">Verify Account</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default AccountPage;