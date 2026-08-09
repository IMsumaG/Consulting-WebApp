import { EmailShell, SoftNote, SummaryList } from "./components";

export default function PaymentConfirmed({
  courseTitle,
  cohortDates,
  venue,
  joiningInstructions,
}: {
  courseTitle: string;
  cohortDates: string;
  venue?: string;
  joiningInstructions?: string;
}) {
  return (
    <EmailShell
      preview={`Payment confirmed for ${courseTitle}`}
      title="Your payment has been confirmed"
      intro={`We have received and confirmed payment for ${courseTitle}.`}
      action={{ href: "https://merxano.co.tz/training", label: "View training programmes" }}
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Dates", value: cohortDates },
          { label: "Venue / platform", value: venue ?? "To be shared" },
        ]}
      />
      {joiningInstructions ? (
        <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", marginTop: "20px" }}>
          {joiningInstructions}
        </p>
      ) : null}
      <SoftNote>
        If you need any help before the session, just reply to this email and our team
        will assist.
      </SoftNote>
    </EmailShell>
  );
}
