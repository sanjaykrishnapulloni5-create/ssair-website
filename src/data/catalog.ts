export type CatalogDomain =
  | "Defence & UAV"
  | "Robotics & Kinematics"
  | "AI & Computer Vision"
  | "Embedded & IoT"
  | "Space & Civil AI";

export type CatalogTrack =
  | "Enterprise & Defense"
  | "M.Tech / PhD R&D"
  | "B.Tech / Capstone"
  | "Workshop & Training";

export interface CatalogItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  domain: CatalogDomain;
  track: CatalogTrack;
  status: "Deployed" | "In Development" | "Prototype" | "Mentorship Ready";
  imageUrl: string;
  description: string;
  abstract: string;
  technologies: string[];
  metricLabel: string;
  metricValue: string;
  blockDiagram: {
    stage: string;
    title: string;
    detail: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  learningOutcomes: string[];
}

export interface AcademyProgram {
  id: string;
  type: "Workshop" | "Internship" | "PhD & IEEE R&D" | "Teaching Fellowship";
  title: string;
  duration: string;
  level: string;
  domain: string;
  badge: string;
  highlights: string[];
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  quote: string;
  category: "Industry & Defense" | "M.Tech / PhD Scholar" | "B.Tech & Intern";
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "aegis-uav",
    code: "SSAIR-DEF-101",
    title: "Aegis-UAV Tactical Reconnaissance Drone",
    tagline: "GPS-denied autonomous aerial intelligence with thermal fusion",
    domain: "Defence & UAV",
    track: "Enterprise & Defense",
    status: "Deployed",
    imageUrl: "/images/products/aegis-uav-hex.jpg",
    description:
      "Autonomous long-endurance tactical UAV engineered for GPS-denied zones with onboard thermal tracking, anti-jam telemetry, and edge-computed target classification.",
    abstract:
      "Aegis-UAV integrates Visual-Inertial Odometry (VIO) with quantized YOLOv8/YOLOv3 neural tracking onboard NVIDIA Jetson Orin hardware. Even under heavy RF jamming or satellite denial, the airframe maintains stable waypoint navigation, locks onto dynamic thermal signatures, and relays AES-256 encrypted MAVLink telemetry to ground command.",
    technologies: ["Edge AI", "ROS 2", "FLIR Thermal", "AES-256", "PX4 Autopilot", "Jetson Orin"],
    metricLabel: "Operational Range",
    metricValue: "45+ km",
    blockDiagram: [
      { stage: "01. Perception", title: "Dual EO/LWIR + Stereo IMU", detail: "Synchronized thermal & visual frame capture" },
      { stage: "02. Edge Neural Core", title: "TensorRT YOLOv8 + VIO SLAM", detail: "Sub-10ms target locking & GPS-free pose" },
      { stage: "03. Flight Control", title: "PX4 State Estimator & MPC", detail: "Wind-resilient trajectory stabilization" },
      { stage: "04. Ground Command", title: "AES-256 MAVLink Telemetry", detail: "Encrypted mission stream & geofence override" },
    ],
    specifications: [
      { label: "Flight Endurance", value: "65 mins tactical hover / cruise" },
      { label: "Compute Node", value: "Jetson Orin NX + PX4 Cube" },
      { label: "Navigation", value: "GPS-Denied Visual Inertial Odometry" },
      { label: "Telemetry Security", value: "AES-256 FHSS Tactical Link" },
    ],
    learningOutcomes: [
      "PX4 & ArduPilot autonomous offboard mission programming via ROS 2",
      "Optical-thermal sensor fusion and TensorRT model quantization",
      "GPS-denied SLAM localization and anti-wind PID/MPC tuning",
    ],
  },
  {
    id: "titanarm-cobot",
    code: "SSAIR-ROB-201",
    title: "TitanArm 6-Axis & 5-Bar Collaborative Manipulator",
    tagline: "Sub-millimeter DRDO-lineage industrial kinematics & torque control",
    domain: "Robotics & Kinematics",
    track: "Enterprise & Defense",
    status: "Deployed",
    imageUrl: "/images/products/titanarm-cobot.jpg",
    description:
      "High-stiffness collaborative robotic manipulator inspired by CAIR DRDO five-bar parallel kinematic research for high-speed welding, pick-and-place, and defense assembly.",
    abstract:
      "Drawing directly from Dr. Dadireddy Srinivasulu Reddy's milestone research at CAIR DRDO, TitanArm combines closed-loop inverse kinematics with high-frequency force-torque impedance control. Singularity boundary avoidance and static/dynamic motor torque sizing guarantee sub-millimeter repeatability under high payloads alongside human operators.",
    technologies: ["ROS 2", "MoveIt 2", "EtherCAT", "Inverse Kinematics", "Force/Torque", "C++20"],
    metricLabel: "Repeatability",
    metricValue: "±0.02 mm",
    blockDiagram: [
      { stage: "01. Trajectory Plan", title: "MoveIt 2 + Collision Mesh", detail: "Jerk-limited spline generation" },
      { stage: "02. Kinematic Solver", title: "5-Bar & 6-DOF Closed Form", detail: "Singularity-free Jacobian inversion" },
      { stage: "03. Real-Time Bus", title: "1kHz EtherCAT Servo Loop", detail: "Joint torque & impedance feedback" },
      { stage: "04. End Effector", title: "Adaptive Bionic Gripper", detail: "Force-limited safe human contact" },
    ],
    specifications: [
      { label: "Payload Capacity", value: "16 kg continuous / 20 kg peak" },
      { label: "Control Frequency", value: "1,000 Hz EtherCAT deterministic" },
      { label: "Reach Radius", value: "1,150 mm spherical workspace" },
      { label: "Safety Rating", value: "ISO/TS 15066 Force-Limited" },
    ],
    learningOutcomes: [
      "Five-bar closed-loop mechanism synthesis & singularity mapping",
      "Static and dynamic joint torque calculation for actuator sizing",
      "ROS 2 MoveIt 2 motion planning & Gazebo physics validation",
    ],
  },
  {
    id: "vanguard-ugv",
    code: "SSAIR-DEF-104",
    title: "Vanguard Heavy Autonomous Ground Vehicle (UGV)",
    tagline: "All-terrain tracked perimeter defense & hazard reconnaissance rover",
    domain: "Defence & UAV",
    track: "Enterprise & Defense",
    status: "In Development",
    imageUrl: "/images/products/vanguard-ugv.jpg",
    description:
      "All-terrain tracked robotic ground platform built for rugged border patrol, autonomous sensor payload delivery, and hazardous ordnance reconnaissance.",
    abstract:
      "Vanguard UGV fuses 3D solid-state LiDAR point clouds with RTK-GPS and IMU factor-graph SLAM to autonomously traverse steep gradients, rubble, and low-visibility environments. Dual field-oriented BLDC drive controllers ensure responsive traction across mud, gravel, and incline obstacles.",
    technologies: ["3D LiDAR SLAM", "NVIDIA Jetson AGX", "ROS 2 Nav2", "RTK-GPS", "CANopen", "C++"],
    metricLabel: "Climb Gradient",
    metricValue: "38° Slope",
    blockDiagram: [
      { stage: "01. 3D Sensing", title: "64-Beam LiDAR + Radar + IMU", detail: "Point cloud terrain traversability map" },
      { stage: "02. Localization", title: "Factor-Graph LIO-SAM", detail: "Drift-free 3D terrain mapping" },
      { stage: "03. Path Planner", title: "Nav2 Costmap & MPPI", detail: "Dynamic boulder & trench avoidance" },
      { stage: "04. Drivetrain", title: "Dual FOC BLDC Track Drive", detail: "CANopen regenerative torque split" },
    ],
    specifications: [
      { label: "Payload Deck", value: "120 kg modular sensor/arm mount" },
      { label: "Ingress Protection", value: "IP66 ruggedized aluminum chassis" },
      { label: "Battery Runtime", value: "6 hours continuous patrol" },
      { label: "Compute", value: "Jetson AGX Orin 64GB" },
    ],
    learningOutcomes: [
      "3D Point Cloud Library (PCL) filtering & ground plane segmentation",
      "ROS 2 Nav2 navigation stack deployment on tracked UGVs",
      "CAN Bus motor controller interfacing and fail-safe watchdog design",
    ],
  },
  {
    id: "sentinel-cuas",
    code: "SSAIR-DEF-108",
    title: "Sentinel-X Directed Counter-UAS Radar",
    tagline: "Phased-array RF & electro-optical rogue drone swarm interceptor",
    domain: "Defence & UAV",
    track: "Enterprise & Defense",
    status: "Prototype",
    imageUrl: "/images/products/sentinel-cuas.jpg",
    description:
      "Intelligent RF spectrum analyzer and directional countermeasure system detecting, classifying, and neutralizing unauthorized drone swarms within a 5 km perimeter.",
    abstract:
      "Sentinel-X combines Software-Defined Radio (SDR) spectrum fingerprinting with a motorized EO/IR optical slewing gimbal. Machine learning spectrogram classifiers separate friendly telemetry from hostile UAV protocols in milliseconds, locking the tracking turret onto sub-meter aerial targets.",
    technologies: ["RF Spectrum AI", "SDR", "Phased Array", "FPGA", "CUDA", "YOLOv8"],
    metricLabel: "Detection Radius",
    metricValue: "5.0 km",
    blockDiagram: [
      { stage: "01. RF Intercept", title: "Wideband SDR Array", detail: "2.4 / 5.8 GHz hop-pattern capture" },
      { stage: "02. Signal AI", title: "FPGA Spectrogram Classifier", detail: "Protocol & micro-Doppler ID" },
      { stage: "03. Optical Lock", title: "2-Axis EO/IR Gimbal Track", detail: "Sub-pixel visual verification" },
      { stage: "04. Neutralize", title: "Directional RF Countermeasure", detail: "Targeted link disruption alert" },
    ],
    specifications: [
      { label: "Sweep Bandwidth", value: "400 MHz – 6 GHz real-time" },
      { label: "Classification Latency", value: "< 18 ms end-to-end" },
      { label: "Tracking Slew Rate", value: "120°/sec zero-backlash gimbal" },
      { label: "Weather Shield", value: "MIL-STD-810H Mast Assembly" },
    ],
    learningOutcomes: [
      "Micro-Doppler radar signature extraction & CNN classification",
      "Software-Defined Radio (SDR) IQ stream processing in Python/CUDA",
      "Closed-loop PID visual servoing for Pan-Tilt optical turrets",
    ],
  },
  {
    id: "nexus-amr",
    code: "SSAIR-ROB-205",
    title: "Nexus-AMR Fleet Heavy Tugger",
    tagline: "1,500 kg trackless autonomous intralogistics & smart factory mover",
    domain: "Robotics & Kinematics",
    track: "Enterprise & Defense",
    status: "Deployed",
    imageUrl: "/images/products/nexus-amr.jpg",
    description:
      "Autonomous mobile logistics robot hauling up to 1,500 kg payloads through dynamic factory aisles via natural feature SLAM without magnetic tape or wires.",
    abstract:
      "Nexus-AMR modernizes aerospace and automotive assembly floors by replacing rigid AGV tracks with natural feature 2D/3D LiDAR SLAM and Ultra-Wideband (UWB) fleet synchronization. Compliant with VDA 5050 fleet orchestration, multiple tuggers coordinate intersection priority and automated opportunity charging.",
    technologies: ["Natural SLAM", "VDA 5050", "UWB Localization", "ROS 2", "Safety LiDAR", "Python"],
    metricLabel: "Towing Load",
    metricValue: "1,500 kg",
    blockDiagram: [
      { stage: "01. Safety Ring", title: "360° Dual Safety LiDAR", detail: "Dynamic protective zone scaling" },
      { stage: "02. Fleet Sync", title: "VDA 5050 MQTT Broker", detail: "Multi-AMR intersection arbitration" },
      { stage: "03. Localization", title: "AMCL + UWB Anchor Fusion", detail: "±10 mm docking precision" },
      { stage: "04. Actuation", title: "Automated Pin Hitch", detail: "Smart cart coupling & auto-charge" },
    ],
    specifications: [
      { label: "Towing Payload", value: "1,500 kg heavy industrial cart" },
      { label: "Max Speed", value: "2.0 m/s with dynamic slowdown" },
      { label: "Docking Accuracy", value: "±10 mm / ±1°" },
      { label: "Charging", value: "Automated inductive 15-min boost" },
    ],
    learningOutcomes: [
      "2D LiDAR Cartographer & AMCL localization tuning",
      "VDA 5050 multi-robot traffic scheduling algorithms",
      "Industrial safety PLC integration and dynamic obstacle avoidance",
    ],
  },
  {
    id: "visionsort-ai",
    code: "SSAIR-CV-301",
    title: "VisionSort Hyperspectral Defect Inspector",
    tagline: "600+ parts/min high-speed delta sorting with neural inspection",
    domain: "AI & Computer Vision",
    track: "Enterprise & Defense",
    status: "In Development",
    imageUrl: "/images/products/visionsort-ai.jpg",
    description:
      "High-speed delta picking robot paired with multi-angle hyperspectral machine vision, catching microscopic solder and structural defects in real time.",
    abstract:
      "VisionSort merges high-frame-rate GigE industrial line-scan cameras with TensorRT anomaly segmentation and a closed-loop parallel delta robot. Defects down to 50 microns on moving PCBs or aerospace fasteners are flagged, logged via OPC-UA, and deflected off the line seamlessly.",
    technologies: ["TensorRT", "GigE Vision", "Delta Kinematics", "OpenCV", "OPC-UA", "PyTorch"],
    metricLabel: "Throughput",
    metricValue: "600+ ppm",
    blockDiagram: [
      { stage: "01. Illumination", title: "Strobe Ring + Line Scan", detail: "Motion-freeze high-res capture" },
      { stage: "02. Neural Inspect", title: "TensorRT Anomaly SegNet", detail: "50-micron crack & solder check" },
      { stage: "03. Conveyor Sync", title: "Encoder Pick Tracking", detail: "Real-time velocity intercept" },
      { stage: "04. Pick & Deflect", title: "3-Axis Delta Actuator", detail: "High-G pneumatic rejection" },
    ],
    specifications: [
      { label: "Line Speed", value: "Up to 600 components / minute" },
      { label: "Defect Resolution", value: "50 μm optical precision" },
      { label: "Inference Latency", value: "3.2 ms per frame (FP16)" },
      { label: "Factory Link", value: "OPC-UA & Modbus TCP MES" },
    ],
    learningOutcomes: [
      "High-speed encoder-synchronized conveyor tracking",
      "Few-shot industrial surface anomaly detection with PyTorch",
      "Parallel delta robot inverse kinematics & calibration",
    ],
  },
  {
    id: "neurofleet-os",
    code: "SSAIR-CV-304",
    title: "NeuroFleet Autonomous Swarm Orchestrator",
    tagline: "Distributed C4ISR command cloud for multi-agent drone & UGV fleets",
    domain: "AI & Computer Vision",
    track: "Enterprise & Defense",
    status: "Deployed",
    imageUrl: "/images/products/neurofleet-os.jpg",
    description:
      "Distributed mission control cloud delivering live WebRTC telemetry, synchronized multi-agent pathfinding, and fail-safe remote teleoperation across heterogeneous fleets.",
    abstract:
      "NeuroFleet OS acts as the unified nervous system for mixed aerial and ground fleets. Using decentralized consensus routing and sub-100ms WebRTC video streams, operators monitor 3D terrain paths, allocate autonomous search sectors, and trigger coordinated swarm maneuvers from one browser console.",
    technologies: ["Distributed Systems", "WebRTC", "ROS 2 DDS", "Three.js", "Go", "Next.js"],
    metricLabel: "Stream Latency",
    metricValue: "< 85 ms",
    blockDiagram: [
      { stage: "01. Edge Agent", title: "ROS 2 DDS Bridge Node", detail: "Compressed telemetry & health bus" },
      { stage: "02. Swarm Brain", title: "Consensus Task Allocator", detail: "Decentralized coverage splitting" },
      { stage: "03. Media Mesh", title: "Low-Latency WebRTC SFU", detail: "Multi-cam adaptive video feed" },
      { stage: "04. Ops Console", title: "3D WebGL Tactical HUD", detail: "Live mission replay & geofencing" },
    ],
    specifications: [
      { label: "Max Swarm Size", value: "64+ concurrent aerial/ground agents" },
      { label: "Video Latency", value: "< 85 ms end-to-end WebRTC" },
      { label: "Fail-Safe Mode", value: "Autonomous mesh-relay return" },
      { label: "Deployment", value: "Air-gapped On-Prem Kubernetes" },
    ],
    learningOutcomes: [
      "Multi-agent swarm task allocation & collision-free trajectory planning",
      "Real-time WebRTC & WebSocket telemetry architecture",
      "Interactive 3D Three.js geospatial HUD visualization",
    ],
  },
  {
    id: "cybertwin-sim",
    code: "SSAIR-ROB-209",
    title: "CyberTwin Synthetic Physics Simulation Engine",
    tagline: "100x real-time Digital Twin & RL policy testbed for robots and UAVs",
    domain: "Robotics & Kinematics",
    track: "M.Tech / PhD R&D",
    status: "In Development",
    imageUrl: "/images/products/cybertwin-sim.jpg",
    description:
      "High-fidelity digital twin simulation platform modeling aerodynamics, joint torque limits, and sensor noise for training reinforcement learning policies safely.",
    abstract:
      "Before deploying expensive hardware in the field, CyberTwin simulates full 6-DOF aerodynamics, five-bar linkage stress, and synthetic LiDAR/RGB camera degradation. Researchers train PPO/SAC reinforcement learning controllers and export zero-shot sim-to-real weights straight to ROS 2.",
    technologies: ["Isaac Sim", "Gazebo", "PyTorch RL", "Three.js", "MATLAB/Simulink", "OpenUSD"],
    metricLabel: "Sim Speedup",
    metricValue: "100x Real-Time",
    blockDiagram: [
      { stage: "01. CAD Import", title: "URDF / OpenUSD Rigging", detail: "Inertia, joint limits & friction" },
      { stage: "02. Physics Core", title: "GPU Rigid-Body & Aero Sim", detail: "Domain randomization engine" },
      { stage: "03. RL Training", title: "Parallel PPO / SAC Agent", detail: "Reward shaping for sim-to-real" },
      { stage: "04. HIL Export", title: "ROS 2 / ONNX Deployment", detail: "Zero-shot hardware validation" },
    ],
    specifications: [
      { label: "Parallel Envs", value: "2,048 vectorized GPU environments" },
      { label: "Physics Step", value: "1,000 Hz deterministic solver" },
      { label: "Sensor Models", value: "Noisy LiDAR, IMU, Stereo RGB, Thermal" },
      { label: "Target Track", value: "Ideal for M.Tech / PhD Thesis & R&D" },
    ],
    learningOutcomes: [
      "URDF/Xacro modeling of articulated arms & quadrotors",
      "Reinforcement Learning (PPO/SAC) for continuous robotic control",
      "Hardware-in-the-Loop (HIL) sim-to-real transfer methodologies",
    ],
  },
  {
    id: "visioncore-sdk",
    code: "SSAIR-IOT-401",
    title: "VisionCore Embedded Neural Perception SDK",
    tagline: "Sub-5ms micro-NPU computer vision runtime for tactical edge silicon",
    domain: "Embedded & IoT",
    track: "B.Tech / Capstone",
    status: "Mentorship Ready",
    imageUrl: "/images/products/visioncore-sdk.jpg",
    description:
      "Ultra-lightweight INT8 neural perception SDK optimized for Jetson, ARM Cortex, and Edge NPUs—engineered for real-time edge detection and IoT telemetry.",
    abstract:
      "VisionCore delivers deterministic, zero-copy camera-to-NPU inference pipelines without heavy OS bloat. Designed as both a commercial edge runtime and a premier B.Tech/M.Tech capstone architecture, it runs custom object detection, OCR, and MQTT/CAN alert triggers below 5ms.",
    technologies: ["Quantized ONNX", "TFLite Micro", "C++20", "FreeRTOS", "ESP32-S3", "MQTT"],
    metricLabel: "Edge Latency",
    metricValue: "4.8 ms",
    blockDiagram: [
      { stage: "01. DMA Capture", title: "Zero-Copy MIPI/CSI Buffer", detail: "Direct memory camera ingest" },
      { stage: "02. INT8 Engine", title: "Quantized Neural Runtime", detail: "Pruned MobileNet / YOLO-Tiny" },
      { stage: "03. RTOS Kernel", title: "FreeRTOS / Zephyr Tasking", detail: "Hard real-time watchdog thread" },
      { stage: "04. Telemetry", title: "Encrypted MQTT / CAN Out", detail: "Low-power edge alert payload" },
    ],
    specifications: [
      { label: "Model Footprint", value: "< 4.2 MB INT8 quantized weights" },
      { label: "Power Envelope", value: "1.8W – 7W ultra-low power" },
      { label: "Supported MCUs", value: "Jetson Nano/Orin, RPi 5, STM32N6, ESP32-S3" },
      { label: "Academic Kit", value: "Complete Source, Docs & IEEE Draft Guide" },
    ],
    learningOutcomes: [
      "Post-training INT8 quantization & neural pruning for edge MCUs",
      "Real-time FreeRTOS task scheduling and DMA camera pipelines",
      "End-to-end IoT cloud dashboard & encrypted telemetry protocols",
    ],
  },
  {
    id: "five-bar-capstone",
    code: "SSAIR-ROB-212",
    title: "5-Bar Parallel Mechanism Precision Kinematics Kit",
    tagline: "CAIR DRDO inspired closed-loop mechanism for M.Tech & B.Tech R&D",
    domain: "Robotics & Kinematics",
    track: "M.Tech / PhD R&D",
    status: "Mentorship Ready",
    imageUrl: "/images/products/titanarm-cobot.jpg",
    description:
      "Hands-on academic R&D platform implementing five-bar planar parallel kinematics, singularity avoidance, and dynamic torque estimation in MATLAB & ROS 2.",
    abstract:
      "Based directly on foundational CAIR DRDO manipulator studies, this research track equips M.Tech and PhD scholars with analytical forward/inverse kinematics, workspace Jacobian conditioning indices, real-time servo torque telemetry, and IEEE publication-grade experimental validation.",
    technologies: ["MATLAB/Simulink", "ROS 2", "Python", "SolidWorks", "FOC Stepper", "Eigen"],
    metricLabel: "Accuracy",
    metricValue: "0.05 mm",
    blockDiagram: [
      { stage: "01. Math Model", title: "Loop-Closure Kinematics", detail: "Analytical workspace & singularity map" },
      { stage: "02. Dynamics", title: "Lagrangian Torque Sizing", detail: "Peak motor load profile curves" },
      { stage: "03. Hardware", title: "Dual Base Servo Linkage", detail: "Low-inertia carbon linkages" },
      { stage: "04. Validation", title: "Encoder Trajectory Audit", detail: "IEEE paper graph export" },
    ],
    specifications: [
      { label: "DOF", value: "2-DOF / 3-DOF Planar Parallel Linkage" },
      { label: "Peak Speed", value: "4.5 m/s tip acceleration" },
      { label: "Target Level", value: "M.Tech Thesis, PhD & Final-Year B.Tech" },
      { label: "Support", value: "Mentored by Ex-DRDO & IISc Researchers" },
    ],
    learningOutcomes: [
      "Closed-loop kinematic chain analysis & Jacobian singularity avoidance",
      "Simulink-to-hardware real-time closed-loop control",
      "Experimental benchmarking & IEEE conference paper preparation",
    ],
  },
  {
    id: "agri-space-sentinel",
    code: "SSAIR-SPC-502",
    title: "Orbital & Smart-City AI Geospatial Intelligence",
    tagline: "Hyperspectral satellite segmentation & structural acoustic IoT mesh",
    domain: "Space & Civil AI",
    track: "B.Tech / Capstone",
    status: "Mentorship Ready",
    imageUrl: "/images/academy-lab.jpg",
    description:
      "Multi-spectral Sentinel satellite imagery segmentation for crop/flood mapping coupled with IoT acoustic vibration nodes for bridge structural health monitoring.",
    abstract:
      "This dual-domain research track bridges space earth-observation AI and smart civil infrastructure. Students build PyTorch U-Net/Transformer segmentation pipelines on Sentinel-2 satellite tiles alongside edge accelerometer anomaly detectors for continuous bridge/dam safety alerts.",
    technologies: ["PyTorch", "GDAL / Rasterio", "QGIS", "IoT Mesh", "Next.js", "PostGIS"],
    metricLabel: "IoU Score",
    metricValue: "94.2%",
    blockDiagram: [
      { stage: "01. Data Ingest", title: "Sentinel-2 + MEMS Sensors", detail: "Multi-band raster & vibration stream" },
      { stage: "02. AI Pipeline", title: "Geo-Transformer & FFT Net", detail: "Flood/crop mask & fatigue scoring" },
      { stage: "03. Spatial DB", title: "PostGIS Geo-Indexing", detail: "Time-series geospatial queries" },
      { stage: "04. Dashboard", title: "Interactive Alert GIS UI", detail: "Real-time municipal risk heatmap" },
    ],
    specifications: [
      { label: "Data Sources", value: "Sentinel-2 L2A + Live MQTT Sensors" },
      { label: "Model Family", value: "SegFormer + 1D-CNN Acoustic Classifier" },
      { label: "Eligibility", value: "B.Tech CSE/AI/Civil, M.Tech & MBA Tech" },
      { label: "Mentorship", value: "Full Source Code + Architecture Reviews" },
    ],
    learningOutcomes: [
      "Geospatial raster manipulation with Rasterio and GDAL",
      "Semantic segmentation & time-series vibration FFT analysis",
      "Building full-stack GIS command dashboards in Next.js",
    ],
  },
  {
    id: "drone-workshop-kit",
    code: "SSAIR-TRN-601",
    title: "Autonomous Drone Build & Edge AI Flight Bootcamp",
    tagline: "Hands-on carbon-fiber UAV fabrication, PX4 tuning & YOLO tracking lab",
    domain: "Defence & UAV",
    track: "Workshop & Training",
    status: "Mentorship Ready",
    imageUrl: "/images/products/aegis-uav-hex.jpg",
    description:
      "Intensive 5-day / 4-week practical workshop & internship where students assemble, calibrate, and fly an AI-enabled autonomous quadcopter from scratch.",
    abstract:
      "Engineered for engineering colleges, student innovators, and aspiring robotics instructors. Participants master ESC calibration, IMU/compass EKF2 tuning in PX4, Gazebo SITL simulation, and deploying real-time person/target tracking on an onboard companion computer.",
    technologies: ["PX4", "QGroundControl", "MAVSDK", "Gazebo SITL", "OpenCV", "Python"],
    metricLabel: "Hands-On Lab",
    metricValue: "100% Practical",
    blockDiagram: [
      { stage: "01. Airframe", title: "Carbon Frame & Powertrain", detail: "BLDC, ESC & battery safety wiring" },
      { stage: "02. Avionics", title: "Pixhawk + EKF2 Calibration", detail: "PID gain tuning & safety failsafes" },
      { stage: "03. Simulation", title: "Gazebo + ROS 2 SITL", detail: "Virtual autonomous waypoint missions" },
      { stage: "04. AI Flight", title: "MAVSDK Vision Tracking", detail: "Live aerial target lock flight test" },
    ],
    specifications: [
      { label: "Program Format", value: "5-Day Bootcamp or 6-Week Internship" },
      { label: "Certification", value: "SSAIR Industry & R&D Verified" },
      { label: "Location", value: "Bengaluru Indiranagar Lab / Campus" },
      { label: "Teaching Track", value: "Top performers qualify for Teaching Fellowship" },
    ],
    learningOutcomes: [
      "End-to-end multirotor assembly, thrust sizing & safety compliance",
      "Autonomous waypoint & offboard control using MAVSDK/ROS 2",
      "Live field testing & aerodynamic telemetry log analysis",
    ],
  },
];

export const ACADEMY_PROGRAMS: AcademyProgram[] = [
  {
    id: "ws-drone",
    type: "Workshop",
    title: "Autonomous UAV & Tactical Drone Engineering Lab",
    duration: "5 Days / 30 Hours",
    level: "B.Tech / M.Tech / Faculty",
    domain: "Drones & Avionics",
    badge: "Hands-On Flight Kit",
    highlights: [
      "Complete Pixhawk/PX4 assembly, sensor calibration & PID tuning",
      "Gazebo SITL simulation before real outdoor flight trials",
      "Onboard OpenCV & YOLO visual target tracking integration",
    ],
    deliverables: [
      "Industry Workshop Certificate (SSAIR)",
      "Complete PX4 & MAVSDK Reference Codebase",
      "Live Flight Telemetry Evaluation",
    ],
  },
  {
    id: "int-robotics",
    type: "Internship",
    title: "Industrial Robotics, ROS 2 & Edge AI Internship",
    duration: "4 Weeks / 8 Weeks / 6 Months",
    level: "Pre-Final & Final Year Students",
    domain: "Robotics & Computer Vision",
    badge: "DRDO-Lineage Mentorship",
    highlights: [
      "Work directly on ROS 2, MoveIt 2, LiDAR SLAM & Jetson edge inference",
      "Inverse kinematics & 5-bar parallel mechanism mathematical modeling",
      "Weekly code & hardware architecture reviews by senior scientists",
    ],
    deliverables: [
      "Verified Industrial Internship Certificate",
      "Deployed GitHub Portfolio & Hardware Demo",
      "Pre-Placement / Teaching Fellowship Interview",
    ],
  },
  {
    id: "phd-ieee",
    type: "PhD & IEEE R&D",
    title: "B.Tech / M.Tech / PhD & IEEE Research Mentorship",
    duration: "Flexible (Semester / Full Thesis)",
    level: "UG Capstone, PG & Research Scholars",
    domain: "All 18 Deep-Tech Domains",
    badge: "Publication & Hardware Support",
    highlights: [
      "Novel IEEE 2025–2027 topic discovery & mathematical formulation",
      "MATLAB/Simulink, Gazebo, PyTorch & HIL validation support",
      "End-to-end assistance for IEEE / Scopus journal drafting & architecture diagrams",
    ],
    deliverables: [
      "Custom Hardware/Software Working Model",
      "Comprehensive Project Report & Block Diagrams",
      "Viva-Voce Technical Training & Paper Support",
    ],
  },
  {
    id: "teach-fellow",
    type: "Teaching Fellowship",
    title: "SSAIR Technical Instructor & Teaching Fellowship",
    duration: "Part-Time / Full-Time / Cohort",
    level: "Graduates, M.Tech, PhD & Top Students",
    domain: "AI, ML, Robotics, Drones & Embedded",
    badge: "Apply via Student Portal",
    highlights: [
      "Mentor incoming engineering cohorts across India in AI & Robotics",
      "Co-lead campus workshops, lab hackathons & capstone reviews",
      "Collaborate with ex-DRDO & IISc researchers on curriculum & R&D",
    ],
    deliverables: [
      "Direct Application & Status Tracking in Student Dashboard",
      "Competitive Stipend / Faculty Honorarium",
      "Research Co-Authorship Opportunities",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Topic Formulation",
    subtitle: "Mission Alignment",
    description:
      "We define operational objectives—whether defense-grade UAV specifications or cutting-edge IEEE 2026–2027 M.Tech/PhD problem statements—establishing clear performance targets.",
    deliverable: "System Requirements & Abstract Spec",
  },
  {
    step: "02",
    title: "Mathematical & Kinematic Modeling",
    subtitle: "IISc Analytical Rigor",
    description:
      "Our engineers formulate state-space autopilots, closed-loop five-bar kinematics, singularity boundaries, and neural network topologies with proven mathematical stability.",
    deliverable: "6-DOF / Kinematics Blueprint",
  },
  {
    step: "03",
    title: "Digital Twin & AI Simulation",
    subtitle: "Virtual Validation",
    description:
      "Before cutting metal or deploying code, we validate algorithms in Gazebo, Isaac Sim, CARLA, and MATLAB/Simulink under synthetic sensor noise and dynamic obstacles.",
    deliverable: "Verified Simulation Benchmark",
  },
  {
    step: "04",
    title: "Hardware Fabrication & Edge AI",
    subtitle: "Indigenous Build",
    description:
      "Custom carbon-fiber frames, precision actuator assemblies, PCBs, FreeRTOS firmware, and quantized INT8 TensorRT models are built and integrated on physical edge compute.",
    deliverable: "Operational Hardware Prototype",
  },
  {
    step: "05",
    title: "HIL Testing & Field Trials",
    subtitle: "DRDO-Grade QA",
    description:
      "Rigorous Hardware-In-The-Loop stress tests, thermal & EMI checks, latency profiling, and field flight/drive trials guarantee flawless deterministic operation.",
    deliverable: "MIL-Spec / Field Validation Report",
  },
  {
    step: "06",
    title: "Deployment, Publication & Handover",
    subtitle: "Mission & Career Ready",
    description:
      "Full source handover, operator training, documentation, viva/review preparation, and IEEE/Scopus research publication guidance with continued post-delivery support.",
    deliverable: "Production Deployment & Docs",
  },
];

export const TECH_STACK_ROW_1 = [
  "ROS 2 Humble / Jazzy",
  "NVIDIA Jetson Orin",
  "YOLOv8 / v10 TensorRT",
  "PX4 & ArduPilot",
  "PyTorch & CUDA",
  "Three.js & WebGL",
  "MATLAB / Simulink",
  "MoveIt 2 & Gazebo",
  "3D LiDAR SLAM",
];

export const TECH_STACK_ROW_2 = [
  "FreeRTOS & Zephyr",
  "C++20 Real-Time",
  "Next.js & TypeScript",
  "FPGA & SDR Radio",
  "CARLA & Isaac Sim",
  "OpenCV DNN",
  "EtherCAT & CANopen",
  "Docker & Kubernetes",
  "VDA 5050 Fleet OS",
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Arjun Deshmukh",
    role: "M.Tech Robotics & Automation",
    affiliation: "Bengaluru Institute of Technology",
    quote:
      "Working on the Five-Bar Parallel Kinematics model under Dr. Dadireddy's guidance gave my thesis genuine DRDO-level analytical depth. The MATLAB-to-ROS2 validation helped us publish cleanly in IEEE.",
    category: "M.Tech / PhD Scholar",
  },
  {
    id: "t2",
    name: "Keerthana Reddy",
    role: "Computer Vision Intern → Teaching Fellow",
    affiliation: "SSAIR Academy Cohort",
    quote:
      "I joined as a student to learn edge YOLOv8 deployment on Jetson. Within two months of building real drone tracking pipelines, I applied through the student portal and now assist junior batches!",
    category: "B.Tech & Intern",
  },
  {
    id: "t3",
    name: "Vikramaditya Rao",
    role: "VP Automation Engineering",
    affiliation: "Precision Aerospace Supplier, Karnataka",
    quote:
      "SSAIR's integration of Sri Saraswathi AI software with TitanArm and VisionSort defect inspection cut our manual QA latency dramatically. Rare combination of indigenous hardware and deep AI.",
    category: "Industry & Defense",
  },
  {
    id: "t4",
    name: "Sneha Kulkarni",
    role: "PhD Research Scholar (Autonomous UAVs)",
    affiliation: "VTU Research Center",
    quote:
      "Their Gazebo SITL + Visual-Inertial Odometry simulation stack saved months of trial and error for my GPS-denied UAV navigation research.",
    category: "M.Tech / PhD Scholar",
  },
];
