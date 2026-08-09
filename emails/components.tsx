import type { ReactNode } from "react";

const colors = {
  navy: "#1a2e5e",
  green: "#2e7d5e",
  ink: "#10203a",
  text: "#334155",
  muted: "#64748b",
  line: "#dbe4f0",
  surface: "#f7f9fc",
  white: "#ffffff",
};

const pageStyle = {
  backgroundColor: colors.surface,
  fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: "32px 0",
};

const cardStyle = {
  backgroundColor: colors.white,
  border: `1px solid ${colors.line}`,
  borderRadius: "24px",
  boxShadow: "0 18px 48px rgba(16, 32, 58, 0.08)",
  overflow: "hidden",
};

const headerBarStyle = {
  background: `linear-gradient(135deg, ${colors.navy}, ${colors.green})`,
  color: colors.white,
  padding: "28px 32px",
};

const bodyStyle = {
  padding: "32px",
};

const footerStyle = {
  padding: "0 32px 32px",
};

const titleStyle = {
  color: colors.ink,
  fontSize: "28px",
  lineHeight: "36px",
  margin: "0 0 12px",
  fontWeight: 700,
};

const paragraphStyle = {
  color: colors.text,
  fontSize: "15px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const subtleStyle = {
  color: colors.muted,
  fontSize: "13px",
  lineHeight: "22px",
  margin: 0,
};

const buttonStyle = {
  backgroundColor: colors.green,
  borderRadius: "999px",
  color: colors.white,
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "20px",
  padding: "12px 20px",
  textDecoration: "none",
};

export function EmailShell({
  preview,
  title,
  intro,
  children,
  footer,
  action,
}: {
  preview: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  footer?: ReactNode;
  action?: {
    href: string;
    label: string;
  };
}) {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 16px" }}>
        <div style={cardStyle}>
          <div style={headerBarStyle}>
            <p
              style={{
                color: colors.white,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Merxano Consulting
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "14px",
                lineHeight: "22px",
                margin: "8px 0 0",
              }}
            >
              Tanzania-based professional training and consulting
            </p>
          </div>

          <div style={bodyStyle}>
            <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>{preview}</div>
            <h1 style={titleStyle}>{title}</h1>
            {intro ? <p style={paragraphStyle}>{intro}</p> : null}
            {children}
            {action ? (
              <div style={{ marginTop: "28px" }}>
                <a href={action.href} style={buttonStyle}>
                  {action.label}
                </a>
              </div>
            ) : null}
          </div>

          <hr style={{ borderColor: colors.line, margin: "0 32px" }} />

          <div style={footerStyle}>
            {footer ?? (
              <p style={subtleStyle}>
                Merxano Consulting, Dar es Salaam, Tanzania.
                <br />
                Questions? Reply to this email and our team will help.
              </p>
            )}
            <p style={{ ...subtleStyle, marginTop: "14px" }}>
              <a href="https://merxano.co.tz" style={{ color: colors.green, textDecoration: "none" }}>
                merxano.co.tz
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SummaryList({
  items,
}: {
  items: Array<{ label: string; value: ReactNode }>;
}) {
  return (
    <div
      style={{
        backgroundColor: "#f8fbff",
        border: `1px solid ${colors.line}`,
        borderRadius: "20px",
        padding: "20px 22px",
        marginTop: "20px",
      }}
    >
      {items.map((item, index) => (
        <div key={item.label} style={{ marginBottom: index === items.length - 1 ? 0 : "12px" }}>
          <p
            style={{
              color: colors.muted,
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              margin: "0 0 4px",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </p>
          <p style={{ color: colors.ink, fontSize: "14px", lineHeight: "22px", margin: 0 }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SoftNote({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        color: colors.muted,
        fontSize: "13px",
        lineHeight: "22px",
        margin: "16px 0 0",
      }}
    >
      {children}
    </p>
  );
}
