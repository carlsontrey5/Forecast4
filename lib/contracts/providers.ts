export const knownProviders = [
  "Accenture",
  "Cognizant",
  "Infosys",
  "TCS",
  "Wipro",
  "HCLTech",
  "Capgemini",
  "IBM",
  "DXC",
  "NTT DATA",
  "Genpact",
  "EXL",
] as const;

const invalidProviderTokens = new Set([
  "full-year",
  "full",
  "year",
  "full year",
  "half-year",
  "half",
  "quarterly",
  "quarter",
  "annual",
  "results",
  "result",
  "q1",
  "q2",
  "q3",
  "q4",
  "fy",
  "h1",
  "h2",
]);

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function looksInvalidProvider(candidate: string): boolean {
  const normalized = normalize(candidate).replace(/[():,]/g, " ");
  if (!normalized) return true;
  if (invalidProviderTokens.has(normalized)) return true;

  const first = normalized.split(" ")[0];
  if (invalidProviderTokens.has(first)) return true;

  if (/^(?:q[1-4]|fy\d{2,4}|h[1-2]\d{0,4}|\d{4})$/i.test(first)) return true;
  if (!/[a-z]/i.test(normalized)) return true;

  return false;
}

function containsProvider(text: string): string | null {
  const t = normalize(text);
  for (const provider of knownProviders) {
    const pattern = new RegExp(`\\b${provider.replace(/\s+/g, "\\s+")}\\b`, "i");
    if (pattern.test(t)) return provider;
  }
  return null;
}

function providerFromSource(source?: string): string | null {
  if (!source) return null;
  const m = source.match(/^InvestorRelations:(.+)$/i);
  if (m?.[1]) {
    const p = m[1].trim();
    if (looksInvalidProvider(p)) return null;
    const match = containsProvider(p);
    return match ?? p;
  }
  return null;
}

function providerFromInvestorTag(text?: string): string | null {
  if (!text) return null;
  const m = text.match(/InvestorRelations:([A-Za-z][A-Za-z0-9 .&-]{1,40})/i);
  if (!m?.[1]) return null;
  const p = m[1].trim();
  if (looksInvalidProvider(p)) return null;
  return containsProvider(p) ?? p;
}

function providerFromUrl(url?: string): string | null {
  if (!url) return null;
  const lowered = url.toLowerCase();
  if (lowered.includes("accenture")) return "Accenture";
  if (lowered.includes("cognizant")) return "Cognizant";
  if (lowered.includes("infosys")) return "Infosys";
  if (lowered.includes("tcs")) return "TCS";
  if (lowered.includes("wipro")) return "Wipro";
  if (lowered.includes("hcltech") || lowered.includes("hcl")) return "HCLTech";
  if (lowered.includes("capgemini")) return "Capgemini";
  if (lowered.includes("ibm")) return "IBM";
  if (lowered.includes("dxc")) return "DXC";
  if (lowered.includes("nttdata") || lowered.includes("ntt-data")) return "NTT DATA";
  if (lowered.includes("genpact")) return "Genpact";
  if (lowered.includes("exlservice") || lowered.includes("exl")) return "EXL";
  return null;
}

function providerFromLeadingWords(title?: string): string | null {
  if (!title) return null;
  const m = title.match(/^([A-Za-z][A-Za-z0-9&.\- ]{1,40})\s+(?:reports|reported|announces|announced|acquires|acquired|launches|launched|partners|partnered|signs|signed|wins|won|secures|secured)\b/i);
  if (!m?.[1]) return null;
  const candidate = m[1].trim();
  const known = containsProvider(candidate);
  if (known) return known;
  if (looksInvalidProvider(candidate)) return null;
  return candidate;
}

export function detectProvider(params: { title?: string; body?: string; source?: string; articleUrl?: string; fallback?: string }): string {
  const fromSource = providerFromSource(params.source);
  if (fromSource) return fromSource;

  const fromSourceTag = providerFromInvestorTag(params.source);
  if (fromSourceTag) return fromSourceTag;

  const fromTitleTag = providerFromInvestorTag(params.title);
  if (fromTitleTag) return fromTitleTag;

  const fromBodyTag = providerFromInvestorTag(params.body);
  if (fromBodyTag) return fromBodyTag;

  const fromUrl = providerFromUrl(params.articleUrl);
  if (fromUrl) return fromUrl;

  const fromTitleKnown = containsProvider(params.title ?? "");
  if (fromTitleKnown) return fromTitleKnown;

  const fromBodyKnown = containsProvider(params.body ?? "");
  if (fromBodyKnown) return fromBodyKnown;

  const fromLeading = providerFromLeadingWords(params.title);
  if (fromLeading) return fromLeading;

  const fallback = params.fallback?.trim();
  if (fallback && !looksInvalidProvider(fallback)) return fallback;
  return "Unknown Provider";
}

export function titleWithProvider(provider: string, title: string): string {
  const p = provider.trim();
  const t = title.trim();
  if (!p || p === "Unknown Provider") return t;
  if (new RegExp(`\\b${p.replace(/\s+/g, "\\s+")}\\b`, "i").test(t)) return t;
  return `${p}: ${t}`;
}
