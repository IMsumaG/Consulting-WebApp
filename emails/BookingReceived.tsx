import { EmailShell, SoftNote, SummaryList } from "./components";

export default function BookingReceived({
  bookingRef,
  courseTitle,
  cohortDates,
  fee,
  currency = "TZS",
  paymentInstructions,
}: {
  bookingRef: string;
  courseTitle: string;
  cohortDates: string;
  fee: string;
  currency?: string;
  paymentInstructions?: string;
}) {
  return (
    <EmailShell
      preview={`Booking received for ${courseTitle}`}
      title={`Booking received for ${courseTitle}`}
      intro="Thanks for registering with Merxano Consulting. Your place is reserved for 48 hours while payment is completed."
      action={{ href: "https://merxano.co.tz", label: "Visit Merxano" }}
    >
      <SummaryList
        items={[
          { label: "Booking reference", value: bookingRef },
          { label: "Course", value: courseTitle },
          { label: "Cohort dates", value: cohortDates },
          { label: "Fee", value: `${currency} ${fee}` },
        ]}
      />
      {paymentInstructions ? (
        <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", marginTop: "20px" }}>
          {paymentInstructions}
        </p>
      ) : null}
      <SoftNote>
        Please use the booking reference when making payment so our team can match your
        record quickly.
      </SoftNote>
    </EmailShell>
  );
}
