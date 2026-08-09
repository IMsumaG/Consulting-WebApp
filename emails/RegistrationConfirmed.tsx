import { EmailShell, SummaryList, SoftNote } from "./components";

export default function RegistrationConfirmed({
  courseTitle,
  cohortDates,
  venue,
  trainer,
  inclusions,
}: {
  courseTitle: string;
  cohortDates: string;
  venue?: string;
  trainer?: string;
  inclusions?: string;
}) {
  return (
    <EmailShell
      preview={`Registration confirmed for ${courseTitle}`}
      title="Registration confirmed"
      intro="You are officially registered. We are glad to have you with us."
      action={{ href: "https://merxano.co.tz", label: "See Merxano online" }}
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Cohort dates", value: cohortDates },
          { label: "Venue / platform", value: venue ?? "To be confirmed" },
          { label: "Trainer", value: trainer ?? "Merxano facilitator" },
        ]}
      />
      {inclusions ? (
        <SoftNote>{inclusions}</SoftNote>
      ) : (
        <SoftNote>
          Your seat is confirmed and we will share any final joining details before the
          training begins.
        </SoftNote>
      )}
    </EmailShell>
  );
}
