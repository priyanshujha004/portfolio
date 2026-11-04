
export default function MedoraArchitecture() {
    const modules = [
        {
            number: "01",
            title: "Authentication",
            detail: "JWT · Role-based access",
        },
        {
            number: "02",
            title: "Doctor Discovery",
            detail: "Search · Availability",
        },
        {
            number: "03",
            title: "Appointment Booking",
            detail: "Slot reservation",
        },
        {
            number: "04",
            title: "Lifecycle Management",
            detail: "Approve · Reject · Complete",
        },
    ];

    return (
        <section className="medora-architecture">
            <style>{`
        .medora-architecture {
          --ma-bg: #080808;
          --ma-panel: #111111;
          --ma-border: #292929;
          --ma-muted: #858585;
          --ma-accent: #8294a8;
          width: 100%;
          margin: 2.5rem 0;
          padding: clamp(18px, 4vw, 30px);
          overflow: hidden;
          border: 1px solid #252525;
          border-radius: 16px;
          background: var(--ma-bg);
          color: #fff;
          box-sizing: border-box;
        }

        .medora-architecture * {
          box-sizing: border-box;
        }

        .ma-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
        }

        .ma-eyebrow, .ma-layer-label {
          color: #737373;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .ma-heading {
          margin-top: 8px;
          font-size: clamp(18px, 3vw, 22px);
          font-weight: 600;
          letter-spacing: -.04em;
        }

        .ma-subtitle {
          margin-top: 5px;
          color: var(--ma-muted);
          font-size: 12px;
        }

        .ma-status {
          flex-shrink: 0;
          padding: 7px 10px;
          border: 1px solid #333;
          border-radius: 999px;
          color: #aaa;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: .08em;
        }

        .ma-flow {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
        }

        .ma-layer-label {
          margin-bottom: 10px;
          text-align: center;
        }

        .ma-node {
          min-width: 0;
          padding: 15px 17px;
          border: 1px solid var(--ma-border);
          border-radius: 11px;
          background: var(--ma-panel);
          transition: border-color .2s ease, background .2s ease,
            transform .2s ease;
        }

        .ma-node:hover {
          transform: translateY(-2px);
          border-color: #52647a;
          background: #151515;
        }

        .ma-user-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .ma-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ma-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #303943;
          border-radius: 9px;
          background: #1b222a;
          color: #bdcad8;
          font-size: 15px;
          font-weight: 600;
        }

        .ma-node-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
        }

        .ma-node-detail {
          margin-top: 4px;
          color: var(--ma-muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .ma-connector {
          display: flex;
          min-height: 54px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          color: var(--ma-accent);
        }

        .ma-connector-line {
          width: 1px;
          height: 19px;
          background: linear-gradient(to bottom, #343434, #8294a8);
        }

        .ma-connector-label {
          font-family: monospace;
          font-size: 9px;
          letter-spacing: .12em;
        }

        .ma-arrow {
          font-size: 14px;
          line-height: 1;
        }

        .ma-frontend {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .ma-frontend-main {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 13px;
        }

        .ma-tag {
          flex-shrink: 0;
          padding: 5px 8px;
          border: 1px solid #333;
          border-radius: 5px;
          color: #aab9c9;
          font-family: monospace;
          font-size: 9px;
        }

        .ma-backend {
          padding: 17px;
          border: 1px solid #394655;
          border-radius: 12px;
          background: #101214;
        }

        .ma-backend-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 15px;
        }

        .ma-backend-divider {
          height: 1px;
          margin-bottom: 13px;
          background: #292d31;
        }

        .ma-module-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        .ma-module {
          padding: 12px;
        }

        .ma-module-number {
          margin-bottom: 8px;
          color: #8294a8;
          font-family: monospace;
          font-size: 9px;
        }

        .ma-data-node {
          text-align: center;
        }

        .ma-data-node .ma-node-detail {
          margin-top: 5px;
        }

        .ma-booking-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 12px;
          padding: 14px;
          border: 1px solid #303943;
          border-radius: 10px;
          background: #111820;
        }

        .ma-booking-note .ma-icon {
          width: 32px;
          height: 32px;
        }

        .ma-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 8px;
          margin-top: 27px;
          padding-top: 14px;
          border-top: 1px solid #252525;
          color: #626262;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: .08em;
        }

        @media (max-width: 480px) {
          .ma-header {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 25px;
          }

          .ma-status {
            align-self: flex-start;
          }

          .ma-node {
            padding: 12px;
          }

          .ma-user {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .ma-frontend {
            align-items: flex-start;
            flex-direction: column;
          }

          .ma-backend {
            padding: 12px;
          }

          .ma-module {
            padding: 10px;
          }

          .ma-footer {
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ma-node {
            transition: none;
          }
          .ma-node:hover {
            transform: none;
          }
        }
      `}</style>

            <header className="ma-header">
                <div>
                    <div className="ma-eyebrow">System Design / 01</div>
                    <div className="ma-heading">Application Architecture</div>
                    <div className="ma-subtitle">
                        Medora · Full-stack appointment management
                    </div>
                </div>
                <div className="ma-status">PRODUCTION SYSTEM</div>
            </header>

            <div className="ma-flow">
                {/* User layer */}
                <div className="ma-layer-label">01 — User Interfaces</div>

                <div className="ma-user-grid">
                    <div className="ma-node ma-user">
                        <div className="ma-icon">P</div>
                        <div>
                            <div className="ma-node-title">Patient</div>
                            <div className="ma-node-detail">Discover · Book</div>
                        </div>
                    </div>

                    <div className="ma-node ma-user">
                        <div className="ma-icon">D</div>
                        <div>
                            <div className="ma-node-title">Doctor</div>
                            <div className="ma-node-detail">Manage · Approve</div>
                        </div>
                    </div>
                </div>

                <div className="ma-connector">
                    <div className="ma-connector-line" />
                    <div className="ma-connector-label">HTTPS / REST API</div>
                    <div className="ma-arrow">↓</div>
                </div>

                {/* Frontend */}
                <div className="ma-layer-label">02 — Presentation Layer</div>

                <div className="ma-node ma-frontend">
                    <div className="ma-frontend-main">
                        <div className="ma-icon">R</div>
                        <div>
                            <div className="ma-node-title">React.js</div>
                            <div className="ma-node-detail">
                                Role-based dashboards · Application UI
                            </div>
                        </div>
                    </div>
                    <div className="ma-tag">FRONTEND</div>
                </div>

                <div className="ma-connector">
                    <div className="ma-connector-line" />
                    <div className="ma-connector-label">API COMMUNICATION</div>
                    <div className="ma-arrow">↓</div>
                </div>

                {/* Backend */}
                <div className="ma-layer-label">03 — Application Layer</div>

                <div className="ma-backend">
                    <div className="ma-backend-header">
                        <div>
                            <div className="ma-node-title">Node.js + Express</div>
                            <div className="ma-node-detail">
                                API routing · Business logic
                            </div>
                        </div>
                        <div className="ma-tag">BACKEND</div>
                    </div>

                    <div className="ma-backend-divider" />

                    <div className="ma-module-grid">
                        {modules.map((module) => (
                            <div className="ma-node ma-module" key={module.number}>
                                <div className="ma-module-number">
                                    MODULE / {module.number}
                                </div>
                                <div className="ma-node-title">{module.title}</div>
                                <div className="ma-node-detail">{module.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ma-connector">
                    <div className="ma-connector-line" />
                    <div className="ma-connector-label">DATABASE ACCESS</div>
                    <div className="ma-arrow">↓</div>
                </div>

                {/* Data layer */}
                <div className="ma-layer-label">04 — Data Layer</div>

                <div className="ma-node ma-data-node">
                    <div className="ma-node-title">Prisma ORM</div>
                    <div className="ma-node-detail">
                        Database queries · Transaction management
                    </div>

                    <div className="ma-connector">
                        <div className="ma-connector-line" />
                        <div className="ma-arrow">↓</div>
                    </div>

                    <div className="ma-node-title">PostgreSQL</div>
                    <div className="ma-node-detail">
                        Relational database
                    </div>
                </div>

                {/* Booking consistency */}
                <div className="ma-booking-note">
                    <div className="ma-icon">↔</div>
                    <div>
                        <div className="ma-node-title">
                            Transaction-protected booking
                        </div>
                        <div className="ma-node-detail">
                            Database transactions help maintain consistency across
                            appointment booking operations and prevent conflicting
                            reservations when supported by the relevant database
                            constraints.
                        </div>
                    </div>
                </div>
            </div>

            <footer className="ma-footer">
                <span>MEDORA / SYSTEM ARCHITECTURE</span>
                <span>REACT · EXPRESS · PRISMA · POSTGRESQL</span>
            </footer>
        </section>
    );
}
