import { EmailShell, SoftNote, SummaryList } from "./components";

export default function NewsletterWelcome({
  name,
  interests,
}: {
  name: string;
  interests?: string[];
}) {
  return (
    <EmailShell
      preview="Welcome to Merxano updates"
      title={`Welcome, ${name}`}
      intro="Thanks for subscribing. We’ll keep you posted on new programmes, insights, and updates that are actually worth your time."
      action={{ href: "https://merxano.co.tz/insights", label: "Read insights" }}
    >
      <SummaryList
        items={[
          { label: "Subscriber", value: name },
          { label: "Interests", value: interests?.length ? interests.join(", ") : "General updates" },
        ]}
      />
      <SoftNote>
        If you ever want to stop receiving these updates, you can unsubscribe anytime.
      </SoftNote>
    </EmailShell>
  );
}
