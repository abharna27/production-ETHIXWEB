import { useState, useEffect, useCallback } from "react";
import {
  AlertCircle,
  ArrowDownToLine,
  Database,
  Eye,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import type { LeadRecord } from "../server/db";

export function AdminPage() {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("ethix_admin_token") || null;
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Leads Data
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalLead, setActiveModalLead] = useState<LeadRecord | null>(null);
  const [dbStatus, setDbStatus] = useState<{ status: string; dbAlive: boolean } | null>(null);

  // Check backend health
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/health");
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        setDbStatus(data);
      } else {
        setDbStatus({ status: "offline", dbAlive: false });
      }
    } catch {
      setDbStatus({ status: "offline", dbAlive: false });
    }
  }, []);

  // Fetch leads from Neon PostgreSQL
  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLoadingLeads(true);
    try {
      let url = "/api/leads";
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-admin-key": passcode || token,
        },
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        return;
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      } else if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("ethix_admin_token");
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  }, [token, passcode, statusFilter, searchQuery]);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token, fetchLeads]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = {};
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(
          res.status >= 500
            ? "Server is currently initializing or updating. Please try again shortly."
            : `Server returned status ${res.status}`
        );
      }

      if (res.ok && data.success) {
        setToken(data.token);
        sessionStorage.setItem("ethix_admin_token", data.token);
      } else {
        setAuthError(data.message || data.error || "Invalid passcode");
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to reach backend server");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("ethix_admin_token");
  };

  // Update Status
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-admin-key": passcode || token || "",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
        if (activeModalLead && activeModalLead.id === id) {
          setActiveModalLead({ ...activeModalLead, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: number) => {
    if (!confirm(`Are you sure you want to delete lead #${id}?`)) return;

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-admin-key": passcode || token || "",
        },
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (activeModalLead && activeModalLead.id === id) {
          setActiveModalLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Website",
      "Services",
      "Budget",
      "Timing",
      "Status",
      "Country",
      "Created At",
      "Description",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.website || "").replace(/"/g, '""')}"`,
      `"${(l.services || "").replace(/"/g, '""')}"`,
      `"${(l.budget || "").replace(/"/g, '""')}"`,
      `"${(l.timing || "").replace(/"/g, '""')}"`,
      l.status,
      `"${(l.country || "").replace(/"/g, '""')}"`,
      `"${l.created_at}"`,
      `"${(l.description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ethixweb_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPI Counts
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const qualifiedCount = leads.filter((l) => l.status === "qualified").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name?.toLowerCase().includes(q);
      const matchEmail = lead.email?.toLowerCase().includes(q);
      const matchCompany = lead.company?.toLowerCase().includes(q);
      const matchPhone = lead.phone?.toLowerCase().includes(q);
      const matchService = lead.services?.toLowerCase().includes(q);
      return matchName || matchEmail || matchCompany || matchPhone || matchService;
    }
    return true;
  });

  // Locked Gate Screen
  if (!token) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-paper">
        <div className="w-full max-w-md rounded-3xl border border-line bg-paper-2/60 p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-accent">
            <Shield className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              PROTECTED ADMIN AREA
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-ink">
            Ethixweb Lead Operations
          </h1>
          <p className="mt-2 text-xs text-ink-2 leading-relaxed">
            Enter the administrative security passkey to view and manage prospective client briefs saved to the Neon PostgreSQL database.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-steel mb-2">
                Security Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: ethix2026admin)"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 pl-10 text-sm font-mono text-ink placeholder:text-steel/50 focus:border-accent focus:outline-hidden"
                />
                <Lock className="h-4 w-4 text-steel absolute left-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-xs font-mono text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-primary w-full justify-center h-12 text-xs font-bold tracking-wider uppercase mt-4"
            >
              <span>{authLoading ? "Verifying..." : "Unlock Dashboard"}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11px] font-mono text-steel">
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-accent" />
              <span>Neon PostgreSQL</span>
            </span>
            <span>Default: ethix2026admin</span>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked Dashboard
  return (
    <div className="pt-24 pb-32">
      <div className="shell frame relative pt-8 pb-12 border-b border-line">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="measure text-steel flex items-center gap-2 mb-2">
              <span className="text-accent font-bold font-mono text-xs">ADMIN // 01</span>
              <span className="h-px w-6 bg-line" />
              <span className="font-mono text-xs uppercase tracking-widest">
                LEAD TELEMETRY &amp; OPERATIONS
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
              Inquiries &amp; Pipeline Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* DB Health Pill */}
            <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-mono text-steel">
              <span className={`h-2 w-2 rounded-full ${dbStatus?.dbAlive !== false ? "bg-emerald-500 animate-ping" : "bg-red-500"}`} />
              <span>{dbStatus?.dbAlive !== false ? "Neon DB Connected" : "Neon DB Offline"}</span>
            </div>

            <button
              type="button"
              onClick={handleExportCsv}
              className="btn btn-secondary h-10 px-4 text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer"
              title="Download CSV"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={fetchLeads}
              disabled={loadingLeads}
              className="btn btn-secondary h-10 px-3 text-xs font-mono font-medium cursor-pointer"
              title="Refresh leads"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingLeads ? "animate-spin" : ""}`} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-mono text-steel hover:text-accent px-3 py-1.5 rounded-lg border border-line cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="rounded-xl border border-line bg-paper-2/40 p-4">
            <span className="text-[10px] font-mono text-steel uppercase block">Total Inquiries</span>
            <span className="font-display font-black text-2xl text-ink">{totalCount}</span>
          </div>
          <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
            <span className="text-[10px] font-mono text-accent uppercase block font-bold">New</span>
            <span className="font-display font-black text-2xl text-accent">{newCount}</span>
          </div>
          <div className="rounded-xl border border-line bg-paper-2/40 p-4">
            <span className="text-[10px] font-mono text-steel uppercase block">Contacted</span>
            <span className="font-display font-black text-2xl text-ink">{contactedCount}</span>
          </div>
          <div className="rounded-xl border border-line bg-paper-2/40 p-4">
            <span className="text-[10px] font-mono text-steel uppercase block">Qualified</span>
            <span className="font-display font-black text-2xl text-ink">{qualifiedCount}</span>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <span className="text-[10px] font-mono text-emerald-600 uppercase block font-bold">Closed</span>
            <span className="font-display font-black text-2xl text-emerald-600">{closedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="shell frame relative py-6 border-b border-line bg-paper sticky top-[var(--nav-h)] z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["all", "new", "contacted", "qualified", "closed", "archived"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-ink text-paper font-bold shadow-xs"
                    : "text-steel hover:text-ink hover:bg-paper-2"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company..."
              className="w-full rounded-full border border-line bg-paper-2/60 px-4 py-1.5 pl-9 text-xs font-mono text-ink placeholder:text-steel/50 focus:border-accent focus:outline-hidden"
            />
            <Search className="h-3.5 w-3.5 text-steel absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="shell frame relative py-8">
        {loadingLeads ? (
          <div className="py-20 text-center font-mono text-sm text-steel flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin text-accent" />
            <span>Fetching inquiries from Neon database...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center font-mono text-sm text-steel rounded-2xl border border-dashed border-line p-8">
            <p>No leads matching the current filter or search criteria.</p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-accent hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-paper overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-line bg-paper-2/70 font-mono text-[11px] text-steel uppercase">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Company &amp; Web</th>
                    <th className="py-3 px-4">Services Scope</th>
                    <th className="py-3 px-4">Budget &amp; Timing</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-paper-2/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-accent">
                        #{lead.id}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-display font-bold text-sm text-ink">{lead.name}</div>
                        <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-steel">
                          <a
                            href={`mailto:${lead.email}`}
                            className="hover:text-accent transition-colors flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </a>
                        </div>
                        <div className="font-mono text-[11px] text-steel flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" />
                          <a href={`tel:${lead.phone}`} className="hover:text-accent">
                            {lead.phone}
                          </a>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px]">
                        <div className="font-bold text-ink">{lead.company || "—"}</div>
                        {lead.website ? (
                          <a
                            href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <span>{lead.website.replace(/^https?:\/\//, "")}</span>
                          </a>
                        ) : (
                          <span className="text-steel">No website</span>
                        )}
                        <span className="text-[10px] text-steel block mt-0.5">{lead.country}</span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="max-w-[200px] flex flex-wrap gap-1">
                          {(lead.services || "General")
                            .split(",")
                            .slice(0, 3)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-paper-2 px-2 py-0.5 text-[10px] font-mono text-steel truncate"
                              >
                                {s.trim()}
                              </span>
                            ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px]">
                        <div className="font-semibold text-ink">{lead.budget || "Flexible"}</div>
                        <div className="text-steel text-[10px] mt-0.5">{lead.timing || "Standard"}</div>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-mono font-bold uppercase cursor-pointer border ${
                            lead.status === "new"
                              ? "bg-accent/10 border-accent text-accent"
                              : lead.status === "contacted"
                              ? "bg-blue-500/10 border-blue-500 text-blue-600"
                              : lead.status === "qualified"
                              ? "bg-purple-500/10 border-purple-500 text-purple-600"
                              : lead.status === "closed"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600"
                              : "bg-neutral-200 border-neutral-300 text-neutral-600"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-steel whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveModalLead(lead)}
                          className="p-1.5 rounded-lg border border-line text-steel hover:text-ink hover:border-ink cursor-pointer"
                          title="View lead brief"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg border border-line text-steel hover:text-red-500 hover:border-red-500 cursor-pointer"
                          title="Delete lead"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {activeModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl border border-line bg-paper p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-line">
              <div>
                <span className="font-mono text-xs text-accent font-bold">
                  INQUIRY SPECIFICATION #{activeModalLead.id}
                </span>
                <h3 className="font-display font-bold text-2xl text-ink mt-1">
                  {activeModalLead.name}
                </h3>
                <p className="text-xs text-steel font-mono">
                  {activeModalLead.company || "Independent"} · {activeModalLead.country}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalLead(null)}
                className="p-1.5 rounded-full border border-line text-steel hover:text-ink cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-xl border border-line bg-paper-2 p-3">
                <span className="text-steel block text-[10px] uppercase">Email</span>
                <a
                  href={`mailto:${activeModalLead.email}`}
                  className="font-bold text-accent hover:underline flex items-center gap-1 mt-1 truncate"
                >
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">{activeModalLead.email}</span>
                </a>
              </div>
              <div className="rounded-xl border border-line bg-paper-2 p-3">
                <span className="text-steel block text-[10px] uppercase">Phone</span>
                <a
                  href={`tel:${activeModalLead.phone}`}
                  className="font-bold text-accent hover:underline flex items-center gap-1 mt-1 truncate"
                >
                  <Phone className="h-3 w-3 shrink-0" />
                  <span className="truncate">{activeModalLead.phone}</span>
                </a>
              </div>
            </div>

            {/* Project Scope & Specs */}
            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-steel block text-[10px] uppercase mb-1">Requested Services</span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeModalLead.services || "General").split(",").map((s, i) => (
                    <span key={i} className="rounded-full border border-line bg-paper-2 px-3 py-1 font-semibold text-ink">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-steel block text-[10px] uppercase">Budget Bracket</span>
                  <p className="font-bold text-ink mt-0.5">{activeModalLead.budget || "Not specified"}</p>
                </div>
                <div>
                  <span className="text-steel block text-[10px] uppercase">Target Timeline</span>
                  <p className="font-bold text-ink mt-0.5">{activeModalLead.timing || "Standard"}</p>
                </div>
              </div>

              <div>
                <span className="text-steel block text-[10px] uppercase mb-1">Project Description / Brief</span>
                <div className="rounded-xl border border-line bg-paper-2/60 p-4 font-sans text-sm text-ink-2 leading-relaxed whitespace-pre-wrap">
                  {activeModalLead.description || "No additional description provided."}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-steel">Status:</span>
                <select
                  value={activeModalLead.status}
                  onChange={(e) => handleUpdateStatus(activeModalLead.id, e.target.value)}
                  className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-mono font-bold"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteLead(activeModalLead.id)}
                className="text-xs font-mono text-red-500 hover:underline cursor-pointer"
              >
                Delete this lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
