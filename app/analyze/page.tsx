"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { CalendarDays, ShoppingBag, TrendingUp, Store, Clock, Lightbulb, BarChart4 } from "lucide-react";



interface AnalysisResponseData {
  analysis_id: string;
  created_at: string;
  analysis: {
    basic_analysis: {
      spending_pattern: string;
      avg_spending: string;
      shopping_frequency: string;
    };
    items_analysis: {
      frequently_bought: string[];
      possible_categories: Record<string, number>; 
    };
    shopping_habits: {
      preferred_stores: string[];
      time_patterns: string;
    };
    recommendations: string[];
  };
  from_cache: boolean;
}

export default function AnalyzePage() {
    const [data, setData] = useState<AnalysisResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  
    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("请先登录");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ai/analyze-consumer-data`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            // auth response data structure
            const responseData = response.data;
            if (!responseData || 
                !responseData.analysis || 
                !responseData.analysis.basic_analysis || 
                !responseData.analysis.items_analysis || 
                !responseData.analysis.shopping_habits || 
                !responseData.analysis.recommendations) {
                console.error("API response format is invalid:", responseData);
                setError("API response format is invalid");
                return;
            }

            setData(responseData);
        } catch (err) {
            console.error("Failed to fetch analysis data:", err);
            setError("Failed to fetch analysis data");
        } finally {
            setLoading(false);
        }
    };


    if (!data && !loading && !error) {
        return (
            <div className="container mx-auto py-8 max-w-6xl">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl">Analysis of Consumption Patterns</CardTitle>
                        <CardDescription>
                        Analyze your purchase invoice data to provide personalized consumer insights
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 py-8">
                        <div className="mx-auto h-32 w-32 bg-primary/10 rounded-full flex items-center justify-center">
                            <BarChart4 className="h-16 w-16 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Ready to view your spending analytics?</h3>
                            <p className="text-muted-foreground px-6 max-w-md mx-auto">
                            Based on your uploaded invoice data, we will generate a personalized consumption pattern analysis and optimization recommendations.
                            </p>
                        </div>
                        <Button 
                            size="lg" 
                            onClick={handleAnalyze} 
                            className="px-8"
                        >
                            start analysis
                        </Button>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground justify-center">
                    Analysis may take a few seconds, please be patient!
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // loading status
    if (loading) {
        return (
            <div className="container mx-auto py-8 max-w-6xl">
                <div className="flex flex-col items-center justify-center h-96 space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Your consumption data is being analyzed, please wait....</p>
                </div>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return (
            <div className="container mx-auto py-8 max-w-6xl">
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Failed to fetch data</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="flex justify-center mt-4">
                    <Button onClick={handleAnalyze}>重试</Button>
                </div>
            </div>
        );
    }

    // no data
    if (!data) {
        return (
            <div className="container mx-auto py-8 max-w-6xl">
                <Alert className="mb-4">
                    <AlertTitle>No data available</AlertTitle>
                    <AlertDescription>No consumption data has been found yet, please upload your invoice and try again.</AlertDescription>
                </Alert>
                <div className="flex justify-center mt-4">
                    <Button onClick={handleAnalyze}>retry</Button>
                </div>
            </div>
        );
    }

  
    const analysisData = data.analysis;
    
   
    const categoryData = Object.entries(analysisData.items_analysis.possible_categories).map(([name, value], index) => ({
        name,
        value: Number(value), // 直接使用数值
        color: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
            "#9966FF", "#FF9F40", "#8884d8", "#82ca9d"
        ][index % 8]
    }));

   
    const totalItems = categoryData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="container mx-auto py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Individual Consumption Analysis Report</h1>
                <Button onClick={handleAnalyze} variant="outline" className="whitespace-nowrap">
                reanalysis
                </Button>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="items"> Product Analysis</TabsTrigger>
                    <TabsTrigger value="habits">Shopping Habits</TabsTrigger>
                    <TabsTrigger value="recommendations">Personalized Advice</TabsTrigger>
                </TabsList>
                
                {/* 总体概览 */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Consumption patterns</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{analysisData.basic_analysis.spending_pattern}</div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Spending</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analysisData.basic_analysis.avg_spending}</div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Shopping Frequency</CardTitle>
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{analysisData.basic_analysis.shopping_frequency}</div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Overall Analysis</CardTitle>
                            <CardDescription>Based on your consumption data, we provide the following insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{analysisData.basic_analysis.spending_pattern}</p>
                            <p className="mt-2">The average amount you spend is <span className="font-semibold">{analysisData.basic_analysis.avg_spending}</span>，
                                Shopping Frequency is <span className="font-semibold">{analysisData.basic_analysis.shopping_frequency}</span>。</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* 商品分析 */}
                <TabsContent value="items" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Distribution of consumer goods categories</CardTitle>
                                <CardDescription>Your spending is concentrated in the following categories</CardDescription>
                            </CardHeader>
                            <CardContent className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => 
                                                `${name} (${(percent * 100).toFixed(0)}%)`
                                            }
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value, name) => [`${value} 件`, name]}
                                            labelFormatter={(name) => `类别: ${name}`}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Frequently Purchased Items</CardTitle>
                                <CardDescription>Your most frequently purchased items</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {analysisData.items_analysis.frequently_bought.map((item, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="flex items-center justify-center bg-primary/10 text-primary rounded-full w-6 h-6 text-xs mr-2">
                                                {index + 1}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Category Details</CardTitle>
                                <CardDescription>Number of categories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {Object.entries(analysisData.items_analysis.possible_categories).map(([category, value], index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{category}</span>
                                            <span className="font-medium">{value} item ({((value/totalItems)*100).toFixed(1)}%)</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                
                {/* 购物习惯 */}
                <TabsContent value="habits" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shopping Habits Analysis</CardTitle>
                            <CardDescription>Your shopping time and location preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium flex items-center mb-2">
                                    <Store className="mr-2 h-5 w-5 text-primary" />
                                    Frequently Visited Stores
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {analysisData.shopping_habits.preferred_stores.map((store, index) => (
                                        <div 
                                            key={index} 
                                            className="bg-secondary p-3 rounded-md text-center font-medium"
                                        >
                                            {store}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium flex items-center mb-2">
                                    <Clock className="mr-2 h-5 w-5 text-primary" />
                                    Shopping Time Patterns
                                </h3>
                                <p className="text-muted-foreground">{analysisData.shopping_habits.time_patterns}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* 个性化建议 */}
                <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                                Personalized advice based on your spending habits
                            </CardTitle>
                            <CardDescription>
                            Based on your shopping history, we offer you the following suggestions to optimize your spending
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {analysisData.recommendations.map((recommendation, index) => (
                                    <li key={index} className="bg-muted p-4 rounded-lg">
                                        <div className="flex items-start">
                                            <span className="flex-shrink-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-xs mr-3 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <p>{recommendation}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">
                            These recommendations are generated based on your historical spending patterns and may be updated as your spending habits change.
                            </p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}