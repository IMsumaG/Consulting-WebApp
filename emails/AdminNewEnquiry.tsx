import { EmailShell, SummaryList, SoftNote } from "./components";

export default function AdminNewEnquiry({
  title,
  sender,
  email,
  phone,
  summary,
}: {
  title: string;
  sender: string;
  email: string;
  phone: string;
  summary: string;
}) {
  return (
    <EmailShell
      preview={`New enquiry: ${title}`}
      title="New enquiry received"
      intro="A new form submission has come through the website."
      action={{ href: "https://merxano.co.tz/admin/dashboard", label: "Open admin dashboard" }}
    >
      <SummaryList
        items={[
          { label: "Subject", value: title },
          { label: "Sender", value: sender },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
        ]}
      />
      <SoftNote>{summary}</SoftNote>
    </EmailShell>
  );
}
