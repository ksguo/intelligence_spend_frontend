"use client";


import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Shield, Users, Zap, PieChart, TrendingUp, CreditCard, Lightbulb } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">About Intelligence Spend</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    We&apos;re transforming personal finance management through intelligent shopping analytics and intuitive spend tracking.
                </p>
            </div>

            {/* Our Story */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Founded in 2023, Intelligence Spend began with a simple question: why is it so difficult for individuals to understand their personal spending habits?
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                        Our team of finance enthusiasts and data scientists came together with a shared vision - to create a platform that helps people gain valuable insights from their shopping data and make smarter financial decisions.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Today, we help individuals from all walks of life track their spending, identify savings opportunities, and take control of their financial future.
                    </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 z-10"></div>

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="text-white text-center p-6">
                            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                            <p className="text-lg">
                                Empower individuals with personalized shopping intelligence that leads to financial well-being
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="p-6 border-t-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex justify-center mb-4">
                                <Shield className="h-12 w-12 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-3">Privacy & Security</h3>
                            <p className="text-muted-foreground text-center">
                                Your financial data is personal. We employ bank-level security to ensure your information stays private and protected.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="p-6 border-t-4 border-indigo-500 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex justify-center mb-4">
                                <Lightbulb className="h-12 w-12 text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-3">Insightful Analysis</h3>
                            <p className="text-muted-foreground text-center">
                                We turn complex spending data into clear, actionable insights that help you make better financial decisions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="p-6 border-t-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-3">User Empowerment</h3>
                            <p className="text-muted-foreground text-center">
                                We believe financial wellness starts with understanding. Our tools empower you to take control of your spending habits.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* What Sets Us Apart */}
            <div className="bg-slate-50 p-10 rounded-xl mb-24 shadow-sm">
                <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex items-start space-x-4">
                        <PieChart className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-medium mb-2">Shopping Category Analysis</h3>
                            <p className="text-muted-foreground">
                                Automatically categorize your purchases and see exactly where your money goes across different spending categories.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <TrendingUp className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-medium mb-2">Personalized Spending Trends</h3>
                            <p className="text-muted-foreground">
                                Discover your unique spending patterns with visualizations that reveal weekly, monthly, and seasonal trends.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <CreditCard className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-medium mb-2">Smart Purchase Recommendations</h3>
                            <p className="text-muted-foreground">
                                Receive suggestions for better deals on frequently purchased items based on your shopping history.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Zap className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-medium mb-2">Automated Savings Opportunities</h3>
                            <p className="text-muted-foreground">
                                Our algorithm identifies potential savings and suggests practical ways to optimize your spending.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <span className="text-blue-600 text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Upload your Invoice</h3>
                        <p className="text-muted-foreground">
                            Securely upload your all invoice in our database.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                            <span className="text-indigo-600 text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Get Instant Analysis</h3>
                        <p className="text-muted-foreground">
                            Watch as we categorize your transactions and generate personalized spending insights.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                            <span className="text-purple-600 text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Take Action</h3>
                        <p className="text-muted-foreground">
                            Use our recommendations to set goals, reduce unnecessary spending, and save more.
                        </p>
                    </div>
                </div>
            </div>

            

            {/* Invitation Code Section */}
            <div className="mt-16 text-center bg-slate-50 p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Want to Try Intelligence Spend?</h3>
                <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    We&apos;re currently in beta testing. If you&apos;d like to test our platform, please send us an email to request an invitation code.
                </p>
                <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    <Link href="mailto:contact@intelligence-spend.com?subject=Invitation%20Code%20Request">
                        Request Invitation Code
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default AboutPage;