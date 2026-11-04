export default function UPIQArchitecture() {
    const dashboardModules = [
        ["01", "Financial Dashboard", "Overview of financial activity"],
        ["02", "Transaction Views", "Browse statement transactions"],
        ["03", "Expense Summaries", "Review spending breakdowns"],
        ["04", "Spending Analytics", "Understand spending patterns"],
    ];

    return (
        <section className="upiq-architecture">
            <style>{`
        .upiq-architecture {
          --ua-panel: #111111;
          --ua-border: #292929;
          --ua-muted: #858585;
          --ua-accent: #8294a8;
          width: 100%;
          margin: 2.5rem 0;
          padding: clamp(18px, 4vw, 30px);
          overflow: hidden;
          border: 1px solid #252525;
          border-radius: 16px;
          background: #080808;
          color: #fff;
          box-sizing: border-box;
        }
        .upiq-architecture * { box-sizing: border-box; }
        .ua-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px; margin-bottom: 32px;
        }
        .ua-eyebrow, .ua-layer-label {
          color: #737373; font-family: monospace; font-size: 10px;
          letter-spacing: .16em; text-transform: uppercase;
        }
        .ua-heading {
          margin-top: 8px; font-size: clamp(18px, 3vw, 22px);
          font-weight: 600; letter-spacing: -.04em;
        }
        .ua-subtitle { margin-top: 5px; color: var(--ua-muted); font-size: 12px; }
        .ua-status {
          flex-shrink: 0; padding: 7px 10px; border: 1px solid #333;
          border-radius: 999px; color: #aaa; font-family: monospace;
          font-size: 9px; letter-spacing: .08em;
        }
        .ua-flow { width: 100%; max-width: 620px; margin: 0 auto; }
        .ua-layer-label { margin-bottom: 10px; text-align: center; }
        .ua-node {
          min-width: 0; padding: 15px 17px; border: 1px solid var(--ua-border);
          border-radius: 11px; background: var(--ua-panel);
          transition: border-color .2s ease, background .2s ease, transform .2s ease;
        }
        .ua-node:hover {
          transform: translateY(-2px); border-color: #52647a; background: #151515;
        }
        .ua-node-title { font-size: 13px; font-weight: 600; line-height: 1.4; }
        .ua-node-detail { margin-top: 4px; color: var(--ua-muted); font-size: 10px; line-height: 1.5; }
        .ua-icon {
          display: grid; width: 38px; height: 38px; flex-shrink: 0;
          place-items: center; border: 1px solid #303943; border-radius: 9px;
          background: #1b222a; color: #bdcad8; font-size: 15px; font-weight: 600;
        }
        .ua-node-row { display: flex; align-items: center; gap: 13px; }
        .ua-tag {
          flex-shrink: 0; padding: 5px 8px; border: 1px solid #333;
          border-radius: 5px; color: #aab9c9; font-family: monospace; font-size: 9px;
        }
        .ua-connector {
          display: flex; min-height: 54px; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px; color: var(--ua-accent);
        }
        .ua-connector-line {
          width: 1px; height: 19px;
          background: linear-gradient(to bottom, #343434, #8294a8);
        }
        .ua-connector-label { font-family: monospace; font-size: 9px; letter-spacing: .12em; }
        .ua-arrow { font-size: 14px; line-height: 1; }
        .ua-module-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px;
        }
        .ua-module { padding: 12px; }
        .ua-module-number { margin-bottom: 8px; color: #8294a8; font-family: monospace; font-size: 9px; }
        .ua-processing {
          padding: 17px; border: 1px solid #394655; border-radius: 12px; background: #101214;
        }
        .ua-processing-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 14px;
        }
        .ua-data-note {
          margin-top: 12px; padding: 13px 14px; border: 1px solid #303943;
          border-radius: 10px; background: #111820;
        }
        .ua-footer {
          display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;
          margin-top: 27px; padding-top: 14px; border-top: 1px solid #252525;
          color: #626262; font-family: monospace; font-size: 9px; letter-spacing: .08em;
        }
        @media (max-width: 480px) {
          .ua-header { align-items: flex-start; flex-direction: column; margin-bottom: 25px; }
          .ua-status { align-self: flex-start; }
          .ua-node { padding: 12px; }
          .ua-processing { padding: 12px; }
          .ua-footer { flex-direction: column; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ua-node { transition: none; }
          .ua-node:hover { transform: none; }
        }
      `}</style>

            <header className="ua-header">
                <div>
                    <div className="ua-eyebrow">System Design / 02</div>
                    <div className="ua-heading">Application Architecture</div>
                    <div className="ua-subtitle">UPIQ · Statement-based expense tracking</div>
                </div>
                <div className="ua-status">FINANCE DASHBOARD</div>
            </header>

            <div className="ua-flow">
                <div className="ua-layer-label">01 — Data Input</div>
                <div className="ua-node ua-node-row">
                    <div className="ua-icon">PDF</div>
                    <div>
                        <div className="ua-node-title">Bank Statement Documents</div>
                        <div className="ua-node-detail">User-provided statement PDFs</div>
                    </div>
                    <div className="ua-tag" style={{ marginLeft: "auto" }}>INPUT</div>
                </div>

                <div className="ua-connector">
                    <div className="ua-connector-line" />
                    <div className="ua-connector-label">DOCUMENT SUBMISSION</div>
                    <div className="ua-arrow">↓</div>
                </div>

                <div className="ua-layer-label">02 — Presentation Layer</div>
                <div className="ua-node ua-node-row">
                    <div className="ua-icon">R</div>
                    <div style={{ minWidth: 0 }}>
                        <div className="ua-node-title">React Frontend</div>
                        <div className="ua-node-detail">Dashboard · Transaction navigation · Financial insights</div>
                    </div>
                    <div className="ua-tag" style={{ marginLeft: "auto" }}>FRONTEND</div>
                </div>

                <div className="ua-connector">
                    <div className="ua-connector-line" />
                    <div className="ua-connector-label">REST API</div>
                    <div className="ua-arrow">↓</div>
                </div>

                <div className="ua-layer-label">03 — Application Layer</div>
                <div className="ua-processing">
                    <div className="ua-processing-head">
                        <div>
                            <div className="ua-node-title">Application API</div>
                            <div className="ua-node-detail">Application data & statement-processing workflow</div>
                        </div>
                        <div className="ua-tag">API</div>
                    </div>
                    <div style={{ height: 1, background: "#292d31", marginBottom: 13 }} />
                    <div className="ua-module-grid">
                        {dashboardModules.map(([number, title, detail]) => (
                            <div className="ua-node ua-module" key={number}>
                                <div className="ua-module-number">FUNCTION / {number}</div>
                                <div className="ua-node-title">{title}</div>
                                <div className="ua-node-detail">{detail}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ua-connector">
                    <div className="ua-connector-line" />
                    <div className="ua-connector-label">PROCESSED FINANCIAL DATA</div>
                    <div className="ua-arrow">↓</div>
                </div>

                <div className="ua-layer-label">04 — Finance Dashboard</div>
                <div className="ua-node">
                    <div className="ua-node-title">Unified Financial View</div>
                    <div className="ua-node-detail">
                        Transaction records, expense summaries and spending patterns presented in one interface.
                    </div>
                    <div className="ua-module-grid" style={{ marginTop: 13 }}>
                        {["Transactions", "Expense summaries", "Spending patterns", "Financial overview"].map((item) => (
                            <div key={item} style={{
                                padding: "9px 10px", border: "1px solid #292929",
                                borderRadius: 7, color: "#b5b5b5", fontSize: 10
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ua-data-note">
                    <div className="ua-node-title">Statement-based workflow</div>
                    <div className="ua-node-detail">
                        Users provide bank statement PDFs rather than manually recording each expense or connecting banking credentials through an aggregation service.
                    </div>
                </div>
            </div>

            <footer className="ua-footer">
                <span>UPIQ / SYSTEM ARCHITECTURE</span>
                <span>REACT · JAVASCRIPT · TAILWIND · REST API</span>
            </footer>
        </section>
    );
}
