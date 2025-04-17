"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Upload, PieChart, BarChart2, FileText, TrendingUp, Tags, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const DemoPage = () => {

  const [activeTab, setActiveTab] = useState("overview");
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setHasUploaded(true);
    }, 2000);
  };

  // This ensures activeTab is used to silence the warning
  console.log(`Current active tab: ${activeTab}`);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Experience Intelligence Spend</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how our platform transforms your shopping receipts into actionable financial insights.
        </p>
      </div>

      {/* Demo Navigation */}
      <Tabs defaultValue="overview" className="mb-16" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload & Process</TabsTrigger>
            <TabsTrigger value="insights">Spending Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">How Our Demo Works</h2>
              <p className="text-lg text-muted-foreground mb-6">
                This interactive demo showcases how Intelligence Spend helps you understand your shopping habits and optimize your spending.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Upload Receipts</h3>
                    <p className="text-muted-foreground">See how our system processes shopping receipts and extracts key information.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <PieChart className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Analyze Spending</h3>
                    <p className="text-muted-foreground">Explore interactive visualizations of spending categories and trends.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Get Recommendations</h3>
                    <p className="text-muted-foreground">Discover personalized suggestions to optimize your spending habits.</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => setActiveTab("upload")} className="mt-8" size="lg">
                Start Interactive Demo
              </Button>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 z-10 opacity-90"></div>

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-4/5">
                  <h3 className="text-2xl font-bold text-white mb-4">Transform Your Financial Understanding</h3>
                  <p className="text-white/90">
                    Our AI-powered platform turns complex shopping data into clear, actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Your Receipt</CardTitle>
              <CardDescription>
                Our AI system analyzes your shopping receipts to extract products, prices, and patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!hasUploaded ? (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drag and drop your receipt here</p>
                    <p className="text-muted-foreground mb-6">Supports JPG, PNG and PDF files</p>
                    <div className="flex justify-center">
                      <Button
                        onClick={simulateUpload}
                        disabled={isUploading}
                        className="relative overflow-hidden"
                      >
                        {isUploading ? "Processing..." : "Select Receipt"}
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-600">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Try our demo files</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Button variant="outline" size="sm" onClick={simulateUpload}>Rewe Receipt </Button>
                      <Button variant="outline" size="sm" onClick={simulateUpload}>EDEKA Receipt </Button>
                      <Button variant="outline" size="sm" onClick={simulateUpload}>DM Receipt </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Receipt processed successfully!</p>
                      <p className="text-sm text-green-700">20 items identified and categorized</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b">
                      <h3 className="font-medium">Receipt Details</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Store</Label>
                          <p className="font-medium">REWE Supermarkt</p>
                        </div>
                        <div>
                          <Label>Date</Label>
                          <p className="font-medium">April 12, 2025</p>
                        </div>
                        <div>
                          <Label>Total Amount</Label>
                          <p className="font-medium">€68.45</p>
                        </div>
                        <div>
                          <Label>Payment Method</Label>
                          <p className="font-medium">Visa Card</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => setActiveTab("insights")} className="w-full">
                    View Spending Insights <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Your Spending Analysis</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Spending by Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <Image
                      src="/asset/pie-chart-demo.png"  
                      alt="Spending Trend"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-indigo-500" />
                    Monthly Spending Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <Image
                      src="/asset/trend-chart-demo.png"  
                      alt="Spending Trend"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="h-5 w-5 text-purple-500" />
                  Top Spending Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Groceries", amount: "€258.35", percentage: "42%", color: "bg-blue-500" },
                    { category: "Household Items", amount: "€124.90", percentage: "21%", color: "bg-indigo-500" },
                    { category: "Fresh Produce", amount: "€86.20", percentage: "15%", color: "bg-green-500" },
                    { category: "Snacks & Sweets", amount: "€45.75", percentage: "8%", color: "bg-orange-500" },
                    { category: "Beverages", amount: "€38.50", percentage: "6%", color: "bg-red-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-3 h-10 ${item.color} rounded-full`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{item.category}</span>
                          <span className="font-medium">{item.amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: item.percentage }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground w-12 text-right">
                        {item.percentage}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => setActiveTab("recommendations")}>
                View Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Smart Recommendations</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Based on your shopping patterns, we&apos;ve identified these opportunities to optimize your spending.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl">Save on Groceries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    You could save up to <span className="font-bold text-blue-600">€45/month</span> by shopping for these items at discount supermarkets.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Organic Vegetables</span>
                      <span className="font-medium text-green-600">Save €18.50</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Dairy Products</span>
                      <span className="font-medium text-green-600">Save €14.75</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Breakfast Cereals</span>
                      <span className="font-medium text-green-600">Save €12.30</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl">Bulk Buying Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    These frequently purchased items could be cheaper when bought in bulk.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Toilet Paper</span>
                      <span className="font-medium text-green-600">Save 22%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Laundry Detergent</span>
                      <span className="font-medium text-green-600">Save 18%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Coffee Beans</span>
                      <span className="font-medium text-green-600">Save 15%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Seasonal Spending Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Your spending on snacks increases by 35% during winter months. Consider these healthier, more affordable alternatives.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Instead of Chocolate Bars</h4>
                      <p className="text-sm text-muted-foreground">Try dark chocolate squares or homemade energy bars</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Instead of Potato Chips</h4>
                      <p className="text-sm text-muted-foreground">Try making baked vegetable chips at home</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Instead of Packaged Cookies</h4>
                      <p className="text-sm text-muted-foreground">Try buying in bulk or weekend baking</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-8">
              <h3 className="text-xl font-bold mb-6">Ready to gain control of your spending?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/register">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Request More Information</Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoPage;