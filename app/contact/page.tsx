"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Github,  Linkedin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    });

    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);

        // Logic to send form data
        console.log("Form data:", values);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setSubmitted(true);
        form.reset();
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                We &apos;d love to hear from you. Whether you have a question, feedback, or a partnership opportunity,
                feel free to reach out. Our team will get back to you as soon as possible.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left side: Contact Form */}
                <Card className="shadow-lg border border-gray-200">
                    <CardHeader className="bg-slate-50">
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>Fill out the form below to get in touch with us</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {submitted ? (
                            <Alert className="bg-green-50 border-green-200 text-green-800">
                                <AlertDescription>
                                    Thank you for your message! We&apos;ll contact you shortly.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your name" {...field} className="focus:border-blue-400" />
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
                                                    <Input placeholder="your.email@example.com" {...field} className="focus:border-blue-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Message subject" {...field} className="focus:border-blue-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Please describe your question or feedback..."
                                                        className="min-h-[120px] focus:border-blue-400"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>

                {/* Right side: Contact Information */}
                <div className="space-y-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                <Mail className="h-5 w-5" /> Email
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-muted-foreground">
                                <a href="mailto:contact@intelligence-spend.com" className="hover:text-blue-500 hover:underline transition-colors">
                                    contact@intelligence-spend.com
                                </a>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                <Phone className="h-5 w-5" /> Phone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-muted-foreground">+49 15223127041</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                <MapPin className="h-5 w-5" /> Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-muted-foreground">
                                Luxemburgerstr 124-136<br />
                                Cologne,50939<br />
                                Germany
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="text-blue-600">Follow Us</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex gap-6 justify-center">
                                <a href="https://github.com/ksguo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <Github className="h-7 w-7" />
                                </a>
                                <a href="https://www.linkedin.com/in/kesheng-guo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <Linkedin className="h-7 w-7" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-16 text-center bg-slate-50 py-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-2 text-blue-600">Business Hours</h3>
                <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                    We strive to respond to all inquiries within 24 hours during business days.
                </p>
            </div>
        </div>
    );
};

export default ContactPage;