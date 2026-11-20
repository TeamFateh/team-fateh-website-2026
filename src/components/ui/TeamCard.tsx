"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Zap, Wind, ShieldAlert, FileKey, Cpu, Activity, Hexagon, ScanLine, Compass, Disc, Flame } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
}

interface TeamCardProps {
    member: TeamMember;
    department?: string;
}

export default function TeamCard({ member, department = "" }: TeamCardProps) {
    const [imgSrc, setImgSrc] = useState(member.image || '/images/Team/placeholder.png');
    const [isHovered, setIsHovered] = useState(false);
    const dept = department.toLowerCase();

    // The Departments & Custom Member Roles
    const isBrakes = member.role.toLowerCase().includes("brake") || member.name.toLowerCase().includes("niladri");
    const isSood = member.name.toLowerCase().includes("aditya sood") || member.name.toLowerCase().includes("sood");
    const isAnirudh = member.name.toLowerCase().includes("anirudh");
    const isMannat = member.name.toLowerCase().includes("mannat");
    const isDravin = member.name.toLowerCase().includes("dravin");
    const isArnav = member.name.toLowerCase().includes("arnav");

    // Management stamp only for other leads/managers so customized leads keep clean faces
    const isManagement = (member.role.toLowerCase().includes("captain") || member.role.toLowerCase().includes("manager")) && !isBrakes && !isSood && !isAnirudh && !isMannat && !isDravin;
    const isStructures = dept.includes("structures");
    const isDynamics = dept.includes("dynamics");
    const isAero = dept.includes("aerodynamics");
    const isPowertrain = dept.includes("powertrain");
    const isElectronics = dept.includes("electronics");
    const isData = dept.includes("data");
    const isAuto = dept.includes("autonomous");
    const isDesign = member.role.toLowerCase().includes("design");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{ duration: 0.4 }}
            className="group relative w-full aspect-[3/4] overflow-hidden bg-secondary border border-white/5 hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-6"
        >
            {/* Round Image Container */}
            <div className="relative w-3/4 aspect-square mb-4 z-20">
                <div className={`relative w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 shadow-2xl ${
                    isBrakes
                        ? "group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]"
                        : isSood
                        ? "group-hover:border-sky-400 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.8)]"
                        : isAnirudh
                        ? "group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]"
                        : isMannat
                        ? "group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.7)]"
                        : isDravin
                        ? "group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
                        : isArnav
                        ? "group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
                        : "group-hover:border-primary/50"
                }`}>
                    <Image
                        src={imgSrc}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImgSrc('/images/Team/placeholder.png')}
                    />

                    {/* Overlay inside image */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                </div>


            </div>

            {/* ---------------- EASTER EGG LAYERS (Full Card) ---------------- */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {/* 1. Management: Classified Stamp */}
                {isManagement && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="border-4 border-red-600/80 text-red-600/80 px-4 py-2 font-display font-bold text-3xl -rotate-12 tracking-widest uppercase backdrop-blur-sm">
                            HQ CLEARANCE
                        </div>
                    </div>
                )}

                {/* 2. Structures & Composites: Carbon Hex Grid */}
                {isStructures && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none mix-blend-overlay flex flex-wrap gap-1 justify-center content-center overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <Hexagon key={i} size={48} className="text-gray-400 opacity-20" />
                        ))}
                    </div>
                )}

                {/* 3. Vehicle Dynamics: Cornering G-Force Reticle & Pitch/Roll */}
                {isDynamics && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden bg-black/40">
                        {/* Dynamic Grid Background */}
                        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-30 mix-blend-screen" />

                        {/* Rotating Outer Radar */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-red-500/20 rounded-full"
                        >
                            <div className="w-[1px] h-20 bg-gradient-to-t from-red-500/0 via-red-500/80 to-red-500/0 absolute top-0 left-1/2 -translate-x-1/2" />
                            <div className="w-20 h-[1px] bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 absolute top-1/2 left-0 -translate-y-1/2" />
                        </motion.div>

                        {/* Center Target & G-Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-dashed border-red-500/50 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                whileHover={{ x: 15, y: -10, scale: [1, 1.2, 1] }}
                                transition={{ type: "spring", stiffness: 150, repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(239,68,68,1)] border border-red-300 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>

                        {/* Top Right Live Stats Box */}
                        <div className="absolute top-4 right-4 border border-red-500/40 bg-black/60 backdrop-blur-sm p-2 text-[10px] font-mono text-red-400">
                            <div className="flex justify-between gap-4 mb-1"><span>STATUS:</span><span className="text-green-400 animate-pulse">NOMINAL</span></div>
                            <div className="flex justify-between gap-4"><span>PITCH:</span><motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.3 }}>-1.2°</motion.span></div>
                            <div className="flex justify-between gap-4"><span>ROLL:</span><motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>+0.4°</motion.span></div>
                        </div>

                        {/* Bottom Left G-Meter Text */}
                        <div className="absolute bottom-24 left-4 text-red-500 font-mono text-xs font-bold tracking-widest flex items-center gap-2 bg-black/50 px-2 py-1 border-l-2 border-red-500">
                            <Activity size={14} className="animate-pulse" /> LAT: 2.1G
                        </div>

                        {/* Scanning Horizons */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <motion.div
                            initial={{ y: "100%" }}
                            whileHover={{ y: "-100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,1)]"
                        />
                    </div>
                )}

                {/* 4. Aerodynamics: Wind Tunnel Streamlines */}
                {isAero && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[2px] bg-blue-300 w-full rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]"
                                style={{ top: `${15 + i * 15}%` }}
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 1.5 + (i * 0.2), ease: "linear", delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                )}

                {/* 5. Powertrain: Heat/Combustion Element */}
                {isPowertrain && (
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen">
                        <Zap className="absolute top-4 right-4 text-orange-400 animate-pulse" size={24} fill="currentColor" />
                    </div>
                )}

                {/* 6. Electronics: PCB Traces */}
                {isElectronics && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[url('/images/grid.png')] bg-cover mix-blend-overlay">
                        <Cpu className="absolute top-4 right-4 text-green-400 animate-pulse" size={24} />
                        <div className="absolute bottom-1/2 left-0 w-full h-[1px] bg-green-500/50 shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-green-500/50 shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                    </div>
                )}

                {/* 7. Data Acquisition: Live Telemetry */}
                {isData && (
                    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-mono text-xs text-cyan-400 space-y-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.2 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                                <div>
                                    <span className="opacity-50">0x{Math.floor(Math.random() * 1000).toString(16)} </span>
                                    <ScanLine size={14} className="inline mr-1" /> ACTIVE FEED
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 8. Autonomous Systems: LiDAR Scan */}
                {isAuto && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <ScanLine className="absolute top-4 right-4 text-fuchsia-500 animate-pulse" size={24} />
                        <motion.div
                            initial={{ height: 0 }}
                            whileHover={{ height: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full border-b-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] bg-fuchsia-500/10"
                        />
                    </div>
                )}

                {/* 9. Chief Design Engineer: CAD Blueprint */}
                {isDesign && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-blue-950/80 mix-blend-hard-light overflow-hidden">
                        {/* Blueprint Grid */}
                        <div className="absolute inset-0"
                            style={{
                                backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }}
                        />
                        {/* Rotating Compass / CAD Element */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 90 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <Compass className="text-blue-400 opacity-60 w-32 h-32" />
                        </motion.div>
                        {/* Measurement Lines */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "80%" }}
                            transition={{ duration: 1 }}
                            className="absolute top-8 left-4 h-[1px] bg-blue-400/80"
                        />
                        <div className="absolute top-4 left-4 text-blue-300 font-mono text-[10px]">
                            <span className="animate-pulse">DRAWING MODE</span><br />
                            X: 231.42<br />
                            Y: 89.21<br />
                            Z: 14.05<br />
                            SCALE: 1:1
                        </div>
                    </div>
                )}

                {/* 10. Brakes & Scrutineering: Subtle thermal gradient (Niladri Chakraborty) */}
                {isBrakes && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                        {/* Thermal Heat Radial Ambient Glow - Face remains completely clear */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18)_0%,transparent_70%)]" />
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                    </div>
                )}

                {/* Bottom Gradient for text readability */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>
            {/* ---------------- END EASTER EGGS ---------------- */}

            {/* Content (Text Below Image) */}
            <div className="relative z-20 w-full mt-auto flex flex-col items-center">
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 text-center ${
                    isElectronics || isData
                        ? "text-green-400"
                        : isAero || isArnav
                        ? "text-cyan-400 font-semibold"
                        : isAuto
                        ? "text-fuchsia-400"
                        : isBrakes
                        ? "text-red-400 font-semibold"
                        : isSood
                        ? "text-sky-400 font-semibold"
                        : isAnirudh
                        ? "text-amber-400 font-semibold"
                        : isMannat
                        ? "text-emerald-400 font-semibold"
                        : isDravin
                        ? "text-blue-400 font-semibold"
                        : "text-primary"
                }`}>
                    {member.role}
                </p>
                <h3 className="text-xl font-display font-medium text-white mb-4 text-center">
                    {member.name}
                </h3>

                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground hover:text-white transition-colors"
                        data-cursor="hover"
                    >
                        <Linkedin size={14} />
                        <span>CONNECT</span>
                    </a>
                )}
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary transition-all duration-300 z-30" />

            {/* Custom Bottom-of-Window Micro Easter Eggs for Core Team Leaders */}
            <AnimatePresence>
                {/* 1. Niladri Chakraborty: Rolling Race Wheel with ISR Brake Caliper */}
                {isBrakes && isHovered && (
                    <motion.div
                        key="niladri-rolling-wheel"
                        initial={{ x: "-180px", opacity: 0 }}
                        animate={{ x: 36, opacity: 1 }}
                        exit={{ x: "105vw", opacity: 0.9 }}
                        transition={{
                            x: { type: "spring", damping: 18, stiffness: 95, mass: 0.85 },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-0 z-[9999] pointer-events-none flex items-center gap-3.5 select-none"
                    >
                        <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
                            <motion.div
                                initial={{ rotate: -540 }}
                                animate={{ rotate: 0 }}
                                exit={{ rotate: 1440 }}
                                transition={{ rotate: { type: "spring", damping: 18, stiffness: 95, mass: 0.85 } }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="50" cy="50" r="48" fill="#141416" stroke="#27272a" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="#09090b" strokeWidth="4" />
                                    <text x="50" y="13" textAnchor="middle" fill="#eab308" fontSize="5.5" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">FATEH</text>
                                    <text x="50" y="93" textAnchor="middle" fill="#eab308" fontSize="5.5" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">RACING</text>
                                    <circle cx="50" cy="50" r="32" fill="#1c1917" stroke="#78716c" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="26" fill="#292524" stroke="#ef4444" strokeWidth="1.5" className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                                    <circle cx="50" cy="50" r="22" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeDasharray="3 3" />
                                    <line x1="50" y1="18" x2="50" y2="82" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="22" y1="34" x2="78" y2="66" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="22" y1="66" x2="78" y2="34" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="50" cy="50" r="9" fill="#0c0a09" stroke="#ef4444" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="4" fill="#ef4444" />
                                </svg>
                            </motion.div>
                            <div className="absolute top-1 right-1 w-6 h-7 bg-gradient-to-br from-red-600 to-red-700 border border-red-400 rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.9)] flex items-center justify-center rotate-45 pointer-events-none">
                                <span className="text-[7px] font-mono font-black text-white tracking-wider">ISR</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. Aditya Sood: Thor's Hammer (Mjölnir) Slamming Down with Lightning Arcs */}
                {isSood && isHovered && (
                    <motion.div
                        key="sood-thors-hammer"
                        initial={{ y: "-120vh", opacity: 0, rotate: -25 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: "-120vh", opacity: 0, rotate: 35 }}
                        transition={{
                            y: { type: "spring", stiffness: 190, damping: 14, mass: 0.9 },
                            opacity: { duration: 0.15 }
                        }}
                        className="fixed bottom-6 left-8 z-[9999] pointer-events-none flex items-center gap-3 select-none"
                    >
                        <div className="relative w-16 h-20 md:w-20 md:h-24 drop-shadow-[0_0_25px_rgba(56,189,248,0.85)]">
                            <svg viewBox="0 0 100 120" className="w-full h-full">
                                <rect x="20" y="20" width="60" height="34" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="2.5" />
                                <rect x="24" y="24" width="52" height="26" fill="#475569" />
                                <polygon points="20,20 24,24 24,50 20,54" fill="#334155" />
                                <polygon points="80,20 76,24 76,50 80,54" fill="#94a3b8" />
                                <rect x="46" y="54" width="8" height="50" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                                <line x1="46" y1="64" x2="54" y2="64" stroke="#cbd5e1" strokeWidth="1.5" />
                                <line x1="46" y1="74" x2="54" y2="74" stroke="#cbd5e1" strokeWidth="1.5" />
                                <line x1="46" y1="84" x2="54" y2="84" stroke="#cbd5e1" strokeWidth="1.5" />
                                <line x1="46" y1="94" x2="54" y2="94" stroke="#cbd5e1" strokeWidth="1.5" />
                                <rect x="44" y="104" width="12" height="6" rx="2" fill="#94a3b8" />
                                <path d="M 50 110 Q 58 118 46 120" stroke="#78350f" strokeWidth="2" fill="none" />
                                <circle cx="50" cy="37" r="4" fill="#38bdf8" className="animate-ping" />
                                <path d="M 12 16 L 22 28 L 16 36 L 26 42" stroke="#38bdf8" strokeWidth="2" fill="none" className="animate-pulse" />
                                <path d="M 88 16 L 78 28 L 84 36 L 74 42" stroke="#38bdf8" strokeWidth="2" fill="none" className="animate-pulse" />
                            </svg>
                        </div>
                        <div className="bg-black/90 border border-sky-400/60 backdrop-blur-md px-3 py-1.5 rounded-lg font-mono text-[11px] md:text-xs text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                            <span className="font-bold text-white tracking-wider">MJÖLNIR // 400V</span>
                            <span className="text-white/30">|</span>
                            <span className="text-amber-300 font-bold">GOD OF THUNDER</span>
                        </div>
                    </motion.div>
                )}

                {/* 3. Anirudh Tanikella: Precision Ratcheting Torque Wrench (Structures Lead) */}
                {isAnirudh && isHovered && (
                    <motion.div
                        key="anirudh-torque-wrench"
                        initial={{ x: "-180px", opacity: 0, rotate: -15 }}
                        animate={{ x: 36, opacity: 1, rotate: 0 }}
                        exit={{ x: "105vw", opacity: 0 }}
                        transition={{
                            x: { type: "spring", damping: 18, stiffness: 95 },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-0 z-[9999] pointer-events-none flex items-center gap-3 select-none"
                    >
                        <div className="relative w-24 h-16 md:w-28 md:h-18 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                            <svg viewBox="0 0 120 70" className="w-full h-full">
                                <rect x="30" y="30" width="80" height="10" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                                <rect x="75" y="27" width="38" height="16" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                                <line x1="82" y1="27" x2="82" y2="43" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                                <line x1="90" y1="27" x2="90" y2="43" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                                <line x1="98" y1="27" x2="98" y2="43" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                                <circle cx="25" cy="35" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                                <circle cx="25" cy="35" r="8" fill="#334155" />
                                <polygon points="25,29 30,32 30,38 25,41 20,38 20,32" fill="#f59e0b" />
                                <rect x="42" y="26" width="28" height="18" rx="2" fill="#09090b" stroke="#f59e0b" strokeWidth="1" />
                                <text x="56" y="38" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="bold" fontFamily="monospace">65.0</text>
                                <text x="56" y="43" textAnchor="middle" fill="#e2e8f0" fontSize="3.5" fontFamily="monospace">N·m</text>
                            </svg>
                        </div>
                        <div className="bg-black/90 border border-amber-500/60 backdrop-blur-md px-3 py-1.5 rounded-lg font-mono text-[11px] md:text-xs text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="font-bold text-white tracking-wider">CHASSIS TORQUE</span>
                            <span className="text-white/30">|</span>
                            <span className="text-emerald-400 font-bold">65 N·m // SPEC OK</span>
                        </div>
                    </motion.div>
                )}

                {/* 4. Mannat Goyal: Pit Wall Radio (Team Manager) */}
                {isMannat && isHovered && (
                    <motion.div
                        key="mannat-pit-radio"
                        initial={{ y: "100px", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "120px", opacity: 0 }}
                        transition={{
                            y: { type: "spring", damping: 18, stiffness: 100 },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-8 z-[9999] pointer-events-none flex items-center gap-3 select-none"
                    >
                        <div className="relative w-14 h-22 md:w-16 md:h-24 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                            <svg viewBox="0 0 70 110" className="w-full h-full">
                                <line x1="20" y1="35" x2="20" y2="8" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                                <circle cx="20" cy="8" r="3" fill="#ef4444" className="animate-ping" />
                                <rect x="36" y="22" width="10" height="8" rx="1" fill="#475569" />
                                <rect x="10" y="30" width="50" height="75" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                                <rect x="18" y="38" width="34" height="20" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                                <text x="35" y="47" textAnchor="middle" fill="#34d399" fontSize="5.5" fontWeight="bold" fontFamily="monospace">CH 01</text>
                                <text x="35" y="54" textAnchor="middle" fill="#6ee7b7" fontSize="4" fontFamily="monospace">TX LIVE</text>
                                <line x1="22" y1="68" x2="48" y2="68" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                                <line x1="22" y1="74" x2="48" y2="74" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                                <line x1="22" y1="80" x2="48" y2="80" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
                                <rect x="6" y="48" width="4" height="18" rx="1" fill="#ef4444" />
                            </svg>
                        </div>
                        <div className="bg-black/90 border border-emerald-500/60 backdrop-blur-md px-3.5 py-2 rounded-lg font-mono text-[11px] md:text-xs text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2.5 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="font-bold text-white tracking-wider">PIT COMMS</span>
                            <span className="text-white/30">|</span>
                            <span className="text-emerald-300 font-bold">&quot;BOX THIS LAP // P1&quot;</span>
                        </div>
                    </motion.div>
                )}

                {/* 5. Dravin Chawla: TIG Welding Torch with Arc Sparks (Manufacturing Lead) */}
                {isDravin && isHovered && (
                    <motion.div
                        key="dravin-tig-torch"
                        initial={{ x: "-180px", opacity: 0, rotate: 12 }}
                        animate={{ x: 36, opacity: 1, rotate: 0 }}
                        exit={{ x: "105vw", opacity: 0 }}
                        transition={{
                            x: { type: "spring", damping: 18, stiffness: 95 },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-0 z-[9999] pointer-events-none flex items-center gap-3 select-none"
                    >
                        <div className="relative w-22 h-16 md:w-26 md:h-18 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                            <svg viewBox="0 0 110 70" className="w-full h-full">
                                <rect x="40" y="32" width="65" height="12" rx="3" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
                                <line x1="55" y1="32" x2="55" y2="44" stroke="#3f3f46" strokeWidth="1.5" />
                                <line x1="70" y1="32" x2="70" y2="44" stroke="#3f3f46" strokeWidth="1.5" />
                                <polygon points="40,32 30,32 20,40 24,46 38,40 40,38" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                                <polygon points="20,40 10,48 14,54 24,46" fill="#f43f5e" stroke="#fb7185" strokeWidth="1" />
                                <line x1="12" y1="51" x2="4" y2="58" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="4" cy="58" r="4" fill="#60a5fa" className="animate-ping" />
                                <circle cx="4" cy="58" r="2" fill="#ffffff" />
                                <line x1="4" y1="58" x2="-2" y2="52" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
                                <line x1="4" y1="58" x2="1" y2="66" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
                            </svg>
                        </div>
                        <div className="bg-black/90 border border-blue-500/60 backdrop-blur-md px-3 py-1.5 rounded-lg font-mono text-[11px] md:text-xs text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.35)] flex items-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            <span className="font-bold text-white tracking-wider">TIG WELDING</span>
                            <span className="text-white/30">|</span>
                            <span className="text-cyan-300 font-bold">4130 CHROMOLY // ±0.005mm</span>
                        </div>
                    </motion.div>
                )}

                {/* 6. Arnav Gautam: Carbon Rear Wing with Opening DRS (Aerodynamics Lead) */}
                {isArnav && isHovered && (
                    <motion.div
                        key="arnav-aero-drs"
                        initial={{ x: "-180px", opacity: 0 }}
                        animate={{ x: 36, opacity: 1 }}
                        exit={{ x: "105vw", opacity: 0 }}
                        transition={{
                            x: { type: "spring", damping: 18, stiffness: 95 },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-0 z-[9999] pointer-events-none flex items-center gap-3 select-none"
                    >
                        <div className="relative w-22 h-16 md:w-26 md:h-18 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                            <svg viewBox="0 0 110 70" className="w-full h-full">
                                <polygon points="15,10 95,10 85,55 20,55" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
                                <line x1="20" y1="20" x2="90" y2="20" stroke="#27272a" strokeWidth="1" />
                                <line x1="20" y1="30" x2="87" y2="30" stroke="#27272a" strokeWidth="1" />
                                <path d="M 28 35 Q 55 28 80 34 Q 55 38 28 35 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                                <path d="M 32 20 Q 55 12 76 18 Q 55 24 32 20 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-18 55 18)" />
                                <line x1="55" y1="18" x2="55" y2="34" stroke="#f43f5e" strokeWidth="2" />
                                <circle cx="55" cy="26" r="2.5" fill="#f43f5e" />
                                <path d="M 5 22 Q 30 16 95 16" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-pulse" />
                                <path d="M 5 36 Q 35 30 98 32" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-pulse" />
                            </svg>
                        </div>
                        <div className="bg-black/90 border border-cyan-500/60 backdrop-blur-md px-3 py-1.5 rounded-lg font-mono text-[11px] md:text-xs text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span className="font-bold text-white tracking-wider">DRS OPEN</span>
                            <span className="text-white/30">|</span>
                            <span className="text-cyan-300 font-bold">DOWNFORCE: 850N</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
