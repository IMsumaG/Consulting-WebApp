import { EmailShell, SummaryList, SoftNote } from "./components";

export default function TrainingReminder({
  courseTitle,
  cohortDates,
  sessionTimes,
  venue,
  checklist,
}: {
  courseTitle: string;
  cohortDates: string;
  sessionTimes?: string;
  venue?: string;
  checklist?: string;
}) {
  return (
    <EmailShell
      preview={`Reminder for ${courseTitle}`}
      title="Your training starts soon"
      intro="A gentle reminder that your session is coming up soon."
      action={{ href: "https://merxano.co.tz/calendar", label: "Open training calendar" }}
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Dates", value: cohortDates },
          { label: "Session times", value: sessionTimes ?? "See your joining note" },
          { label: "Venue / platform", value: venue ?? "To be confirmed" },
        ]}
      />
      {checklist ? <SoftNote>{checklist}</SoftNote> : null}
    </EmailShell>
  );
}
