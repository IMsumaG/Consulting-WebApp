import { EmailShell, SummaryList, SoftNote } from "./components";

export default function WaitlistUpdate({
  courseTitle,
  cohortDates,
  confirmLink,
}: {
  courseTitle: string;
  cohortDates: string;
  confirmLink: string;
}) {
  return (
    <EmailShell
      preview={`A seat is open for ${courseTitle}`}
      title="A seat has opened"
      intro="Good news: a place has become available. Please confirm as soon as you can."
      action={{ href: confirmLink, label: "Confirm my seat" }}
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Cohort dates", value: cohortDates },
          { label: "Action window", value: "24 hours" },
        ]}
      />
      <SoftNote>
        If you no longer need the place, just ignore this note and we will offer it to
        the next person on the list.
      </SoftNote>
    </EmailShell>
  );
}
