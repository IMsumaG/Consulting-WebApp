import { EmailShell, SummaryList, SoftNote } from "./components";

export default function AdminNewBooking({
  bookingRef,
  courseTitle,
  cohortDates,
  fullName,
  email,
  phone,
}: {
  bookingRef: string;
  courseTitle: string;
  cohortDates: string;
  fullName: string;
  email: string;
  phone: string;
}) {
  return (
    <EmailShell
      preview={`New booking received: ${courseTitle}`}
      title="New booking received"
      intro="A new participant has registered on Merxano."
      action={{ href: "https://merxano.co.tz/admin/dashboard", label: "Open admin dashboard" }}
    >
      <SummaryList
        items={[
          { label: "Booking reference", value: bookingRef },
          { label: "Course", value: courseTitle },
          { label: "Cohort dates", value: cohortDates },
          { label: "Participant", value: fullName },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
        ]}
      />
      <SoftNote>
        Please review the record and follow up with payment or onboarding instructions.
      </SoftNote>
    </EmailShell>
  );
}
