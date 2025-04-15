"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Receipt, ChartPieIcon, TrendingUp, ShoppingBag } from "lucide-react";
import Link from "next/link";

const iconPositions = [
    { top: 30, left: 20, size: 50, rotate: 15 },
    { top: 70, left: 80, size: 60, rotate: 45 },
    { top: 20, left: 60, size: 40, rotate: 90 },
    { top: 80, left: 40, size: 70, rotate: 180 },
];

const Hero = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Only run animations after component is mounted on client
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (

        <div className="relative overflow-hidden w-full pt-4 md:pt-8 pb-12 md:pb-24">
            {/* Background animation elements - only rendered on client */}
            {isClient && (
                <div className="absolute inset-0 -z-10">
                    {[Receipt, ChartPieIcon, TrendingUp, ShoppingBag].map((Icon, index) => (
                        <motion.div
                            key={index}
                            className="absolute text-primary/5"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 0.7,
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50,
                                rotate: iconPositions[index].rotate
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: index * 2
                            }}
                            style={{
                                top: `${iconPositions[index].top}%`,
                                left: `${iconPositions[index].left}%`,
                                fontSize: `${iconPositions[index].size}px`
                            }}
                        >
                            <Icon size={iconPositions[index].size} />
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="container mx-auto px-4 max-w-6xl">
                {/* Rest of your component remains the same */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    {/* Main title */}
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Intelligent <span className="text-primary">Invoice Analysis</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-6 text-xl text-muted-foreground max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Upload your shopping invoices, use AI technology to reveal your consumption patterns,
                        get personalized recommendations, and optimize your shopping decisions.
                    </motion.p>

                    {/* Animated feature list */}
                    <motion.div
                        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {[
                            { icon: Receipt, title: "Easy Upload", desc: "Supports multiple invoice formats" },
                            { icon: ChartPieIcon, title: "Smart Analysis", desc: "AI-driven consumption pattern recognition" },
                            { icon: TrendingUp, title: "Insight Trends", desc: "Visualization of spending habits" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center p-4 rounded-lg"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-medium text-lg">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Call-to-action buttons */}
                    <motion.div
                        className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.div
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button asChild size="lg" className="relative overflow-hidden group">
                                <Link href="/invoice">
                                    <span className="relative z-10">Start Uploading Invoices</span>
                                    <motion.span
                                        className="absolute inset-0 bg-primary/20"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: isHovering ? "0%" : "-100%" }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    />
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>

                        <Button asChild variant="outline" size="lg">
                            <Link href="/analyze">View Sample Analysis</Link>
                        </Button>
                    </motion.div>
                </div>


            </div>
        </div>
    );
};

export default Hero;


