import { EmailShell, SoftNote, SummaryList } from "./components";

export default function CorporateAcknowledgement({
  contactPerson,
  orgName,
  trainingArea,
}: {
  contactPerson: string;
  orgName: string;
  trainingArea: string;
}) {
  return (
    <EmailShell
      preview={`Corporate request received from ${orgName}`}
      title={`Thanks, ${contactPerson}`}
      intro="We’ve received your corporate training request and we’ll be in touch within two business days."
      action={{ href: "https://merxano.co.tz/corporate", label: "View corporate services" }}
    >
      <SummaryList
        items={[
          { label: "Organisation", value: orgName },
          { label: "Contact person", value: contactPerson },
          { label: "Training area", value: trainingArea },
        ]}
      />
      <SoftNote>
        If you need to add anything in the meantime, just reply to this message.
      </SoftNote>
    </EmailShell>
  );
}
