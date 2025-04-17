// This file makes the dynamic route /editor/jobs/[id]/submit exportable with output: 'export'

export function generateStaticParams() {
  return [
    { id: "job-001" },
    { id: "job-002" },
    { id: "job-003" }
  ];
}

export default function SubmitPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Submit Work</h1>
        <p className="text-muted-foreground text-lg mb-4">
          This is the submission page for <strong>{params.id}</strong>.
        </p>
        <p className="text-muted-foreground">
          You can build this page out later with form elements, file upload, or confirmation.
        </p>
      </div>
    </div>
  );
}