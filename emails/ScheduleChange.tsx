import { EmailShell, SummaryList, SoftNote } from "./components";

export default function ScheduleChange({
  courseTitle,
  oldDates,
  newDates,
  reason,
  policyLink,
}: {
  courseTitle: string;
  oldDates: string;
  newDates?: string;
  reason?: string;
  policyLink?: string;
}) {
  return (
    <EmailShell
      preview={`Schedule update for ${courseTitle}`}
      title="We have an update to your schedule"
      intro="We wanted to let you know about a change to the training plan as soon as possible."
      action={
        policyLink
          ? { href: policyLink, label: "View policy details" }
          : { href: "https://merxano.co.tz", label: "Visit Merxano" }
      }
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Previous dates", value: oldDates },
          { label: "New dates", value: newDates ?? "To be confirmed" },
        ]}
      />
      <SoftNote>
        {reason
          ? reason
          : "If you have any questions about the change, our team is here to help."}
      </SoftNote>
    </EmailShell>
  );
}
