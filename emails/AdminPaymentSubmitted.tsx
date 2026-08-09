import { EmailShell, SummaryList, SoftNote } from "./components";

export default function AdminPaymentSubmitted({
  bookingRef,
  courseTitle,
  participant,
  proofLink,
}: {
  bookingRef: string;
  courseTitle: string;
  participant: string;
  proofLink: string;
}) {
  return (
    <EmailShell
      preview={`Payment proof submitted: ${bookingRef}`}
      title="Payment proof submitted"
      intro="A participant has uploaded proof of payment and the record is ready for review."
      action={{ href: proofLink, label: "Review proof" }}
    >
      <SummaryList
        items={[
          { label: "Booking reference", value: bookingRef },
          { label: "Course", value: courseTitle },
          { label: "Participant", value: participant },
        ]}
      />
      <SoftNote>
        Please confirm the payment status from the admin dashboard once you have
        reviewed the uploaded file.
      </SoftNote>
    </EmailShell>
  );
}
