// @ts-nocheck
"use client";

import * as i from "react/jsx-runtime";
import * as r from "react";
import styles from "./page.module.css";

const n = () => styles;

let o = {
            "Consulting & Advisory": [ "Business Transformation", "Enterprise Architecture", "AI Strategy", "Technology Strategy", "Operating Model Design", "M&A IT Advisory" ],
            "Applications & Digital Engineering": [ "Application Development", "Application Modernization", "ERP Services", "CRM Services", "Digital Experience Engineering", "Quality Engineering & Testing", "Product Engineering" ],
            "Data, AI & Analytics": [ "Data Platform Modernization", "BI & Reporting", "Advanced Analytics", "Data Governance", "Generative AI Services", "ML Engineering" ],
            "Cloud & Infrastructure": [ "Cloud Migration", "Cloud Managed Services", "Network Services", "Digital Workplace Services", "Datacenter & Hybrid Ops", "Platform Engineering" ],
            "SaaS Forecasting & Optimization": [ "ARR Forecasting", "Subscription Renewal Forecasting", "Usage & Consumption Forecasting", "Pipeline-to-ARR Forecasting", "SaaS Revenue Planning & Scenario Modeling", "SaaS FinOps & License Optimization" ],
            "Cybersecurity & Risk": [ "Managed Security Services", "Identity & Access Management", "SOC Services", "Threat Intelligence", "Application Security", "Governance, Risk & Compliance" ],
            "Intelligent Automation": [ "RPA Services", "Process Mining", "Workflow Automation", "Intelligent Document Processing", "AIOps" ],
            "BPO - Finance & Accounting": [ "Record to Report", "Order to Cash", "Procure to Pay", "Treasury Operations", "Tax Operations", "Financial Planning & Analysis" ],
            "BPO - Customer Operations": [ "Customer Care", "Technical Support", "Sales Support", "Trust & Safety", "Revenue Cycle Support" ],
            "BPO - HR & Talent": [ "HR Outsourcing", "Payroll Services", "Benefits Administration", "Recruitment Process Outsourcing", "Learning Operations" ],
            "BPO - Procurement & Supply Chain": [ "Strategic Sourcing", "Procurement Operations", "Supplier Management", "Logistics Operations", "Inventory Operations" ],
            "BPO - Industry Operations": [ "Claims Operations", "Banking Operations", "Mortgage Processing", "Healthcare Member Operations", "Telecom Service Fulfillment" ]
        }, c = [ "Financial Services", "Healthcare", "Retail", "Manufacturing", "Public Sector", "Telecom", "Energy & Utilities", "Travel & Hospitality", "Consumer Goods", "Life Sciences" ], l = {
            "North America": [ "United States", "Canada", "Mexico", "Greenland" ],
            EMEA: [ "United Kingdom", "Ireland", "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Luxembourg", "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Portugal", "Austria", "Poland", "Czech Republic", "Slovakia", "Hungary", "Romania", "Bulgaria", "Greece", "Croatia", "Slovenia", "Serbia", "Lithuania", "Latvia", "Estonia", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Jordan", "South Africa", "Nigeria", "Kenya", "Morocco", "Algeria", "Tunisia", "Israel", "Turkey", "Egypt", "Ukraine" ],
            APAC: [ "Australia", "New Zealand", "India", "China", "Japan", "South Korea", "Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Taiwan", "Hong Kong", "Macau", "Sri Lanka", "Bangladesh", "Pakistan", "Nepal", "Cambodia", "Laos", "Myanmar", "Brunei", "Mongolia", "Maldives", "Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Papua New Guinea", "Fiji" ],
            LATAM: [ "Brazil", "Argentina", "Chile", "Colombia", "Peru", "Uruguay", "Panama", "Dominican Republic", "Guatemala", "Ecuador", "Bolivia", "Paraguay", "El Salvador", "Honduras", "Costa Rica", "Nicaragua", "Belize", "Venezuela", "Guyana", "Suriname", "Jamaica", "Trinidad and Tobago", "Bahamas", "Barbados", "Haiti", "Cuba", "Puerto Rico", "Antigua and Barbuda", "Dominica", "Grenada", "Saint Lucia", "Saint Vincent and the Grenadines" ]
        }, d = [ {
            name: "Accenture",
            aliases: [ "Andersen Consulting" ],
            businessUnits: [ "Strategy & Consulting", "Operations" ]
        }, {
            name: "ADP",
            aliases: [ "Automatic Data Processing" ],
            businessUnits: [ "Employer Services", "PEO Services" ]
        }, {
            name: "Alorica",
            aliases: [],
            businessUnits: [ "CX Management", "Digital Care" ]
        }, {
            name: "Atento",
            aliases: [],
            businessUnits: [ "Customer Experience", "Digital Sales" ]
        }, {
            name: "Atos",
            aliases: [ "Syntel" ],
            businessUnits: [ "Eviden", "Tech Foundations" ]
        }, {
            name: "Birlasoft",
            aliases: [],
            businessUnits: [ "Digital Transformation", "Enterprise Applications" ]
        }, {
            name: "Capita",
            aliases: [],
            businessUnits: [ "Public Service BPO", "Customer Management" ]
        }, {
            name: "TCS",
            aliases: [ "Tata Consultancy Services" ],
            businessUnits: [ "Cognitive Business Operations", "Consulting & Services" ]
        }, {
            name: "Capgemini",
            aliases: [ "Cap Gemini" ],
            businessUnits: [ "Capgemini Invent", "Capgemini Engineering" ]
        }, {
            name: "Cognizant",
            aliases: [],
            businessUnits: [ "TriZetto", "Infrastructure Services" ]
        }, {
            name: "Concentrix",
            aliases: [ "Convergys" ],
            businessUnits: [ "CX Operations", "Digital Experience" ]
        }, {
            name: "Conduent",
            aliases: [ "Xerox BPO" ],
            businessUnits: [ "Government Services", "CX Management" ]
        }, {
            name: "CSS Corp",
            aliases: [ "Movate" ],
            businessUnits: [ "Digital Engineering", "CX Support" ]
        }, {
            name: "Datamatics",
            aliases: [],
            businessUnits: [ "BPM", "Digital Technologies" ]
        }, {
            name: "Dell Technologies",
            aliases: [ "Perot Systems" ],
            businessUnits: [ "Dell Services", "Infrastructure Solutions" ]
        }, {
            name: "DXC",
            aliases: [ "CSC", "HPE Enterprise Services" ],
            businessUnits: [ "ITO", "BPS" ]
        }, {
            name: "Wipro",
            aliases: [ "Wipro Technologies" ],
            businessUnits: [ "FullStride Cloud", "Enterprise Futuring" ]
        }, {
            name: "HCLTech",
            aliases: [ "HCL Technologies" ],
            businessUnits: [ "HCL Software", "Digital Foundation Services" ]
        }, {
            name: "Hexaware",
            aliases: [],
            businessUnits: [ "Digital IT Operations", "BPS" ]
        }, {
            name: "Hitachi Digital Services",
            aliases: [ "Hitachi Vantara Digital Services" ],
            businessUnits: [ "Data & AI", "Industrial Digital" ]
        }, {
            name: "IBM",
            aliases: [],
            businessUnits: [ "IBM Consulting", "IBM Technology" ]
        }, {
            name: "Infosys",
            aliases: [],
            businessUnits: [ "Infosys Cobalt", "Infosys BPM" ]
        }, {
            name: "Kyndryl",
            aliases: [ "IBM Managed Infrastructure Services" ],
            businessUnits: [ "Digital Workplace", "Cloud Services" ]
        }, {
            name: "L&T Technology Services",
            aliases: [ "LTTS" ],
            businessUnits: [ "Engineering R&D", "Digital Manufacturing" ]
        }, {
            name: "LTIMindtree",
            aliases: [ "LTI", "Mindtree" ],
            businessUnits: [ "Consulting", "Cloud & Infrastructure" ]
        }, {
            name: "Mphasis",
            aliases: [],
            businessUnits: [ "Next Labs", "BPS" ]
        }, {
            name: "Mastek",
            aliases: [],
            businessUnits: [ "Digital Engineering", "Oracle Services" ]
        }, {
            name: "Majorel",
            aliases: [],
            businessUnits: [ "Customer Experience", "Trust & Safety" ]
        }, {
            name: "Nagarro",
            aliases: [],
            businessUnits: [ "Digital Product Engineering", "SAP Services" ]
        }, {
            name: "NEC",
            aliases: [ "Nippon Electric Company" ],
            businessUnits: [ "Global Services", "Digital Government" ]
        }, {
            name: "NICE",
            aliases: [ "NICE Systems" ],
            businessUnits: [ "CXone", "Analytics" ]
        }, {
            name: "NTT DATA",
            aliases: [ "Nippon Telegraph and Telephone Data" ],
            businessUnits: [ "Digital Engineering", "BPO" ]
        }, {
            name: "Persistent",
            aliases: [ "Persistent Systems" ],
            businessUnits: [ "Digital Engineering", "Cloud" ]
        }, {
            name: "PwC",
            aliases: [ "PricewaterhouseCoopers" ],
            businessUnits: [ "Advisory", "Managed Services" ]
        }, {
            name: "Sopra Steria",
            aliases: [],
            businessUnits: [ "Sopra Banking Software", "Digital Services" ]
        }, {
            name: "Stefanini",
            aliases: [],
            businessUnits: [ "Stefanini Group", "CX Services" ]
        }, {
            name: "Sutherland",
            aliases: [ "Sutherland Global Services" ],
            businessUnits: [ "Digital Operations", "AI & Automation" ]
        }, {
            name: "Synechron",
            aliases: [],
            businessUnits: [ "Digital", "Data & AI" ]
        }, {
            name: "Tech Mahindra",
            aliases: [ "Mahindra Satyam" ],
            businessUnits: [ "Network Services", "BPS" ]
        }, {
            name: "Teleperformance",
            aliases: [ "TP" ],
            businessUnits: [ "CX Management", "Specialized Services" ]
        }, {
            name: "TELUS International",
            aliases: [ "TELUS Digital" ],
            businessUnits: [ "AI Data Solutions", "Digital CX" ]
        }, {
            name: "Tietoevry",
            aliases: [ "Tieto", "EVRY" ],
            businessUnits: [ "Create", "Care" ]
        }, {
            name: "TTEC",
            aliases: [ "TeleTech" ],
            businessUnits: [ "TTEC Digital", "TTEC Engage" ]
        }, {
            name: "Unisys",
            aliases: [],
            businessUnits: [ "Cloud & Infrastructure", "Digital Workplace" ]
        }, {
            name: "UST",
            aliases: [ "UST Global" ],
            businessUnits: [ "Digital Transformation", "BPM" ]
        }, {
            name: "Virtusa",
            aliases: [],
            businessUnits: [ "Digital Engineering", "BFSI Services" ]
        }, {
            name: "WNS",
            aliases: [],
            businessUnits: [ "Analytics", "Digital Operations" ]
        }, {
            name: "EXL",
            aliases: [ "ExlService" ],
            businessUnits: [ "Operations Management", "Analytics" ]
        }, {
            name: "Genpact",
            aliases: [ "GE Capital International Services" ],
            businessUnits: [ "Transformation Services", "Digital Operations" ]
        }, {
            name: "Foundever",
            aliases: [ "Sitel", "Sykes" ],
            businessUnits: [ "Customer Experience", "Trust & Safety" ]
        }, {
            name: "Firstsource",
            aliases: [],
            businessUnits: [ "Healthcare Services", "BFS Services" ]
        }, {
            name: "Coforge",
            aliases: [ "NIIT Technologies" ],
            businessUnits: [ "Digital Services", "BPS" ]
        }, {
            name: "EPAM",
            aliases: [ "EPAM Systems" ],
            businessUnits: [ "Product Engineering", "Data & Analytics" ]
        }, {
            name: "Fujitsu",
            aliases: [ "Fujitsu Services" ],
            businessUnits: [ "Uvance", "Managed Infrastructure" ]
        }, {
            name: "CGI",
            aliases: [ "Conseillers en gestion et informatique" ],
            businessUnits: [ "Consulting", "Managed IT" ]
        }, {
            name: "Searce",
            aliases: [],
            businessUnits: [ "Cloud Consulting", "Data Engineering" ]
        }, {
            name: "Amdocs",
            aliases: [],
            businessUnits: [ "Managed Services", "BSS & OSS" ]
        }, {
            name: "Broadridge",
            aliases: [],
            businessUnits: [ "Wealth Operations", "Capital Markets BPO" ]
        }, {
            name: "Singtel",
            aliases: [ "Singapore Telecommunications" ],
            businessUnits: [ "NCS", "Digital Infrastructure" ]
        }, {
            name: "Orange Business",
            aliases: [ "Orange Business Services" ],
            businessUnits: [ "Cloud", "Cyberdefense" ]
        }, {
            name: "KPMG",
            aliases: [ "KPMG International" ],
            businessUnits: [ "Advisory", "Managed Services" ]
        }, {
            name: "Deloitte",
            aliases: [ "Deloitte Touche Tohmatsu" ],
            businessUnits: [ "Consulting", "Operate Services" ]
        }, {
            name: "EY",
            aliases: [ "Ernst & Young" ],
            businessUnits: [ "Consulting", "Managed Services" ]
        } ], h = {
            "Financial Services": .8,
            Healthcare: .9,
            Retail: .65,
            Manufacturing: .55,
            "Public Sector": .45,
            Telecom: .6,
            "Energy & Utilities": .5,
            "Travel & Hospitality": .48,
            "Consumer Goods": .52,
            "Life Sciences": .85
        }, u = {
            "Consulting & Advisory": 1.1,
            "Applications & Digital Engineering": 1.35,
            "Data, AI & Analytics": 1.8,
            "Cloud & Infrastructure": 1.45,
            "SaaS Forecasting & Optimization": 1.28,
            "Cybersecurity & Risk": 1.65,
            "Intelligent Automation": 1.5,
            "BPO - Finance & Accounting": .95,
            "BPO - Customer Operations": .75,
            "BPO - HR & Talent": .7,
            "BPO - Procurement & Supply Chain": .88,
            "BPO - Industry Operations": .82
        }, m = {
            Accenture: .7,
            TCS: .58,
            Capgemini: .52,
            Cognizant: .5,
            Wipro: .42,
            HCLTech: .44,
            Infosys: .56,
            IBM: .5,
            Genpact: .47,
            Concentrix: .4,
            Teleperformance: .35,
            "NTT DATA": .45,
            DXC: .28
        }, p = {
            Accenture: 64.9,
            ADP: 19.2,
            Capgemini: 24.5,
            Cognizant: 19.4,
            Concentrix: 9.6,
            Deloitte: 67,
            DXC: 13.7,
            EPAM: 4.8,
            EXL: 1.7,
            EY: 49.4,
            Foundever: 4,
            Fujitsu: 24,
            Genpact: 4.6,
            HCLTech: 13.2,
            IBM: 61.9,
            Infosys: 19,
            KPMG: 38.4,
            LTIMindtree: 4.3,
            Mphasis: 1.9,
            "NTT DATA": 28.8,
            PwC: 53.1,
            TCS: 29,
            "Tech Mahindra": 6.5,
            Teleperformance: 9.4,
            "TELUS International": 2.7,
            Tietoevry: 3.1,
            TTEC: 2.4,
            Unisys: 2,
            UST: 2.1,
            Wipro: 11.2,
            WNS: 1.2
        }, ttProviderAnnualReportMonths = {
            Accenture: "Oct 2025",
            ADP: "Aug 2025",
            Capgemini: "Mar 2026",
            Cognizant: "Feb 2026",
            Concentrix: "Jan 2026",
            Deloitte: "Jun 2025",
            DXC: "May 2025",
            EPAM: "Feb 2026",
            EXL: "Feb 2026",
            EY: "Jun 2025",
            Foundever: "Apr 2025",
            Fujitsu: "Jun 2025",
            Genpact: "Feb 2026",
            HCLTech: "Apr 2025",
            IBM: "Feb 2026",
            Infosys: "Jun 2025",
            KPMG: "Dec 2025",
            LTIMindtree: "Apr 2025",
            Mphasis: "May 2025",
            "NTT DATA": "Jun 2025",
            PwC: "Nov 2025",
            TCS: "Apr 2025",
            "Tech Mahindra": "May 2025",
            Teleperformance: "Mar 2026",
            "TELUS International": "Feb 2026",
            Tietoevry: "Mar 2026",
            TTEC: "Feb 2026",
            Unisys: "Feb 2026",
            UST: "Sep 2025",
            Wipro: "Jun 2025",
            WNS: "May 2025"
        }, x = {
            "North America": .85,
            EMEA: .62,
            APAC: .74,
            LATAM: .5
        }, g = {
            Base: 1,
            Upside: 1.08,
            Downside: .92
        }, v = (new Date).getFullYear() + 1, j = [ 0, 1, 2, 3, 4 ].map((e => v + e)), b = v - 1, y = [ {
            demand: 1,
            budget: 1,
            price: 1,
            tech: 1,
            service: 1,
            geo: 1,
            org: 1
        }, {
            demand: .97,
            budget: .98,
            price: 1.01,
            tech: .93,
            service: .97,
            geo: .98,
            org: .98
        }, {
            demand: .95,
            budget: .96,
            price: 1.02,
            tech: .88,
            service: .95,
            geo: .97,
            org: .97
        }, {
            demand: .94,
            budget: .95,
            price: 1.02,
            tech: .84,
            service: .94,
            geo: .96,
            org: .96
        }, {
            demand: .93,
            budget: .94,
            price: 1.03,
            tech: .8,
            service: .93,
            geo: .95,
            org: .95
        } ], f = {
            Base: {
                demand: 1,
                budget: 1,
                price: 1,
                tech: 1,
                service: 1,
                geo: 1,
                org: 1
            },
            Upside: {
                demand: 1.05,
                budget: 1.07,
                price: 1.02,
                tech: 1.08,
                service: 1.05,
                geo: 1.03,
                org: 1.03
            },
            Downside: {
                demand: .95,
                budget: .93,
                price: .99,
                tech: .9,
                service: .95,
                geo: .97,
                org: .98
            }
        }, w = {
            yearScale: [ 1.2, 1.16, 1.12, 1.08, 1.05 ],
            yearBounds: [ {
                min: .5,
                max: 13.5
            }, {
                min: .5,
                max: 12.2
            }, {
                min: .4,
                max: 11.2
            }, {
                min: .4,
                max: 10.4
            }, {
                min: .3,
                max: 9.8
            } ],
            profileShiftPct: {
                adoption: .9,
                mature: 0,
                steady: -.5
            },
            scenarioShiftPct: {
                Base: 0,
                Upside: 1.1,
                Downside: -1.1
            },
            regionShiftPct: {
                "North America": .2,
                EMEA: 0,
                APAC: .35,
                LATAM: .15
            }
        }, S = [ "AR Superhero", "Investor", "PE", "VC", "Cross-Cutting" ], C = [ "USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "SGD" ], N = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
            JPY: "¥",
            AUD: "A$",
            CAD: "C$",
            SGD: "S$"
        }, A = "Annual growth is the year-specific growth rate for the selected forecast year. It is not copied from other years.", k = "Forecast size is the recursively projected market size for the selected forecast year.", T = "CAGR is the compound annual growth rate across the full displayed forecast horizon.", _ = "AR Superhero 0.9.1", M = "".concat("2026-03-11", "T00:00:00.000Z"), D = "__REGION__:", P = "forecast-workbench.saved-views.v1", I = "forecast-workbench.audit-trail.v1", F = "forecast-workbench.workspace-settings.v1", G = [ {
            version: "AR Superhero 0.9.1",
            status: "Current",
            releaseDate: "2026-03-11",
            summary: "Added formal lineage register, assumption log, model versioning, and output certification."
        }, {
            version: "AR Superhero 0.9.0",
            status: "Prior",
            releaseDate: "2026-03-11",
            summary: "Introduced recursive year-by-year forecasts, forward-year selector, and CAGR output."
        }, {
            version: "AR Superhero 0.8.0",
            status: "Prior",
            releaseDate: "2026-03-10",
            summary: "Expanded provider, geography, scenario, and persona workflow coverage."
        } ], B = [ {
            artifact: "Service taxonomy",
            source: "Static in-app taxonomy",
            transformation: "Defines macro and micro service slices used to seed the forecast lattice.",
            refresh: "Code release"
        }, {
            artifact: "Provider registry",
            source: "Static provider directory with aliases and business units",
            transformation: "Builds provider coverage, provider filtering, and provider metadata labels.",
            refresh: "Code release"
        }, {
            artifact: "Revenue anchors",
            source: "Provider anchor table with deterministic fallback",
            transformation: "Supplies current-year revenue estimate when a provider is explicitly selected.",
            refresh: "Code release"
        }, {
            artifact: "Forecast engine",
            source: "Weighted driver model with yearly modifiers and calibration",
            transformation: "Projects forward market sizes and annual growth recursively from the base year.",
            refresh: "On generated output view"
        }, {
            artifact: "Geography layer",
            source: "Region and country lookup tables",
            transformation: "Maps selected geography into region and country modifiers inside the forecast engine.",
            refresh: "Code release"
        }, {
            artifact: "FX translation",
            source: "open.er-api.com USD feed",
            transformation: "Converts displayed spend, revenue, and forecast-size outputs into the selected currency.",
            refresh: "On currency action"
        } ], U = [ {
            assumption: "Base market size is internally seeded when audited market actuals are not loaded.",
            scope: "All forecast slices",
            impact: "Best used for relative ranking and scenarioing rather than audited external market sizing.",
            reviewTrigger: "When external actuals are integrated."
        }, {
            assumption: "Driver weights stay structurally constant while driver values vary by slice and year.",
            scope: "Forecast engine",
            impact: "Improves interpretability but may understate niche sub-segment dynamics.",
            reviewTrigger: "When repeated backtest bias appears by tower or region."
        }, {
            assumption: "Technology-led categories normalize over time; mature and BPO categories remain steadier.",
            scope: "Service profile curves",
            impact: "Prevents flat growth reuse across the full horizon and creates differentiated time paths.",
            reviewTrigger: "When adoption curves materially change."
        }, {
            assumption: "Provider-specific execution effects are directional, not audited market-share statements.",
            scope: "Provider outputs",
            impact: "Supports relative provider ranking but should not be treated as certified share data.",
            reviewTrigger: "When provider actual share or win-rate inputs are added."
        }, {
            assumption: "FX translation is display-only and does not alter the underlying USD forecast engine.",
            scope: "Currency outputs",
            impact: "Keeps the core model stable across currency views while preserving comparability.",
            reviewTrigger: "When local-currency forecasting is introduced."
        }, {
            assumption: "Output certification confirms versioned assumptions and active controls, not third-party assurance.",
            scope: "Governance layer",
            impact: "Creates lineage and traceability without implying external attestation.",
            reviewTrigger: "When formal external validation is implemented."
        } ], O = {
            investorMandate: "Shows prioritized industry-service-provider combinations with directional mandate attractiveness.",
            investorBuyerUniverse: "Summarizes buyer fit by provider using strategic fit, sponsor fit, and average growth.",
            investorDealTiming: "Tracks industry-level timing signals for valuation window, debt window, and momentum.",
            investorDiligenceRisk: "Flags high-priority diligence risks by provider and risk dimension.",
            peTargetScreener: "Screens providers as platform or bolt-on targets using industry-service fit and target score.",
            peValueCreation: "Lists value-creation levers, accountable owners, and estimated impact score.",
            peExitOptimizer: "Highlights industry-level exit attractiveness and recommended hold/exit action.",
            peExposure: "Shows portfolio concentration by macro service line and combination count.",
            vcSignalPipeline: "Ranks early themes by signal score and associated average growth.",
            vcRoundTiming: "Estimates round timing and directional valuation range by theme.",
            vcFollowOn: "Suggests follow-on reserve allocation and conviction by theme.",
            crossExplainability: "Breaks down model driver contribution and relative weight share.",
            crossAlerting: "Displays rows that trigger alerting based on your active growth threshold.",
            crossScenario: "Compares average growth across scenarios versus the active scenario baseline.",
            crossCertification: "Certifies the currently generated output using the active model version, controls, and display state.",
            crossVersioning: "Tracks the model release currently in use and the recent release history.",
            crossLineage: "Shows where each major output component comes from and how it is transformed in the tool.",
            crossAssumptions: "Lists the governing assumptions that shape output behavior and how they should be interpreted.",
            crossSavedViews: "Lets users save, reload, and share named output states for repeatable workflow use.",
            crossPermissions: "Session-level permission mode that controls whether model inputs and workspace management remain editable.",
            crossAudit: "Tracks key user actions with timestamps so changes to the workspace can be reviewed later."
        }, ttAllTokens = {
            market: "__ALL_MARKETS__",
            macro: "__ALL_MACROS__",
            micro: "__ALL_MICROS__",
            region: "__ALL_REGIONS__",
            country: "__ALL_COUNTRIES__",
            provider: "__ALL_PROVIDERS__"
        }, ttBreakouts = [ "None", "Industry", "Macro service line", "Micro service line", "Region", "Country", "Provider" ];
        function E() {
            return {
                market: [],
                macro: [],
                micro: [],
                provider: [],
                providerSearch: "",
                scenario: "Base",
                minGrowth: "",
                maxGrowth: "",
                region: [],
                country: [],
                breakout: "None"
            };
        }
        function R(e) {
            let t = 0;
            for (let a = 0; a < e.length; a += 1) t = 31 * t + e.charCodeAt(a) >>> 0;
            return t % 1e3 / 1e3;
        }
        function L(e) {
            let t = 0;
            for (let a = 0; a < e.length; a += 1) t = 31 * t + e.charCodeAt(a) >>> 0;
            return t.toString(16).toUpperCase().padStart(8, "0");
        }
        function V(e, t, a) {
            return Math.min(a, Math.max(t, e));
        }
        function H(e) {
            let t = new Date(e);
            return Number.isNaN(t.getTime()) ? "Not captured" : new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }).format(t);
        }
        function z(e) {
            return Array.isArray(e) ? e.filter(Boolean) : e ? [ e ] : [];
        }
        function W(e) {
            var t, a, i, r;
            return {
                market: z(null == e ? void 0 : e.market),
                macro: z(null == e ? void 0 : e.macro),
                micro: z(null == e ? void 0 : e.micro),
                provider: z(null == e ? void 0 : e.provider),
                providerSearch: null !== (t = null == e ? void 0 : e.providerSearch) && void 0 !== t ? t : "",
                scenario: null !== (a = null == e ? void 0 : e.scenario) && void 0 !== a ? a : "Base",
                minGrowth: null !== (i = null == e ? void 0 : e.minGrowth) && void 0 !== i ? i : "",
                maxGrowth: null !== (r = null == e ? void 0 : e.maxGrowth) && void 0 !== r ? r : "",
                region: z(null == e ? void 0 : e.region),
                country: z(null == e ? void 0 : e.country),
                breakout: "string" == typeof (null == e ? void 0 : e.breakout) ? e.breakout : "None"
            };
        }
        function ttSelectionMode(e, t) {
            return !e.length ? "none" : e.includes(t) ? "all" : "specific";
        }
        function ttSpecificValues(e, t) {
            return e.filter((e => e !== t));
        }
        function ttSingleValue(e, t) {
            let a = ttSpecificValues(e, t);
            return 1 === a.length ? a[0] : "";
        }
        function ttSelectionSummary(e, t) {
            let {allToken: a, noneLabel: i, allLabel: r, formatter: s} = t, n = ttSelectionMode(e, a);
            if ("none" === n) return i;
            if ("all" === n) return r;
            let o = ttSpecificValues(e, a).map((e => s ? s(e) : e));
            return 1 === o.length ? o[0] : o.length <= 3 ? o.join(", ") : "".concat(o.slice(0, 2).join(", "), " +").concat(o.length - 2, " more");
        }
        function ttCompactSelectionLabel(e) {
            let t = {
                "No macro selected": "No macro",
                "No micro selected": "No micro",
                "No industry selected": "No industry",
                "No region selected": "No region",
                "No country selected": "No country",
                "No provider selected": "No provider",
                "All macro services": "All macros",
                "All micro services": "All micros",
                "All industries": "All industries",
                "All regions": "All regions",
                "All countries": "All countries",
                "All providers": "All providers"
            };
            return t[e] || e.replace(/ selected$/i, "");
        }
        function ttScopeLabel(e, t) {
            let {allToken: a, noneLabel: i, allLabel: r, prefix: s, formatter: n} = t, o = ttSelectionMode(e, a);
            if ("none" === o) return i;
            if ("all" === o) return r;
            let c = ttSpecificValues(e, a).map((e => n ? n(e) : e));
            return 1 === c.length ? "".concat(s, ": ").concat(c[0]) : "".concat(s, ": ").concat(c.join(", "));
        }
        function ttScopeDescriptor(e) {
            let t = ttSingleValue(e.macro, ttAllTokens.macro), a = ttSingleValue(e.micro, ttAllTokens.micro), i = ttSingleValue(e.country, ttAllTokens.country), r = ttSingleValue(e.region, ttAllTokens.region), s = a ? t ? "".concat(t, " / ").concat(a) : a : t || "", n = i || r || "";
            return s && n ? "".concat(s, " in ").concat(n) : s || n || "selected scope";
        }
        function X(e, t) {
            return e.length === t.length && e.every(((e, a) => e === t[a]));
        }
        function Y(e) {
            return Array.from(e.target.selectedOptions, (e => e.value));
        }
        function K(e, t, a) {
            if (!e.length) return t;
            let i = e.map((e => a ? a(e) : e));
            return i.length <= 3 ? i.join(", ") : "".concat(i.slice(0, 2).join(", "), " +").concat(i.length - 2, " more");
        }
        function J(e, t) {
            return X(e.market, t.market) && X(e.macro, t.macro) && X(e.micro, t.micro) && X(e.provider, t.provider) && e.providerSearch === t.providerSearch && e.scenario === t.scenario && e.minGrowth === t.minGrowth && e.maxGrowth === t.maxGrowth && X(e.region, t.region) && X(e.country, t.country) && e.breakout === t.breakout;
        }
        function Q(e) {
            return "".concat(e.name, " ").concat(e.aliases.join(" "), " ").concat(e.businessUnits.join(" ")).toLowerCase();
        }
        function q(e) {
            return new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(e);
        }
        function $(e) {
            let {label: t, text: a, compact: s = !1} = e, [o, c] = (0, r.useState)(!1), l = (0, 
            r.useId)();
            return (0, i.jsxs)("span", {
                className: s ? n().infoDisclosureCompact : n().infoDisclosure,
                onMouseLeave: () => c(!1),
                children: [ (0, i.jsx)("button", {
                    type: "button",
                    className: s ? n().infoSummaryCompact : n().infoSummary,
                    "aria-expanded": o,
                    "aria-controls": l,
                    onClick: () => c(!0),
                    children: t
                }), o ? (0, i.jsx)("div", {
                    id: l,
                    role: "tooltip",
                    className: n().infoPanel,
                    onMouseEnter: () => c(!0),
                    onMouseLeave: () => c(!1),
                    children: a
                }) : null ]
            });
        }
        function Z(e) {
            let {text: t, help: a} = e;
            return (0, i.jsxs)("span", {
                className: n().labelWithInfo,
                children: [ (0, i.jsx)("span", {
                    children: t
                }), (0, i.jsx)($, {
                    label: "i",
                    text: a,
                    compact: !0
                }) ]
            });
        }
function ee(e) {
            let {text: t, help: a} = e;
            return (0, i.jsxs)("span", {
                className: n().columnHeaderLabel,
                children: [ (0, i.jsx)("span", {
                    children: t
                }), a ? (0, i.jsx)($, {
                    label: "i",
                    text: a,
                    compact: !0
                }) : null ]
            });
        }
        function EtDropdownOption(e) {
            let { option: t, selected: a, onToggle: s } = e;
            return (0, i.jsxs)("button", {
                type: "button",
                className: a ? n().multiDropdownOptionActive : n().multiDropdownOption,
                onClick: () => s(t.value),
                children: [ (0, i.jsx)("span", {
                    className: n().multiDropdownCheckbox,
                    children: a ? "x" : ""
                }), (0, i.jsx)("span", {
                    className: n().multiDropdownOptionText,
                    children: t.label
                }) ]
            });
        }
        function EtMultiDropdown(e) {
            let { value: t, placeholder: a, disabled: s, onChange: o, options: c, groups: l, formatValue: d, noneLabel: h, allLabel: u, allToken: m } = e, [p, x] = (0, r.useState)(!1), g = (0, r.useRef)(null);
            (0, r.useEffect)((() => {
                if (!p) return;
                let e = t => {
                    g.current && !g.current.contains(t.target) && x(!1);
                };
                return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
            }), [ p ]);
            let v = ttSelectionSummary(t, {
                allToken: m,
                noneLabel: h || a,
                allLabel: u || a,
                formatter: d
            }), j = ttSelectionMode(t, m), b = "specific" === j ? v : ttCompactSelectionLabel("none" === j ? h || a : u || a), N = e => {
                if (e === m) {
                    o([ m ]);
                    return;
                }
                let a = ttSpecificValues(t, m);
                o(a.includes(e) ? a.filter((t => t !== e)) : [ ...a, e ]);
            };
            return (0, i.jsxs)("div", {
                className: n().multiDropdown,
                ref: g,
                children: [ (0, i.jsxs)("button", {
                    type: "button",
                    className: n().multiDropdownTrigger,
                    disabled: s,
                    onClick: () => !s && x((e => !e)),
                    children: [ (0, i.jsx)("span", {
                        className: "specific" === j ? n().multiDropdownSummary : n().multiDropdownSummaryState,
                        title: v,
                        children: b
                    }), (0, i.jsx)("span", {
                        className: n().multiDropdownCaret,
                        children: p ? "▲" : "▼"
                    }) ]
                }), p ? (0, i.jsxs)("div", {
                    className: n().multiDropdownPanel,
                    children: [ (0, i.jsx)("div", {
                        className: n().multiDropdownActions,
                        children: (0, i.jsxs)(i.Fragment, {
                            children: [ (0, i.jsx)("button", {
                                type: "button",
                                className: n().multiDropdownClear,
                                onClick: () => o([]),
                                title: h || a,
                                children: ttCompactSelectionLabel(h || a)
                            }), m ? (0, i.jsx)("button", {
                                type: "button",
                                className: n().multiDropdownClear,
                                onClick: () => o([ m ]),
                                title: u,
                                children: ttCompactSelectionLabel(u)
                            }) : null ]
                        })
                    }), l ? l.map((e => (0, i.jsxs)("div", {
                        className: n().multiDropdownGroup,
                        children: [ (0, i.jsx)("p", {
                            className: n().multiDropdownGroupLabel,
                            children: e.label
                        }), e.options.map((e => (0, i.jsx)(EtDropdownOption, {
                            option: e,
                            selected: t.includes(e.value),
                            onToggle: N
                        }, e.value))) ]
                    }, e.label))) : c.map((e => (0, i.jsx)(EtDropdownOption, {
                        option: e,
                        selected: t.includes(e.value),
                        onToggle: N
                    }, e.value))) ]
                }) : null ]
            });
        }
        function et() {
            var e;
            let [t, a] = (0, r.useState)("AR Superhero"), [s, z] = (0, r.useState)((() => E())), [X, et] = (0, 
            r.useState)((() => E())), [ttHasGeneratedOutput, ttSetHasGeneratedOutput] = (0, r.useState)(!1), [ea, ei] = (0, r.useState)("growth"), [er, es] = (0, r.useState)("desc"), [en, eo] = (0, 
            r.useState)("Next 2 Quarters"), [ec, el] = (0, r.useState)("9.0"), [ed, eh] = (0, 
            r.useState)("USD"), [eu, em] = (0, r.useState)(j[0]), [ep, ex] = (0, r.useState)({
                USD: 1
            }), [eg, ev] = (0, r.useState)(""), [ej, eb] = (0, r.useState)(!1), [ey, ef] = (0, 
            r.useState)(""), [ew, eS] = (0, r.useState)(1), [eC, eN] = (0, r.useState)(M), [eA, ek] = (0, 
            r.useState)("Analyst"), [eT, e_] = (0, r.useState)("Editor"), [eM, eD] = (0, r.useState)([]), [eP, eI] = (0, 
            r.useState)(""), [eF, eG] = (0, r.useState)(""), [eB, eU] = (0, r.useState)("Team"), [eO, eE] = (0, 
            r.useState)(""), [eR, eL] = (0, r.useState)([]), [eV, eH] = (0, r.useState)(""), [ez, eW] = (0, 
            r.useState)(!1), eX = (0, r.useMemo)((() => {
                let e = new Map;
                for (let t of d) e.set(t.name, t);
                return e;
            }), []), eY = (0, r.useMemo)((() => [ ...new Set(Object.values(o).flat()) ].sort(((e, t) => e.localeCompare(t)))), []), eK = (0, 
            r.useMemo)((() => {
                let e = [];
                for (let t of Object.keys(l)) e.push({
                    region: t,
                    countries: [ ...l[t] ]
                });
                return e;
            }), []), eJ = (0, r.useMemo)((() => {
                let e = new Map;
                for (let t of eK) for (let a of t.countries) e.set(a, t.region);
                return e;
            }), [ eK ]), eQ = (0, r.useMemo)((() => {
                let e = ttSpecificValues(s.macro, ttAllTokens.macro);
                return e.length ? [ ...new Set(e.flatMap((e => o[e] || []))) ].sort(((e, t) => e.localeCompare(t))) : [];
            }), [ s.macro, eY ]), eq = (0, 
            r.useMemo)((() => {
                let e = [];
                for (let s of c) for (let n of Object.keys(o)) for (let c of o[n]) for (let o of d) {
                    var t, a, i, r;
                    let l = n.startsWith("BPO -") ? "steady" : /(AI|Automation|Data Platform|Machine Learning|Generative|Cloud Migration|Intelligent)/i.test("".concat(n, " ").concat(c)) ? "adoption" : "mature", d = R("d-base|".concat(s, "|").concat(n, "|").concat(c)), x = R("b-base|".concat(s, "|").concat(n, "|").concat(c)), g = R("p-base|".concat(s, "|").concat(n, "|").concat(c, "|").concat(o.name)), v = R("x-base|".concat(s, "|").concat(n, "|").concat(c)), j = R("s-base|".concat(s, "|").concat(n, "|").concat(c)), b = R("g-base|".concat(s, "|").concat(n, "|").concat(c)), y = R("o-base|".concat(o.name, "|").concat(n, "|").concat(c)), f = "adoption" === l ? .054 + .016 * v : "steady" === l ? .024 + .01 * v : .034 + .013 * v, w = n.startsWith("BPO -") ? .024 + .012 * x : .016 + .01 * x, S = .014 + (null !== (t = u[n]) && void 0 !== t ? t : .8) * .011 + .005 * j, C = {
                        D: V(.022 + (null !== (a = h[s]) && void 0 !== a ? a : .55) * .018 + .007 * d, .01, .08),
                        B: V(w, .01, .07),
                        P: V(.008 + .01 * g, .004, .03),
                        X: V(f, .01, .09),
                        S: V(S, .01, .08),
                        G: V(.011 + .007 * b, .006, .03),
                        O: V(.009 + (null !== (i = m[o.name]) && void 0 !== i ? i : .24) * .01 + .004 * y, .006, .03)
                    }, N = V(65 + 310 * R("figure|".concat(s, "|").concat(n, "|").concat(c, "|").concat(o.name)), 25, 780);
                    e.push({
                        market: s,
                        macro: n,
                        micro: c,
                        provider: o.name,
                        providerRevenueUsdB: void 0 !== p[r = o.name] ? p[r] : Number((2.2 + 11.8 * R("provider-revenue|".concat(r))).toFixed(1)),
                        baseFigure: Number(N.toFixed(2)),
                        baseDrivers: C,
                        serviceProfile: l
                    });
                }
                return e;
            }), []), e$ = (0, r.useMemo)((() => {
                let e = "" !== X.minGrowth.trim();
                let t = "" !== X.maxGrowth.trim();
                let a = Number(X.minGrowth);
                let i = Number(X.maxGrowth);
                let r = e && Number.isFinite(a) ? a : Number.NEGATIVE_INFINITY;
                let s = t && Number.isFinite(i) ? i : Number.POSITIVE_INFINITY;
                let n = X.providerSearch.trim().toLowerCase();
                let marketMode = ttSelectionMode(X.market, ttAllTokens.market);
                let macroMode = ttSelectionMode(X.macro, ttAllTokens.macro);
                let microMode = ttSelectionMode(X.micro, ttAllTokens.micro);
                let providerMode = ttSelectionMode(X.provider, ttAllTokens.provider);
                let regionMode = ttSelectionMode(X.region, ttAllTokens.region);
                let countryMode = ttSelectionMode(X.country, ttAllTokens.country);
                let marketValues = new Set(ttSpecificValues(X.market, ttAllTokens.market));
                let macroValues = new Set(ttSpecificValues(X.macro, ttAllTokens.macro));
                let microValues = new Set(ttSpecificValues(X.micro, ttAllTokens.micro));
                let providerValues = new Set(ttSpecificValues(X.provider, ttAllTokens.provider));
                let regionValues = new Set(ttSpecificValues(X.region, ttAllTokens.region));
                let geoScopeRegions = "specific" === regionMode ? ttSpecificValues(X.region, ttAllTokens.region) : Object.keys(l), buildRegionTargets = e => {
                    let t = geoScopeRegions.map((t => ({
                        region: t,
                        raw: .72 + R("geo-region-share|".concat(e.market, "|").concat(e.macro, "|").concat(e.micro, "|").concat(e.provider, "|").concat(t))
                    }))), a = t.reduce(((e, t) => e + t.raw), 0) || 1;
                    return t.map((e => ({
                        region: e.region,
                        country: "",
                        share: e.raw / a
                    })));
                }, buildCountryTargets = (e, t) => {
                    let a = buildRegionTargets(e), i = new Map(a.map((e => [ e.region, e.share ]))), r = new Map;
                    for (let t of geoScopeRegions) {
                        let a = (l[t] || []).map((a => ({
                            country: a,
                            raw: .68 + R("geo-country-share|".concat(e.market, "|").concat(e.macro, "|").concat(e.micro, "|").concat(e.provider, "|").concat(a))
                        }))), i = a.reduce(((e, t) => e + t.raw), 0) || 1;
                        for (let e of a) r.set(e.country, e.raw / i);
                    }
                    let s = t.map((e => {
                        var t;
                        let a = null !== (t = i.get(e.region)) && void 0 !== t ? t : 0, s = r.get(e.country) || 0;
                        return {
                            region: e.region,
                            country: e.country,
                            share: a * s
                        };
                    })), n = s.reduce(((e, t) => e + t.share), 0) || 1;
                    return s.map((e => ({
                        ...e,
                        share: e.share / n
                    })));
                };
                let N = [];
                for (let e of eq) {
                    if ("specific" === marketMode && !marketValues.has(e.market) || "specific" === macroMode && !macroValues.has(e.macro) || "specific" === microMode && !microValues.has(e.micro) || "specific" === providerMode && !providerValues.has(e.provider)) continue;
                    let t;
                    if ("specific" === countryMode) t = buildCountryTargets(e, ttSpecificValues(X.country, ttAllTokens.country).map((t => ({
                        region: eJ.get(t) || "",
                        country: t
                    })))); else if ("Country" === X.breakout) {
                        let a = "specific" === regionMode ? eK.filter((e => regionValues.has(e.region))) : eK, i = [];
                        for (let e of a) for (let t of e.countries) i.push({
                            region: e.region,
                            country: t
                        });
                        t = buildCountryTargets(e, i);
                    } else t = buildRegionTargets(e);
                    t.length || (t = [ {
                        region: "",
                        country: "",
                        share: 1
                    } ]);
                    let a = eX.get(e.provider);
                    if (a && (!n || Q(a).includes(n))) for (let a of t) {
                        let i = function(e, t) {
                            var a, i;
                            let r = {}, s = {}, n = {}, o = [ ...j ], c = f[t.scenario], l = t.region ? ((null !== (a = x[t.region]) && void 0 !== a ? a : .62) - .62) * .018 : 0, d = t.country ? (R("geo-country|".concat(t.country)) - .5) * .012 : 0, h = e.baseFigure;
                            for (let a = 0; a < o.length; a += 1) {
                                let u = o[a], m = null !== (i = y[a]) && void 0 !== i ? i : y[y.length - 1], p = function(e, t) {
                                    var a, i, r, s, n, o;
                                    return "adoption" === e ? {
                                        tech: null !== (a = [ 1.12, 1.03, .96, .9, .85 ][t]) && void 0 !== a ? a : .85,
                                        service: null !== (i = [ 1.04, 1, .97, .94, .92 ][t]) && void 0 !== i ? i : .92,
                                        volatility: .01
                                    } : "steady" === e ? {
                                        tech: null !== (r = [ .95, .94, .93, .92, .9 ][t]) && void 0 !== r ? r : .9,
                                        service: null !== (s = [ 1, .995, .99, .985, .98 ][t]) && void 0 !== s ? s : .98,
                                        volatility: .004
                                    } : {
                                        tech: null !== (n = [ .98, .95, .92, .9, .88 ][t]) && void 0 !== n ? n : .88,
                                        service: null !== (o = [ 1, .97, .95, .94, .93 ][t]) && void 0 !== o ? o : .93,
                                        volatility: .007
                                    };
                                }(e.serviceProfile, a), x = 1 + (R("geo-cycle|".concat(t.region, "|").concat(t.country, "|").concat(u)) - .5) * .08, g = e.baseDrivers.D * m.demand * c.demand, v = e.baseDrivers.B * m.budget * c.budget, j = e.baseDrivers.P * m.price * c.price, b = e.baseDrivers.X * m.tech * p.tech * c.tech, f = e.baseDrivers.S * m.service * p.service * c.service, S = (e.baseDrivers.G + l + d) * m.geo * c.geo * x, C = e.baseDrivers.O * m.org * c.org;
                                r[u] = {
                                    D: g,
                                    B: v,
                                    P: j,
                                    X: b,
                                    S: f,
                                    G: S,
                                    O: C
                                };
                                let N = function(e, t) {
                                    var a, i;
                                    let r = null !== (a = w.yearScale[t.yearIndex]) && void 0 !== a ? a : w.yearScale[w.yearScale.length - 1], s = null !== (i = w.yearBounds[t.yearIndex]) && void 0 !== i ? i : w.yearBounds[w.yearBounds.length - 1], n = w.profileShiftPct[t.profile];
                                    return V(e * r + n + w.scenarioShiftPct[t.scenario] + (t.region ? w.regionShiftPct[t.region] : 0), s.min, s.max);
                                }(V((.25 * g + .15 * v + .1 * j + .2 * b + .1 * f + .15 * S + .05 * C + (R("shock|".concat(e.provider, "|").concat(e.market, "|").concat(e.micro, "|").concat(u)) - .5) * p.volatility) * 100, -5, 24), {
                                    yearIndex: a,
                                    profile: e.serviceProfile,
                                    scenario: t.scenario,
                                    region: t.region
                                }), A = h * (1 + N / 100);
                                s[u] = N, n[u] = A, h = A;
                            }
                            let u = o[0], m = o[o.length - 1], p = n[u], g = n[m], v = p > 0 && g > 0 ? ((g / p) ** (1 / (o.length - 1)) - 1) * 100 : 0;
                            return {
                                yearBase: b,
                                forecastYears: o,
                                base_market_size: e.baseFigure,
                                yearlyDrivers: r,
                                yearlyGrowth: s,
                                yearlyMarketSize: n,
                                cagr: v
                            };
                        }({
                            ...e,
                            baseFigure: e.baseFigure * a.share
                        }, {
                            region: a.region,
                            country: "",
                            scenario: X.scenario
                        }), o = function(e, t) {
                            if ("CAGR" === t) {
                                let t = e.forecastYears[e.forecastYears.length - 1];
                                return {
                                    growth: e.cagr,
                                    size: e.yearlyMarketSize[t]
                                };
                            }
                            return {
                                growth: e.yearlyGrowth[t],
                                size: e.yearlyMarketSize[t]
                            };
                        }(i, eu);
                        o.growth < r || o.growth > s || N.push({
                            market: e.market,
                            macro: e.macro,
                            micro: e.micro,
                            provider: e.provider,
                            providerRevenueUsdB: e.providerRevenueUsdB,
                            baseFigure: e.baseFigure * a.share,
                            growth: o.growth,
                            selectedMarketSize: o.size,
                            selectedMetric: eu,
                            region: a.region,
                            country: a.country,
                            yearBase: i.yearBase,
                            forecastYears: i.forecastYears,
                            base_market_size: i.base_market_size,
                            yearlyDrivers: i.yearlyDrivers,
                            yearlyGrowth: i.yearlyGrowth,
                            yearlyMarketSize: i.yearlyMarketSize,
                            cagr: i.cagr
                        });
                    }
                }
                return N;
            }), [ X, eq, eJ, eu, eX ]), ttProviderBaseTotals = (0, r.useMemo)((() => {
                let e = new Map;
                for (let t of eq) {
                    var a;
                    e.set(t.provider, (null !== (a = e.get(t.provider)) && void 0 !== a ? a : 0) + t.baseFigure);
                }
                return e;
            }), [ eq ]), eZ = (0, r.useMemo)((() => {
                let e = [ ...e$ ];
                return e.sort(((e, t) => {
                    let a = "asc" === er ? 1 : -1;
                    return "growth" === ea ? (e.growth - t.growth) * a : e[ea].localeCompare(t[ea]) * a;
                })), e;
            }), [ e$, er, ea ]), ttEffectiveBreakout = (0, r.useMemo)((() => "Provider" === X.breakout && 1 === ttSpecificValues(X.provider, ttAllTokens.provider).length ? "None" : X.breakout), [ X.breakout, X.provider ]), ttOutputRows = (0, 
            r.useMemo)((() => {
                let e = new Map, t = ttSingleValue(X.provider, ttAllTokens.provider), a = e$.reduce(((e, t) => e + t.base_market_size), 0) || 1, i = e => void 0 !== p[e] ? p[e] : Number((2.2 + 11.8 * R("provider-revenue|".concat(e))).toFixed(1)), r = (e, t, a, i, r) => {
                    if (ttEffectiveBreakout === e) return t || a;
                    return ttSelectionSummary(i, {
                        allToken: r,
                        noneLabel: "—",
                        allLabel: a
                    });
                };
                for (let t of e$) {
                    let a = "None" === ttEffectiveBreakout ? "__scope__" : "Industry" === ttEffectiveBreakout ? t.market : "Macro service line" === ttEffectiveBreakout ? t.macro : "Micro service line" === ttEffectiveBreakout ? t.micro : "Region" === ttEffectiveBreakout ? t.region || "__no_region__" : "Country" === ttEffectiveBreakout ? t.country || "__no_country__" : t.provider, s = e.get(a) || {
                        key: a,
                        base_market_size: 0,
                        yearlyMarketSize: Object.fromEntries(j.map((e => [ e, 0 ])))
                    };
                    s.base_market_size += t.base_market_size;
                    for (let e of j) s.yearlyMarketSize[e] += t.yearlyMarketSize[e];
                    e.set(a, s);
                }
                return [ ...e.values() ].map((e => {
                    let s = "Country" === ttEffectiveBreakout ? eJ.get("__no_country__" === e.key ? "" : e.key) || "" : "", n = "CAGR" === eu ? e.yearlyMarketSize[j[j.length - 1]] : e.yearlyMarketSize[eu], o = "CAGR" === eu ? e.yearlyMarketSize[j[0]] > 0 && e.yearlyMarketSize[j[j.length - 1]] > 0 ? ((e.yearlyMarketSize[j[j.length - 1]] / e.yearlyMarketSize[j[0]]) ** (1 / (j.length - 1)) - 1) * 100 : 0 : (() => {
                        let t = eu === j[0] ? e.base_market_size : e.yearlyMarketSize[j[j.indexOf(eu) - 1]];
                        return t > 0 ? (e.yearlyMarketSize[eu] / t - 1) * 100 : 0;
                    })(), c = "Provider" === ttEffectiveBreakout ? e.key : t, l = !!c, d = l ? null !== ttProviderBaseTotals.get(c) && void 0 !== ttProviderBaseTotals.get(c) ? ttProviderBaseTotals.get(c) : e.base_market_size : 0, h = l ? i(c) * (e.base_market_size / (d || e.base_market_size || 1)) : e.base_market_size / 1e3, u = l ? h * ((e.base_market_size || 1) > 0 ? n / (e.base_market_size || 1) : 0) : n;
                    return {
                        key: e.key,
                        region: r("Region", "Region" === ttEffectiveBreakout ? e.key : "", "All regions", X.region, ttAllTokens.region),
                        country: r("Country", "Country" === ttEffectiveBreakout ? e.key : "", "All countries", X.country, ttAllTokens.country),
                        market: r("Industry", "Industry" === ttEffectiveBreakout ? e.key : "", "All industries", X.market, ttAllTokens.market),
                        macro: r("Macro service line", "Macro service line" === ttEffectiveBreakout ? e.key : "", "All macro services", X.macro, ttAllTokens.macro),
                        micro: r("Micro service line", "Micro service line" === ttEffectiveBreakout ? e.key : "", "All micro services", X.micro, ttAllTokens.micro),
                        provider: r("Provider", "Provider" === ttEffectiveBreakout ? e.key : "", "All providers", X.provider, ttAllTokens.provider),
                        derivedRegion: s,
                        providerRevenueContext: l,
                        providerReportMonthYear: c ? ttProviderAnnualReportMonths[c] || "latest available annual report" : "",
                        currentValueUsdB: h,
                        selectedDisplayValue: u,
                        growth: o,
                        selectedMarketSize: n,
                        yearlyMarketSize: e.yearlyMarketSize,
                        base_market_size: e.base_market_size,
                        cagr: e.yearlyMarketSize[j[0]] > 0 && e.yearlyMarketSize[j[j.length - 1]] > 0 ? ((e.yearlyMarketSize[j[j.length - 1]] / e.yearlyMarketSize[j[0]]) ** (1 / (j.length - 1)) - 1) * 100 : 0
                    };
                })).map((e => ({
                    ...e,
                    region: "Country" === ttEffectiveBreakout ? e.derivedRegion || e.region : e.region
                })));
            }), [ X.country, X.market, X.macro, X.micro, X.provider, X.region, e$, eu, ttEffectiveBreakout, eJ, ttProviderBaseTotals ]), ttSortedRows = (0, r.useMemo)((() => {
                let e = [ ...ttOutputRows ];
                return e.sort(((e, t) => {
                    let a = "asc" === er ? 1 : -1;
                    return "growth" === ea ? (e.growth - t.growth) * a : (e[ "market" === ea ? "market" : ea ] || "").localeCompare(t[ "market" === ea ? "market" : ea ] || "") * a;
                })), e;
            }), [ ttOutputRows, er, ea ]), e0 = Math.max(1, Math.ceil(ttSortedRows.length / 30)), e1 = Math.min(ew, e0), e2 = (0, 
            r.useMemo)((() => {
                let e = (e1 - 1) * 30;
                return ttSortedRows.slice(e, e + 30);
            }), [ e1, ttSortedRows ]), e9 = "CAGR" === eu ? "CAGR" : String(eu), e5 = "".concat(j[0], "-").concat(j[j.length - 1]), e4 = (0, 
            r.useMemo)((() => e$.length ? e$.reduce(((e, t) => e + t.growth), 0) / e$.length : 0), [ e$ ]), e8 = (0, 
            r.useMemo)((() => e$.length ? e$.reduce(((e, t) => t.growth > e.growth ? t : e), e$[0]) : null), [ e$ ]), e3 = (0, 
            r.useMemo)((() => {
                if (!e$.length) return null;
                let e = new Map;
                for (let a of e$) {
                    var t;
                    let i = null !== (t = e.get(a.macro)) && void 0 !== t ? t : {
                        total: 0,
                        count: 0
                    };
                    e.set(a.macro, {
                        total: i.total + a.growth,
                        count: i.count + 1
                    });
                }
                let a = null;
                for (let [t, i] of e.entries()) {
                    let e = i.total / i.count;
                    (!a || e > a.avg) && (a = {
                        name: t,
                        avg: e
                    });
                }
                return a;
            }), [ e$ ]), e6 = (0, r.useMemo)((() => {
                let e = "Next 4 Quarters" === en ? 1.14 : 1.05;
                return eZ.slice(0, 1400).map((t => {
                    let a = (7.4 * t.growth + .055 * t.baseFigure + 16 * R("mandate|".concat(t.provider, "|").concat(t.market))) * e;
                    return {
                        ...t,
                        mandateScore: a
                    };
                })).sort(((e, t) => t.mandateScore - e.mandateScore)).slice(0, 10);
            }), [ en, eZ ]), e7 = (0, r.useMemo)((() => {
                let e = new Map;
                for (let a of eZ.slice(0, 4e3)) {
                    var t;
                    let i = null !== (t = e.get(a.provider)) && void 0 !== t ? t : {
                        totalGrowth: 0,
                        totalFigure: 0,
                        count: 0
                    };
                    e.set(a.provider, {
                        totalGrowth: i.totalGrowth + a.growth,
                        totalFigure: i.totalFigure + a.baseFigure,
                        count: i.count + 1
                    });
                }
                return [ ...e.entries() ].map((e => {
                    let [t, a] = e, i = a.totalGrowth / a.count, r = a.totalFigure / a.count, s = V(44 + 4.2 * i + 34 * R("strategic|".concat(t)), 0, 99), n = V(42 + 3.6 * i + 36 * R("sponsor|".concat(t)), 0, 99);
                    return {
                        provider: t,
                        avgGrowth: i,
                        avgFigure: r,
                        strategicFit: s,
                        sponsorFit: n,
                        compositeFit: Math.max(s, n)
                    };
                })).sort(((e, t) => t.compositeFit - e.compositeFit)).slice(0, 10);
            }), [ eZ ]), te = (0, r.useMemo)((() => {
                let e = new Map;
                for (let a of eZ) {
                    var t;
                    let i = null !== (t = e.get(a.market)) && void 0 !== t ? t : {
                        totalGrowth: 0,
                        totalFigure: 0,
                        count: 0
                    };
                    e.set(a.market, {
                        totalGrowth: i.totalGrowth + a.growth,
                        totalFigure: i.totalFigure + a.baseFigure,
                        count: i.count + 1
                    });
                }
                return [ ...e.entries() ].map((e => {
                    let [t, a] = e, i = a.totalGrowth / a.count, r = V(10 * i + a.totalFigure / a.count * .07, 0, 100);
                    return {
                        market: t,
                        avgGrowth: i,
                        valuationWindow: i >= 8 ? "Open / Hot" : i >= 6 ? "Open / Warm" : "Selective",
                        debtWindow: i >= 7.2 ? "Favorable" : i >= 5.7 ? "Balanced" : "Tight",
                        momentum: r
                    };
                })).sort(((e, t) => t.momentum - e.momentum));
            }), [ eZ ]), tt = (0, r.useMemo)((() => {
                let e = [ "Concentration", "Commercial Attrition", "Cyber", "Regulatory", "Integration", "Delivery" ], t = [];
                for (let a of e7.slice(0, 7)) for (let i of e) {
                    let e = 100 * R("risk|".concat(a.provider, "|").concat(i));
                    if (e < 56) continue;
                    let r = e >= 80 ? "High" : e >= 68 ? "Medium" : "Watch";
                    t.push({
                        provider: a.provider,
                        dimension: i,
                        severity: e,
                        severityLabel: r
                    });
                }
                return t.sort(((e, t) => t.severity - e.severity)).slice(0, 12);
            }), [ e7 ]), ta = (0, r.useMemo)((() => {
                if (!e6.length || !e7.length || !te.length) return "No mandate insights available.";
                let e = e6[0], t = e7[0], a = te[0];
                return "Highest-probability mandate sits in ".concat(e.market, " (").concat(e.micro, ") with ").concat(e.provider, ". Best buyer fit currently: ").concat(t.provider, ". Strongest execution window: ").concat(a.market, " (").concat(a.valuationWindow, ").");
            }), [ e7, te, e6 ]), ti = (0, r.useMemo)((() => eZ.slice(0, 2200).map((e => {
                let t = e.baseFigure > 250 ? "Platform" : "Bolt-on", a = 8.1 * e.growth + .05 * e.baseFigure + 15 * R("pe-target|".concat(e.provider, "|").concat(e.micro));
                return {
                    ...e,
                    platformFit: t,
                    targetScore: a
                };
            })).sort(((e, t) => t.targetScore - e.targetScore)).slice(0, 12)), [ eZ ]), tr = (0, 
            r.useMemo)((() => [ "Commercial Excellence", "Pricing Optimization", "Procurement Savings", "Automation at Scale", "Cloud Run-Cost Reduction", "Working Capital" ].map(((e, t) => {
                let a = V(45 + 4.8 * e4 + 28 * R("lever|".concat(e)), 0, 100);
                return {
                    lever: e,
                    impactScore: a,
                    owner: t % 2 == 0 ? "Portfolio Ops" : "Management Team"
                };
            })).sort(((e, t) => t.impactScore - e.impactScore))), [ e4 ]), ts = (0, r.useMemo)((() => {
                let e = new Map;
                for (let a of eZ) {
                    var t;
                    let i = null !== (t = e.get(a.market)) && void 0 !== t ? t : {
                        totalGrowth: 0,
                        totalFigure: 0,
                        count: 0
                    };
                    e.set(a.market, {
                        totalGrowth: i.totalGrowth + a.growth,
                        totalFigure: i.totalFigure + a.baseFigure,
                        count: i.count + 1
                    });
                }
                return [ ...e.entries() ].map((e => {
                    let [t, a] = e, i = a.totalGrowth / a.count, r = V(9 * i + a.totalFigure / a.count * .08, 0, 100);
                    return {
                        market: t,
                        avgGrowth: i,
                        exitScore: r,
                        action: r > 77 ? "Launch Exit" : r > 61 ? "Prepare Exit" : "Hold & Build"
                    };
                })).sort(((e, t) => t.exitScore - e.exitScore));
            }), [ eZ ]), tn = (0, r.useMemo)((() => {
                let e = new Map;
                for (let a of eZ) {
                    var t;
                    e.set(a.macro, (null !== (t = e.get(a.macro)) && void 0 !== t ? t : 0) + 1);
                }
                let a = eZ.length || 1;
                return [ ...e.entries() ].map((e => {
                    let [t, i] = e;
                    return {
                        macro: t,
                        count: i,
                        exposurePct: i / a * 100
                    };
                })).sort(((e, t) => t.exposurePct - e.exposurePct)).slice(0, 8);
            }), [ eZ ]), to = (0, r.useMemo)((() => ti.length && tr.length && ts.length ? "Top target: ".concat(ti[0].provider, " in ").concat(ti[0].market, " (").concat(ti[0].platformFit, "). Highest value lever: ").concat(tr[0].lever, ". Best exit lane: ").concat(ts[0].market, " (").concat(ts[0].action, ").") : "No PE insights available."), [ ts, ti, tr ]), tc = (0, 
            r.useMemo)((() => {
                let e = new Map;
                for (let a of eZ) {
                    var t;
                    let i = null !== (t = e.get(a.micro)) && void 0 !== t ? t : {
                        totalGrowth: 0,
                        totalFigure: 0,
                        count: 0
                    };
                    e.set(a.micro, {
                        totalGrowth: i.totalGrowth + a.growth,
                        totalFigure: i.totalFigure + a.baseFigure,
                        count: i.count + 1
                    });
                }
                return [ ...e.entries() ].map((e => {
                    let [t, a] = e, i = a.totalGrowth / a.count, r = a.totalFigure / a.count, s = V(8.8 * i + .04 * r, 0, 100);
                    return {
                        theme: t,
                        avgGrowth: i,
                        avgFigure: r,
                        signalScore: s
                    };
                })).sort(((e, t) => t.signalScore - e.signalScore)).slice(0, 10);
            }), [ eZ ]), tl = (0, r.useMemo)((() => tc.slice(0, 8).map((e => {
                let t = e.signalScore >= 80 ? 1 : e.signalScore >= 68 ? 2 : 3, a = 30 + 1.25 * e.signalScore;
                return {
                    ...e,
                    nextRoundYear: v + t,
                    valuationLow: a,
                    valuationHigh: 1.35 * a
                };
            }))), [ tc ]), td = (0, r.useMemo)((() => {
                let e = tc.slice(0, 5), t = e.reduce(((e, t) => e + t.signalScore), 0) || 1;
                return e.map((e => ({
                    theme: e.theme,
                    allocationPct: e.signalScore / t * 100,
                    conviction: e.signalScore >= 80 ? "High" : e.signalScore >= 65 ? "Medium" : "Watch"
                })));
            }), [ tc ]), th = (0, r.useMemo)((() => {
                var e, t;
                let a = V(74 - 4.2 * e4 + 9 * R("vc-runway"), 0, 100);
                return {
                    runwayRisk: a,
                    burnEfficiency: V(42 + 5 * e4 + 11 * R("vc-burn"), 0, 100),
                    downRoundRisk: V(78 - 4.8 * e4 + 10 * R("vc-downround"), 0, 100),
                    concentrationRisk: V(35 + (null !== (t = null === (e = tn[0]) || void 0 === e ? void 0 : e.exposurePct) && void 0 !== t ? t : 0) * .5, 0, 100)
                };
            }), [ e4, tn ]), tu = (0, r.useMemo)((() => tc.length && td.length ? "Top early-signal theme: ".concat(tc[0].theme, ". Suggested follow-on priority: ").concat(td[0].theme, " (").concat(td[0].allocationPct.toFixed(1), "% reserve).") : "No VC insights available."), [ td, tc ]), tm = (0, 
            r.useMemo)((() => {
                var e, t, a, i;
                if (!e8) return [];
                let r = g[X.scenario], s = "Global" !== e8.region && null !== (e = x[e8.region]) && void 0 !== e ? e : 0, n = null !== (t = h[e8.market]) && void 0 !== t ? t : 0, o = null !== (a = u[e8.macro]) && void 0 !== a ? a : 0, c = null !== (i = m[e8.provider]) && void 0 !== i ? i : .24, l = e8.growth - (1.6 + n + o + c + r + s), d = [ {
                    driver: "Market",
                    value: n
                }, {
                    driver: "Service Line",
                    value: o
                }, {
                    driver: "Provider",
                    value: c
                }, {
                    driver: "Scenario",
                    value: r
                }, {
                    driver: "Geography",
                    value: s
                }, {
                    driver: "Residual",
                    value: l
                } ], p = d.reduce(((e, t) => e + Math.abs(t.value)), 0) || 1;
                return d.map((e => ({
                    ...e,
                    weightPct: Math.abs(e.value) / p * 100
                })));
            }), [ X.scenario, e8 ]), tp = (0, r.useMemo)((() => {
                let e = !J(s, X);
                return V(58 + Math.min(eZ.length / 900, 24) + (e ? -8 : 7), 40, 97);
            }), [ X, s, eZ.length ]), tx = (0, r.useMemo)((() => {
                let e = Number(ec);
                return Number.isFinite(e) ? e : 9;
            }), [ ec ]), tg = (0, r.useMemo)((() => eZ.filter((e => e.growth >= tx)).slice(0, 12).map((e => ({
                provider: e.provider,
                micro: e.micro,
                market: e.market,
                growth: e.growth,
                message: "".concat(e.provider, " in ").concat(e.market, " / ").concat(e.micro, " crossed ").concat(tx.toFixed(1), "% growth")
            })))), [ tx, eZ ]), tv = (0, r.useMemo)((() => {
                let e = g[X.scenario];
                return Object.keys(g).map((t => {
                    let a = g[t], i = e$.reduce(((t, i) => t + i.growth * (a / e)), 0), r = e$.length ? i / e$.length : 0;
                    return {
                        scenario: t,
                        avgGrowth: r,
                        deltaToActive: r - e4
                    };
                }));
            }), [ X.scenario, e4, e$ ]), tj = (0, r.useMemo)((() => {
                let e = X.providerSearch.trim().toLowerCase();
                return d.filter((t => !e || Q(t).includes(e)));
            }), [ X.providerSearch ]), tb = (0, r.useMemo)((() => {
                let e = new Map;
                for (let a of e$) {
                    var t;
                    e.set(a.provider, (null !== (t = e.get(a.provider)) && void 0 !== t ? t : 0) + 1);
                }
                return e;
            }), [ e$ ]), ty = (0, r.useMemo)((() => !J(s, X)), [ s, X ]), tf = (0, r.useMemo)((() => {
                var e;
                return "USD" === ed ? 1 : null !== (e = ep[ed]) && void 0 !== e ? e : 1;
            }), [ ep, ed ]), ttSingleProviderRevenue = "specific" === ttSelectionMode(X.provider, ttAllTokens.provider) && 1 === ttSpecificValues(X.provider, ttAllTokens.provider).length, ttRevenueScope = ttScopeDescriptor(X), ttRevenueProvider = ttSingleProviderRevenue ? ttSingleValue(X.provider, ttAllTokens.provider) : "", ttRevenueReportMonth = ttSingleProviderRevenue ? ttProviderAnnualReportMonths[ttRevenueProvider] || "latest available annual report" : "", ttCurrentValueLabel = ttSingleProviderRevenue ? "Rev. est. of ".concat(ttRevenueScope, " for annual report published ").concat(ttRevenueReportMonth) : "Current Year Spend", ttRevenueDisplay = "Provider" === ttEffectiveBreakout || ttSingleProviderRevenue, ttForecastValueLabel = ttRevenueDisplay ? ttSingleProviderRevenue ? "Est. Rev. of ".concat(ttRevenueScope) : "Estimated Revenue" : "Forecast Size", tS = (0, 
            r.useMemo)((() => [ ttScopeLabel(X.market, {
                allToken: ttAllTokens.market,
                noneLabel: "No industry selected",
                allLabel: "All industries",
                prefix: "Industry"
            }), ttScopeLabel(X.macro, {
                allToken: ttAllTokens.macro,
                noneLabel: "No macro selected",
                allLabel: "All macro services",
                prefix: "Macro"
            }), ttScopeLabel(X.micro, {
                allToken: ttAllTokens.micro,
                noneLabel: "No micro selected",
                allLabel: "All micro services",
                prefix: "Micro"
            }), ttScopeLabel(X.region, {
                allToken: ttAllTokens.region,
                noneLabel: "No region selected",
                allLabel: "All regions",
                prefix: "Region"
            }), ttScopeLabel(X.country, {
                allToken: ttAllTokens.country,
                noneLabel: "No country selected",
                allLabel: "All countries",
                prefix: "Country",
                formatter: e => e.startsWith(D) ? e.replace(D, "") : e
            }), ttScopeLabel(X.provider, {
                allToken: ttAllTokens.provider,
                noneLabel: "No provider selected",
                allLabel: "All providers",
                prefix: "Provider"
            }), "Breakout: ".concat(ttEffectiveBreakout) ].join(" | ")), [ X, ttEffectiveBreakout ]), tC = (0, 
            r.useMemo)((() => {
                let e = JSON.stringify({
                    modelVersion: _,
                    generatedAt: eC,
                    appliedControls: X,
                    hasGeneratedOutput: ttHasGeneratedOutput,
                    forecastSelection: eu,
                    outputCurrency: ed,
                    fxAsOf: "USD" === ed ? "USD native" : eg || "FX timestamp pending",
                    sortKey: ea,
                    sortDirection: er,
                    rowCount: ttSortedRows.length
                });
                return {
                    status: ttHasGeneratedOutput ? ty ? "Applied output certified; draft edits pending" : "Active output certified" : "Awaiting generated output",
                    certificateId: "CERT-".concat(L(e)),
                    generatedAt: ttHasGeneratedOutput ? H(eC) : "Not generated",
                    certificationClass: "Directional internal estimate",
                    fxSnapshot: "USD" === ed ? "USD native display" : eg ? "".concat(ed, " snapshot ").concat(H(eg)) : "".concat(ed, " snapshot pending"),
                    scope: tS,
                    rowCount: ttSortedRows.length.toLocaleString(),
                    methodology: "Base year ".concat(b, "; forecast horizon ").concat(j[0], "-").concat(j[j.length - 1])
                };
            }), [ X, tS, eu, eg, eC, ty, ed, er, ea, ttSortedRows.length, ttHasGeneratedOutput ]), tN = "Viewer" !== eT, tA = "Viewer" !== eT, tk = "Admin" === eT, tT = (0, 
            r.useMemo)((() => [ {
                role: "Admin",
                modelInputs: "Editable",
                savedViews: "Create, load, share, delete",
                auditAccess: "View and clear"
            }, {
                role: "Editor",
                modelInputs: "Editable",
                savedViews: "Create, load, share",
                auditAccess: "View"
            }, {
                role: "Viewer",
                modelInputs: "Read-only",
                savedViews: "Load and share only",
                auditAccess: "View"
            } ]), []), t_ = (0, r.useCallback)((() => ({
                modelVersion: _,
                savedAt: (new Date).toISOString(),
                hasGeneratedOutput: ttHasGeneratedOutput,
                controls: s,
                appliedControls: X,
                sortKey: ea,
                sortDirection: er,
                forecastSelection: eu,
                outputCurrency: ed,
                fxRates: ep,
                fxAsOf: eg,
                masterTab: t,
                ibHorizon: en,
                alertThreshold: ec
            })), [ ec, X, s, eu, eg, ep, en, t, ed, er, ea, ttHasGeneratedOutput ]), tM = (0, r.useCallback)((e => {
                var t, i;
                z(W(e.controls)), et(W(e.appliedControls)), ei(e.sortKey), es(e.sortDirection), 
                ttSetHasGeneratedOutput(Boolean(e.hasGeneratedOutput)),
                em(e.forecastSelection), eh(e.outputCurrency), ex(Object.keys(null !== (t = e.fxRates) && void 0 !== t ? t : {}).length ? e.fxRates : {
                    USD: 1
                }), ev(null !== (i = e.fxAsOf) && void 0 !== i ? i : ""), a(e.masterTab), eo(e.ibHorizon), 
                el(e.alertThreshold), eN(e.savedAt || (new Date).toISOString());
            }), []), tD = (0, r.useCallback)(((e, t, a, i) => {
                let r = (new Date).toISOString(), s = null != a ? a : eA, n = null != i ? i : eT;
                eL((a => [ {
                    id: "AUD-".concat(L("".concat(r, "|").concat(s, "|").concat(e, "|").concat(t))),
                    at: r,
                    actor: s,
                    role: n,
                    action: e,
                    detail: t
                }, ...a ].slice(0, 150)));
            }), [ eA, eT ]);
            (0, r.useEffect)((() => {
                let e = "Analyst", t = "Editor", a = [], i = [], r = window.localStorage.getItem(F);
                if (r) try {
                    let a = JSON.parse(r);
                    a.actor && (e = a.actor), ("Admin" === a.role || "Editor" === a.role || "Viewer" === a.role) && (t = a.role);
                } catch (e) {}
                let s = window.localStorage.getItem(P);
                if (s) try {
                    a = JSON.parse(s).map((e => {
                        var t, a;
                        return {
                            ...e,
                            payload: {
                                ...e.payload,
                                controls: W(null === (t = e.payload) || void 0 === t ? void 0 : t.controls),
                                appliedControls: W(null === (a = e.payload) || void 0 === a ? void 0 : a.appliedControls)
                            }
                        };
                    }));
                } catch (e) {
                    a = [];
                }
                let n = window.localStorage.getItem(I);
                if (n) try {
                    i = JSON.parse(n);
                } catch (e) {
                    i = [];
                }
                ek(e), e_(t), eD(a);
                let o = new URLSearchParams(window.location.search).get("share");
                if (o) {
                    let a = function(e) {
                        try {
                            let t = JSON.parse(window.atob(e));
                            if (!t || "object" != typeof t || !t.controls || !t.appliedControls) return null;
                            return t;
                        } catch (e) {
                            return null;
                        }
                    }(o);
                    a ? (tM(a), eH("Shared view loaded into the workspace."), i = [ {
                        id: "AUD-".concat(L("".concat(a.savedAt, "|").concat(e, "|Shared view opened"))),
                        at: (new Date).toISOString(),
                        actor: e,
                        role: t,
                        action: "Shared view opened",
                        detail: "Loaded shared ".concat(a.masterTab, " snapshot")
                    }, ...i ].slice(0, 150)) : eH("Shared view could not be decoded.");
                }
                eL(i), eW(!0);
            }), [ tM ]), (0, r.useEffect)((() => {
                ez && window.localStorage.setItem(P, JSON.stringify(eM));
            }), [ eM, ez ]), (0, r.useEffect)((() => {
                ez && window.localStorage.setItem(I, JSON.stringify(eR));
            }), [ eR, ez ]), (0, r.useEffect)((() => {
                ez && window.localStorage.setItem(F, JSON.stringify({
                    actor: eA,
                    role: eT
                }));
            }), [ eA, eT, ez ]);
            let tP = (0, r.useCallback)((async (e, t) => {
                let a = new URL(window.location.href);
                a.searchParams.set("share", window.btoa(JSON.stringify(e)));
                try {
                    await navigator.clipboard.writeText(a.toString()), eH("Share link copied for ".concat(t, ".")), 
                    tD("Share link copied", t);
                } catch (e) {
                    eH("Clipboard copy failed for the share link.");
                }
            }), [ tD ]), tI = (0, r.useCallback)((e => {
                a(e), tD("Tab changed", "Opened ".concat(e));
            }), [ tD ]), tF = (0, r.useCallback)((e => {
                e_(e), eH("Session role set to ".concat(e, ".")), tD("Permission mode changed", "Switched to ".concat(e), eA, e);
            }), [ tD, eA ]), tG = (0, r.useCallback)((() => {
                var e, t, a;
                if (!tA) return;
                let i = (new Date).toISOString(), r = eP.trim() || "Saved view ".concat(eM.length + 1), s = t_(), n = eO ? eM.find((e => e.id === eO)) : null, o = null !== (e = null == n ? void 0 : n.id) && void 0 !== e ? e : "VIEW-".concat(L("".concat(r, "|").concat(eA, "|").concat(i))), c = {
                    id: o,
                    name: r,
                    note: eF.trim(),
                    permission: eB,
                    createdAt: null !== (t = null == n ? void 0 : n.createdAt) && void 0 !== t ? t : i,
                    updatedAt: i,
                    createdBy: null !== (a = null == n ? void 0 : n.createdBy) && void 0 !== a ? a : eA,
                    payload: s
                };
                eD((e => [ c, ...e.filter((e => e.id !== o)) ].slice(0, 40))), eE(o), eI(r), eH('Saved view "'.concat(r, '" stored.')), 
                tD(n ? "Saved view updated" : "Saved view created", r);
            }), [ tD, t_, tA, eP, eF, eB, eM, eO, eA ]), tB = (0, r.useCallback)((e => {
                tM(e.payload), eE(e.id), eI(e.name), eG(e.note), eU(e.permission), eH('Loaded saved view "'.concat(e.name, '".')), 
                tD("Saved view loaded", e.name);
            }), [ tD, tM ]), tU = (0, r.useCallback)((e => {
                if (!("Admin" === eT || e.createdBy === eA)) {
                    eH("Only admins or the saved view owner can delete this view.");
                    return;
                }
                eD((t => t.filter((t => t.id !== e.id)))), eO === e.id && eE(""), eH('Deleted saved view "'.concat(e.name, '".')), 
                tD("Saved view deleted", e.name);
            }), [ tD, eO, eA, eT ]), tO = (0, r.useCallback)((() => {
                tP(t_(), eP.trim() || "Active output");
            }), [ t_, tP, eP ]), tE = (0, r.useCallback)((e => {
                tP(e.payload, e.name);
            }), [ tP ]), tR = (0, r.useCallback)((() => {
                if (!tk) return;
                let e = (new Date).toISOString();
                eL([ {
                    id: "AUD-".concat(L("".concat(e, "|").concat(eA, "|Audit trail cleared"))),
                    at: e,
                    actor: eA,
                    role: eT,
                    action: "Audit trail cleared",
                    detail: "Historical audit entries were cleared by an admin session."
                } ]), eH("Audit trail cleared.");
            }), [ tk, eA, eT ]);
            (0, r.useEffect)((() => {
                eS(1);
            }), [ X, eu, ea, er ]), (0, r.useEffect)((() => {
                ew > e0 && eS(e0);
            }), [ ew, e0 ]);
            let ttGenerateAction = (0, r.useCallback)((() => {
                et(s), ttSetHasGeneratedOutput(!0), eN((new Date).toISOString()), tD("Forecast generated", tS);
            }), [ tD, tS, s ]), tV = (0, r.useCallback)((async e => {
                if ("USD" === e) {
                    eh("USD"), ef(""), ev((new Date).toISOString()), tD("Currency changed", "Switched display currency to USD");
                    return;
                }
                eb(!0), ef("");
                try {
                    var t;
                    let a = await fetch("https://open.er-api.com/v6/latest/USD", {
                        cache: "no-store"
                    });
                    if (!a.ok) throw Error("FX source returned ".concat(a.status));
                    let i = await a.json();
                    if ("success" !== i.result || !i.rates) throw Error("FX payload was incomplete");
                    ex(i.rates), eh(e), ev(null !== (t = i.time_last_update_utc) && void 0 !== t ? t : (new Date).toISOString()), 
                    tD("Currency changed", "Switched display currency to ".concat(e));
                } catch (e) {
                    ef(e instanceof Error ? e.message : "Unable to refresh FX rates right now.");
                } finally {
                    eb(!1);
                }
            }), [ tD ]), tH = (0, r.useCallback)((() => {
                let e = "Region,Country,Industry,Macro,Micro,Provider,".concat(ttCurrentValueLabel, " (").concat(ed, " B est.),Forecast Year,Annual Growth %,").concat(ttForecastValueLabel, " (").concat(ed, " ").concat(ttRevenueDisplay ? "B est." : "M", "),CAGR %");
                let t = ttSortedRows.flatMap((e => j.map((t, a) => {
                    let i = 0 === a ? e.base_market_size : e.yearlyMarketSize[j[a - 1]], r = i > 0 ? (e.yearlyMarketSize[t] / i - 1) * 100 : 0, s = ttRevenueDisplay ? e.currentValueUsdB * (e.yearlyMarketSize[t] / (e.base_market_size || 1)) : e.yearlyMarketSize[t];
                    return [ e.region, e.country, e.market, e.macro, e.micro, e.provider, (e.currentValueUsdB * tf).toFixed(2), t, r.toFixed(2), (s * tf).toFixed(2), e.cagr.toFixed(2) ].join(",");
                }))).join("\n");
                let a = new Blob([ "".concat(e, "\n").concat(t) ], {
                    type: "text/csv;charset=utf-8;"
                });
                let i = URL.createObjectURL(a);
                let s = document.createElement("a");
                s.href = i, s.download = "forecast-workbench.csv", document.body.appendChild(s), 
                s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
            }), [ tf, ed, ttSortedRows, ttCurrentValueLabel, ttForecastValueLabel, ttRevenueDisplay ]), tz = (0, r.useCallback)((() => {
                let e = E();
                z(e), et(e), ttSetHasGeneratedOutput(!1), ei("growth"), es("desc"), em(j[0]), eS(1), eN((new Date).toISOString()), 
                tD("Filters reset", "Returned workspace filters to defaults");
            }), [ tD ]);
            return (0, i.jsx)("main", {
                className: n().page,
                children: (0, i.jsxs)("div", {
                    className: n().shell,
                    children: [ (0, i.jsxs)("section", {
                        className: n().hero,
                        children: [ (0, i.jsx)("p", {
                            className: n().eyebrow,
                            children: "Standalone Sandbox"
                        }), (0, i.jsxs)("h1", {
                            className: n().heroTitle,
                            children: [ "IT & BPO Forecast Workbench", (0, i.jsx)($, {
                                label: "More info",
                                text: "More info: this engine uses a proprietary blend of 50+ contextual variables and transformations across service taxonomy, provider structure, geography, scenario stance, trend momentum, and time-horizon effects. It is intentionally described at a high level rather than formula-level detail. Compared with common IDC/NelsonHall/Gartner-style market models, which often rely on periodic scorecards and broader static peer buckets, this workbench is built for interactive, scenario-based exploration at a more granular provider-service-geography level. Like all directional models, outputs are estimates and should be paired with primary diligence."
                            }) ]
                        }), (0, i.jsx)("p", {
                            children: "Configure variables, then click Generate to refresh directional demand-growth forecasts across a broad IT and BPO provider taxonomy."
                        }) ]
                    }), (0, i.jsx)("section", {
                        className: n().masterTabs,
                        children: S.map((e => (0, i.jsx)("button", {
                            type: "button",
                            className: e === t ? n().masterTabActive : n().masterTab,
                            onClick: () => tI(e),
                            children: e
                        }, e)))
                    }), "AR Superhero" === t && (0, i.jsxs)(i.Fragment, {
                        children: [ (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("div", {
                                className: n().filters,
                                children: [ (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Select a top-level IT/BPO service tower.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Macro Service Line",
                                        help: "Pick one or more big service categories, like Cloud or BPO."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.macro,
                                        placeholder: "No macro selected",
                                        disabled: !tN,
                                        onChange: e => {
                                        let t = ttSpecificValues(e, ttAllTokens.macro), a = t.length ? new Set(t.flatMap((e => o[e]))) : null;
                                        z((t => ({
                                            ...t,
                                            macro: e,
                                            micro: a ? ttSpecificValues(t.micro, ttAllTokens.micro).filter((e => a.has(e))) : []
                                        })));
                                    },
                                        noneLabel: "No macro selected",
                                        allLabel: "All macro services",
                                        allToken: ttAllTokens.macro,
                                        options: Object.keys(o).map((e => ({
                                        value: e,
                                        label: e
                                    })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Optional drill-down into a specific micro service line.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Micro Service Line",
                                        help: "Pick one or more specific services inside the selected macro categories."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.micro,
                                        placeholder: "No micro selected",
                                        disabled: !tN || "specific" !== ttSelectionMode(s.macro, ttAllTokens.macro),
                                        onChange: e => z((t => ({
                                        ...t,
                                        micro: e
                                    }))),
                                        noneLabel: "No micro selected",
                                        allLabel: "All micro services",
                                        allToken: ttAllTokens.micro,
                                        options: eQ.map((e => ({
                                        value: e,
                                        label: e
                                    })))
                                    }), "specific" !== ttSelectionMode(s.macro, ttAllTokens.macro) ? (0, i.jsx)("span", {
                                        className: n().fieldHint,
                                        children: "Choose a macro service line first"
                                    }) : null ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Select the demand industry segment to model.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Industry",
                                        help: "Choose one or more customer industries to forecast."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.market,
                                        placeholder: "No industry selected",
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                        ...t,
                                        market: e
                                    }))),
                                        noneLabel: "No industry selected",
                                        allLabel: "All industries",
                                        allToken: ttAllTokens.market,
                                        options: c.map((e => ({
                                        value: e,
                                        label: e
                                    })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Select a delivery geography region.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Region",
                                        help: "Choose one or more broad geographies where work is delivered."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.region,
                                        placeholder: "No region selected",
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                        ...t,
                                        region: e,
                                        country: "specific" === ttSelectionMode(e, ttAllTokens.region) ? t.country : []
                                    }))),
                                        noneLabel: "No region selected",
                                        allLabel: "All regions",
                                        allToken: ttAllTokens.region,
                                        options: Object.keys(l).map((e => ({
                                        value: e,
                                        label: e
                                    })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Optional country-level drill-down. Countries are grouped by continent and you can also select a whole continent from this menu.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Country (Optional)",
                                        help: "Choose one or more countries, or select a whole continent from inside the list."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.country,
                                        placeholder: "No country selected",
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                        ...t,
                                        country: e
                                    }))),
                                        noneLabel: "No country selected",
                                        allLabel: "All countries",
                                        allToken: ttAllTokens.country,
                                        formatValue: e => e.startsWith(D) ? e.replace(D, "") : e,
                                        groups: eK.map((e => ({
                                            label: e.region,
                                            options: [ {
                                                value: "".concat(D).concat(e.region),
                                                label: "All ".concat(e.region)
                                            } ].concat(e.countries.map((t => ({
                                                value: t,
                                                label: t
                                            }))))
                                    })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Provider options include prior aliases and notable business units.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Provider",
                                        help: "Pick one or more vendors you want to analyze."
                                    }), (0, i.jsx)(EtMultiDropdown, {
                                        value: s.provider,
                                        placeholder: "No provider selected",
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                        ...t,
                                        provider: e
                                    }))),
                                        noneLabel: "No provider selected",
                                        allLabel: "All providers",
                                        allToken: ttAllTokens.provider,
                                        options: d.map((e => ({
                                        value: e.name,
                                        label: function(e) {
                                            let t = [ e.aliases.length ? "Aliases: ".concat(e.aliases.join(", ")) : "", e.businessUnits.length ? "Units: ".concat(e.businessUnits.join(", ")) : "" ].filter(Boolean).join(" | ");
                                            return t ? "".concat(e.name, " - ").concat(t) : e.name;
                                        }(e)
                                    })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Breakout controls row-level output grain independently from the selected scope filters.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Break out results by",
                                        help: "Filters define scope. Breakout controls whether results stay aggregated or are shown as rows by one chosen dimension."
                                    }), (0, i.jsx)("select", {
                                        value: s.breakout,
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                            ...t,
                                            breakout: e.target.value
                                        }))),
                                        children: ttBreakouts.map((e => (0, i.jsx)("option", {
                                            value: e,
                                            children: e
                                        }, e)))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Search provider names, aliases, or listed business units.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Search Provider / Alias / Unit",
                                        help: "Type part of a vendor name, old name, or business unit."
                                    }), (0, i.jsx)("input", {
                                        value: s.providerSearch,
                                        disabled: !tN,
                                        placeholder: "e.g. Andersen, BPM, Cloud",
                                        onChange: e => z((t => ({
                                            ...t,
                                            providerSearch: e.target.value
                                        })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Choose macro demand stance applied to all selected variables.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Scenario",
                                        help: "Base is normal; Upside is stronger demand; Downside is weaker demand."
                                    }), (0, i.jsx)("select", {
                                        value: s.scenario,
                                        disabled: !tN,
                                        onChange: e => z((t => ({
                                            ...t,
                                            scenario: e.target.value
                                        }))),
                                        children: Object.keys(g).map((e => (0, i.jsx)("option", {
                                            value: e,
                                            children: e
                                        }, e)))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Optional lower bound filter for generated growth percentage.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Min Growth %",
                                        help: "Show only results at or above this growth percentage."
                                    }), (0, i.jsx)("input", {
                                        inputMode: "decimal",
                                        value: s.minGrowth,
                                        disabled: !tN,
                                        placeholder: "e.g. 4.5",
                                        onChange: e => z((t => ({
                                            ...t,
                                            minGrowth: e.target.value
                                        })))
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().field,
                                    title: "Optional upper bound filter for generated growth percentage.",
                                    children: [ (0, i.jsx)(Z, {
                                        text: "Max Growth %",
                                        help: "Show only results at or below this growth percentage."
                                    }), (0, i.jsx)("input", {
                                        inputMode: "decimal",
                                        value: s.maxGrowth,
                                        disabled: !tN,
                                        placeholder: "e.g. 10.0",
                                        onChange: e => z((t => ({
                                            ...t,
                                            maxGrowth: e.target.value
                                        })))
                                    }) ]
                                }) ]
                            }), (0, i.jsxs)("div", {
                                className: n().actions,
                                children: [ (0, i.jsx)("button", {
                                    type: "button",
                                    className: n().primaryButton,
                                    title: "Generate forecast results using the current variable selections.",
                                    onClick: ttGenerateAction,
                                    disabled: !tN || ttHasGeneratedOutput && !ty,
                                    children: "Generate"
                                }), (0, i.jsx)("button", {
                                    type: "button",
                                    className: n().secondaryButton,
                                    title: "Export generated results, including current year through +4 forecast rows, to CSV.",
                                    onClick: tH,
                                    disabled: !ttHasGeneratedOutput || !eZ.length,
                                    children: "Export CSV"
                                }), (0, i.jsx)("button", {
                                    type: "button",
                                    className: n().secondaryButton,
                                    title: "Reset all controls and generated outputs to defaults.",
                                    onClick: tz,
                                    disabled: !tN,
                                    children: "Reset Filters"
                                }) ]
                            }), (0, i.jsx)("p", {
                                className: !ttHasGeneratedOutput || ty ? n().statusPending : n().statusReady,
                                children: ttHasGeneratedOutput ? ty ? "Selections changed. Click Generate to apply variables and refresh dynamic year-by-year forecasts." : "Forecast output is synchronized. Horizon: ".concat(e5, ".") : "No output generated yet. Click Generate to create forecast results."
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsx)("div", {
                                className: n().tableHeader,
                                children: (0, i.jsxs)("h2", {
                                    children: [ "Saved Views + Collaboration", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossSavedViews,
                                        compact: !0
                                    }) ]
                                })
                            }), (0, i.jsx)("p", {
                                className: n().sectionHint,
                                children: "Saved views persist in this browser. Share links package the active model state so the same configuration can be reopened elsewhere."
                            }), eV ? (0, i.jsx)("p", {
                                className: n().workspaceStatus,
                                children: eV
                            }) : null, tN ? null : (0, i.jsx)("p", {
                                className: n().readOnlyNotice,
                                children: "Viewer mode is active. Model inputs and saved-view editing are locked."
                            }), (0, i.jsxs)("div", {
                                className: n().moduleGrid,
                                children: [ (0, i.jsxs)("article", {
                                    className: n().workspacePanel,
                                    children: [ (0, i.jsxs)("div", {
                                        className: n().filters,
                                        children: [ (0, i.jsxs)("label", {
                                            className: n().field,
                                            title: "Name shown in saved views and audit entries for this browser session.",
                                            children: [ (0, i.jsx)(Z, {
                                                text: "Actor Name",
                                                help: "Short name used for saved-view ownership and audit logging."
                                            }), (0, i.jsx)("input", {
                                                value: eA,
                                                onChange: e => ek(e.target.value || "Analyst")
                                            }) ]
                                        }), (0, i.jsxs)("label", {
                                            className: n().field,
                                            title: "Session permission mode for this browser session.",
                                            children: [ (0, i.jsx)(Z, {
                                                text: "Session Role",
                                                help: "Admin can manage everything, Editor can work normally, Viewer is read-only."
                                            }), (0, i.jsxs)("select", {
                                                value: eT,
                                                onChange: e => tF(e.target.value),
                                                children: [ (0, i.jsx)("option", {
                                                    value: "Admin",
                                                    children: "Admin"
                                                }), (0, i.jsx)("option", {
                                                    value: "Editor",
                                                    children: "Editor"
                                                }), (0, i.jsx)("option", {
                                                    value: "Viewer",
                                                    children: "Viewer"
                                                }) ]
                                            }) ]
                                        }), (0, i.jsxs)("label", {
                                            className: n().field,
                                            title: "Name the current workspace configuration so it can be reopened later.",
                                            children: [ (0, i.jsx)(Z, {
                                                text: "Saved View Name",
                                                help: "Friendly label for the current saved output state."
                                            }), (0, i.jsx)("input", {
                                                value: eP,
                                                disabled: !tA,
                                                placeholder: "e.g. APAC AI Buy-side View",
                                                onChange: e => eI(e.target.value)
                                            }) ]
                                        }), (0, i.jsxs)("label", {
                                            className: n().field,
                                            title: "Controls how the saved view is labeled for reuse.",
                                            children: [ (0, i.jsx)(Z, {
                                                text: "Visibility",
                                                help: "Private stays personal, Team is general use, Read-only signals a locked reference view."
                                            }), (0, i.jsxs)("select", {
                                                value: eB,
                                                disabled: !tA,
                                                onChange: e => eU(e.target.value),
                                                children: [ (0, i.jsx)("option", {
                                                    value: "Private",
                                                    children: "Private"
                                                }), (0, i.jsx)("option", {
                                                    value: "Team",
                                                    children: "Team"
                                                }), (0, i.jsx)("option", {
                                                    value: "Read-only",
                                                    children: "Read-only"
                                                }) ]
                                            }) ]
                                        }), (0, i.jsxs)("label", {
                                            className: n().field,
                                            title: "Optional note for handoff context or collaboration guidance.",
                                            children: [ (0, i.jsx)(Z, {
                                                text: "Handoff Note",
                                                help: "Short context note explaining why the view matters or how to use it."
                                            }), (0, i.jsx)("input", {
                                                value: eF,
                                                disabled: !tA,
                                                placeholder: "e.g. Use for sponsor outreach review",
                                                onChange: e => eG(e.target.value)
                                            }) ]
                                        }) ]
                                    }), (0, i.jsxs)("div", {
                                        className: n().actions,
                                        children: [ (0, i.jsx)("button", {
                                            type: "button",
                                            className: n().primaryButton,
                                            disabled: !tA,
                                            onClick: tG,
                                            children: "Save Current View"
                                        }), (0, i.jsx)("button", {
                                            type: "button",
                                            className: n().secondaryButton,
                                            disabled: !eZ.length,
                                            onClick: tO,
                                            children: "Copy Active Share Link"
                                        }) ]
                                    }) ]
                                }), (0, i.jsxs)("article", {
                                    className: n().workspacePanel,
                                    children: [ (0, i.jsx)("h3", {
                                        className: n().workspaceSubheading,
                                        children: "Saved View Library"
                                    }), (0, i.jsx)("div", {
                                        className: n().savedViewList,
                                        children: eM.length ? eM.map((e => {
                                            let t = "Admin" === eT || e.createdBy === eA;
                                            return (0, i.jsxs)("div", {
                                                className: n().savedViewCard,
                                                children: [ (0, i.jsxs)("div", {
                                                    className: n().savedViewHeader,
                                                    children: [ (0, i.jsx)("strong", {
                                                        children: e.name
                                                    }), (0, i.jsx)("span", {
                                                        className: n().permissionBadge,
                                                        children: e.permission
                                                    }) ]
                                                }), (0, i.jsxs)("p", {
                                                    className: n().savedViewMeta,
                                                    children: [ e.createdBy, " | Updated ", H(e.updatedAt) ]
                                                }), e.note ? (0, i.jsx)("p", {
                                                    className: n().savedViewNote,
                                                    children: e.note
                                                }) : null, (0, i.jsxs)("div", {
                                                    className: n().savedViewActions,
                                                    children: [ (0, i.jsx)("button", {
                                                        type: "button",
                                                        className: n().secondaryButton,
                                                        onClick: () => tB(e),
                                                        children: "Load"
                                                    }), (0, i.jsx)("button", {
                                                        type: "button",
                                                        className: n().secondaryButton,
                                                        onClick: () => tE(e),
                                                        children: "Share"
                                                    }), (0, i.jsx)("button", {
                                                        type: "button",
                                                        className: n().secondaryButton,
                                                        disabled: !t,
                                                        onClick: () => tU(e),
                                                        children: "Delete"
                                                    }) ]
                                                }) ]
                                            }, e.id);
                                        })) : (0, i.jsx)("p", {
                                            className: n().sectionHint,
                                            children: "No saved views are stored in this browser yet."
                                        })
                                    }) ]
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().metricsGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Output Rows"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: ttHasGeneratedOutput ? ttSortedRows.length.toLocaleString() : "—"
                                }), (0, i.jsxs)("p", {
                                    className: n().metricHint,
                                    children: ttHasGeneratedOutput ? [ "Breakout ", ttEffectiveBreakout, " | Horizon ", e5 ] : "Generate output to populate row counts"
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "CAGR" === e9 ? "Average CAGR" : "Average Growth (".concat(e9, ")")
                                }), (0, i.jsxs)("p", {
                                    className: n().metricValue,
                                    children: ttHasGeneratedOutput ? [ e4.toFixed(2), "%" ] : "—"
                                }), (0, i.jsxs)("p", {
                                    className: n().metricHint,
                                    children: ttHasGeneratedOutput ? [ X.scenario, " scenario" ] : "No generated forecast yet"
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Top Macro Segment"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: ttHasGeneratedOutput ? null !== (e = null == e3 ? void 0 : e3.name) && void 0 !== e ? e : "N/A" : "—"
                                }), (0, i.jsx)("p", {
                                    className: n().metricHint,
                                    children: ttHasGeneratedOutput ? e3 ? "".concat(e3.avg.toFixed(2), "% avg") : "No matching rows" : "Generate output to surface segment leaders"
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Top Opportunity"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: ttHasGeneratedOutput ? e8 ? "".concat(e8.provider, " / ").concat(e8.micro) : "N/A" : "—"
                                }), (0, i.jsx)("p", {
                                    className: n().metricHint,
                                    children: ttHasGeneratedOutput ? e8 ? "".concat(e8.growth.toFixed(2), "%") : "No matching rows" : "Generate output to rank opportunities"
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("div", {
                                className: n().tableHeader,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Forecast Results", (0, i.jsx)($, {
                                        label: "i",
                                        text: "Forecast methodology: each year has its own weighted driver mix (end-demand, budget shift, pricing, technology adoption, service-line momentum, geography, and organization execution). The model recursively projects market size from the base year into each forward year, then computes horizon CAGR. This is directional and should be paired with primary diligence.",
                                        compact: !0
                                    }) ]
                                }), (0, i.jsxs)("div", {
                                    className: n().tableControls,
                                    children: [ (0, i.jsxs)("label", {
                                        className: n().fieldInline,
                                        title: "Select a forward year output or CAGR across the full horizon.",
                                        children: [ (0, i.jsxs)("span", {
                                            children: [ "Forecast Output", (0, i.jsx)($, {
                                                label: "i",
                                                text: "".concat("Forecast horizon uses the five forward years starting next calendar year.", " ").concat(A, " ").concat(T, " ").concat(k),
                                                compact: !0
                                            }) ]
                                        }), (0, i.jsxs)("select", {
                                            value: String(eu),
                                            disabled: !tN,
                                            onChange: e => em("CAGR" === e.target.value ? "CAGR" : Number(e.target.value)),
                                            children: [ j.map((e => (0, i.jsx)("option", {
                                                value: e,
                                                children: e
                                            }, e))), (0, i.jsx)("option", {
                                                value: "CAGR",
                                                children: "CAGR"
                                            }) ]
                                        }) ]
                                    }), (0, i.jsx)("div", {
                                        className: n().currencyTabBar,
                                        children: C.map((e => (0, i.jsx)("button", {
                                            type: "button",
                                            className: e === ed ? n().currencyTabActive : n().currencyTab,
                                            disabled: ej || !tN,
                                            onClick: () => void tV(e),
                                            title: "Convert output values to ".concat(e),
                                            children: e
                                        }, e)))
                                    }), (0, i.jsxs)("label", {
                                        className: n().fieldInline,
                                        title: "Choose the field used to rank generated rows.",
                                        children: [ (0, i.jsx)("span", {
                                            children: "Sort"
                                        }), (0, i.jsxs)("select", {
                                            disabled: !tN,
                                            value: ea,
                                            onChange: e => ei(e.target.value),
                                            children: [ (0, i.jsx)("option", {
                                                value: "growth",
                                                children: "Growth"
                                            }), (0, i.jsx)("option", {
                                                value: "market",
                                                children: "Industry"
                                            }), (0, i.jsx)("option", {
                                                value: "macro",
                                                children: "Macro"
                                            }), (0, i.jsx)("option", {
                                                value: "micro",
                                                children: "Micro"
                                            }), (0, i.jsx)("option", {
                                                value: "provider",
                                                children: "Provider"
                                            }) ]
                                        }) ]
                                    }), (0, i.jsxs)("label", {
                                        className: n().fieldInline,
                                        title: "Choose ascending or descending sort order.",
                                        children: [ (0, i.jsx)("span", {
                                            children: "Direction"
                                        }), (0, i.jsxs)("select", {
                                            disabled: !tN,
                                            value: er,
                                            onChange: e => es(e.target.value),
                                            children: [ (0, i.jsx)("option", {
                                                value: "desc",
                                                children: "Descending"
                                            }), (0, i.jsx)("option", {
                                                value: "asc",
                                                children: "Ascending"
                                            }) ]
                                        }) ]
                                    }) ]
                                }) ]
                            }), (0, i.jsxs)("p", {
                                className: n().sectionHint,
                                children: ttHasGeneratedOutput ? [ "Output: ", e9, ". ", "None" === ttEffectiveBreakout ? "Showing one aggregated row within selected scope." : "Showing breakout by ".concat(ttEffectiveBreakout, " within selected scope."), " Currency snapshot: ", ed, " ", eg ? "(last update: ".concat(eg, ")") : "", " ", ey ? "| FX warning: ".concat(ey) : "" ] : "No forecast output is displayed yet. Configure variables and click Generate."
                            }), ttHasGeneratedOutput ? (0, i.jsxs)("div", {
                                className: n().certificationStrip,
                                children: [ (0, i.jsxs)("div", {
                                    className: n().certificationItem,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Status"
                                    }), (0, i.jsx)("strong", {
                                        children: tC.status
                                    }) ]
                                }), (0, i.jsxs)("div", {
                                    className: n().certificationItem,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Certificate ID"
                                    }), (0, i.jsx)("strong", {
                                        suppressHydrationWarning: !0,
                                        children: tC.certificateId
                                    }) ]
                                }), (0, i.jsxs)("div", {
                                    className: n().certificationItem,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Model Version"
                                    }), (0, i.jsx)("strong", {
                                        children: _
                                    }) ]
                                }), (0, i.jsxs)("div", {
                                    className: n().certificationItem,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Generated"
                                    }), (0, i.jsx)("strong", {
                                        suppressHydrationWarning: !0,
                                        children: tC.generatedAt
                                    }) ]
                                }), (0, i.jsxs)("p", {
                                    className: n().certificationScope,
                                    children: [ "Scope: ", tC.scope ]
                                }) ]
                            }) : null, (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: ttHasGeneratedOutput ? (0, i.jsxs)("table", {
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: "Region"
                                            }), (0, i.jsx)("th", {
                                                children: "Country"
                                            }), (0, i.jsx)("th", {
                                                children: "Output"
                                            }), (0, i.jsx)("th", {
                                                children: "Industry"
                                            }), (0, i.jsx)("th", {
                                                children: "Macro"
                                            }), (0, i.jsx)("th", {
                                                children: "Micro"
                                            }), (0, i.jsx)("th", {
                                                children: "Provider"
                                            }), (0, i.jsxs)("th", {
                                                children: [ ttCurrentValueLabel, " (", ed, " B est.)" ]
                                            }), (0, i.jsxs)("th", {
                                                children: [ "CAGR" === e9 ? "CAGR %" : "Annual Growth %", (0, i.jsx)($, {
                                                    label: "i",
                                                    text: "CAGR" === e9 ? T : A,
                                                    compact: !0
                                                }) ]
                                            }), (0, i.jsxs)("th", {
                                                children: [ ttForecastValueLabel, " (", ed, " ", ttRevenueDisplay ? "B est." : "M", ")", (0, i.jsx)($, {
                                                    label: "i",
                                                    text: ttRevenueDisplay ? "Estimated revenue for the selected output year. When CAGR is selected, this shows the final forecast year revenue estimate for the scoped service and geography." : k,
                                                    compact: !0
                                                }) ]
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: e2.length ? e2.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.region || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e.country || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e9
                                            }), (0, i.jsx)("td", {
                                                children: e.market || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e.macro || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e.micro || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e.provider || "—"
                                            }), (0, i.jsx)("td", {
                                                children: e.currentValueUsdB.toFixed(2)
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.growth.toFixed(2), "%" ]
                                            }), (0, i.jsxs)("td", {
                                                children: [ N[ed], q(e.selectedDisplayValue * tf) ]
                                            }) ]
                                        }, e.key))) : (0, i.jsx)("tr", {
                                            children: (0, i.jsx)("td", {
                                                colSpan: 10,
                                                className: n().empty,
                                                children: "No rows match the current generated filters."
                                            })
                                        })
                                    }) ]
                                }) : (0, i.jsx)("div", {
                                    className: n().empty,
                                    children: "No forecast results are displayed until Generate is clicked."
                                })
                            }), ttHasGeneratedOutput ? (0, i.jsxs)("div", {
                                className: n().pagination,
                                children: [ (0, i.jsx)("button", {
                                    type: "button",
                                    className: n().secondaryButton,
                                    title: "Move to the previous page of generated results.",
                                    disabled: e1 <= 1,
                                    onClick: () => eS((e => Math.max(1, e - 1))),
                                    children: "Previous"
                                }), (0, i.jsxs)("p", {
                                    children: [ "Page ", e1, " of ", e0 ]
                                }), (0, i.jsx)("button", {
                                    type: "button",
                                    className: n().secondaryButton,
                                    title: "Move to the next page of generated results.",
                                    disabled: e1 >= e0,
                                    onClick: () => eS((e => Math.min(e0, e + 1))),
                                    children: "Next"
                                }) ]
                            }) : null ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Provider Coverage", (0, i.jsx)($, {
                                    label: "i",
                                    text: "Coverage shows how many market-service-provider combinations survive the generated filters, including provider name/alias search, growth bounds, and selected geography scenario.",
                                    compact: !0
                                }) ]
                            }), (0, i.jsxs)("p", {
                                className: n().sectionHint,
                                children: [ "Expanded benchmark universe (", d.length, " providers). Counts show matching combinations in the generated view." ]
                            }), (0, i.jsx)("div", {
                                className: n().companyGrid,
                                children: tj.map((e => {
                                    var t;
                                    return (0, i.jsxs)("div", {
                                        className: n().company,
                                        title: "Aliases: ".concat(e.aliases.join(", ") || "None listed", " | Units: ").concat(e.businessUnits.join(", ") || "None listed"),
                                        children: [ (0, i.jsxs)("div", {
                                            children: [ (0, i.jsx)("span", {
                                                children: e.name
                                            }), (0, i.jsx)("small", {
                                                className: n().companyMeta,
                                                children: e.aliases[0] || e.businessUnits[0] || "Core services"
                                            }) ]
                                        }), (0, i.jsx)("span", {
                                            className: n().companyCount,
                                            children: (null !== (t = tb.get(e.name)) && void 0 !== t ? t : 0).toLocaleString()
                                        }) ]
                                    }, e.name);
                                }))
                            }) ]
                        }) ]
                    }), "Investor" === t && (0, i.jsxs)(i.Fragment, {
                        children: [ (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("div", {
                                className: n().tableHeader,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Mandate Radar", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.investorMandate,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().fieldInline,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Horizon"
                                    }), (0, i.jsxs)("select", {
                                        disabled: !tN,
                                        value: en,
                                        onChange: e => eo(e.target.value),
                                        children: [ (0, i.jsx)("option", {
                                            value: "Next 2 Quarters",
                                            children: "Next 2 Quarters"
                                        }), (0, i.jsx)("option", {
                                            value: "Next 4 Quarters",
                                            children: "Next 4 Quarters"
                                        }) ]
                                    }) ]
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: "Industry"
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Micro Service",
                                                    help: "Specific service segment inside the macro line used for this mandate signal."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: "Provider"
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Growth",
                                                    help: "Year-specific growth rate for the active forecast output selection."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Mandate Score",
                                                    help: "Composite attractiveness score for potential mandate activity; higher means stronger fit."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: e6.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.market
                                            }), (0, i.jsx)("td", {
                                                children: e.micro
                                            }), (0, i.jsx)("td", {
                                                children: e.provider
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.growth.toFixed(2), "%" ]
                                            }), (0, i.jsx)("td", {
                                                children: e.mandateScore.toFixed(1)
                                            }) ]
                                        }, "ib-mandate-".concat(e.market, "-").concat(e.micro, "-").concat(e.provider))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Buyer Universe Builder", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.investorBuyerUniverse,
                                    compact: !0
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: "Buyer"
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Strategic Fit",
                                                    help: "Alignment with strategic buyer priorities such as capability adjacency and portfolio fit."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Sponsor Fit",
                                                    help: "Alignment with private-capital style thesis criteria including scalability and execution profile."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Avg Growth",
                                                    help: "Average of model growth values across the retained combinations for this buyer."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: e7.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.provider
                                            }), (0, i.jsx)("td", {
                                                children: e.strategicFit.toFixed(1)
                                            }), (0, i.jsx)("td", {
                                                children: e.sponsorFit.toFixed(1)
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.avgGrowth.toFixed(2), "%" ]
                                            }) ]
                                        }, "ib-buyer-".concat(e.provider))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Deal Timing Monitor", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.investorDealTiming,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: "Industry"
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Valuation Window",
                                                        help: "Directional valuation backdrop indicating if conditions are relatively supportive or weak."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Debt Window",
                                                        help: "Directional financing accessibility indicator for debt-backed transactions."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Momentum",
                                                        help: "Composite near-term activity pulse for this industry based on current model signals."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: te.slice(0, 8).map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.market
                                                }), (0, i.jsx)("td", {
                                                    children: e.valuationWindow
                                                }), (0, i.jsx)("td", {
                                                    children: e.debtWindow
                                                }), (0, i.jsx)("td", {
                                                    children: e.momentum.toFixed(1)
                                                }) ]
                                            }, "ib-timing-".concat(e.market))))
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Diligence Risk Flags", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.investorDiligenceRisk,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: "Provider"
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Risk Dimension",
                                                        help: "Specific diligence lens being flagged, such as concentration, delivery, or margin quality."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Severity",
                                                        help: "Relative materiality of the flagged risk; higher severity warrants deeper diligence."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: tt.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.provider
                                                }), (0, i.jsx)("td", {
                                                    children: e.dimension
                                                }), (0, i.jsx)("td", {
                                                    children: e.severityLabel
                                                }) ]
                                            }, "ib-risk-".concat(e.provider, "-").concat(e.dimension))))
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsx)("h2", {
                                children: "Insight Output"
                            }), (0, i.jsx)("p", {
                                className: n().insightText,
                                children: ta
                            }) ]
                        }) ]
                    }), "PE" === t && (0, i.jsxs)(i.Fragment, {
                        children: [ (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Target & Bolt-on Screener", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.peTargetScreener,
                                    compact: !0
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: "Provider"
                                            }), (0, i.jsx)("th", {
                                                children: "Industry"
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Service",
                                                    help: "Primary service segment driving target attractiveness for this provider-industry pair."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Type",
                                                    help: "Indicates whether the opportunity is better suited as a platform acquisition or bolt-on."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Target Score",
                                                    help: "Composite PE target attractiveness score combining growth, fit, and execution profile."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: ti.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.provider
                                            }), (0, i.jsx)("td", {
                                                children: e.market
                                            }), (0, i.jsx)("td", {
                                                children: e.micro
                                            }), (0, i.jsx)("td", {
                                                children: e.platformFit
                                            }), (0, i.jsx)("td", {
                                                children: e.targetScore.toFixed(1)
                                            }) ]
                                        }, "pe-target-".concat(e.provider, "-").concat(e.market, "-").concat(e.micro))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Value-Creation Tracker", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.peValueCreation,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Lever",
                                                        help: "Value-creation initiative category expected to drive improvement."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Owner",
                                                        help: "Primary accountable team or role expected to execute the lever."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Impact Score",
                                                        help: "Relative expected uplift potential from executing the lever effectively."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: tr.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.lever
                                                }), (0, i.jsx)("td", {
                                                    children: e.owner
                                                }), (0, i.jsx)("td", {
                                                    children: e.impactScore.toFixed(1)
                                                }) ]
                                            }, "pe-lever-".concat(e.lever))))
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Hold / Exit Optimizer", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.peExitOptimizer,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: "Industry"
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Exit Score",
                                                        help: "Directional score for exit attractiveness in current and forward conditions."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Recommended Action",
                                                        help: "Model-indicated posture such as hold, prep for exit, or accelerate exit process."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: ts.slice(0, 8).map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.market
                                                }), (0, i.jsx)("td", {
                                                    children: e.exitScore.toFixed(1)
                                                }), (0, i.jsx)("td", {
                                                    children: e.action
                                                }) ]
                                            }, "pe-exit-".concat(e.market))))
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Portfolio Exposure Map", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.peExposure,
                                    compact: !0
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Macro Service",
                                                    help: "Top-level service tower used to aggregate portfolio concentration."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Exposure %",
                                                    help: "Share of retained combinations represented by this macro service."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Combination Count",
                                                    help: "Number of retained model combinations mapped to this macro service."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: tn.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.macro
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.exposurePct.toFixed(2), "%" ]
                                            }), (0, i.jsx)("td", {
                                                children: e.count.toLocaleString()
                                            }) ]
                                        }, "pe-exposure-".concat(e.macro))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsx)("h2", {
                                children: "Insight Output"
                            }), (0, i.jsx)("p", {
                                className: n().insightText,
                                children: to
                            }) ]
                        }) ]
                    }), "VC" === t && (0, i.jsxs)(i.Fragment, {
                        children: [ (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Early Signal Pipeline", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.vcSignalPipeline,
                                    compact: !0
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Theme",
                                                    help: "Emerging investment narrative constructed from underlying service and demand patterns."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Signal Score",
                                                    help: "Strength of current directional signal for the theme based on active model filters."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Avg Growth",
                                                    help: "Average growth signal associated with the theme across retained combinations."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: tc.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.theme
                                            }), (0, i.jsx)("td", {
                                                children: e.signalScore.toFixed(1)
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.avgGrowth.toFixed(2), "%" ]
                                            }) ]
                                        }, "vc-signal-".concat(e.theme))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Round Timing Predictor", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.vcRoundTiming,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Theme",
                                                        help: "Theme tracked for forward financing timing and valuation context."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Next Round Year",
                                                        help: "Directional year estimate for the most likely next financing event."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Valuation Range (USD M)",
                                                        help: "Indicative valuation band in USD millions aligned to theme momentum and risk."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: tl.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.theme
                                                }), (0, i.jsx)("td", {
                                                    children: e.nextRoundYear
                                                }), (0, i.jsxs)("td", {
                                                    children: [ "$", q(e.valuationLow), " - $", q(e.valuationHigh) ]
                                                }) ]
                                            }, "vc-round-".concat(e.theme))))
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Follow-on Allocator", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.vcFollowOn,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Theme",
                                                        help: "Theme receiving proposed follow-on reserve consideration."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Reserve Allocation",
                                                        help: "Suggested percentage of reserves to allocate for potential follow-on participation."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Conviction",
                                                        help: "Qualitative confidence tag reflecting modeled quality of the follow-on signal."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: td.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.theme
                                                }), (0, i.jsxs)("td", {
                                                    children: [ e.allocationPct.toFixed(1), "%" ]
                                                }), (0, i.jsx)("td", {
                                                    children: e.conviction
                                                }) ]
                                            }, "vc-alloc-".concat(e.theme))))
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().metricsGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Runway Risk"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: th.runwayRisk.toFixed(1)
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Burn Efficiency"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: th.burnEfficiency.toFixed(1)
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Down-round Risk"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: th.downRoundRisk.toFixed(1)
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().metricCard,
                                children: [ (0, i.jsx)("p", {
                                    className: n().metricLabel,
                                    children: "Concentration Risk"
                                }), (0, i.jsx)("p", {
                                    className: n().metricValue,
                                    children: th.concentrationRisk.toFixed(1)
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsx)("h2", {
                                children: "Insight Output"
                            }), (0, i.jsx)("p", {
                                className: n().insightText,
                                children: tu
                            }) ]
                        }) ]
                    }), "Cross-Cutting" === t && (0, i.jsxs)(i.Fragment, {
                        children: [ (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Confidence + Explainability", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.crossExplainability,
                                    compact: !0
                                }) ]
                            }), (0, i.jsxs)("p", {
                                className: n().sectionHint,
                                children: [ "Model confidence score: ", tp.toFixed(1), " / 100" ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Driver",
                                                    help: "Model component contributing to the current output signal."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Contribution",
                                                    help: "Directional magnitude of each driver’s contribution in the active setup."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Weight Share",
                                                    help: "Relative share of total modeled influence attributed to each driver."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: tm.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.driver
                                            }), (0, i.jsx)("td", {
                                                children: e.value.toFixed(2)
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.weightPct.toFixed(1), "%" ]
                                            }) ]
                                        }, "driver-".concat(e.driver))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsx)("h2", {
                                children: "Persona Dashboards"
                            }), (0, i.jsx)("div", {
                                className: n().masterTabs,
                                children: S.filter((e => "Cross-Cutting" !== e)).map((e => (0, i.jsxs)("button", {
                                    type: "button",
                                    className: n().masterTab,
                                    onClick: () => tI(e),
                                    children: [ "Open ", e ]
                                }, "persona-".concat(e))))
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Permissions", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossPermissions,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsxs)("p", {
                                    className: n().sectionHint,
                                    children: [ "Current session: ", eA, " | ", eT ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Role",
                                                        help: "Session role available in the current workspace."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Model Inputs",
                                                        help: "Whether forecast inputs remain editable in that role."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Saved Views",
                                                        help: "Saved-view actions allowed for that role."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Audit Access",
                                                        help: "Audit-trail actions available in that role."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: tT.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.role
                                                }), (0, i.jsx)("td", {
                                                    children: e.modelInputs
                                                }), (0, i.jsx)("td", {
                                                    children: e.savedViews
                                                }), (0, i.jsx)("td", {
                                                    children: e.auditAccess
                                                }) ]
                                            }, "permission-".concat(e.role))))
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("div", {
                                    className: n().tableHeader,
                                    children: [ (0, i.jsxs)("h2", {
                                        children: [ "Audit Trail", (0, i.jsx)($, {
                                            label: "i",
                                            text: O.crossAudit,
                                            compact: !0
                                        }) ]
                                    }), (0, i.jsx)("button", {
                                        type: "button",
                                        className: n().secondaryButton,
                                        disabled: !tk,
                                        onClick: tR,
                                        children: "Clear Audit Trail"
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Timestamp",
                                                        help: "Time the action was recorded in the workspace audit trail."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Actor",
                                                        help: "Session actor name associated with the recorded action."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Role",
                                                        help: "Permission mode active when the action was recorded."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Action",
                                                        help: "Action name captured in the audit trail."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Detail",
                                                        help: "Additional context describing what changed."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: eR.length ? eR.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: H(e.at)
                                                }), (0, i.jsx)("td", {
                                                    children: e.actor
                                                }), (0, i.jsx)("td", {
                                                    children: e.role
                                                }), (0, i.jsx)("td", {
                                                    children: e.action
                                                }), (0, i.jsx)("td", {
                                                    children: e.detail
                                                }) ]
                                            }, e.id))) : (0, i.jsx)("tr", {
                                                children: (0, i.jsx)("td", {
                                                    colSpan: 5,
                                                    className: n().empty,
                                                    children: "No audit events have been recorded yet."
                                                })
                                            })
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("div", {
                                className: n().tableHeader,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Alerting", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossAlerting,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsxs)("label", {
                                    className: n().fieldInline,
                                    children: [ (0, i.jsx)("span", {
                                        children: "Growth Alert Threshold %"
                                    }), (0, i.jsx)("input", {
                                        className: n().thresholdInput,
                                        inputMode: "decimal",
                                        disabled: !tN,
                                        value: ec,
                                        onChange: e => el(e.target.value)
                                    }) ]
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: "Provider"
                                            }), (0, i.jsx)("th", {
                                                children: "Industry"
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Service",
                                                    help: "Micro service line associated with the alerting row."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Growth",
                                                    help: "Growth value evaluated against the active alert threshold."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Alert",
                                                    help: "Alert classification message generated from current threshold logic."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: tg.length ? tg.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.provider
                                            }), (0, i.jsx)("td", {
                                                children: e.market
                                            }), (0, i.jsx)("td", {
                                                children: e.micro
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.growth.toFixed(2), "%" ]
                                            }), (0, i.jsx)("td", {
                                                children: e.message
                                            }) ]
                                        }, "alert-".concat(e.provider, "-").concat(e.market, "-").concat(e.micro)))) : (0, 
                                        i.jsx)("tr", {
                                            children: (0, i.jsx)("td", {
                                                colSpan: 5,
                                                className: n().empty,
                                                children: "No alerts above the current threshold."
                                            })
                                        })
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().card,
                            children: [ (0, i.jsxs)("h2", {
                                children: [ "Scenario Engine", (0, i.jsx)($, {
                                    label: "i",
                                    text: O.crossScenario,
                                    compact: !0
                                }) ]
                            }), (0, i.jsx)("div", {
                                className: n().tableWrap,
                                children: (0, i.jsxs)("table", {
                                    className: n().compactTable,
                                    children: [ (0, i.jsx)("thead", {
                                        children: (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Scenario",
                                                    help: "Macro demand stance used to rerun the same retained dataset."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Average Growth",
                                                    help: "Average modeled growth under each scenario configuration."
                                                })
                                            }), (0, i.jsx)("th", {
                                                children: (0, i.jsx)(ee, {
                                                    text: "Delta vs Active",
                                                    help: "Difference between each scenario’s average growth and the active scenario."
                                                })
                                            }) ]
                                        })
                                    }), (0, i.jsx)("tbody", {
                                        children: tv.map((e => (0, i.jsxs)("tr", {
                                            children: [ (0, i.jsx)("td", {
                                                children: e.scenario
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.avgGrowth.toFixed(2), "%" ]
                                            }), (0, i.jsxs)("td", {
                                                children: [ e.deltaToActive >= 0 ? "+" : "", e.deltaToActive.toFixed(2), "%" ]
                                            }) ]
                                        }, "scenario-".concat(e.scenario))))
                                    }) ]
                                })
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Output Certification", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossCertification,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Field",
                                                        help: "Certified governance field attached to the current active output."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Value",
                                                        help: "Current value recorded for that certification field."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsxs)("tbody", {
                                            children: [ (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Status"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.status
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Certification class"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.certificationClass
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Certificate ID"
                                                }), (0, i.jsx)("td", {
                                                    suppressHydrationWarning: !0,
                                                    children: tC.certificateId
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Model version"
                                                }), (0, i.jsx)("td", {
                                                    children: _
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Model owner"
                                                }), (0, i.jsx)("td", {
                                                    children: "Forecast Workbench Governance Layer"
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Generated at"
                                                }), (0, i.jsx)("td", {
                                                    suppressHydrationWarning: !0,
                                                    children: tC.generatedAt
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Scope"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.scope
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Forecast framing"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.methodology
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "Rows certified"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.rowCount
                                                }) ]
                                            }), (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: "FX snapshot"
                                                }), (0, i.jsx)("td", {
                                                    children: tC.fxSnapshot
                                                }) ]
                                            }) ]
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Model Versioning", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossVersioning,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Version",
                                                        help: "Named model release identifier."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Status",
                                                        help: "Whether the version is current or retained as prior history."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Release Date",
                                                        help: "Date this model version was introduced into the tool."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Change Summary",
                                                        help: "High-level description of what changed in that release."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: G.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.version
                                                }), (0, i.jsx)("td", {
                                                    children: e.status
                                                }), (0, i.jsx)("td", {
                                                    children: e.releaseDate
                                                }), (0, i.jsx)("td", {
                                                    children: e.summary
                                                }) ]
                                            }, "version-".concat(e.version))))
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }), (0, i.jsxs)("section", {
                            className: n().moduleGrid,
                            children: [ (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Lineage Register", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossLineage,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Artifact",
                                                        help: "Named model component or dataset used in the tool."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Source",
                                                        help: "Where that artifact originates from in the current tool design."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Transformation",
                                                        help: "How the artifact is used or transformed before it reaches outputs."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Refresh",
                                                        help: "When that lineage component is refreshed or revised."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: B.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.artifact
                                                }), (0, i.jsx)("td", {
                                                    children: e.source
                                                }), (0, i.jsx)("td", {
                                                    children: e.transformation
                                                }), (0, i.jsx)("td", {
                                                    children: e.refresh
                                                }) ]
                                            }, "lineage-".concat(e.artifact))))
                                        }) ]
                                    })
                                }) ]
                            }), (0, i.jsxs)("article", {
                                className: n().card,
                                children: [ (0, i.jsxs)("h2", {
                                    children: [ "Assumption Log", (0, i.jsx)($, {
                                        label: "i",
                                        text: O.crossAssumptions,
                                        compact: !0
                                    }) ]
                                }), (0, i.jsx)("div", {
                                    className: n().tableWrap,
                                    children: (0, i.jsxs)("table", {
                                        className: n().compactTable,
                                        children: [ (0, i.jsx)("thead", {
                                            children: (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Assumption",
                                                        help: "Formal assumption built into the current model behavior."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Scope",
                                                        help: "Where in the tool or model the assumption applies."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Impact",
                                                        help: "How the assumption changes or constrains interpretation of outputs."
                                                    })
                                                }), (0, i.jsx)("th", {
                                                    children: (0, i.jsx)(ee, {
                                                        text: "Review Trigger",
                                                        help: "Event that should prompt governance review of the assumption."
                                                    })
                                                }) ]
                                            })
                                        }), (0, i.jsx)("tbody", {
                                            children: U.map((e => (0, i.jsxs)("tr", {
                                                children: [ (0, i.jsx)("td", {
                                                    children: e.assumption
                                                }), (0, i.jsx)("td", {
                                                    children: e.scope
                                                }), (0, i.jsx)("td", {
                                                    children: e.impact
                                                }), (0, i.jsx)("td", {
                                                    children: e.reviewTrigger
                                                }) ]
                                            }, "assumption-".concat(e.assumption))))
                                        }) ]
                                    })
                                }) ]
                            }) ]
                        }) ]
                    }) ]
                })
            });
        }

export default et;
