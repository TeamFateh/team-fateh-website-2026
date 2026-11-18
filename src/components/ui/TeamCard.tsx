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

    // The Departments & Roles
    const isBrakes = member.role.toLowerCase().includes("brake") || member.name.toLowerCase().includes("niladri");
    const isManagement = (member.role.toLowerCase().includes("captain") || member.role.toLowerCase().includes("manager")) && !isBrakes;
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

                {/* Subtle corner badge on card for Brakes Lead */}
                {isBrakes && (
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                        <span className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-red-600/30 border border-red-500 text-red-300 backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.5)] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            BRAKES // 1,450 PSI
                        </span>
                    </div>
                )}
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
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 text-center
                    ${isElectronics || isData ? "text-green-400" : isAero ? "text-blue-400" : isAuto ? "text-fuchsia-400" : isBrakes ? "text-red-400 font-semibold" : "text-primary"}
                `}>
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

            {/* Rolling Wheel Easter Egg at the bottom of the window for Niladri / Brakes */}
            <AnimatePresence>
                {isBrakes && isHovered && (
                    <motion.div
                        key="niladri-rolling-wheel"
                        initial={{ x: "-180px", opacity: 0 }}
                        animate={{ x: 36, opacity: 1 }}
                        exit={{ x: "105vw", opacity: 0.9 }}
                        transition={{
                            x: {
                                type: "spring",
                                damping: 18,
                                stiffness: 95,
                                mass: 0.85
                            },
                            opacity: { duration: 0.2 }
                        }}
                        className="fixed bottom-6 left-0 z-[9999] pointer-events-none flex items-center gap-3.5 select-none"
                    >
                        {/* Wheel Container */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
                            {/* Spinning Tyre & Rim */}
                            <motion.div
                                initial={{ rotate: -540 }}
                                animate={{ rotate: 0 }}
                                exit={{ rotate: 1440 }}
                                transition={{
                                    rotate: {
                                        type: "spring",
                                        damping: 18,
                                        stiffness: 95,
                                        mass: 0.85
                                    }
                                }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    {/* Outer Slick Racing Tyre */}
                                    <circle cx="50" cy="50" r="48" fill="#141416" stroke="#27272a" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="#09090b" strokeWidth="4" />
                                    
                                    {/* Tyre Sidewall Branding */}
                                    <text x="50" y="13" textAnchor="middle" fill="#eab308" fontSize="5.5" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">FATEH</text>
                                    <text x="50" y="93" textAnchor="middle" fill="#eab308" fontSize="5.5" fontWeight="900" fontFamily="monospace" letterSpacing="1.2">RACING</text>

                                    {/* Rim / Alloy wheel */}
                                    <circle cx="50" cy="50" r="32" fill="#1c1917" stroke="#78716c" strokeWidth="2" />

                                    {/* Drilled Ventilated Brake Rotor with red thermal edge */}
                                    <circle cx="50" cy="50" r="26" fill="#292524" stroke="#ef4444" strokeWidth="1.5" className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                                    <circle cx="50" cy="50" r="22" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeDasharray="3 3" />

                                    {/* 6-Spoke Racing Wheel Design */}
                                    <line x1="50" y1="18" x2="50" y2="82" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="22" y1="34" x2="78" y2="66" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="22" y1="66" x2="78" y2="34" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />

                                    {/* Center Hub Nut */}
                                    <circle cx="50" cy="50" r="9" fill="#0c0a09" stroke="#ef4444" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="4" fill="#ef4444" />
                                </svg>
                            </motion.div>

                            {/* Stationary Red Caliper Clamped on Top Right */}
                            <div className="absolute top-1 right-1 w-6 h-7 bg-gradient-to-br from-red-600 to-red-700 border border-red-400 rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.9)] flex items-center justify-center rotate-45 pointer-events-none">
                                <span className="text-[6px] font-mono font-black text-white tracking-tighter">WILWOOD</span>
                            </div>
                        </div>

                        {/* Sleek Telemetry Pill beside the wheel */}
                        <motion.div
                            initial={{ opacity: 0, x: -15, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.95 }}
                            transition={{ delay: 0.1 }}
                            className="bg-black/90 border border-red-500/60 backdrop-blur-md px-3.5 py-2 rounded-lg font-mono text-[11px] md:text-xs text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center gap-2.5 whitespace-nowrap"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span className="font-bold text-white tracking-wider">4-WHEEL LOCKUP</span>
                            <span className="text-white/30">|</span>
                            <span className="text-emerald-400 font-bold">1,450 PSI</span>
                            <span className="text-white/30">|</span>
                            <span className="text-amber-400 font-bold">54:46 BIAS</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
