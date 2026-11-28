export interface ResearchArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  fullText: string;
  category: "Research" | "News" | "Achievement";
  tags: string[];
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: "res-1",
    title: "Autonomous 6-DOF & 5-Bar Industrial Robotic Manipulator for Defense Assembly",
    date: "October 2024",
    excerpt:
      "High-precision closed-loop impedance control architecture and kinematic trajectory planning system engineered for heavy payload assembly and munitions handling.",
    fullText:
      "Inspired by foundational parallel mechanism kinematics researched at CAIR DRDO, this work establishes closed-form inverse kinematics, Jacobian conditioning indices for singularity avoidance, and 1,000 Hz EtherCAT impedance control. Static and dynamic torque curves are validated across high-acceleration pick-and-place trajectories inside Gazebo and physical hardware.",
    category: "Research",
    tags: ["DRDO", "Robotics", "5-Bar Kinematics", "ROS 2"],
  },
  {
    id: "res-2",
    title: "Real-Time Aerial Object Detection & Tracking in Cluttered Scenes Using YOLOv3/v8",
    date: "August 2024",
    excerpt:
      "High-speed edge computer vision framework optimized for low-altitude UAV tactical reconnaissance delivering robust multi-spectral target detection.",
    fullText:
      "We benchmark INT8 and FP16 TensorRT quantized YOLO architectures running directly on airborne companion GPUs. Using optical-thermal sensor fusion and DeepSORT Kalman association, the pipeline sustains sub-10ms per-frame tracking accuracy despite heavy atmospheric clutter, foliage occlusion, and rapid drone yaw maneuvers.",
    category: "Research",
    tags: ["YOLO", "Computer Vision", "DRDO", "UAV", "Edge AI"],
  },
  {
    id: "res-3",
    title: "Decentralized Swarm SLAM & Multi-Agent Tactical Mapping in GPS-Denied Zones",
    date: "May 2024",
    excerpt:
      "Robust multi-robot collaborative mapping architecture combining LiDAR-inertial odometry with peer-to-peer consensus algorithms.",
    fullText:
      "When satellite GNSS navigation is unavailable or contested, autonomous UGVs and UAVs must collaboratively map subterranean and urban terrain. Our LIO-SAM factor-graph architecture merges compressed 3D submaps across low-bandwidth mesh links, converging on a unified tactical map without centralized single points of failure.",
    category: "Research",
    tags: ["SLAM", "Swarm Robotics", "LiDAR", "Autonomous Systems"],
  },
  {
    id: "news-1",
    title: "SSAIR Demonstrates Autonomous Defense Robotics at National DefTech Summit",
    date: "November 2024",
    excerpt:
      "Our research team successfully demonstrated the heavy-duty robotic manipulator alongside real-time edge vision pods to defense leadership and scientists.",
    fullText:
      "At the National DefTech Summit, SSAIR showcased live real-time object recognition pods synchronized with autonomous trajectory actuation, demonstrating indigenous readiness under India's sovereign Atmanirbhar Bharat defense manufacturing initiative.",
    category: "News",
    tags: ["Summit", "Live Demo", "Defense Expo"],
  },
  {
    id: "news-2",
    title: "Strategic Joint R&D Partnership Initiated for Autonomous Aerial Surveillance",
    date: "September 2024",
    excerpt:
      "SSAIR signs a collaborative development pact with aerospace innovators to integrate low-latency edge-inference intelligence.",
    fullText:
      "Together with flagship AI partner Sri Saraswathi Artificial Intelligence and Robotics, SSAIR is integrating modular airborne AI inference payloads and anti-jam telemetry systems into next-generation surveillance airframes.",
    category: "News",
    tags: ["Partnership", "Aerospace", "Autonomous Fleet"],
  },
  {
    id: "achieve-1",
    title: "DRDO Best Team Award Conferred to Scientific Leadership",
    date: "Defense Honours",
    excerpt:
      "Conferred the prestigious DRDO Best Team Award recognizing exceptional research contributions in real-time embedded robotic control and defense systems.",
    fullText:
      "Founder & Director Dr. Dadireddy Srinivasulu Reddy received the DRDO Best Team Award during his 15+ year tenure as Scientist 'D' at CAIR (DRDO Bengaluru), recognizing landmark contributions in real-time autonomous control, robotics kinematics, and defense AI software.",
    category: "Achievement",
    tags: ["DRDO Award", "Excellence", "National Defense"],
  },
];
