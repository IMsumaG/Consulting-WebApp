import { EmailShell, SoftNote, SummaryList } from "./components";

export default function TestimonialRequest({
  courseTitle,
  tokenLink,
  expiryText = "30 days",
}: {
  courseTitle: string;
  tokenLink: string;
  expiryText?: string;
}) {
  return (
    <EmailShell
      preview={`Share your experience from ${courseTitle}`}
      title={`Congratulations on completing ${courseTitle}!`}
      intro="Thank you for learning with Merxano Consulting. If you'd like, we would be grateful for a short testimonial about your experience."
      action={{ href: tokenLink, label: "Share my experience" }}
    >
      <SummaryList
        items={[
          { label: "Course", value: courseTitle },
          { label: "Link validity", value: expiryText },
          { label: "Purpose", value: "Voluntary review before publication" },
        ]}
      />
      <SoftNote>
        Your feedback is reviewed by our team before anything appears publicly.
      </SoftNote>
    </EmailShell>
  );
}
