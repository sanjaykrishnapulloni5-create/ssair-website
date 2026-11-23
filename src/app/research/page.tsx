"use client";

import React, { useState, useMemo } from "react";
import NewsCard from "@/components/research/NewsCard";

type CategoryFilter = "all" | "Research" | "News" | "Achievement";

interface ArticleItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: "Research" | "News" | "Achievement";
  link?: string;
  tags?: string[];
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");

  const articles: ArticleItem[] = useMemo(
    () => [
      {
        id: "res-1",
        title: "Autonomous 6-DOF Industrial Robotic Manipulator for Defense Assembly",
        date: "October 2024",
        excerpt:
          "High-precision closed-loop impedance control architecture and kinematic trajectory planning system engineered for heavy payload assembly and munitions handling.",
        category: "Research",
        link: "#research-robot-manipulator",
        tags: ["DRDO", "Robotics", "Industrial Arm", "Kinematics"],
      },
      {
        id: "res-2",
        title: "Real-Time Aerial Object Detection & Tracking in Cluttered Scenes Using YOLOv3",
        date: "August 2024",
        excerpt:
          "High-speed edge computer vision framework optimized from YOLOv3 for low-altitude UAV tactical reconnaissance. Delivers robust multi-spectral target detection.",
        category: "Research",
        link: "#research-yolov3-detection",
        tags: ["YOLOv3", "Computer Vision", "DRDO", "UAV", "Edge AI"],
      },
      {
        id: "res-3",
        title: "Decentralized Swarm SLAM & Multi-Agent Tactical Mapping in GPS-Denied Environments",
        date: "May 2024",
        excerpt:
          "Robust multi-robot collaborative mapping architecture combining LiDAR-inertial odometry with peer-to-peer consensus algorithms.",
        category: "Research",
        link: "#research-swarm-slam",
        tags: ["SLAM", "Swarm Robotics", "LiDAR", "Autonomous Systems"],
      },
      {
        id: "news-1",
        title: "SSAIR Demonstrates Autonomous Defense Robotics at National DefTech Summit",
        date: "November 2024",
        excerpt:
          "Our research team successfully demonstrated the heavy-duty robotic manipulator alongside real-time YOLOv3 edge vision pods to defense leadership and scientists.",
        category: "News",
        link: "#news-deftech-2024",
        tags: ["Summit", "Live Demo", "Defense Expo"],
      },
      {
        id: "news-2",
        title: "Strategic Joint R&D Partnership Initiated for Autonomous Aerial Surveillance",
        date: "September 2024",
        excerpt:
          "SSAIR signs a collaborative development pact with leading defense aerospace manufacturers to integrate our low-latency edge-inference intelligence.",
        category: "News",
        link: "#news-partnership-2024",
        tags: ["Partnership", "Aerospace", "Autonomous Fleet"],
      },
      {
        id: "achieve-1",
        title: "DRDO Best Team Award Conferred to Scientific Leadership",
        date: "Defense Honours",
        excerpt:
          "Conferred the prestigious DRDO Best Team Award recognizing exceptional research contributions in real-time embedded robotic control and defense systems.",
        category: "Achievement",
        link: "#award-drdo",
        tags: ["DRDO Award", "Excellence", "National Defense"],
      },
    ],
    []
  );

  const filteredArticles = useMemo(() => {
    if (activeTab === "all") return articles;
    return articles.filter((a) => a.category === activeTab);
  }, [activeTab, articles]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Publications &amp; Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Research &amp; News
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            Frontier scientific papers, conference demonstrations, and milestones from SSAIR’s Bengaluru laboratory.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Items" },
              { id: "Research", label: "Research Papers" },
              { id: "News", label: "News & Demos" },
              { id: "Achievement", label: "Awards & Honors" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              category={article.category}
              link={article.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
