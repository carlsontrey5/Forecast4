"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bpoServiceLines } from "@/lib/contracts/service-lines";
import type { ContractDraft, ContractRecord, CoverageSentiment, InformationType, RenewalStatus } from "@/lib/contracts/types";

type SessionUser = {
  username: string;
  role: "admin" | "analyst";
  exp: number;
};

type Meta = {
  serviceLines: string[];
  industries: string[];
  serviceProviders: string[];
  geographies: string[];
  informationTypes: string[];
  renewalStatuses: string[];
};

type FilterState = {
  freeText: string;
  serviceLine: string;
  industry: string;
  serviceProvider: string;
  geography: string;
  renewalStatus: RenewalStatus | "Any";
  startDateFrom: string;
  startDateTo: string;
  informationTypes: InformationType[];
};

const informationTypeOptions: InformationType[] = ["Contracts", "Financial Results", "M&A", "New Offerings", "Partnerships"];
const renewalStatusOptions: Array<RenewalStatus | "Any"> = ["Any", "Renewal", "Loss", "No Renewal Insight"];
const regionOptions = ["Global", "North America", "Europe", "Asia", "South America", "Oceania"];
const tabs = ["Tracker", "Deal Maker", "Back End Input"] as const;
const dealMakerModes = ["Heat Map", "Deal Finder"] as const;
const endWindowOptions = ["0-6 months", "6-12 months", "12-18 months", "24+ months"] as const;
type AppTab = (typeof tabs)[number];
type DealMakerMode = (typeof dealMakerModes)[number];
type EndWindow = (typeof endWindowOptions)[number];

const initialFilters: FilterState = {
  freeText: "",
  serviceLine: "Any",
  industry: "Any",
  serviceProvider: "Any",
  geography: "Any",
  renewalStatus: "Any",
  startDateFrom: "",
  startDateTo: "",
  informationTypes: [...informationTypeOptions],
};

const initialDraft: ContractDraft = {
  title: "",
  body: "",
  articleUrl: "",
  informationType: "Contracts",
  serviceLine: "",
  industry: "",
  serviceProvider: "",
  geography: "",
  countrySigned: "",
  deliveryLocation: "",
  clientName: "",
  contractStartDate: "",
  contractLengthMonths: 24,
  tcvUsd: 0,
  contractType: "New Contract",
  platform: "",
  saasPlatform: false,
  incumbentProvider: "",
  renewalStatus: "No Renewal Insight",
  renewalConfidence: 0.34,
  renewalRationale: "",
  dealTypeDetail: "",
  mediaCoverageSentiment: "Neutral",
  mediaCoverageSummary: "",
  mediaCoverage: [],
  contractEndEstimated: true,
  tcvEstimated: true,
};

function usd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function monthsToLabel(months: number): string {
  if (months < 6) return "0-6 months";
  if (months < 12) return "6-12 months";
  if (months < 18) return "12-18 months";
  return "24+ months";
}

function monthsUntil(endDate: string): number {
  const now = new Date();
  const end = new Date(endDate);
  return (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
}

function isActiveOrUpcoming(endDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return false;
  return end >= today;
}

function typeClass(type: InformationType): string {
  if (type === "Contracts") return "type-contracts";
  if (type === "M&A") return "type-ma";
  if (type === "Partnerships") return "type-partnerships";
  if (type === "New Offerings") return "type-new";
  return "type-financial";
}

function renewalClass(status?: RenewalStatus): string {
  if (status === "Renewal") return "renewal-renewal";
  if (status === "Loss") return "renewal-loss";
  return "renewal-noinsight";
}

function sentimentClass(sentiment?: CoverageSentiment): string {
  if (sentiment === "Positive") return "sentiment-positive";
  if (sentiment === "Negative") return "sentiment-negative";
  return "sentiment-neutral";
}

function headlineWithProvider(contract: ContractRecord): string {
  if (!contract.serviceProvider || contract.serviceProvider === "Unknown Provider") return contract.title;
  const providerPattern = new RegExp(`\\b${contract.serviceProvider.replace(/\\s+/g, "\\s+")}\\b`, "i");
  if (providerPattern.test(contract.title)) return contract.title;
  return `${contract.serviceProvider}: ${contract.title}`;
}

function markdownRowToCells(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function bodyPreview(text: string): string {
  const clean = text
    .replace(/\|/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > 260 ? `${clean.slice(0, 260)}...` : clean;
}

function stripDealFinderSection(text: string): string {
  return text.replace(/\n+Deal Finder Intelligence[\s\S]*/i, "").trim();
}

function renderStructuredBody(text: string): JSX.Element[] {
  const lines = text.split("\n");
  const nodes: JSX.Element[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i += 1;
      continue;
    }

    const nextLine = lines[i + 1]?.trim() ?? "";
    const isTableHeader = line.startsWith("|") && nextLine.startsWith("|") && /---/.test(nextLine);
    if (isTableHeader) {
      const rows: string[] = [line];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i += 1;
      }

      const header = markdownRowToCells(rows[0]);
      const bodyRows = rows.slice(1).map(markdownRowToCells);
      nodes.push(
        <div key={`t-${key++}`} className="tableWrap">
          <table className="mdTable">
            <thead>
              <tr>{header.map((cell, idx) => <th key={idx}>{cell}</th>)}</tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ridx) => (
                <tr key={ridx}>
                  {row.map((cell, cidx) => <td key={cidx}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [line.replace(/^- /, "").trim()];
      i += 1;
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().replace(/^- /, "").trim());
        i += 1;
      }
      nodes.push(
        <ul key={`ul-${key++}`} className="bodyList">
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^[A-Za-z][A-Za-z0-9 /&()'-]{2,80}:?$/.test(line) && line.length <= 90) {
      nodes.push(<h4 key={`h-${key++}`} className="bodyHeading">{line.replace(/:$/, "")}</h4>);
      i += 1;
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const candidate = lines[i].trim();
      if (!candidate) {
        i += 1;
        break;
      }
      const lookahead = lines[i + 1]?.trim() ?? "";
      const beginsTable = candidate.startsWith("|") && lookahead.startsWith("|") && /---/.test(lookahead);
      const beginsList = candidate.startsWith("- ");
      const sectionHeading = /^[A-Za-z][A-Za-z0-9 /&()'-]{2,80}:?$/.test(candidate) && candidate.length <= 90;
      if (beginsTable || beginsList || sectionHeading) break;
      paragraph.push(candidate);
      i += 1;
    }
    nodes.push(<p key={`p-${key++}`} className="bodyParagraph">{paragraph.join(" ")}</p>);
  }

  return nodes;
}

export default function HomePage(): JSX.Element {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [meta, setMeta] = useState<Meta>({ serviceLines: [], industries: [], serviceProviders: [], geographies: [], informationTypes: [], renewalStatuses: [] });
  const [selected, setSelected] = useState<ContractRecord | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>("Tracker");
  const [mode, setMode] = useState<"list" | "location">("list");
  const [dealMakerMode, setDealMakerMode] = useState<DealMakerMode>("Heat Map");
  const [dealFinderWindow, setDealFinderWindow] = useState<EndWindow>("0-6 months");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [enrichingDeals, setEnrichingDeals] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [adminDraft, setAdminDraft] = useState<ContractDraft>(initialDraft);
  const [aiInput, setAiInput] = useState("");

  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [databaseProvider, setDatabaseProvider] = useState<"file" | "supabase">("file");
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "admin123" });
  const loadedQueryRef = useRef("");

  const isAdmin = user?.role === "admin";
  const isAuthenticated = Boolean(user);
  const isDealFinderActive = activeTab === "Deal Maker" && dealMakerMode === "Deal Finder";
  const draftType = adminDraft.informationType ?? "Contracts";
  const draftIsContract = draftType === "Contracts";

  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    if (filters.freeText.trim()) q.set("freeText", filters.freeText.trim());
    if (filters.serviceLine !== "Any") q.set("serviceLine", filters.serviceLine);
    if (filters.industry !== "Any") q.set("industry", filters.industry);
    if (filters.serviceProvider !== "Any") q.set("serviceProvider", filters.serviceProvider);
    if (filters.geography !== "Any") q.set("geography", filters.geography);
    if (isDealFinderActive && filters.renewalStatus !== "Any") q.set("renewalStatus", filters.renewalStatus);
    if (filters.startDateFrom) q.set("startDateFrom", filters.startDateFrom);
    if (filters.startDateTo) q.set("startDateTo", filters.startDateTo);
    filters.informationTypes.forEach((t) => q.append("informationType", t));
    return q.toString();
  }, [filters, isDealFinderActive]);

  const loadContracts = useCallback(async (force = false): Promise<void> => {
    if (!force && loadedQueryRef.current === queryString) return;

    setLoading(true);
    const res = await fetch(`/api/contracts?${queryString}`);

    if (res.status === 401) {
      setUser(null);
      loadedQueryRef.current = "";
      setStatus("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    const data = (await res.json()) as {
      contracts: ContractRecord[];
      meta: Meta;
      user: SessionUser;
      databaseProvider: "file" | "supabase";
    };

    setContracts(data.contracts);
    setMeta({
      ...data.meta,
      renewalStatuses: data.meta.renewalStatuses ?? [],
    });
    setDatabaseProvider(data.databaseProvider);
    loadedQueryRef.current = queryString;
    setLoading(false);
  }, [queryString]);

  useEffect(() => {
    const check = async (): Promise<void> => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = (await res.json()) as { user: SessionUser };
        setUser(data.user);
      }
      setAuthChecked(true);
    };

    void check();
  }, []);

  useEffect(() => {
    if (!authChecked || !isAuthenticated) return;
    void loadContracts();
  }, [authChecked, isAuthenticated, loadContracts]);

  const tcvByGeography = useMemo(() => {
    const map = new Map<string, { count: number; tcv: number }>();
    contracts
      .filter((c) => c.informationType === "Contracts")
      .forEach((c) => {
      const current = map.get(c.geography) ?? { count: 0, tcv: 0 };
      current.count += 1;
      current.tcv += c.tcvUsd;
      map.set(c.geography, current);
      });
    return [...map.entries()].sort((a, b) => b[1].tcv - a[1].tcv);
  }, [contracts]);

  const endDateBuckets = useMemo(() => {
    const map = new Map<string, number>();
    contracts
      .filter((c) => c.informationType === "Contracts")
      .filter((c) => isActiveOrUpcoming(c.contractEndDate))
      .forEach((c) => {
      const label = monthsToLabel(monthsUntil(c.contractEndDate));
      map.set(label, (map.get(label) ?? 0) + 1);
      });

    return [...endWindowOptions].map((bucket) => ({ bucket, count: map.get(bucket) ?? 0 }));
  }, [contracts]);

  const dealFinderContracts = useMemo(() => {
    return contracts
      .filter((c) => c.informationType === "Contracts")
      .filter((c) => isActiveOrUpcoming(c.contractEndDate))
      .filter((c) => monthsToLabel(monthsUntil(c.contractEndDate)) === dealFinderWindow)
      .sort((a, b) => a.contractEndDate.localeCompare(b.contractEndDate));
  }, [contracts, dealFinderWindow]);

  async function handleRefreshDealIntelligence(): Promise<void> {
    if (!isAdmin) {
      setStatus("Only admin can refresh renewal/media intelligence.");
      return;
    }

    const ids = dealFinderContracts.map((c) => c.id);
    if (ids.length === 0) {
      setStatus("No contracts in current Deal Finder window.");
      return;
    }

    setEnrichingDeals(true);
    setStatus("Refreshing renewal status and media coverage from external signals...");
    const res = await fetch("/api/contracts/deal-intelligence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, refresh: true, limit: 120 }),
    });

    const data = (await res.json()) as { updatedCount?: number; considered?: number; error?: string; message?: string };
    setEnrichingDeals(false);

    if (!res.ok) {
      setStatus(data.error ?? "Deal intelligence refresh failed.");
      return;
    }

    setStatus(`${data.message ?? "Deal intelligence updated."} Updated ${data.updatedCount ?? 0} of ${data.considered ?? 0} records.`);
    await loadContracts(true);
  }

  async function handleReindexWording(): Promise<void> {
    if (!isAdmin) {
      setStatus("Only admin can rebuild article wording.");
      return;
    }

    setReindexing(true);
    setStatus("Rebuilding standardized article wording...");
    const res = await fetch("/api/contracts/reindex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regenerateAll: true }),
    });
    const data = (await res.json()) as { error?: string; message?: string; writeupFixes?: number };
    setReindexing(false);

    if (!res.ok) {
      setStatus(data.error ?? "Reindex failed.");
      return;
    }

    setStatus(`${data.message ?? "Reindex completed."} Rebuilt ${data.writeupFixes ?? 0} writeups.`);
    await loadContracts(true);
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus("Authenticating...");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    const data = (await res.json()) as { user?: SessionUser; error?: string };
    if (!res.ok || !data.user) {
      setStatus(data.error ?? "Login failed");
      return;
    }

    setUser(data.user);
    setStatus(`Welcome ${data.user.username} (${data.user.role})`);
  }

  async function handleLogout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    loadedQueryRef.current = "";
    setContracts([]);
    setStatus("Logged out");
  }

  async function handlePrepopulate(): Promise<void> {
    if (!isAdmin) {
      setStatus("Only admin can prepopulate data.");
      return;
    }

    setStatus("Historical prepopulation running (2010 to present)...");
    const res = await fetch("/api/contracts/prepopulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        historical: true,
        startYear: 2010,
        categories: informationTypeOptions,
        maxPerCategoryPerYear: 2,
      }),
    });

    const data = (await res.json()) as {
      createdCount?: number;
      message?: string;
      error?: string;
      liveCount?: number;
      syntheticCount?: number;
      range?: { startYear: number; endYear: number };
    };
    if (!res.ok) {
      setStatus(data.error ?? "Prepopulation failed.");
      return;
    }

    const range = data.range ? `${data.range.startYear}-${data.range.endYear}` : "2010-present";
    setStatus(`${data.message} Added ${data.createdCount ?? 0} record(s) for ${range} (live: ${data.liveCount ?? 0}, synthetic: ${data.syntheticCount ?? 0}).`);
    await loadContracts(true);
  }

  async function handleAiExtract(): Promise<void> {
    if (!isAdmin) {
      setStatus("Only admin can run AI extraction and insert records.");
      return;
    }
    if (!aiInput.trim()) return;

    setStatus("Extracting fields from text using OpenAI (with fallback)...");

    const res = await fetch("/api/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawText: aiInput }),
    });

    const data = (await res.json()) as { created?: ContractRecord; error?: string };
    if (!res.ok || !data.created) {
      setStatus(data.error ?? "AI extraction failed.");
      return;
    }

    setStatus(`AI extracted and saved: ${data.created.title}`);
    setAiInput("");
    await loadContracts(true);
  }

  async function handleManualSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!isAdmin) {
      setStatus("Only admin can create records.");
      return;
    }

    setStatus("Saving contract...");

    const res = await fetch("/api/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contract: adminDraft }),
    });

    const data = (await res.json()) as { created?: ContractRecord; error?: string };
    if (!res.ok || !data.created) {
      setStatus(data.error ?? "Save failed.");
      return;
    }

    setAdminDraft(initialDraft);
    setStatus(`Contract saved: ${data.created.title}`);
    await loadContracts(true);
  }

  function exportCsv(): void {
    const headers = ["Title", "Provider", "Incumbent", "Renewal Status", "Renewal Confidence", "Service Line", "Industry", "Geography", "Start Date", "End Date", "TCV", "Info Type"];
    const rows = contracts.map((c) => [
      c.title,
      c.serviceProvider,
      c.incumbentProvider ?? c.serviceProvider,
      c.renewalStatus ?? "No Renewal Insight",
      `${Math.round((c.renewalConfidence ?? 0.34) * 100)}%`,
      c.serviceLine,
      c.industry,
      c.geography,
      c.contractStartDate,
      c.contractEndDate,
      String(c.tcvUsd),
      c.informationType,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contract-tracker-export.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function toggleInfoType(type: InformationType): void {
    setFilters((prev) => {
      const exists = prev.informationTypes.includes(type);
      const next = exists ? prev.informationTypes.filter((item) => item !== type) : [...prev.informationTypes, type];
      return { ...prev, informationTypes: next.length > 0 ? next : [type] };
    });
  }

  if (!authChecked) {
    return (
      <main className="shell">
        <section className="hero"><h1>Loading...</h1></section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="shell">
        <section className="hero">
          <p className="eyebrow">Secure Access</p>
          <h1>IT Services Contract Tracker Login</h1>
          <p>Roles: `analyst` (read-only) and `admin` (data ingestion + administration).</p>
        </section>
        <section className="card">
          <form onSubmit={handleLogin} className="grid" style={{ maxWidth: 420 }}>
            <input placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm((v) => ({ ...v, username: e.target.value }))} required />
            <input type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm((v) => ({ ...v, password: e.target.value }))} required />
            <button type="submit">Login</button>
          </form>
          {status && <p className="status">{status}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">IT Services Contract Tracker</p>
        <h1>AI-enabled outsourced contract intelligence and database automation</h1>
        <p>Signed in as <b>{user.username}</b> ({user.role}). Database provider: <b>{databaseProvider}</b>.</p>
        <div className="heroActions">
          <button onClick={handlePrepopulate} disabled={!isAdmin}>Prepopulate 2010+ (All Categories)</button>
          <button className="ghost" onClick={exportCsv}>Export to Excel (CSV)</button>
          <button className="ghost" onClick={handleLogout}>Logout</button>
        </div>
        {status && <p className="status">{status}</p>}
      </section>

      <section className="filters card">
        <div className="programTabs">
          {tabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid filtersGrid">
          <input placeholder="Free text search..." value={filters.freeText} onChange={(e) => setFilters((f) => ({ ...f, freeText: e.target.value }))} />
          <select value={filters.serviceLine} onChange={(e) => setFilters((f) => ({ ...f, serviceLine: e.target.value }))}>
            <option>Any</option>
            {meta.serviceLines.map((v) => <option key={v}>{v}</option>)}
          </select>
          <select value={filters.industry} onChange={(e) => setFilters((f) => ({ ...f, industry: e.target.value }))}>
            <option>Any</option>
            {meta.industries.map((v) => <option key={v}>{v}</option>)}
          </select>
          <select value={filters.serviceProvider} onChange={(e) => setFilters((f) => ({ ...f, serviceProvider: e.target.value }))}>
            <option>Any</option>
            {meta.serviceProviders.map((v) => <option key={v}>{v}</option>)}
          </select>
          <select value={filters.geography} onChange={(e) => setFilters((f) => ({ ...f, geography: e.target.value }))}>
            <option>Any</option>
            {regionOptions.map((v) => <option key={`region-${v}`}>{v}</option>)}
            {meta.geographies.map((v) => <option key={v}>{v}</option>)}
          </select>
          <input type="date" value={filters.startDateFrom} onChange={(e) => setFilters((f) => ({ ...f, startDateFrom: e.target.value }))} />
          <input type="date" value={filters.startDateTo} onChange={(e) => setFilters((f) => ({ ...f, startDateTo: e.target.value }))} />
          <button className="ghost" onClick={() => setFilters(initialFilters)}>Reset Filters</button>
        </div>
        <div className="chips">
          {informationTypeOptions.map((type) => (
            <button key={type} className={`chip ${typeClass(type)} ${filters.informationTypes.includes(type) ? "active" : ""}`} onClick={() => toggleInfoType(type)}>{type}</button>
          ))}
        </div>
      </section>

      {activeTab === "Tracker" && (
        <section className="card modeBar">
          <button className={mode === "list" ? "active" : ""} onClick={() => setMode("list")}>List View</button>
          <button className={mode === "location" ? "active" : ""} onClick={() => setMode("location")}>Heat Map by Contract Location</button>
        </section>
      )}

      {loading && <p className="status">Loading contracts...</p>}

      {!loading && activeTab === "Tracker" && mode === "list" && (
        <section className="list card">
          {contracts.map((contract) => (
            <article key={contract.id} onClick={() => setSelected(contract)} className={`articleCard ${typeClass(contract.informationType)}`}>
              <h3>{headlineWithProvider(contract)}</h3>
              <div className="metaLine">
                <span className={`typeBadge ${typeClass(contract.informationType)}`}>{contract.informationType}</span>
                <span>{contract.serviceProvider}</span>
                <span>{contract.serviceLine}</span>
                <span>{contract.industry}</span>
                <span>{contract.contractStartDate}</span>
              </div>
              {contract.articleUrl && (
                <p>
                  <a href={contract.articleUrl} target="_blank" rel="noreferrer noopener" onClick={(e) => e.stopPropagation()}>
                    Original article
                  </a>
                </p>
              )}
              <p>{bodyPreview(stripDealFinderSection(contract.body))}</p>
            </article>
          ))}
          {contracts.length === 0 && <p>No contracts match your filters.</p>}
        </section>
      )}

      {!loading && activeTab === "Tracker" && mode === "location" && (
        <section className="card heatmap">
          {tcvByGeography.map(([geo, data]) => (
            <div key={geo} className="heatRow">
              <strong>{geo}</strong>
              <div className="bar"><span style={{ width: `${Math.max(8, Math.min(100, (data.tcv / 60_000_000) * 100))}%` }} /></div>
              <small>{data.count} contracts · {usd(data.tcv)}</small>
            </div>
          ))}
        </section>
      )}

      {!loading && activeTab === "Deal Maker" && (
        <>
          <section className="card modeBar">
            <button className={dealMakerMode === "Heat Map" ? "active" : ""} onClick={() => setDealMakerMode("Heat Map")}>Heat Map</button>
            <button className={dealMakerMode === "Deal Finder" ? "active" : ""} onClick={() => setDealMakerMode("Deal Finder")}>Deal Finder</button>
          </section>

          {dealMakerMode === "Heat Map" && (
            <section className="card heatmap">
              <h3>Heat Map by Contract End Date</h3>
              {endDateBuckets.map((item) => (
                <div key={item.bucket} className="heatRow">
                  <strong>{item.bucket}</strong>
                  <div className="bar"><span style={{ width: `${Math.max(8, Math.min(100, item.count * 18))}%` }} /></div>
                  <small>{item.count} contracts ending</small>
                </div>
              ))}
            </section>
          )}

          {dealMakerMode === "Deal Finder" && (
            <section className="card list">
              <div className="dealFinderHeader">
                <h3>Deal Finder</h3>
                <div className="dealFinderControls">
                  <select value={dealFinderWindow} onChange={(e) => setDealFinderWindow(e.target.value as EndWindow)}>
                    {endWindowOptions.map((window) => <option key={window}>{window}</option>)}
                  </select>
                  <select value={filters.renewalStatus} onChange={(e) => setFilters((f) => ({ ...f, renewalStatus: e.target.value as RenewalStatus | "Any" }))}>
                    {renewalStatusOptions.map((statusOpt) => <option key={statusOpt}>{statusOpt}</option>)}
                    {meta.renewalStatuses.filter((s) => !renewalStatusOptions.includes(s as RenewalStatus | "Any")).map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={handleRefreshDealIntelligence} disabled={!isAdmin || enrichingDeals}>
                    {enrichingDeals ? "Refreshing..." : "Refresh Renewal & Media Intelligence"}
                  </button>
                </div>
              </div>
              <p>Use Tracker filters above (including Renewal Status) and select an end-date window to identify near-term rebid opportunities.</p>
              <div className="dealFinderSpec">
                <p>Deal Finder output includes:</p>
                <ul>
                  <li>Renewal status with confidence and renewal/loss/no-insight color coding.</li>
                  <li>Incumbent provider and TCV estimate.</li>
                  <li>Industry, contract length, start date, estimated end date, and detailed deal type.</li>
                  <li>Media coverage sentiment coding (negative, positive, neutral) with linked evidence.</li>
                </ul>
              </div>
              {dealFinderContracts.map((contract) => (
                <article key={`deal-${contract.id}`} onClick={() => setSelected(contract)} className={`articleCard ${renewalClass(contract.renewalStatus)}`}>
                  <h3>{headlineWithProvider(contract)}</h3>
                  <div className="metaLine">
                    <span className={`typeBadge ${typeClass(contract.informationType)}`}>{contract.informationType}</span>
                    <span className={renewalClass(contract.renewalStatus)}>
                      Renewal: {contract.renewalStatus ?? "No Renewal Insight"} ({Math.round((contract.renewalConfidence ?? 0.34) * 100)}%)
                    </span>
                    <span>Incumbent: {contract.incumbentProvider ?? contract.serviceProvider}</span>
                    <span>End: {contract.contractEndDate}</span>
                    <span>TCV: {usd(contract.tcvUsd)} {contract.tcvEstimated ? "(est.)" : ""}</span>
                  </div>
                  <p>{contract.renewalRationale ?? "No externally corroborated renewal/loss signal identified yet."}</p>
                  <p className={sentimentClass(contract.mediaCoverageSentiment)}>
                    Media coverage ({contract.mediaCoverageSentiment ?? "Neutral"}): {contract.mediaCoverageSummary ?? "No additional media coverage identified yet."}
                  </p>
                </article>
              ))}
              {dealFinderContracts.length === 0 && <p>No contracts match the selected Deal Finder window and filters.</p>}
            </section>
          )}
        </>
      )}

      {activeTab === "Back End Input" && (
        <section className="admin card">
          <h2>Back End Contract Input</h2>
          {!isAdmin && <p>Read-only role active. Switch to admin to ingest or edit data.</p>}
          {isAdmin && (
            <>
              <p>Paste article text for AI extraction, or submit manually.</p>
              <div className="heroActions" style={{ marginBottom: "0.6rem" }}>
                <button onClick={handleReindexWording} disabled={reindexing}>
                  {reindexing ? "Rebuilding..." : "Rebuild Article Wording (All Records)"}
                </button>
              </div>
              <div className="aiBox">
                <textarea value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Paste press release snippet for AI extraction..." />
                <button onClick={handleAiExtract}>AI Extract + Save</button>
              </div>

              <form onSubmit={handleManualSubmit}>
                <div className="grid adminGrid">
                  <input required placeholder="Title" value={adminDraft.title} onChange={(e) => setAdminDraft((d) => ({ ...d, title: e.target.value }))} />
                  <input placeholder="Article URL" value={adminDraft.articleUrl} onChange={(e) => setAdminDraft((d) => ({ ...d, articleUrl: e.target.value }))} />
                  <textarea required placeholder="Contract write-up" value={adminDraft.body} onChange={(e) => setAdminDraft((d) => ({ ...d, body: e.target.value }))} />
                  <select value={adminDraft.informationType} onChange={(e) => setAdminDraft((d) => ({ ...d, informationType: e.target.value as InformationType }))}>
                    {informationTypeOptions.map((type) => <option key={type}>{type}</option>)}
                  </select>
                  <select value={adminDraft.serviceLine} onChange={(e) => setAdminDraft((d) => ({ ...d, serviceLine: e.target.value }))}>
                    <option value="">Service Line</option>
                    {bpoServiceLines.map((line) => <option key={line} value={line}>{line}</option>)}
                    {meta.serviceLines.map((line) => <option key={`meta-${line}`} value={line}>{line}</option>)}
                  </select>
                  <input placeholder="Industry" value={adminDraft.industry} onChange={(e) => setAdminDraft((d) => ({ ...d, industry: e.target.value }))} />
                  <input placeholder="Service Provider" value={adminDraft.serviceProvider} onChange={(e) => setAdminDraft((d) => ({ ...d, serviceProvider: e.target.value }))} />
                  <input placeholder="Client Name" value={adminDraft.clientName} onChange={(e) => setAdminDraft((d) => ({ ...d, clientName: e.target.value }))} />
                  <select value={adminDraft.geography} onChange={(e) => setAdminDraft((d) => ({ ...d, geography: e.target.value }))}>
                    <option value="">Geography</option>
                    {regionOptions.map((region) => <option key={region} value={region}>{region}</option>)}
                  </select>
                  <input placeholder="Country Signed" value={adminDraft.countrySigned} onChange={(e) => setAdminDraft((d) => ({ ...d, countrySigned: e.target.value }))} />
                  <input placeholder="Delivery Location" value={adminDraft.deliveryLocation} onChange={(e) => setAdminDraft((d) => ({ ...d, deliveryLocation: e.target.value }))} />
                  <input type="date" value={adminDraft.contractStartDate} onChange={(e) => setAdminDraft((d) => ({ ...d, contractStartDate: e.target.value }))} />
                  {draftIsContract && (
                    <input type="number" min={1} placeholder="Contract Length (Months)" value={adminDraft.contractLengthMonths} onChange={(e) => setAdminDraft((d) => ({ ...d, contractLengthMonths: Number(e.target.value) }))} />
                  )}
                  {draftIsContract && (
                    <input type="number" min={0} placeholder="TCV (USD)" value={adminDraft.tcvUsd} onChange={(e) => setAdminDraft((d) => ({ ...d, tcvUsd: Number(e.target.value) }))} />
                  )}
                  <input placeholder="Contract Type" value={adminDraft.contractType} onChange={(e) => setAdminDraft((d) => ({ ...d, contractType: e.target.value }))} />
                  <input placeholder="Platform" value={adminDraft.platform} onChange={(e) => setAdminDraft((d) => ({ ...d, platform: e.target.value }))} />
                  {draftIsContract && (
                    <input placeholder="Incumbent Provider" value={adminDraft.incumbentProvider ?? ""} onChange={(e) => setAdminDraft((d) => ({ ...d, incumbentProvider: e.target.value }))} />
                  )}
                  {draftIsContract && (
                    <select value={adminDraft.renewalStatus ?? "No Renewal Insight"} onChange={(e) => setAdminDraft((d) => ({ ...d, renewalStatus: e.target.value as RenewalStatus }))}>
                      <option>Renewal</option>
                      <option>Loss</option>
                      <option>No Renewal Insight</option>
                    </select>
                  )}
                  <label><input type="checkbox" checked={Boolean(adminDraft.saasPlatform)} onChange={(e) => setAdminDraft((d) => ({ ...d, saasPlatform: e.target.checked }))} /> SaaS Platform</label>
                </div>
                <button type="submit">Save Manual Contract</button>
              </form>
            </>
          )}
        </section>
      )}

      {selected && (
        <section className="drawer" onClick={() => setSelected(null)}>
          <article className={selected.informationType === "Contracts" ? renewalClass(selected.renewalStatus) : ""} onClick={(e) => e.stopPropagation()}>
            <h3>{headlineWithProvider(selected)}</h3>
            {selected.articleUrl && (
              <p>
                <a href={selected.articleUrl} target="_blank" rel="noreferrer noopener">Original article</a>
              </p>
            )}
            {selected.informationType === "Contracts" && isDealFinderActive && (
              <p className={`statusBadge ${renewalClass(selected.renewalStatus)}`}>
                Renewal Status: {selected.renewalStatus ?? "No Renewal Insight"} ({Math.round((selected.renewalConfidence ?? 0.34) * 100)}% confidence)
              </p>
            )}
            <div className="bodyContent">{renderStructuredBody(stripDealFinderSection(selected.body))}</div>
            {selected.informationType === "Contracts" && isDealFinderActive && (
              <section className="dealDetails">
                <h4>Deal Finder Intelligence</h4>
                <ul>
                  <li><b>Renewal status:</b> {selected.renewalStatus ?? "No Renewal Insight"} ({Math.round((selected.renewalConfidence ?? 0.34) * 100)}% confidence)</li>
                  <li><b>Incumbent:</b> {selected.incumbentProvider ?? selected.serviceProvider}</li>
                  <li><b>TCV estimate:</b> {usd(selected.tcvUsd)} {selected.tcvEstimated ? "(estimated)" : ""}</li>
                  <li><b>Industry:</b> {selected.industry}</li>
                  <li><b>Contract length:</b> {selected.contractLengthMonths} months</li>
                  <li><b>Start date:</b> {selected.contractStartDate}</li>
                  <li><b>Estimated end date:</b> {selected.contractEndDate}</li>
                  <li><b>Deal type:</b> {selected.dealTypeDetail ?? selected.contractType}</li>
                  <li><b>Renewal rationale:</b> {selected.renewalRationale ?? "No external renewal/loss signal identified."}</li>
                </ul>
                <p className={sentimentClass(selected.mediaCoverageSentiment)}>
                  <b>Media coverage ({selected.mediaCoverageSentiment ?? "Neutral"}):</b> {selected.mediaCoverageSummary ?? "No additional media coverage identified yet."}
                </p>
                {selected.mediaCoverage && selected.mediaCoverage.length > 0 && (
                  <div className="coverageList">
                    {selected.mediaCoverage.map((coverage, idx) => (
                      <a
                        key={`${coverage.url}-${idx}`}
                        href={coverage.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`coverageItem ${sentimentClass(coverage.sentiment)}`}
                      >
                        [{coverage.sentiment}] {coverage.date} · {coverage.source} · {coverage.title}
                      </a>
                    ))}
                  </div>
                )}
              </section>
            )}
            <div className="drawerGrid">
              <span><b>Article Type:</b> {selected.informationType}</span>
              <span><b>Provider:</b> {selected.serviceProvider}</span>
              <span><b>Industry:</b> {selected.industry}</span>
              {selected.informationType === "Contracts" && <span><b>TCV:</b> {usd(selected.tcvUsd)} {selected.tcvEstimated ? "(est.)" : ""}</span>}
              {selected.informationType === "Contracts" && <span><b>Length:</b> {selected.contractLengthMonths} months</span>}
              {selected.informationType === "Contracts" && <span><b>End Date:</b> {selected.contractEndDate}</span>}
              <span><b>AI Confidence:</b> {(selected.aiConfidence * 100).toFixed(0)}%</span>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
