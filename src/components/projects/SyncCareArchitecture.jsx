export default function SyncCareArchitecture() {
    const modules = [
        {
            number: "01",
            title: "Disease Prediction",
            detail: "Random Forest classifier",
            status: "IMPLEMENTED",
            planned: false,
        },
        {
            number: "02",
            title: "Medical RAG",
            detail: "NLP · Retrieval · LLM",
            status: "PLANNED",
            planned: true,
        },
        {
            number: "03",
            title: "Prescription OCR",
            detail: "Image processing · Text extraction",
            status: "PLANNED",
            planned: true,
        },
    ];

    const workflows = [
        "Patient records",
        "Appointments",
        "Prescriptions",
        "Medication reminders",
    ];

    return (
        <section className="synccare-architecture">
            <style>{`
        .synccare-architecture {
          --sa-panel: #111111;
          --sa-border: #292929;
          --sa-muted: #858585;
          --sa-accent: #8294a8;
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
        .synccare-architecture * { box-sizing: border-box; }
        .sa-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px; margin-bottom: 32px;
        }
        .sa-eyebrow, .sa-layer-label {
          color: #737373; font-family: monospace; font-size: 10px;
          letter-spacing: .16em; text-transform: uppercase;
        }
        .sa-heading {
          margin-top: 8px; font-size: clamp(18px, 3vw, 22px);
          font-weight: 600; letter-spacing: -.04em;
        }
        .sa-subtitle { margin-top: 5px; color: var(--sa-muted); font-size: 12px; }
        .sa-status {
          flex-shrink: 0; padding: 7px 10px; border: 1px solid #333;
          border-radius: 999px; color: #aaa; font-family: monospace;
          font-size: 9px; letter-spacing: .08em;
        }
        .sa-flow { width: 100%; max-width: 680px; margin: 0 auto; }
        .sa-layer-label { margin-bottom: 10px; text-align: center; }
        .sa-node {
          min-width: 0; padding: 15px 17px; border: 1px solid var(--sa-border);
          border-radius: 11px; background: var(--sa-panel);
          transition: border-color .2s ease, background .2s ease, transform .2s ease;
        }
        .sa-node:hover {
          transform: translateY(-2px); border-color: #52647a; background: #151515;
        }
        .sa-node-title { font-size: 13px; font-weight: 600; line-height: 1.4; }
        .sa-node-detail { margin-top: 4px; color: var(--sa-muted); font-size: 10px; line-height: 1.5; }
        .sa-icon {
          display: grid; width: 38px; height: 38px; flex-shrink: 0;
          place-items: center; border: 1px solid #303943; border-radius: 9px;
          background: #1b222a; color: #bdcad8; font-size: 15px; font-weight: 600;
        }
        .sa-user-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px;
        }
        .sa-user { display: flex; align-items: center; gap: 12px; }
        .sa-tag {
          flex-shrink: 0; padding: 5px 8px; border: 1px solid #333;
          border-radius: 5px; color: #aab9c9; font-family: monospace; font-size: 9px;
        }
        .sa-connector {
          display: flex; min-height: 54px; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px; color: var(--sa-accent);
        }
        .sa-connector-line {
          width: 1px; height: 19px;
          background: linear-gradient(to bottom, #343434, #8294a8);
        }
        .sa-connector-label { font-family: monospace; font-size: 9px; letter-spacing: .12em; }
        .sa-arrow { font-size: 14px; line-height: 1; }
        .sa-backend {
          padding: 17px; border: 1px solid #394655; border-radius: 12px; background: #101214;
        }
        .sa-backend-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 14px;
        }
        .sa-divider { height: 1px; margin-bottom: 13px; background: #292d31; }
        .sa-module-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px;
        }
        .sa-module { padding: 12px; }
        .sa-module-number {
          margin-bottom: 8px; color: #8294a8; font-family: monospace; font-size: 9px;
        }
        .sa-module-status {
          display: inline-block; margin-top: 10px; padding: 4px 6px;
          border: 1px solid #394655; border-radius: 4px;
          color: #aab9c9; font-family: monospace; font-size: 8px; letter-spacing: .04em;
        }
        .sa-module-status.planned {
          border-color: #4a4030; color: #c4ad83;
        }
        .sa-workflow-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;
        }
        .sa-workflow-item {
          padding: 10px; border: 1px solid #292929; border-radius: 7px;
          color: #b5b5b5; font-size: 10px;
        }
        .sa-storage {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 12px; align-items: stretch;
        }
        .sa-storage-card { text-align: center; }
        .sa-storage-planned {
          border-style: dashed; border-color: #4a4030;
        }
        .sa-legend {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 14px; margin-top: 15px;
        }
        .sa-legend-item {
          display: flex; align-items: center; gap: 7px;
          color: #858585; font-family: monospace; font-size: 9px;
        }
        .sa-dot { width: 7px; height: 7px; border-radius: 50%; background: #8294a8; }
        .sa-dot.planned { background: #b89a69; }
        .sa-note {
          margin-top: 13px; padding: 13px 14px; border: 1px solid #303943;
          border-radius: 10px; background: #111820;
        }
        .sa-footer {
          display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;
          margin-top: 27px; padding-top: 14px; border-top: 1px solid #252525;
          color: #626262; font-family: monospace; font-size: 9px; letter-spacing: .08em;
        }
        @media (max-width: 560px) {
          .sa-module-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .sa-header { align-items: flex-start; flex-direction: column; margin-bottom: 25px; }
          .sa-status { align-self: flex-start; }
          .sa-node { padding: 12px; }
          .sa-user { align-items: flex-start; flex-direction: column; gap: 8px; }
          .sa-backend { padding: 12px; }
          .sa-storage { grid-template-columns: 1fr; }
          .sa-footer { flex-direction: column; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-node { transition: none; }
          .sa-node:hover { transform: none; }
        }
      `}</style>

            <header className="sa-header">
                <div>
                    <div className="sa-eyebrow">System Design / 03</div>
                    <div className="sa-heading">Application Architecture</div>
                    <div className="sa-subtitle">SyncCare · AI-assisted healthcare platform</div>
                </div>
                <div className="sa-status">RESEARCH & DEVELOPMENT</div>
            </header>

            <div className="sa-flow">
                <div className="sa-layer-label">01 — User Interfaces</div>
                <div className="sa-user-grid">
                    <div className="sa-node sa-user">
                        <div className="sa-icon">P</div>
                        <div>
                            <div className="sa-node-title">Patient</div>
                            <div className="sa-node-detail">Health information · Records</div>
                        </div>
                    </div>
                    <div className="sa-node sa-user">
                        <div className="sa-icon">D</div>
                        <div>
                            <div className="sa-node-title">Doctor</div>
                            <div className="sa-node-detail">Appointments · Patient care</div>
                        </div>
                    </div>
                </div>

                <div className="sa-connector">
                    <div className="sa-connector-line" />
                    <div className="sa-connector-label">APPLICATION REQUESTS</div>
                    <div className="sa-arrow">↓</div>
                </div>

                <div className="sa-layer-label">02 — Presentation Layer</div>
                <div className="sa-node" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
                        <div className="sa-icon">R</div>
                        <div>
                            <div className="sa-node-title">React Frontend</div>
                            <div className="sa-node-detail">Patient & doctor application interfaces</div>
                        </div>
                    </div>
                    <div className="sa-tag">CLIENT</div>
                </div>

                <div className="sa-connector">
                    <div className="sa-connector-line" />
                    <div className="sa-connector-label">API COMMUNICATION</div>
                    <div className="sa-arrow">↓</div>
                </div>

                <div className="sa-layer-label">03 — Application Layer</div>
                <div className="sa-backend">
                    <div className="sa-backend-head">
                        <div>
                            <div className="sa-node-title">Node.js + Express</div>
                            <div className="sa-node-detail">Shared backend · Module orchestration</div>
                        </div>
                        <div className="sa-tag">BACKEND</div>
                    </div>
                    <div className="sa-divider" />
                    <div className="sa-module-grid">
                        {modules.map((module) => (
                            <div className="sa-node sa-module" key={module.number}>
                                <div className="sa-module-number">MODULE / {module.number}</div>
                                <div className="sa-node-title">{module.title}</div>
                                <div className="sa-node-detail">{module.detail}</div>
                                <div className={`sa-module-status${module.planned ? " planned" : ""}`}>
                                    {module.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sa-connector">
                    <div className="sa-connector-line" />
                    <div className="sa-connector-label">APPLICATION DATA FLOW</div>
                    <div className="sa-arrow">↓</div>
                </div>

                <div className="sa-layer-label">04 — Healthcare Workflows</div>
                <div className="sa-node">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <div className="sa-node-title">Patient & Doctor Management</div>
                        <div className="sa-module-status planned">PLANNED</div>
                    </div>
                    <div className="sa-workflow-grid">
                        {workflows.map((item) => (
                            <div className="sa-workflow-item" key={item}>{item}</div>
                        ))}
                    </div>
                </div>

                <div className="sa-connector">
                    <div className="sa-connector-line" />
                    <div className="sa-connector-label">PERSISTENCE & FILE STORAGE</div>
                    <div className="sa-arrow">↓</div>
                </div>

                <div className="sa-layer-label">05 — Data & Document Storage</div>
                <div className="sa-storage">
                    <div className="sa-node sa-storage-card">
                        <div className="sa-node-title">Prisma ORM</div>
                        <div className="sa-node-detail">Relational data access</div>
                        <div className="sa-connector" style={{ minHeight: 35 }}>
                            <div className="sa-connector-line" style={{ height: 12 }} />
                            <div className="sa-arrow">↓</div>
                        </div>
                        <div className="sa-node-title">MySQL</div>
                        <div className="sa-node-detail">Planned application database</div>
                        <div className="sa-module-status planned">PLANNED</div>
                    </div>

                    <div className="sa-node sa-storage-card sa-storage-planned">
                        <div className="sa-icon" style={{ margin: "0 auto 10px" }}>IMG</div>
                        <div className="sa-node-title">Cloudinary</div>
                        <div className="sa-node-detail">Prescription image storage</div>
                        <div className="sa-module-status planned">PLANNED</div>
                    </div>
                </div>

                <div className="sa-legend">
                    <div className="sa-legend-item"><span className="sa-dot" /> Implemented milestone</div>
                    <div className="sa-legend-item"><span className="sa-dot planned" /> Planned component</div>
                </div>

                <div className="sa-note">
                    <div className="sa-node-title">Current implementation boundary</div>
                    <div className="sa-node-detail">
                        Dataset preparation and Random Forest training are completed. Medical RAG,
                        prescription OCR, healthcare workflows, persistence integration and full-stack
                        integration remain planned or in progress.
                    </div>
                </div>
            </div>

            <footer className="sa-footer">
                <span>SYNCCARE / SYSTEM ARCHITECTURE</span>
                <span>REACT · NODE.JS · ML · NLP · OCR</span>
            </footer>
        </section>
    );
}
