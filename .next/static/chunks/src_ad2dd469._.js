(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/smartMeter.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "connectSmartMeter": (()=>connectSmartMeter),
    "disconnectSmartMeter": (()=>disconnectSmartMeter),
    "getAvailableProtocols": (()=>getAvailableProtocols),
    "getRealTimeData": (()=>getRealTimeData),
    "validateConfig": (()=>validateConfig)
});
async function connectSmartMeter(config) {
    return new Promise((resolve, reject)=>{
        // Simulate connection delay based on protocol
        const connectionDelay = config.protocol === "zigbee" ? 1000 : config.protocol === "p1" ? 500 : 800;
        setTimeout(()=>{
            // Simulate 95% success rate for realistic testing
            if (Math.random() < 0.95) {
                const connection = {
                    protocol: config.protocol,
                    connected: true,
                    deviceId: `SM-${config.protocol.toUpperCase()}-${Math.random().toString(36).substr(2, 6)}`,
                    signalStrength: Math.floor(Math.random() * 40) + 60 // 60-100%
                };
                resolve(connection);
            } else {
                const errorMessages = {
                    zigbee: "Zigbee network unreachable. Check coordinator connection.",
                    p1: "P1 port communication failed. Verify cable connection.",
                    wireless: "Wireless signal too weak. Move closer to smart meter."
                };
                reject(new Error(errorMessages[config.protocol]));
            }
        }, connectionDelay);
    });
}
async function getRealTimeData(connection) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (!connection.connected) {
                reject(new Error("Smart meter not connected"));
                return;
            }
            // Simulate occasional data retrieval failures
            if (Math.random() < 0.05) {
                reject(new Error("Data retrieval timeout. Smart meter may be busy."));
                return;
            }
            // Generate realistic energy data with some variation
            const baseUsage = 2.5 + Math.sin(Date.now() / 60000) * 1.5; // Varies over time
            const currentUsage = Math.max(0.5, baseUsage + (Math.random() - 0.5) * 0.8);
            // Calculate costs based on time of day (peak vs off-peak)
            const hour = new Date().getHours();
            const isPeakHour = hour >= 14 && hour <= 18 || hour >= 19 && hour <= 21;
            const ratePerKwh = isPeakHour ? 0.35 : 0.22;
            const appliances = [
                {
                    name: "Air Conditioning",
                    usage: parseFloat((currentUsage * 0.4 + Math.random() * 0.3).toFixed(1)),
                    cost: 0,
                    efficiency: currentUsage > 4 ? "low" : "medium"
                },
                {
                    name: "Water Heater",
                    usage: parseFloat((0.8 + Math.random() * 0.4).toFixed(1)),
                    cost: 0,
                    efficiency: "medium"
                },
                {
                    name: "Refrigerator",
                    usage: parseFloat((0.3 + Math.random() * 0.2).toFixed(1)),
                    cost: 0,
                    efficiency: "high"
                },
                {
                    name: "Lighting",
                    usage: parseFloat((0.2 + Math.random() * 0.3).toFixed(1)),
                    cost: 0,
                    efficiency: "high"
                },
                {
                    name: "Electronics",
                    usage: parseFloat((0.4 + Math.random() * 0.2).toFixed(1)),
                    cost: 0,
                    efficiency: "medium"
                }
            ];
            // Calculate individual appliance costs
            appliances.forEach((appliance)=>{
                appliance.cost = parseFloat((appliance.usage * ratePerKwh * 24).toFixed(2));
            });
            const todaysCost = parseFloat((currentUsage * ratePerKwh * 24).toFixed(2));
            const co2Emissions = parseFloat((currentUsage * 0.85 * 24).toFixed(1)); // kg CO2 per kWh
            const data = {
                currentUsage: parseFloat(currentUsage.toFixed(1)),
                todaysCost,
                co2Emissions,
                appliances: appliances.sort((a, b)=>b.usage - a.usage).slice(0, 3),
                timestamp: new Date(),
                peakPeriodActive: isPeakHour,
                gridDemand: currentUsage > 4 ? "high" : currentUsage > 2.5 ? "medium" : "low"
            };
            resolve(data);
        }, 300);
    });
}
async function disconnectSmartMeter(connection) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            connection.connected = false;
            resolve();
        }, 200);
    });
}
function getAvailableProtocols() {
    return [
        "zigbee",
        "p1",
        "wireless"
    ];
}
function validateConfig(config) {
    const errors = [];
    if (!config.protocol) {
        errors.push("Protocol is required");
    }
    if (config.protocol === "p1" && !config.port) {
        errors.push("P1 protocol requires port specification");
    }
    if (config.protocol === "zigbee" && !config.deviceAddress) {
        errors.push("Zigbee protocol requires device address");
    }
    return errors;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useSmartMeter.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSmartMeter": (()=>useSmartMeter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/smartMeter.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useSmartMeter(options = {}) {
    _s();
    const { protocol = "zigbee", autoConnect = true, pollingInterval = 5000, maxRetries = 3 } = options;
    const [connection, setConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const retryCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Connect to smart meter
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSmartMeter.useCallback[connect]": async (config)=>{
            if (connecting) return;
            setConnecting(true);
            setError(null);
            const connectionConfig = config || {
                protocol,
                deviceAddress: protocol === "zigbee" ? "0x001234567890ABCD" : undefined,
                port: protocol === "p1" ? "/dev/ttyUSB0" : undefined,
                baudRate: protocol === "p1" ? 115200 : undefined
            };
            try {
                const newConnection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectSmartMeter"])(connectionConfig);
                if (!mountedRef.current) return;
                setConnection(newConnection);
                retryCountRef.current = 0;
                // Fetch initial data
                await fetchData(newConnection);
            } catch (err) {
                if (!mountedRef.current) return;
                const errorMessage = err instanceof Error ? err.message : "Connection failed";
                setError(errorMessage);
                // Retry logic
                if (retryCountRef.current < maxRetries) {
                    retryCountRef.current++;
                    setTimeout({
                        "useSmartMeter.useCallback[connect]": ()=>{
                            if (mountedRef.current) {
                                connect(connectionConfig);
                            }
                        }
                    }["useSmartMeter.useCallback[connect]"], 2000 * retryCountRef.current); // Exponential backoff
                }
            } finally{
                if (mountedRef.current) {
                    setConnecting(false);
                }
            }
        }
    }["useSmartMeter.useCallback[connect]"], [
        connecting,
        protocol,
        maxRetries
    ]);
    // Disconnect from smart meter
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSmartMeter.useCallback[disconnect]": async ()=>{
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (connection) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disconnectSmartMeter"])(connection);
                } catch (err) {
                    console.warn("Error during disconnect:", err);
                }
            }
            setConnection(null);
            setData(null);
            setError(null);
            setLastUpdated(null);
        }
    }["useSmartMeter.useCallback[disconnect]"], [
        connection
    ]);
    // Fetch data from smart meter
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSmartMeter.useCallback[fetchData]": async (conn)=>{
            const activeConnection = conn || connection;
            if (!activeConnection || !activeConnection.connected) return;
            setLoading(true);
            setError(null);
            try {
                const newData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRealTimeData"])(activeConnection);
                if (!mountedRef.current) return;
                setData(newData);
                setLastUpdated(new Date());
                retryCountRef.current = 0; // Reset retry count on successful fetch
            } catch (err) {
                if (!mountedRef.current) return;
                const errorMessage = err instanceof Error ? err.message : "Data fetch failed";
                setError(errorMessage);
                // If it's a connection error, try to reconnect
                if (errorMessage.includes("not connected") && retryCountRef.current < maxRetries) {
                    retryCountRef.current++;
                    setTimeout({
                        "useSmartMeter.useCallback[fetchData]": ()=>{
                            if (mountedRef.current) {
                                connect();
                            }
                        }
                    }["useSmartMeter.useCallback[fetchData]"], 1000);
                }
            } finally{
                if (mountedRef.current) {
                    setLoading(false);
                }
            }
        }
    }["useSmartMeter.useCallback[fetchData]"], [
        connection,
        connect,
        maxRetries
    ]);
    // Refresh data manually
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSmartMeter.useCallback[refresh]": async ()=>{
            await fetchData();
        }
    }["useSmartMeter.useCallback[refresh]"], [
        fetchData
    ]);
    // Clear error
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSmartMeter.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useSmartMeter.useCallback[clearError]"], []);
    // Auto-connect on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmartMeter.useEffect": ()=>{
            if (autoConnect) {
                connect();
            }
            return ({
                "useSmartMeter.useEffect": ()=>{
                    mountedRef.current = false;
                }
            })["useSmartMeter.useEffect"];
        }
    }["useSmartMeter.useEffect"], [
        autoConnect,
        connect
    ]);
    // Set up polling interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmartMeter.useEffect": ()=>{
            if (connection && connection.connected && !intervalRef.current) {
                intervalRef.current = setInterval({
                    "useSmartMeter.useEffect": ()=>{
                        fetchData();
                    }
                }["useSmartMeter.useEffect"], pollingInterval);
            }
            return ({
                "useSmartMeter.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            })["useSmartMeter.useEffect"];
        }
    }["useSmartMeter.useEffect"], [
        connection,
        fetchData,
        pollingInterval
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSmartMeter.useEffect": ()=>{
            return ({
                "useSmartMeter.useEffect": ()=>{
                    mountedRef.current = false;
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["useSmartMeter.useEffect"];
        }
    }["useSmartMeter.useEffect"], []);
    return {
        connection,
        data,
        error,
        loading,
        connecting,
        lastUpdated,
        connect,
        disconnect,
        refresh,
        clearError
    };
}
_s(useSmartMeter, "mVTNXLlX2dMjEx/S6SRz9wv33Jo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileRealTimeDashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileRealTimeDashboard": (()=>MobileRealTimeDashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSmartMeter.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function MobileRealTimeDashboard() {
    _s();
    const { data, error, loading, connecting, connection, lastUpdated, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"])({
        protocol: "zigbee",
        autoConnect: true,
        pollingInterval: 5000
    });
    const getUsagePercentage = (usage)=>{
        // Calculate percentage based on typical household max usage (6kW)
        return Math.min(usage / 6 * 100, 100);
    };
    const getUsageColor = (usage)=>{
        if (usage > 4) return "bg-red-500";
        if (usage > 2.5) return "bg-yellow-500";
        return "bg-green-500";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg p-4 shadow-sm border",
        style: {
            backgroundColor: 'var(--wattwise-yellow)',
            borderColor: 'var(--wattwise-green)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        style: {
                            color: 'var(--wattwise-green)'
                        },
                        children: "Energy Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    connection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full ${connection.connected ? 'bg-green-500' : 'bg-red-500'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                style: {
                                    color: 'var(--wattwise-green)'
                                },
                                children: connection.protocol.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            connecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block animate-spin rounded-full h-6 w-6 border-b-2",
                        style: {
                            borderColor: 'var(--wattwise-green)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-2",
                        style: {
                            color: 'var(--wattwise-green)'
                        },
                        children: "Connecting to Smart Meter..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this),
            error && !connecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600 font-medium",
                        children: "Connection Error"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-500 mt-1",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refresh,
                        className: "text-xs text-red-600 underline mt-2 hover:text-red-800",
                        children: "Retry Connection"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            !connecting && !error && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 p-3 rounded-lg",
                        style: {
                            backgroundColor: 'var(--wattwise-cream)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "Current Usage"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: [
                                                    data.currentUsage.toFixed(1),
                                                    " kW"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this),
                                            data.peakPeriodActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-orange-600 font-medium",
                                                children: "Peak Period"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full rounded-full h-2",
                                style: {
                                    backgroundColor: 'var(--wattwise-green)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-2 rounded-full transition-all duration-500 ${getUsageColor(data.currentUsage)}`,
                                    style: {
                                        width: `${getUsagePercentage(data.currentUsage)}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs mt-1",
                                style: {
                                    color: 'var(--wattwise-green)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Grid Demand: ",
                                            data.gridDemand
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            getUsagePercentage(data.currentUsage).toFixed(0),
                                            "% of max"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg text-center",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: [
                                            "$",
                                            data.todaysCost.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "Today's Cost"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    data.peakPeriodActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-orange-600 mt-1",
                                        children: "Peak Rate Active"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg text-center",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: [
                                            data.co2Emissions.toFixed(1),
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "CO₂ Today"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mt-1",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: [
                                            (data.co2Emissions / data.currentUsage).toFixed(1),
                                            " kg/kWh"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium mb-2",
                                style: {
                                    color: 'var(--wattwise-green)'
                                },
                                children: "Top Energy Users"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: data.appliances.map((appliance, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--wattwise-green)'
                                                        },
                                                        children: appliance.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs px-1 py-0.5 rounded ${appliance.efficiency === 'high' ? 'bg-green-100 text-green-700' : appliance.efficiency === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`,
                                                        children: appliance.efficiency
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        style: {
                                                            color: 'var(--wattwise-green)'
                                                        },
                                                        children: [
                                                            appliance.usage.toFixed(1),
                                                            " kW"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs",
                                                        style: {
                                                            color: 'var(--wattwise-green)'
                                                        },
                                                        children: [
                                                            "$",
                                                            appliance.cost.toFixed(2),
                                                            "/day"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-3 border-t",
                        style: {
                            borderColor: 'var(--wattwise-green)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs",
                                    style: {
                                        color: 'var(--wattwise-green)'
                                    },
                                    children: [
                                        "Last updated: ",
                                        lastUpdated.toLocaleTimeString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: refresh,
                                    className: "text-xs underline",
                                    style: {
                                        color: 'var(--wattwise-green)'
                                    },
                                    children: "Refresh"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                            lineNumber: 139,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileRealTimeDashboard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(MobileRealTimeDashboard, "rsABPskNy2zlUSXa1TeGAt5WvEY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"]
    ];
});
_c = MobileRealTimeDashboard;
var _c;
__turbopack_context__.k.register(_c, "MobileRealTimeDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileLocalPeakAlerts": (()=>MobileLocalPeakAlerts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSmartMeter.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MobileLocalPeakAlerts() {
    _s();
    const { data, error, connecting, connection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"])({
        protocol: "zigbee",
        autoConnect: true,
        pollingInterval: 5000
    });
    const [alertAcknowledged, setAlertAcknowledged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [snoozedUntil, setSnoozedUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleAcknowledge = ()=>{
        setAlertAcknowledged(true);
        setTimeout(()=>setAlertAcknowledged(false), 300000); // Reset after 5 minutes
    };
    const handleSnooze = ()=>{
        const snoozeTime = new Date();
        snoozeTime.setMinutes(snoozeTime.getMinutes() + 30);
        setSnoozedUntil(snoozeTime);
        setTimeout(()=>setSnoozedUntil(null), 1800000); // 30 minutes
    };
    const getPeakEndTime = ()=>{
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 14 && hour < 18) {
            return "6:00 PM";
        } else if (hour >= 19 && hour < 21) {
            return "9:00 PM";
        }
        return "Unknown";
    };
    const getNextPeakPeriod = ()=>{
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return "Tomorrow 2:00 PM - 6:00 PM";
    };
    const getSavingsRecommendation = ()=>{
        if (!data) return null;
        const highUsageAppliances = data.appliances.filter((app)=>app.usage > 1.0);
        if (highUsageAppliances.length === 0) return null;
        const appliance = highUsageAppliances[0];
        const savings = (appliance.usage * 0.13 * 4).toFixed(2); // Peak rate difference * hours
        return {
            appliance: appliance.name,
            savings: parseFloat(savings)
        };
    };
    const isCurrentlySnoozed = snoozedUntil && new Date() < snoozedUntil;
    const recommendation = getSavingsRecommendation();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-black",
                        children: "Peak Alerts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    connection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full ${connection.connected ? 'bg-green-500' : 'bg-red-500'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: "Live"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            connecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-black"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-2",
                        children: "Loading peak data..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600",
                        children: "Unable to load peak alerts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-500 mt-1",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            !connecting && !error && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    data.peakPeriodActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mb-4 p-3 rounded-lg border ${alertAcknowledged ? 'bg-gray-50 border-gray-200' : 'bg-orange-50 border-orange-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-sm font-medium ${alertAcknowledged ? 'text-gray-600' : 'text-orange-800'}`,
                                        children: alertAcknowledged ? 'Peak Period (Acknowledged)' : 'Peak Period Active'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this),
                                    !alertAcknowledged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-sm ${alertAcknowledged ? 'text-gray-600' : 'text-orange-700'}`,
                                children: [
                                    "High demand period until ",
                                    getPeakEndTime()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-xs text-gray-600",
                                children: [
                                    "Grid Demand: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium capitalize",
                                        children: data.gridDemand
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 113,
                                        columnNumber: 30
                                    }, this),
                                    " • Current Usage: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: [
                                            data.currentUsage.toFixed(1),
                                            " kW"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 114,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 p-3 bg-green-50 border border-green-200 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-green-800",
                                        children: "Off-Peak Period"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-green-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-green-700",
                                children: [
                                    "Standard rates active • Grid demand is ",
                                    data.gridDemand
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 118,
                        columnNumber: 13
                    }, this),
                    data.peakPeriodActive && recommendation && !isCurrentlySnoozed && !alertAcknowledged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-3 rounded-lg mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-black font-medium mb-1",
                                children: [
                                    "💡 Turn off ",
                                    recommendation.appliance.toLowerCase(),
                                    " now to save $",
                                    recommendation.savings.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600",
                                children: "Reduce strain on the grid and lower your bill during peak hours"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, this),
                    isCurrentlySnoozed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-800 font-medium",
                                children: "Alerts Snoozed"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-600 mt-1",
                                children: [
                                    "Notifications paused until ",
                                    snoozedUntil?.toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 143,
                        columnNumber: 13
                    }, this),
                    data.peakPeriodActive && !alertAcknowledged && !isCurrentlySnoozed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAcknowledge,
                                className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors",
                                children: "Acknowledge Alert"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSnooze,
                                className: "w-full border border-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors",
                                children: "Snooze for 30 min"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 153,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-3 rounded-lg mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-medium text-black mb-2",
                                children: "Current Usage Breakdown"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: data.appliances.slice(0, 2).map((appliance, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: appliance.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-black font-medium",
                                                children: [
                                                    appliance.usage.toFixed(1),
                                                    " kW • $",
                                                    appliance.cost.toFixed(2),
                                                    "/day"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-3 border-t border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600",
                                children: [
                                    "Next peak period: ",
                                    getNextPeakPeriod()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            data.peakPeriodActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children: "Peak rates: $0.35/kWh • Off-peak: $0.22/kWh"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(MobileLocalPeakAlerts, "fli/t0dFK8DBiwwVDjb4252kEmk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"]
    ];
});
_c = MobileLocalPeakAlerts;
var _c;
__turbopack_context__.k.register(_c, "MobileLocalPeakAlerts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileEnergyChallengeMode": (()=>MobileEnergyChallengeMode)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function MobileEnergyChallengeMode() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-3 text-black",
                children: "Energy Challenges"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-green-50 border border-green-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-green-800",
                                children: "Active Challenge"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full",
                                children: "5 days left"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-medium text-black mb-1",
                        children: "Reduce 10% Energy Usage"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-green-700 mb-2",
                        children: "Save energy for 1 week and earn badges"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs text-gray-600 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "7.2% saved"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-200 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-500 h-2 rounded-full",
                                    style: {
                                        width: '72%'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium mb-2 text-black",
                        children: "Community Leaderboard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-black mr-2",
                                                children: "1."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 37,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-700",
                                                children: "Sarah M."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 38,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-black",
                                        children: "15.2% saved"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-black mr-2",
                                                children: "2."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 44,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-700",
                                                children: "You"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 45,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-black",
                                        children: "7.2% saved"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-black mr-2",
                                                children: "3."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-700",
                                                children: "Mike R."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-black",
                                        children: "6.8% saved"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium",
                children: "Join New Challenge"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = MobileEnergyChallengeMode;
var _c;
__turbopack_context__.k.register(_c, "MobileEnergyChallengeMode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileEnergyRewardsWallet": (()=>MobileEnergyRewardsWallet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function MobileEnergyRewardsWallet() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg p-4 shadow-sm border",
        style: {
            backgroundColor: 'var(--wattwise-yellow)',
            borderColor: 'var(--wattwise-green)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/ensemblecoin-carbon-credit-logo.svg",
                        alt: "Ensemblecoin Carbon Credit Logo",
                        className: "w-6 h-6 mr-2",
                        onError: (e)=>{
                            e.currentTarget.style.display = "none";
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        style: {
                            color: 'var(--wattwise-green)'
                        },
                        children: "Rewards Wallet"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 rounded-lg",
                style: {
                    backgroundColor: 'var(--wattwise-green)',
                    color: 'var(--wattwise-cream)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs opacity-80",
                                        children: "Total Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold",
                                        children: "1,247 pts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs opacity-80",
                                        children: "Cash Value"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold",
                                        children: "$12.47"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mt-3 pt-3 border-t",
                        style: {
                            borderColor: 'var(--wattwise-cream)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs opacity-80",
                                children: "This Month"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "+342 pts"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium mb-2",
                        style: {
                            color: 'var(--wattwise-green)'
                        },
                        children: "Recent Earnings"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 rounded",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "Peak Hour Savings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 45,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "Yesterday 3:00 PM"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 46,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-green-600",
                                        children: "+25 pts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 rounded",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "Weekly Challenge"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "Completed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 53,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-green-600",
                                        children: "+100 pts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 rounded",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "Daily Goal"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'var(--wattwise-green)'
                                                },
                                                children: "3 days ago"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-green-600",
                                        children: "+15 pts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium",
                        style: {
                            color: 'var(--wattwise-green)'
                        },
                        children: "Redeem Points"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-3 border rounded-lg text-center",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)',
                                    borderColor: 'var(--wattwise-green)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "Cash Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "500 pts = $5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-3 border rounded-lg text-center",
                                style: {
                                    backgroundColor: 'var(--wattwise-cream)',
                                    borderColor: 'var(--wattwise-green)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "Gift Cards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        style: {
                                            color: 'var(--wattwise-green)'
                                        },
                                        children: "1000 pts = $10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = MobileEnergyRewardsWallet;
var _c;
__turbopack_context__.k.register(_c, "MobileEnergyRewardsWallet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileSmartOptimizationAssistant": (()=>MobileSmartOptimizationAssistant)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function MobileSmartOptimizationAssistant() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-3 text-black",
                children: "Smart Assistant"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-blue-500 rounded-full mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-blue-800",
                                children: "Today's Tip"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-blue-700 mb-2",
                        children: "Set your AC to 76°F between 2-5 PM today to save $3.20 during peak hours."
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full",
                                children: "Apply Now"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-xs text-blue-600 underline",
                                children: "Learn More"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium mb-2 text-black",
                        children: "This Week's Insights"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black",
                                        children: "Your energy usage is 12% lower than last week"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600",
                                        children: "Great job! Keep it up."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black",
                                        children: "Peak usage: Weekdays 6-8 PM"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600",
                                        children: "Consider shifting some activities to off-peak hours."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium mb-2 text-black",
                        children: "Upgrade Recommendations"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black",
                                                children: "LED Bulbs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Save $45/year"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs bg-black text-white px-3 py-1 rounded-full",
                                        children: "Shop"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-black",
                                                children: "Smart Thermostat"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Save $180/year"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs bg-black text-white px-3 py-1 rounded-full",
                                        children: "Shop"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-200 rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 mb-2",
                        children: "Ask your energy assistant:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "How can I save more energy?",
                                className: "flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-black text-white px-3 py-1 rounded text-sm",
                                children: "Ask"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = MobileSmartOptimizationAssistant;
var _c;
__turbopack_context__.k.register(_c, "MobileSmartOptimizationAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/SmartMeterSettings.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SmartMeterSettings": (()=>SmartMeterSettings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSmartMeter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/smartMeter.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SmartMeterSettings() {
    _s();
    const { connection, connecting, error, connect, disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"])({
        autoConnect: false
    });
    const [selectedProtocol, setSelectedProtocol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("zigbee");
    const [deviceAddress, setDeviceAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [port, setPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [baudRate, setBaudRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("115200");
    const [encryptionKey, setEncryptionKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [validationErrors, setValidationErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleConnect = async ()=>{
        const config = {
            protocol: selectedProtocol,
            deviceAddress: deviceAddress || undefined,
            port: port || undefined,
            baudRate: baudRate ? parseInt(baudRate) : undefined,
            encryptionKey: encryptionKey || undefined
        };
        const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateConfig"])(config);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors([]);
        await connect(config);
    };
    const handleDisconnect = async ()=>{
        await disconnect();
        setValidationErrors([]);
    };
    const getProtocolDescription = (protocol)=>{
        switch(protocol){
            case "zigbee":
                return "Wireless mesh network protocol for smart home devices";
            case "p1":
                return "Direct serial connection to smart meter P1 port";
            case "wireless":
                return "WiFi or other wireless communication protocols";
            default:
                return "";
        }
    };
    const getProtocolRequirements = (protocol)=>{
        switch(protocol){
            case "zigbee":
                return [
                    "Device Address",
                    "Encryption Key (optional)"
                ];
            case "p1":
                return [
                    "Serial Port",
                    "Baud Rate"
                ];
            case "wireless":
                return [
                    "Device Address (optional)"
                ];
            default:
                return [];
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-3 text-black",
                children: "Smart Meter Settings"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-gray-50 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-black",
                                children: "Connection Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2 h-2 rounded-full ${connection?.connected ? 'bg-green-500' : 'bg-red-500'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: connection?.connected ? 'Connected' : 'Disconnected'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    connection?.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Protocol: ",
                                    connection.protocol.toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Device ID: ",
                                    connection.deviceId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            connection.signalStrength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Signal Strength: ",
                                    connection.signalStrength,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-black mb-2",
                        children: "Communication Protocol"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedProtocol,
                        onChange: (e)=>setSelectedProtocol(e.target.value),
                        disabled: connection?.connected,
                        className: "w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$smartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAvailableProtocols"])().map((protocol)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: protocol,
                                children: [
                                    protocol.toUpperCase(),
                                    " - ",
                                    getProtocolDescription(protocol)
                                ]
                            }, protocol, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium text-black",
                        children: "Configuration"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    selectedProtocol === "zigbee" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-700 mb-1",
                                        children: "Device Address *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: deviceAddress,
                                        onChange: (e)=>setDeviceAddress(e.target.value),
                                        placeholder: "0x001234567890ABCD",
                                        disabled: connection?.connected,
                                        className: "w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-700 mb-1",
                                        children: "Encryption Key (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: encryptionKey,
                                        onChange: (e)=>setEncryptionKey(e.target.value),
                                        placeholder: "Enter encryption key",
                                        disabled: connection?.connected,
                                        className: "w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    selectedProtocol === "p1" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-700 mb-1",
                                        children: "Serial Port *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: port,
                                        onChange: (e)=>setPort(e.target.value),
                                        placeholder: "/dev/ttyUSB0",
                                        disabled: connection?.connected,
                                        className: "w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-700 mb-1",
                                        children: "Baud Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: baudRate,
                                        onChange: (e)=>setBaudRate(e.target.value),
                                        disabled: connection?.connected,
                                        className: "w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "9600",
                                                children: "9600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "115200",
                                                children: "115200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "230400",
                                                children: "230400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    selectedProtocol === "wireless" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-700 mb-1",
                                children: "Device Address (Optional)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: deviceAddress,
                                onChange: (e)=>setDeviceAddress(e.target.value),
                                placeholder: "192.168.1.100 or device hostname",
                                disabled: connection?.connected,
                                className: "w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-xs font-medium text-blue-800 mb-1",
                        children: [
                            selectedProtocol.toUpperCase(),
                            " Requirements:"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-xs text-blue-700 space-y-1",
                        children: getProtocolRequirements(selectedProtocol).map((req, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    req
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            validationErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-xs font-medium text-red-800 mb-1",
                        children: "Configuration Errors:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-xs text-red-700 space-y-1",
                        children: validationErrors.map((error, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    error
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                                lineNumber: 219,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-600 font-medium",
                        children: "Connection Error"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-500 mt-1",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: !connection?.connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleConnect,
                    disabled: connecting,
                    className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
                    children: connecting ? "Connecting..." : "Connect to Smart Meter"
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleDisconnect,
                    className: "w-full border border-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors",
                    children: "Disconnect"
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-3 border-t border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500",
                    children: "Configure your smart meter connection to receive real-time energy data. Ensure your smart meter supports the selected protocol and is properly configured."
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/SmartMeterSettings.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(SmartMeterSettings, "17t37f8coZ0N22XCeo4qW8eralU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSmartMeter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartMeter"]
    ];
});
_c = SmartMeterSettings;
var _c;
__turbopack_context__.k.register(_c, "SmartMeterSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utilityIntegration.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UTILITY_COMPANIES": (()=>UTILITY_COMPANIES),
    "authenticateUtility": (()=>authenticateUtility),
    "fetchUtilityData": (()=>fetchUtilityData),
    "getUtilityCompaniesByCountry": (()=>getUtilityCompaniesByCountry),
    "getUtilityCompanyById": (()=>getUtilityCompanyById),
    "searchUtilityCompanies": (()=>searchUtilityCompanies)
});
const UTILITY_COMPANIES = [
    // United States
    {
        id: 'firstenergy',
        name: 'FirstEnergy',
        country: 'USA',
        region: 'Ohio, Pennsylvania, West Virginia',
        portalUrl: 'https://www.firstenergycorp.com/account',
        quickAccessUrl: 'https://www.firstenergycorp.com/quick-access',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'View bills and payment history'
            },
            {
                type: 'usage',
                available: true,
                description: 'Real-time usage monitoring'
            },
            {
                type: 'payments',
                available: true,
                description: 'Online bill payment'
            },
            {
                type: 'outages',
                available: true,
                description: 'Outage reporting and status'
            }
        ],
        status: 'active'
    },
    {
        id: 'pge',
        name: 'Pacific Gas & Electric (PG&E)',
        country: 'USA',
        region: 'California',
        portalUrl: 'https://www.pge.com/en_US/residential/your-account/your-account.page',
        authType: 'oauth',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Billing and payment management'
            },
            {
                type: 'usage',
                available: true,
                description: 'SmartMeter data access'
            },
            {
                type: 'green_energy',
                available: true,
                description: 'Solar and renewable programs'
            },
            {
                type: 'smart_meter',
                available: true,
                description: 'Advanced metering features'
            }
        ],
        status: 'active'
    },
    {
        id: 'con_edison',
        name: 'Consolidated Edison (Con Ed)',
        country: 'USA',
        region: 'New York',
        portalUrl: 'https://www.coned.com/en/accounts-billing/my-account',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Account and billing information'
            },
            {
                type: 'usage',
                available: true,
                description: 'Energy usage tracking'
            },
            {
                type: 'payments',
                available: true,
                description: 'Bill payment options'
            }
        ],
        status: 'active'
    },
    // United Kingdom
    {
        id: 'british_gas',
        name: 'British Gas',
        country: 'UK',
        portalUrl: 'https://www.britishgas.co.uk/my-account',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Bills and account management'
            },
            {
                type: 'usage',
                available: true,
                description: 'Smart meter readings'
            },
            {
                type: 'smart_meter',
                available: true,
                description: 'Smart meter integration'
            }
        ],
        status: 'active'
    },
    {
        id: 'edf_energy',
        name: 'EDF Energy',
        country: 'UK',
        portalUrl: 'https://www.edfenergy.com/my-account',
        authType: 'oauth',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Online account services'
            },
            {
                type: 'usage',
                available: true,
                description: 'Energy usage insights'
            },
            {
                type: 'green_energy',
                available: true,
                description: 'Renewable energy options'
            }
        ],
        status: 'active'
    },
    // Canada
    {
        id: 'hydro_one',
        name: 'Hydro One',
        country: 'Canada',
        region: 'Ontario',
        portalUrl: 'https://www.hydroone.com/MyAccount',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Billing and payment services'
            },
            {
                type: 'usage',
                available: true,
                description: 'Electricity usage monitoring'
            },
            {
                type: 'outages',
                available: true,
                description: 'Power outage information'
            }
        ],
        status: 'active'
    },
    // Australia
    {
        id: 'origin_energy',
        name: 'Origin Energy',
        country: 'Australia',
        portalUrl: 'https://www.originenergy.com.au/my-account',
        authType: 'oauth',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Account and billing management'
            },
            {
                type: 'usage',
                available: true,
                description: 'Energy usage tracking'
            },
            {
                type: 'green_energy',
                available: true,
                description: 'Solar and green energy plans'
            }
        ],
        status: 'active'
    },
    // Germany
    {
        id: 'eon',
        name: 'E.ON',
        country: 'Germany',
        portalUrl: 'https://www.eon.de/de/pk/service/mein-eon.html',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Rechnung und Zahlungen'
            },
            {
                type: 'usage',
                available: true,
                description: 'Energieverbrauch'
            },
            {
                type: 'green_energy',
                available: true,
                description: 'Ökostrom Optionen'
            }
        ],
        status: 'active'
    },
    // France
    {
        id: 'edf_france',
        name: 'EDF France',
        country: 'France',
        portalUrl: 'https://particulier.edf.fr/fr/accueil/espace-client.html',
        authType: 'oauth',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: 'Factures et paiements'
            },
            {
                type: 'usage',
                available: true,
                description: 'Suivi de consommation'
            },
            {
                type: 'smart_meter',
                available: true,
                description: 'Compteur Linky'
            }
        ],
        status: 'active'
    },
    // Japan
    {
        id: 'tepco',
        name: 'Tokyo Electric Power Company (TEPCO)',
        country: 'Japan',
        portalUrl: 'https://www.tepco.co.jp/ep/private/mypage/',
        authType: 'basic',
        supportedFeatures: [
            {
                type: 'billing',
                available: true,
                description: '料金・使用量の確認'
            },
            {
                type: 'usage',
                available: true,
                description: '電気使用量グラフ'
            },
            {
                type: 'payments',
                available: true,
                description: 'オンライン決済'
            }
        ],
        status: 'active'
    }
];
async function searchUtilityCompanies(query, country) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            let results = UTILITY_COMPANIES.filter((company)=>company.name.toLowerCase().includes(query.toLowerCase()) || company.region?.toLowerCase().includes(query.toLowerCase()));
            if (country) {
                results = results.filter((company)=>company.country.toLowerCase() === country.toLowerCase());
            }
            resolve(results);
        }, 300);
    });
}
async function authenticateUtility(companyId, credentials) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            // Simulate authentication process
            const company = UTILITY_COMPANIES.find((c)=>c.id === companyId);
            if (!company) {
                resolve({
                    success: false,
                    error: 'Utility company not found'
                });
                return;
            }
            if (!credentials.username || !credentials.password) {
                resolve({
                    success: false,
                    error: 'Username and password required'
                });
                return;
            }
            // Simulate 90% success rate
            if (Math.random() < 0.9) {
                resolve({
                    success: true,
                    token: `auth_token_${companyId}_${Date.now()}`
                });
            } else {
                resolve({
                    success: false,
                    error: 'Invalid credentials or service temporarily unavailable'
                });
            }
        }, 1500);
    });
}
async function fetchUtilityData(companyId, token) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const company = UTILITY_COMPANIES.find((c)=>c.id === companyId);
            if (!company) {
                reject(new Error('Utility company not found'));
                return;
            }
            // Generate realistic mock data
            const mockData = {
                accountNumber: `${companyId.toUpperCase()}-${Math.random().toString().substr(2, 8)}`,
                customerName: 'John Doe',
                serviceAddress: '123 Main Street, City, State 12345',
                currentBalance: parseFloat((Math.random() * 200 + 50).toFixed(2)),
                dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                lastBillAmount: parseFloat((Math.random() * 150 + 75).toFixed(2)),
                currentUsage: {
                    value: parseFloat((Math.random() * 800 + 200).toFixed(1)),
                    unit: 'kWh',
                    period: 'This month'
                },
                billingHistory: generateBillingHistory(),
                usageHistory: generateUsageHistory()
            };
            resolve(mockData);
        }, 1000);
    });
}
function generateBillingHistory() {
    const history = [];
    const now = new Date();
    for(let i = 0; i < 12; i++){
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const dueDate = new Date(date.getFullYear(), date.getMonth(), 25);
        const amount = parseFloat((Math.random() * 100 + 80).toFixed(2));
        const usageKwh = Math.floor(Math.random() * 500 + 400);
        history.push({
            date,
            amount,
            dueDate,
            paid: i > 0,
            usageKwh
        });
    }
    return history;
}
function generateUsageHistory() {
    const history = [];
    const now = new Date();
    for(let i = 0; i < 30; i++){
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const usage = parseFloat((Math.random() * 30 + 15).toFixed(1));
        const cost = parseFloat((usage * 0.12).toFixed(2));
        history.push({
            date,
            usage,
            cost,
            peakHours: parseFloat((usage * 0.6).toFixed(1)),
            offPeakHours: parseFloat((usage * 0.4).toFixed(1))
        });
    }
    return history;
}
function getUtilityCompanyById(id) {
    return UTILITY_COMPANIES.find((company)=>company.id === id);
}
function getUtilityCompaniesByCountry(country) {
    return UTILITY_COMPANIES.filter((company)=>company.country.toLowerCase() === country.toLowerCase());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useUtilityIntegration.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useUtilityIntegration": (()=>useUtilityIntegration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utilityIntegration.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useUtilityIntegration(options = {}) {
    _s();
    const { autoLoad = false, refreshInterval = 300000 } = options; // 5 minutes default
    // Company search state
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchLoading, setSearchLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authToken, setAuthToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUtilityId, setCurrentUtilityId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Account data state
    const [accountData, setAccountData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dataError, setDataError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Derived state
    const currentUtility = currentUtilityId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUtilityCompanyById"])(currentUtilityId) || null : null;
    // Search utility companies
    const searchCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUtilityIntegration.useCallback[searchCompanies]": async (query, country)=>{
            if (!query.trim()) {
                setCompanies([]);
                return;
            }
            setSearchLoading(true);
            try {
                const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchUtilityCompanies"])(query, country);
                setCompanies(results);
            } catch (error) {
                console.error('Error searching utility companies:', error);
                setCompanies([]);
            } finally{
                setSearchLoading(false);
            }
        }
    }["useUtilityIntegration.useCallback[searchCompanies]"], []);
    // Authenticate with utility company
    const authenticate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUtilityIntegration.useCallback[authenticate]": async (companyId, credentials)=>{
            setAuthLoading(true);
            setAuthError(null);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authenticateUtility"])(companyId, credentials);
                if (result.success && result.token) {
                    setIsAuthenticated(true);
                    setAuthToken(result.token);
                    setCurrentUtilityId(companyId);
                    // Store credentials securely (in a real app, use secure storage)
                    localStorage.setItem('utility_auth', JSON.stringify({
                        companyId,
                        token: result.token,
                        timestamp: Date.now()
                    }));
                    return true;
                } else {
                    setAuthError(result.error || 'Authentication failed');
                    return false;
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Authentication error';
                setAuthError(errorMessage);
                return false;
            } finally{
                setAuthLoading(false);
            }
        }
    }["useUtilityIntegration.useCallback[authenticate]"], []);
    // Fetch account data
    const refreshData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUtilityIntegration.useCallback[refreshData]": async ()=>{
            if (!isAuthenticated || !authToken || !currentUtilityId) {
                return;
            }
            setDataLoading(true);
            setDataError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUtilityData"])(currentUtilityId, authToken);
                setAccountData(data);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch account data';
                setDataError(errorMessage);
                // If token is invalid, clear authentication
                if (errorMessage.includes('unauthorized') || errorMessage.includes('token')) {
                    disconnect();
                }
            } finally{
                setDataLoading(false);
            }
        }
    }["useUtilityIntegration.useCallback[refreshData]"], [
        isAuthenticated,
        authToken,
        currentUtilityId
    ]);
    // Disconnect from utility
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUtilityIntegration.useCallback[disconnect]": ()=>{
            setIsAuthenticated(false);
            setAuthToken(null);
            setCurrentUtilityId(null);
            setAccountData(null);
            setAuthError(null);
            setDataError(null);
            // Clear stored credentials
            localStorage.removeItem('utility_auth');
        }
    }["useUtilityIntegration.useCallback[disconnect]"], []);
    // Clear errors
    const clearErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUtilityIntegration.useCallback[clearErrors]": ()=>{
            setAuthError(null);
            setDataError(null);
        }
    }["useUtilityIntegration.useCallback[clearErrors]"], []);
    // Auto-load stored authentication on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUtilityIntegration.useEffect": ()=>{
            if (autoLoad) {
                try {
                    const stored = localStorage.getItem('utility_auth');
                    if (stored) {
                        const { companyId, token, timestamp } = JSON.parse(stored);
                        // Check if token is not too old (24 hours)
                        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                            setIsAuthenticated(true);
                            setAuthToken(token);
                            setCurrentUtilityId(companyId);
                        } else {
                            // Token expired, clear it
                            localStorage.removeItem('utility_auth');
                        }
                    }
                } catch (error) {
                    console.error('Error loading stored authentication:', error);
                    localStorage.removeItem('utility_auth');
                }
            }
        }
    }["useUtilityIntegration.useEffect"], [
        autoLoad
    ]);
    // Auto-refresh data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUtilityIntegration.useEffect": ()=>{
            if (isAuthenticated && accountData) {
                const interval = setInterval(refreshData, refreshInterval);
                return ({
                    "useUtilityIntegration.useEffect": ()=>clearInterval(interval)
                })["useUtilityIntegration.useEffect"];
            }
        }
    }["useUtilityIntegration.useEffect"], [
        isAuthenticated,
        accountData,
        refreshData,
        refreshInterval
    ]);
    // Fetch initial data when authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUtilityIntegration.useEffect": ()=>{
            if (isAuthenticated && !accountData && !dataLoading) {
                refreshData();
            }
        }
    }["useUtilityIntegration.useEffect"], [
        isAuthenticated,
        accountData,
        dataLoading,
        refreshData
    ]);
    return {
        // Company search
        companies,
        searchCompanies,
        searchLoading,
        // Authentication
        authenticate,
        isAuthenticated,
        authLoading,
        authError,
        // Account data
        accountData,
        dataLoading,
        dataError,
        refreshData,
        // Current utility
        currentUtility,
        // Connection management
        disconnect,
        clearErrors
    };
}
_s(useUtilityIntegration, "3xuel8HxsQfYfzvqFNQDEHKiUKA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileUtilityIntegration.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileUtilityIntegration": (()=>MobileUtilityIntegration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUtilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUtilityIntegration.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MobileUtilityIntegration() {
    _s();
    const { companies, searchCompanies, searchLoading, authenticate, isAuthenticated, authLoading, authError, accountData, dataLoading, dataError, refreshData, currentUtility, disconnect, clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUtilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUtilityIntegration"])({
        autoLoad: true
    });
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCompany, setSelectedCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [credentials, setCredentials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        username: "",
        password: ""
    });
    const [showLoginForm, setShowLoginForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSearch = async (query)=>{
        setSearchQuery(query);
        if (query.length > 2) {
            await searchCompanies(query);
        }
    };
    const handleCompanySelect = (company)=>{
        setSelectedCompany(company);
        setShowLoginForm(true);
        clearErrors();
    };
    const handleLogin = async ()=>{
        if (!selectedCompany || !credentials.username || !credentials.password) {
            return;
        }
        const success = await authenticate(selectedCompany.id, credentials);
        if (success) {
            setShowLoginForm(false);
            setCredentials({
                username: "",
                password: ""
            });
            setSelectedCompany(null);
            setSearchQuery("");
        }
    };
    const handleDisconnect = ()=>{
        disconnect();
        setShowLoginForm(false);
        setSelectedCompany(null);
        setCredentials({
            username: "",
            password: ""
        });
    };
    if (isAuthenticated && currentUtility) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 bg-green-500 rounded-full mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-black",
                                            children: [
                                                "Connected to ",
                                                currentUtility.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600",
                                            children: [
                                                currentUtility.country,
                                                " • ",
                                                currentUtility.region
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDisconnect,
                            className: "text-xs text-red-600 underline",
                            children: "Disconnect"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                dataLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mt-2",
                            children: "Loading account data..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this),
                dataError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600 font-medium",
                            children: "Data Error"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-500 mt-1",
                            children: dataError
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: refreshData,
                            className: "text-xs text-red-600 underline mt-2",
                            children: "Retry"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this),
                accountData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-gray-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: "Account"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-black",
                                            children: accountData.accountNumber
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: "Current Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-bold text-black",
                                            children: [
                                                "$",
                                                accountData.currentBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this),
                                accountData.dueDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: "Due Date"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-black",
                                            children: accountData.dueDate.toLocaleDateString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-blue-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Current Usage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-bold text-blue-800",
                                            children: [
                                                accountData.currentUsage.value,
                                                " ",
                                                accountData.currentUsage.unit
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-blue-600",
                                            children: accountData.currentUsage.period
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.open(currentUtility.portalUrl, '_blank'),
                                    className: "p-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "View Portal"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600",
                                            children: "Full website"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                currentUtility.quickAccessUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.open(currentUtility.quickAccessUrl, '_blank'),
                                    className: "p-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-black",
                                            children: "Quick Access"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600",
                                            children: "Fast login"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Recent Bills"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: accountData.billingHistory.slice(0, 3).map((bill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-black",
                                                            children: bill.date.toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-600",
                                                            children: [
                                                                bill.usageKwh,
                                                                " kWh"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 166,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold text-black",
                                                            children: [
                                                                "$",
                                                                bill.amount.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-xs ${bill.paid ? 'text-green-600' : 'text-orange-600'}`,
                                                            children: bill.paid ? 'Paid' : 'Due'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 161,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Available Features"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-1",
                                    children: currentUtility.supportedFeatures.filter((f)=>f.available).map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center p-2 bg-green-50 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-green-800 capitalize",
                                                    children: feature.type.replace('_', ' ')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-3 text-black",
                children: "Utility Integration"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            !showLoginForm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-black mb-2",
                                children: "Search Your Utility Company"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>handleSearch(e.target.value),
                                placeholder: "Enter company name or location...",
                                className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    searchLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-black"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-2",
                                children: "Searching..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 221,
                        columnNumber: 13
                    }, this),
                    companies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-black",
                                children: "Select Your Utility:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 229,
                                columnNumber: 15
                            }, this),
                            companies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleCompanySelect(company),
                                    className: "w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-black",
                                                            children: company.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-600",
                                                            children: [
                                                                company.country,
                                                                " ",
                                                                company.region && `• ${company.region}`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xs px-2 py-1 rounded ${company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                                    children: company.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 236,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-wrap gap-1",
                                            children: company.supportedFeatures.filter((f)=>f.available).slice(0, 3).map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded",
                                                    children: feature.type.replace('_', ' ')
                                                }, idx, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, company.id, true, {
                                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                    lineNumber: 231,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 228,
                        columnNumber: 13
                    }, this),
                    searchQuery.length > 2 && companies.length === 0 && !searchLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "No utility companies found"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1",
                                children: "Try a different search term"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 264,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 262,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-black",
                                        children: [
                                            "Login to ",
                                            selectedCompany?.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowLoginForm(false),
                                        className: "text-xs text-gray-500 underline",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-700 mb-1",
                                                children: "Username/Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: credentials.username,
                                                onChange: (e)=>setCredentials((prev)=>({
                                                            ...prev,
                                                            username: e.target.value
                                                        })),
                                                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent",
                                                placeholder: "Enter your username"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-700 mb-1",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                value: credentials.password,
                                                onChange: (e)=>setCredentials((prev)=>({
                                                            ...prev,
                                                            password: e.target.value
                                                        })),
                                                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent",
                                                placeholder: "Enter your password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this),
                    authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 font-medium",
                                children: "Login Error"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 313,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-500 mt-1",
                                children: authError
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 314,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogin,
                        disabled: authLoading || !credentials.username || !credentials.password,
                        className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
                        children: authLoading ? "Connecting..." : "Connect Account"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-800 font-medium mb-1",
                                children: "Secure Connection"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-700",
                                children: "Your credentials are encrypted and used only to fetch your energy data. We never store your password."
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-3 border-t border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500",
                    children: "Connect to your utility company to view real-time billing, usage data, and manage your account directly from WattWise."
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                    lineNumber: 338,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileUtilityIntegration.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s(MobileUtilityIntegration, "P7a85rulohmSKksjQ88GAZXO2wE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUtilityIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUtilityIntegration"]
    ];
});
_c = MobileUtilityIntegration;
var _c;
__turbopack_context__.k.register(_c, "MobileUtilityIntegration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/hanDeviceIntegration.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HAN_DEVICES": (()=>HAN_DEVICES),
    "connectHANDevice": (()=>connectHANDevice),
    "fetchHANDeviceData": (()=>fetchHANDeviceData),
    "getHANDeviceById": (()=>getHANDeviceById),
    "getHANDevicesByType": (()=>getHANDevicesByType),
    "getUtilityRequirements": (()=>getUtilityRequirements),
    "searchHANDevices": (()=>searchHANDevices)
});
const HAN_DEVICES = [
    {
        id: 'emporia_vue',
        name: 'Emporia Vue',
        manufacturer: 'Emporia Energy',
        model: 'Vue Gen 2',
        type: 'energy_monitor',
        connectionType: 'wifi_han',
        supportedUtilities: [
            'pge',
            'sce',
            'sdge',
            'con_edison',
            'firstenergy',
            'national_grid'
        ],
        requiresUtilityKey: true,
        requiresDeviceId: true,
        setupComplexity: 'moderate',
        features: [
            {
                type: 'real_time_usage',
                available: true,
                description: 'Real-time whole-home energy monitoring'
            },
            {
                type: 'circuit_monitoring',
                available: true,
                description: 'Individual circuit monitoring up to 16 circuits'
            },
            {
                type: 'solar_production',
                available: true,
                description: 'Solar production monitoring'
            },
            {
                type: 'time_of_use',
                available: true,
                description: 'Time-of-use rate tracking'
            }
        ],
        status: 'supported'
    },
    {
        id: 'sense_monitor',
        name: 'Sense Energy Monitor',
        manufacturer: 'Sense Labs',
        model: 'Sense Monitor',
        type: 'energy_monitor',
        connectionType: 'wifi_han',
        supportedUtilities: [
            'pge',
            'sce',
            'con_edison',
            'eversource',
            'national_grid',
            'duke_energy'
        ],
        requiresUtilityKey: false,
        requiresDeviceId: true,
        setupComplexity: 'easy',
        features: [
            {
                type: 'real_time_usage',
                available: true,
                description: 'Real-time energy monitoring with device detection'
            },
            {
                type: 'solar_production',
                available: true,
                description: 'Solar production tracking'
            },
            {
                type: 'demand_response',
                available: true,
                description: 'Demand response participation'
            }
        ],
        status: 'supported'
    },
    {
        id: 'rainforest_eagle',
        name: 'Rainforest EAGLE',
        manufacturer: 'Rainforest Automation',
        model: 'EAGLE-200',
        type: 'energy_monitor',
        connectionType: 'zigbee_han',
        supportedUtilities: [
            'pge',
            'sce',
            'sdge',
            'smud',
            'ladwp',
            'con_edison',
            'national_grid'
        ],
        requiresUtilityKey: true,
        requiresDeviceId: true,
        setupComplexity: 'advanced',
        features: [
            {
                type: 'real_time_usage',
                available: true,
                description: 'Direct smart meter HAN connection'
            },
            {
                type: 'time_of_use',
                available: true,
                description: 'Real-time pricing information'
            },
            {
                type: 'demand_response',
                available: true,
                description: 'Utility demand response signals'
            }
        ],
        status: 'supported'
    },
    {
        id: 'curb_monitor',
        name: 'Curb Energy Monitor',
        manufacturer: 'Curb',
        model: 'Curb Gen 2',
        type: 'energy_monitor',
        connectionType: 'wifi_han',
        supportedUtilities: [
            'pge',
            'sce',
            'duke_energy',
            'georgia_power',
            'florida_power'
        ],
        requiresUtilityKey: false,
        requiresDeviceId: true,
        setupComplexity: 'moderate',
        features: [
            {
                type: 'real_time_usage',
                available: true,
                description: 'Real-time circuit-level monitoring'
            },
            {
                type: 'circuit_monitoring',
                available: true,
                description: 'Up to 24 circuit monitoring'
            },
            {
                type: 'solar_production',
                available: true,
                description: 'Solar and battery monitoring'
            },
            {
                type: 'battery_status',
                available: true,
                description: 'Home battery system integration'
            }
        ],
        status: 'supported'
    },
    {
        id: 'tesla_powerwall',
        name: 'Tesla Powerwall',
        manufacturer: 'Tesla',
        model: 'Powerwall 2',
        type: 'battery_storage',
        connectionType: 'ethernet_han',
        supportedUtilities: [
            'pge',
            'sce',
            'sdge',
            'hawaiian_electric',
            'green_mountain'
        ],
        requiresUtilityKey: true,
        requiresDeviceId: true,
        setupComplexity: 'advanced',
        features: [
            {
                type: 'battery_status',
                available: true,
                description: 'Battery charge level and health'
            },
            {
                type: 'solar_production',
                available: true,
                description: 'Integrated solar monitoring'
            },
            {
                type: 'real_time_usage',
                available: true,
                description: 'Home energy consumption'
            },
            {
                type: 'demand_response',
                available: true,
                description: 'Grid services participation'
            }
        ],
        status: 'supported'
    },
    {
        id: 'enphase_envoy',
        name: 'Enphase Envoy',
        manufacturer: 'Enphase Energy',
        model: 'Envoy-S',
        type: 'solar_inverter',
        connectionType: 'ethernet_han',
        supportedUtilities: [
            'pge',
            'sce',
            'sdge',
            'arizona_public',
            'nevada_energy'
        ],
        requiresUtilityKey: false,
        requiresDeviceId: true,
        setupComplexity: 'moderate',
        features: [
            {
                type: 'solar_production',
                available: true,
                description: 'Solar panel production monitoring'
            },
            {
                type: 'real_time_usage',
                available: true,
                description: 'Home consumption monitoring'
            },
            {
                type: 'battery_status',
                available: true,
                description: 'Enphase battery integration'
            }
        ],
        status: 'supported'
    }
];
async function searchHANDevices(query, type) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            let results = HAN_DEVICES.filter((device)=>device.name.toLowerCase().includes(query.toLowerCase()) || device.manufacturer.toLowerCase().includes(query.toLowerCase()) || device.model.toLowerCase().includes(query.toLowerCase()));
            if (type) {
                results = results.filter((device)=>device.type === type);
            }
            resolve(results);
        }, 300);
    });
}
async function connectHANDevice(deviceId, credentials) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const device = HAN_DEVICES.find((d)=>d.id === deviceId);
            if (!device) {
                resolve({
                    success: false,
                    error: 'HAN device not found'
                });
                return;
            }
            // Validate required credentials
            if (device.requiresDeviceId && !credentials.deviceId) {
                resolve({
                    success: false,
                    error: 'Device ID is required for this device'
                });
                return;
            }
            if (device.requiresUtilityKey && !credentials.encryptionKey) {
                resolve({
                    success: false,
                    error: 'Utility encryption key is required for this device'
                });
                return;
            }
            // Simulate connection process with realistic success rates
            const successRate = device.setupComplexity === 'easy' ? 0.95 : device.setupComplexity === 'moderate' ? 0.85 : 0.75;
            if (Math.random() < successRate) {
                const connection = {
                    deviceId: credentials.deviceId,
                    device,
                    connected: true,
                    signalStrength: Math.floor(Math.random() * 40) + 60,
                    lastSeen: new Date(),
                    firmwareVersion: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
                    utilityAuthorized: device.requiresUtilityKey
                };
                resolve({
                    success: true,
                    connection
                });
            } else {
                const errors = [
                    'Failed to connect to device. Check device ID and network connection.',
                    'Utility authorization failed. Verify encryption key with your utility provider.',
                    'Device not found on network. Ensure device is powered and connected.',
                    'Connection timeout. Device may be busy or unreachable.'
                ];
                resolve({
                    success: false,
                    error: errors[Math.floor(Math.random() * errors.length)]
                });
            }
        }, 2000); // Longer timeout for HAN device connection
    });
}
async function fetchHANDeviceData(connection) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (!connection.connected) {
                reject(new Error('HAN device not connected'));
                return;
            }
            // Generate realistic data based on device type
            const baseUsage = 2.5 + Math.sin(Date.now() / 60000) * 1.5;
            const instantaneousDemand = Math.max(0.1, baseUsage + (Math.random() - 0.5) * 0.8);
            const data = {
                deviceId: connection.deviceId,
                timestamp: new Date(),
                instantaneousDemand: parseFloat(instantaneousDemand.toFixed(3)),
                cumulativeUsage: parseFloat((Math.random() * 500 + 1000).toFixed(1)),
                voltage: parseFloat((240 + (Math.random() - 0.5) * 10).toFixed(1)),
                current: parseFloat((instantaneousDemand * 1000 / 240).toFixed(2)),
                powerFactor: parseFloat((0.85 + Math.random() * 0.1).toFixed(2)),
                frequency: parseFloat((60 + (Math.random() - 0.5) * 0.2).toFixed(1))
            };
            // Add device-specific data
            if (connection.device.type === 'energy_monitor' && connection.device.features.some((f)=>f.type === 'circuit_monitoring' && f.available)) {
                data.circuitData = generateCircuitData(instantaneousDemand);
            }
            if (connection.device.features.some((f)=>f.type === 'solar_production' && f.available)) {
                const hour = new Date().getHours();
                const solarMultiplier = hour >= 6 && hour <= 18 ? Math.sin((hour - 6) * Math.PI / 12) : 0;
                data.solarProduction = parseFloat((solarMultiplier * 5 * Math.random()).toFixed(2));
            }
            if (connection.device.type === 'battery_storage' || connection.device.features.some((f)=>f.type === 'battery_status' && f.available)) {
                data.batteryLevel = Math.floor(Math.random() * 100);
            }
            if (connection.device.features.some((f)=>f.type === 'time_of_use' && f.available)) {
                const hour = new Date().getHours();
                data.timeOfUseRate = hour >= 14 && hour <= 18 ? 'Peak' : hour >= 19 && hour <= 21 ? 'Partial-Peak' : 'Off-Peak';
            }
            resolve(data);
        }, 500);
    });
}
function generateCircuitData(totalUsage) {
    const circuits = [
        'Main Panel',
        'HVAC',
        'Water Heater',
        'Kitchen',
        'Living Room',
        'Bedrooms',
        'Laundry',
        'Garage',
        'Outdoor',
        'Pool/Spa'
    ];
    const circuitData = [];
    let remainingUsage = totalUsage;
    circuits.forEach((name, index)=>{
        if (index === circuits.length - 1) {
            // Last circuit gets remaining usage
            const usage = Math.max(0, remainingUsage);
            circuitData.push({
                circuitId: `circuit_${index + 1}`,
                name,
                usage: parseFloat(usage.toFixed(3)),
                voltage: parseFloat((240 + (Math.random() - 0.5) * 5).toFixed(1)),
                current: parseFloat((usage * 1000 / 240).toFixed(2))
            });
        } else {
            // Distribute usage across circuits
            const maxUsage = remainingUsage * 0.4;
            const usage = Math.random() * maxUsage;
            remainingUsage -= usage;
            circuitData.push({
                circuitId: `circuit_${index + 1}`,
                name,
                usage: parseFloat(usage.toFixed(3)),
                voltage: parseFloat((240 + (Math.random() - 0.5) * 5).toFixed(1)),
                current: parseFloat((usage * 1000 / 240).toFixed(2))
            });
        }
    });
    return circuitData.sort((a, b)=>b.usage - a.usage).slice(0, 6);
}
function getHANDeviceById(id) {
    return HAN_DEVICES.find((device)=>device.id === id);
}
function getHANDevicesByType(type) {
    return HAN_DEVICES.filter((device)=>device.type === type);
}
function getUtilityRequirements(deviceId) {
    const device = getHANDeviceById(deviceId);
    if (!device) {
        return {
            requiresUtilityKey: false,
            requiresDeviceId: false,
            setupSteps: []
        };
    }
    const setupSteps = [];
    if (device.requiresUtilityKey) {
        setupSteps.push('Contact your utility to obtain HAN encryption key');
        setupSteps.push('Request device authorization from utility customer service');
    }
    if (device.requiresDeviceId) {
        setupSteps.push('Locate device MAC address or serial number');
        setupSteps.push('Register device with utility (if required)');
    }
    setupSteps.push('Install device according to manufacturer instructions');
    setupSteps.push('Connect device to home network');
    setupSteps.push('Complete device pairing process');
    return {
        requiresUtilityKey: device.requiresUtilityKey,
        requiresDeviceId: device.requiresDeviceId,
        setupSteps
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useHANDeviceIntegration.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useHANDeviceIntegration": (()=>useHANDeviceIntegration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hanDeviceIntegration.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useHANDeviceIntegration(options = {}) {
    _s();
    const { autoLoad = false, refreshInterval = 10000 } = options; // 10 seconds for HAN devices
    // Device search state
    const [devices, setDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchLoading, setSearchLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Connection state
    const [currentConnection, setCurrentConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connectionError, setConnectionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Device data state
    const [deviceData, setDeviceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dataError, setDataError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Refs for cleanup
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Search HAN devices
    const searchDevices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[searchDevices]": async (query, type)=>{
            if (!query.trim()) {
                setDevices([]);
                return;
            }
            setSearchLoading(true);
            try {
                const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchHANDevices"])(query, type);
                if (mountedRef.current) {
                    setDevices(results);
                }
            } catch (error) {
                console.error('Error searching HAN devices:', error);
                if (mountedRef.current) {
                    setDevices([]);
                }
            } finally{
                if (mountedRef.current) {
                    setSearchLoading(false);
                }
            }
        }
    }["useHANDeviceIntegration.useCallback[searchDevices]"], []);
    // Connect to HAN device
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[connect]": async (deviceId, credentials)=>{
            setConnecting(true);
            setConnectionError(null);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectHANDevice"])(deviceId, credentials);
                if (!mountedRef.current) return false;
                if (result.success && result.connection) {
                    setCurrentConnection(result.connection);
                    setIsConnected(true);
                    // Store connection info securely
                    localStorage.setItem('han_device_connection', JSON.stringify({
                        deviceId: result.connection.deviceId,
                        deviceType: result.connection.device.id,
                        timestamp: Date.now()
                    }));
                    return true;
                } else {
                    setConnectionError(result.error || 'Connection failed');
                    return false;
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Connection error';
                if (mountedRef.current) {
                    setConnectionError(errorMessage);
                }
                return false;
            } finally{
                if (mountedRef.current) {
                    setConnecting(false);
                }
            }
        }
    }["useHANDeviceIntegration.useCallback[connect]"], []);
    // Disconnect from HAN device
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[disconnect]": ()=>{
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setCurrentConnection(null);
            setIsConnected(false);
            setDeviceData(null);
            setConnectionError(null);
            setDataError(null);
            // Clear stored connection
            localStorage.removeItem('han_device_connection');
        }
    }["useHANDeviceIntegration.useCallback[disconnect]"], []);
    // Fetch device data
    const refreshData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[refreshData]": async ()=>{
            if (!isConnected || !currentConnection) {
                return;
            }
            setDataLoading(true);
            setDataError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchHANDeviceData"])(currentConnection);
                if (!mountedRef.current) return;
                setDeviceData(data);
                // Update connection last seen
                setCurrentConnection({
                    "useHANDeviceIntegration.useCallback[refreshData]": (prev)=>prev ? {
                            ...prev,
                            lastSeen: new Date()
                        } : null
                }["useHANDeviceIntegration.useCallback[refreshData]"]);
            } catch (error) {
                if (!mountedRef.current) return;
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch device data';
                setDataError(errorMessage);
                // If device is unreachable, mark as disconnected
                if (errorMessage.includes('not connected') || errorMessage.includes('unreachable')) {
                    setCurrentConnection({
                        "useHANDeviceIntegration.useCallback[refreshData]": (prev)=>prev ? {
                                ...prev,
                                connected: false
                            } : null
                    }["useHANDeviceIntegration.useCallback[refreshData]"]);
                }
            } finally{
                if (mountedRef.current) {
                    setDataLoading(false);
                }
            }
        }
    }["useHANDeviceIntegration.useCallback[refreshData]"], [
        isConnected,
        currentConnection
    ]);
    // Get device requirements
    const getDeviceRequirements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[getDeviceRequirements]": (deviceId)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUtilityRequirements"])(deviceId);
        }
    }["useHANDeviceIntegration.useCallback[getDeviceRequirements]"], []);
    // Clear errors
    const clearErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHANDeviceIntegration.useCallback[clearErrors]": ()=>{
            setConnectionError(null);
            setDataError(null);
        }
    }["useHANDeviceIntegration.useCallback[clearErrors]"], []);
    // Auto-load stored connection on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHANDeviceIntegration.useEffect": ()=>{
            if (autoLoad) {
                try {
                    const stored = localStorage.getItem('han_device_connection');
                    if (stored) {
                        const { deviceId, deviceType, timestamp } = JSON.parse(stored);
                        // Check if connection is not too old (1 hour)
                        if (Date.now() - timestamp < 60 * 60 * 1000) {
                            const device = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hanDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHANDeviceById"])(deviceType);
                            if (device) {
                                const connection = {
                                    deviceId,
                                    device,
                                    connected: true,
                                    lastSeen: new Date(timestamp),
                                    utilityAuthorized: device.requiresUtilityKey
                                };
                                setCurrentConnection(connection);
                                setIsConnected(true);
                            }
                        } else {
                            // Connection expired, clear it
                            localStorage.removeItem('han_device_connection');
                        }
                    }
                } catch (error) {
                    console.error('Error loading stored HAN device connection:', error);
                    localStorage.removeItem('han_device_connection');
                }
            }
        }
    }["useHANDeviceIntegration.useEffect"], [
        autoLoad
    ]);
    // Set up data refresh interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHANDeviceIntegration.useEffect": ()=>{
            if (isConnected && currentConnection?.connected && !intervalRef.current) {
                intervalRef.current = setInterval({
                    "useHANDeviceIntegration.useEffect": ()=>{
                        refreshData();
                    }
                }["useHANDeviceIntegration.useEffect"], refreshInterval);
            }
            return ({
                "useHANDeviceIntegration.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            })["useHANDeviceIntegration.useEffect"];
        }
    }["useHANDeviceIntegration.useEffect"], [
        isConnected,
        currentConnection?.connected,
        refreshData,
        refreshInterval
    ]);
    // Fetch initial data when connected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHANDeviceIntegration.useEffect": ()=>{
            if (isConnected && currentConnection?.connected && !deviceData && !dataLoading) {
                refreshData();
            }
        }
    }["useHANDeviceIntegration.useEffect"], [
        isConnected,
        currentConnection?.connected,
        deviceData,
        dataLoading,
        refreshData
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHANDeviceIntegration.useEffect": ()=>{
            return ({
                "useHANDeviceIntegration.useEffect": ()=>{
                    mountedRef.current = false;
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["useHANDeviceIntegration.useEffect"];
        }
    }["useHANDeviceIntegration.useEffect"], []);
    return {
        // Device search
        devices,
        searchDevices,
        searchLoading,
        // Connection management
        connect,
        disconnect,
        isConnected,
        connecting,
        connectionError,
        // Device data
        deviceData,
        dataLoading,
        dataError,
        refreshData,
        // Current connection
        currentConnection,
        // Utility requirements
        getDeviceRequirements,
        // Error management
        clearErrors
    };
}
_s(useHANDeviceIntegration, "1ob6BPpFZZzuwgdkjt9jWnlVs3U=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileHANDeviceIntegration": (()=>MobileHANDeviceIntegration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHANDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useHANDeviceIntegration.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MobileHANDeviceIntegration() {
    _s();
    const { devices, searchDevices, searchLoading, connect, disconnect, isConnected, connecting, connectionError, deviceData, dataLoading, dataError, refreshData, currentConnection, getDeviceRequirements, clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHANDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHANDeviceIntegration"])({
        autoLoad: true
    });
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedDevice, setSelectedDevice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [credentials, setCredentials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        deviceId: "",
        encryptionKey: "",
        utilityDeviceId: "",
        installCode: "",
        macAddress: "",
        serialNumber: ""
    });
    const [showSetupForm, setShowSetupForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRequirements, setShowRequirements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSearch = async (query)=>{
        setSearchQuery(query);
        if (query.length > 2) {
            await searchDevices(query);
        }
    };
    const handleDeviceSelect = (device)=>{
        setSelectedDevice(device);
        setShowRequirements(true);
        clearErrors();
    };
    const handleSetupStart = ()=>{
        setShowRequirements(false);
        setShowSetupForm(true);
    };
    const handleConnect = async ()=>{
        if (!selectedDevice || !credentials.deviceId) {
            return;
        }
        const success = await connect(selectedDevice.id, credentials);
        if (success) {
            setShowSetupForm(false);
            setSelectedDevice(null);
            setCredentials({
                deviceId: "",
                encryptionKey: "",
                utilityDeviceId: "",
                installCode: "",
                macAddress: "",
                serialNumber: ""
            });
            setSearchQuery("");
        }
    };
    const handleDisconnect = ()=>{
        disconnect();
        setShowSetupForm(false);
        setSelectedDevice(null);
        setCredentials({
            deviceId: "",
            encryptionKey: "",
            utilityDeviceId: "",
            installCode: "",
            macAddress: "",
            serialNumber: ""
        });
    };
    const getSetupComplexityColor = (complexity)=>{
        switch(complexity){
            case 'easy':
                return 'bg-green-100 text-green-700';
            case 'moderate':
                return 'bg-yellow-100 text-yellow-700';
            case 'advanced':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };
    if (isConnected && currentConnection) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-3 bg-green-500 rounded-full mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-black",
                                            children: currentConnection.device.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600",
                                            children: [
                                                currentConnection.device.manufacturer,
                                                " • ",
                                                currentConnection.device.model
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDisconnect,
                            className: "text-xs text-red-600 underline",
                            children: "Disconnect"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-gray-50 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Device Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-sm font-medium ${currentConnection.connected ? 'text-green-600' : 'text-red-600'}`,
                                    children: currentConnection.connected ? 'Online' : 'Offline'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        currentConnection.signalStrength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Signal Strength"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-black",
                                    children: [
                                        currentConnection.signalStrength,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        currentConnection.firmwareVersion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Firmware"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-black",
                                    children: currentConnection.firmwareVersion
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                dataLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mt-2",
                            children: "Loading device data..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this),
                dataError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600 font-medium",
                            children: "Data Error"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-500 mt-1",
                            children: dataError
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: refreshData,
                            className: "text-xs text-red-600 underline mt-2",
                            children: "Retry"
                        }, void 0, false, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this),
                deviceData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-blue-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Real-Time Usage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-bold text-blue-800",
                                                    children: [
                                                        deviceData.instantaneousDemand.toFixed(2),
                                                        " kW"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-blue-600",
                                                    children: "Current Demand"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg font-bold text-blue-800",
                                                    children: [
                                                        deviceData.voltage.toFixed(1),
                                                        " V"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-blue-600",
                                                    children: "Voltage"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-gray-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Power Quality"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-600",
                                                    children: "Power Factor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-black",
                                                    children: deviceData.powerFactor
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-600",
                                                    children: "Frequency"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-black",
                                                    children: [
                                                        deviceData.frequency,
                                                        " Hz"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-600",
                                                    children: "Current"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-black",
                                                    children: [
                                                        deviceData.current,
                                                        " A"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this),
                        deviceData.circuitData && deviceData.circuitData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Circuit Monitoring"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: deviceData.circuitData.slice(0, 4).map((circuit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-2 bg-gray-50 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-700",
                                                    children: circuit.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-black",
                                                            children: [
                                                                circuit.usage.toFixed(2),
                                                                " kW"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                circuit.voltage,
                                                                "V"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 216,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 214,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 212,
                            columnNumber: 15
                        }, this),
                        deviceData.solarProduction !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-green-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Solar Production"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 233,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-green-800",
                                    children: [
                                        deviceData.solarProduction.toFixed(2),
                                        " kW"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-green-600",
                                    children: "Current Generation"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 232,
                            columnNumber: 15
                        }, this),
                        deviceData.batteryLevel !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-purple-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Battery Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 bg-gray-200 rounded-full h-2 mr-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-purple-500 h-2 rounded-full transition-all duration-500",
                                                style: {
                                                    width: `${deviceData.batteryLevel}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 247,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-purple-800",
                                            children: [
                                                deviceData.batteryLevel,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 245,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 243,
                            columnNumber: 15
                        }, this),
                        deviceData.timeOfUseRate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-orange-50 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Time of Use"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 262,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-bold text-orange-800",
                                    children: [
                                        deviceData.timeOfUseRate,
                                        " Rate Period"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 261,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-black mb-2",
                                    children: "Active Features"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-1",
                                    children: currentConnection.device.features.filter((f)=>f.available).map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center p-2 bg-green-50 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-green-800 capitalize",
                                                    children: feature.type.replace('_', ' ')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 274,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                deviceData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-3 border-t border-gray-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: [
                                    "Last updated: ",
                                    deviceData.timestamp.toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 290,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: refreshData,
                                className: "text-xs text-gray-600 underline hover:text-gray-800",
                                children: "Refresh"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 293,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 289,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 288,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold mb-3 text-black",
                children: "HAN Device Integration"
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            !showSetupForm && !showRequirements ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-black mb-2",
                                children: "Search HAN Devices"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>handleSearch(e.target.value),
                                placeholder: "Enter device name (e.g., Emporia Vue)...",
                                className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this),
                    searchLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-black"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 329,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-2",
                                children: "Searching devices..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 330,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 328,
                        columnNumber: 13
                    }, this),
                    devices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-black",
                                children: "Available Devices:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, this),
                            devices.map((device)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeviceSelect(device),
                                    className: "w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-black",
                                                            children: device.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-600",
                                                            children: [
                                                                device.manufacturer,
                                                                " • ",
                                                                device.model
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-end space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `text-xs px-2 py-1 rounded ${device.status === 'supported' ? 'bg-green-100 text-green-700' : device.status === 'beta' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`,
                                                            children: device.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `text-xs px-2 py-1 rounded ${getSetupComplexityColor(device.setupComplexity)}`,
                                                            children: device.setupComplexity
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 343,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1",
                                            children: device.features.filter((f)=>f.available).slice(0, 3).map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded",
                                                    children: feature.type.replace('_', ' ')
                                                }, idx, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 363,
                                            columnNumber: 19
                                        }, this),
                                        device.requiresUtilityKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-orange-600 mt-2",
                                            children: "⚠️ Requires utility encryption key"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 371,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, device.id, true, {
                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                    lineNumber: 338,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 335,
                        columnNumber: 13
                    }, this),
                    searchQuery.length > 2 && devices.length === 0 && !searchLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "No HAN devices found"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 380,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1",
                                children: 'Try searching for "Emporia", "Sense", or "Rainforest"'
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 379,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : showRequirements && selectedDevice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-black",
                                        children: "Setup Requirements"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowRequirements(false),
                                        className: "text-xs text-gray-500 underline",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-medium text-blue-800 mb-2",
                                        children: selectedDevice.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-blue-700 mb-2",
                                        children: [
                                            selectedDevice.manufacturer,
                                            " • ",
                                            selectedDevice.model
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `inline-block text-xs px-2 py-1 rounded ${getSetupComplexityColor(selectedDevice.setupComplexity)}`,
                                        children: [
                                            selectedDevice.setupComplexity,
                                            " setup"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-medium text-black",
                                        children: "Setup Steps:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    getDeviceRequirements(selectedDevice.id).setupSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium text-gray-600",
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: step
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                            lineNumber: 410,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this),
                            selectedDevice.requiresUtilityKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-orange-800 font-medium mb-1",
                                        children: "Utility Authorization Required"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-orange-700",
                                        children: "Contact your utility company to obtain the HAN encryption key and device authorization. This process may take 1-3 business days."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 422,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSetupStart,
                        className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors",
                        children: "Start Setup Process"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-black",
                                        children: [
                                            "Connect ",
                                            selectedDevice?.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSetupForm(false),
                                        className: "text-xs text-gray-500 underline",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-700 mb-1",
                                                children: "Device ID / MAC Address *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: credentials.deviceId,
                                                onChange: (e)=>setCredentials((prev)=>({
                                                            ...prev,
                                                            deviceId: e.target.value
                                                        })),
                                                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent",
                                                placeholder: "Enter device ID or MAC address"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this),
                                    selectedDevice?.requiresUtilityKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-700 mb-1",
                                                children: "Utility Encryption Key *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 467,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: credentials.encryptionKey,
                                                onChange: (e)=>setCredentials((prev)=>({
                                                            ...prev,
                                                            encryptionKey: e.target.value
                                                        })),
                                                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent",
                                                placeholder: "Enter encryption key from utility"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 470,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 466,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-700 mb-1",
                                                children: "Serial Number (Optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 481,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: credentials.serialNumber,
                                                onChange: (e)=>setCredentials((prev)=>({
                                                            ...prev,
                                                            serialNumber: e.target.value
                                                        })),
                                                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent",
                                                placeholder: "Device serial number"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                                lineNumber: 484,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 440,
                        columnNumber: 11
                    }, this),
                    connectionError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 font-medium",
                                children: "Connection Error"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 497,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-500 mt-1",
                                children: connectionError
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 498,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 496,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleConnect,
                        disabled: connecting || !credentials.deviceId || selectedDevice?.requiresUtilityKey && !credentials.encryptionKey,
                        className: "w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
                        children: connecting ? "Connecting..." : "Connect Device"
                    }, void 0, false, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-green-800 font-medium mb-1",
                                children: "Secure HAN Connection"
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 511,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-green-700",
                                children: "Your device connects directly to your smart meter's Home Area Network (HAN) for real-time energy data without internet dependency."
                            }, void 0, false, {
                                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                                lineNumber: 512,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                        lineNumber: 510,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-3 border-t border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500",
                    children: "HAN devices connect directly to your smart meter for real-time energy monitoring, circuit-level data, and advanced energy management features."
                }, void 0, false, {
                    fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                    lineNumber: 522,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(MobileHANDeviceIntegration, "OCzkjAs2MitaT/+HbiKO7gizyIY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHANDeviceIntegration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHANDeviceIntegration"]
    ];
});
_c = MobileHANDeviceIntegration;
var _c;
__turbopack_context__.k.register(_c, "MobileHANDeviceIntegration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/ErrorBoundary.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ErrorBoundary": (()=>ErrorBoundary)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(_) {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium",
                        children: "Something went wrong"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1",
                        children: "Please try refreshing the page or contact support if the issue persists."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/mobile-preview/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MobilePreview)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileRealTimeDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileRealTimeDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileLocalPeakAlerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileLocalPeakAlerts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileEnergyChallengeMode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileEnergyChallengeMode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileEnergyRewardsWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileEnergyRewardsWallet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileSmartOptimizationAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileSmartOptimizationAssistant.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$SmartMeterSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/SmartMeterSettings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileUtilityIntegration$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileUtilityIntegration.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileHANDeviceIntegration$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wattwise/MobileHANDeviceIntegration.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ErrorBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function MobilePreview() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const renderContent = ()=>{
        switch(activeTab){
            case "dashboard":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileRealTimeDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileRealTimeDashboard"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this);
            case "alerts":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileLocalPeakAlerts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileLocalPeakAlerts"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this);
            case "challenges":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileEnergyChallengeMode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileEnergyChallengeMode"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 34,
                    columnNumber: 11
                }, this);
            case "wallet":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileEnergyRewardsWallet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileEnergyRewardsWallet"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this);
            case "assistant":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileSmartOptimizationAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileSmartOptimizationAssistant"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this);
            case "settings":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$SmartMeterSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartMeterSettings"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this);
            case "utility":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileUtilityIntegration$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileUtilityIntegration"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this);
            case "han":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileHANDeviceIntegration$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileHANDeviceIntegration"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wattwise$2f$MobileRealTimeDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileRealTimeDashboard"], {}, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col max-w-sm mx-auto border-x border-[var(--wattwise-green)]",
        style: {
            backgroundColor: 'var(--wattwise-cream)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs px-4 py-1 flex justify-between items-center",
                style: {
                    backgroundColor: 'var(--wattwise-green)',
                    color: 'var(--wattwise-cream)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "9:41"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "WiseWatts"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "100%"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mobile-preview/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mobile-preview/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "p-4 shadow-sm border-b",
                style: {
                    backgroundColor: 'var(--wattwise-yellow)',
                    borderColor: 'var(--wattwise-green)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/wisewatts-owl-logo.svg",
                                    alt: "WiseWatts Owl Logo",
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-bold",
                                            style: {
                                                color: 'var(--wattwise-green)'
                                            },
                                            children: "WiseWatts"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            style: {
                                                color: 'var(--wattwise-green)'
                                            },
                                            children: "Smart Energy Monitoring"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-sm underline",
                            style: {
                                color: 'var(--wattwise-green)'
                            },
                            children: "Back"
                        }, void 0, false, {
                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mobile-preview/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-y-auto p-4 pb-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: renderContent()
                }, void 0, false, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mobile-preview/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "border-t fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm",
                style: {
                    backgroundColor: 'var(--wattwise-yellow)',
                    borderColor: 'var(--wattwise-green)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-4 flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("dashboard"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "dashboard" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "dashboard" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        "Dashboard"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("alerts"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "alerts" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "alerts" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        "Alerts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("challenges"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "challenges" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "challenges" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        "Challenges"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("wallet"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "wallet" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "wallet" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        "Wallet"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-4 flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("assistant"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "assistant" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "assistant" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this),
                                        "Assistant"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("utility"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "utility" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "utility" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        "Utility"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("han"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "han" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "han" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        "HAN"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("settings"),
                                    className: "flex-1 flex flex-col items-center py-1 px-1 text-xs font-medium transition-colors",
                                    style: {
                                        color: activeTab === "settings" ? 'var(--wattwise-green)' : 'var(--wattwise-dark-green)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 mb-1 rounded",
                                            style: {
                                                backgroundColor: activeTab === "settings" ? 'var(--wattwise-green)' : 'var(--wattwise-light-green)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this),
                                        "Settings"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mobile-preview/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mobile-preview/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mobile-preview/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mobile-preview/page.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(MobilePreview, "xHPw8czwx4p9R+GlBIqC9C+RnkM=");
_c = MobilePreview;
var _c;
__turbopack_context__.k.register(_c, "MobilePreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_ad2dd469._.js.map