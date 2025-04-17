import JobDetailsClient from "./JobDetailsClient"

const jobData = {
  "job-001": {
    id: "job-001",
    title: "Frontend Engineer",
    client: "TechCorp Inc.",
    description: "Working on the UI with React.",
    status: "Available",
    deadline: "2024-03-15",
    type: "Development",
    credits: 600,
    estimatedHours: 8,
    requirements: [
      "React expertise",
      "TypeScript knowledge",
      "UI/UX understanding"
    ],
    generatedContent: "Frontend development project details...",
    comments: [
      {
        id: "1",
        text: "Please focus on responsive design",
        user: "Client",
        timestamp: "2024-02-21T10:15:00Z"
      }
    ]
  },
  "job-002": {
    id: "job-002",
    title: "Backend Developer",
    client: "DataSys Solutions",
    description: "Building APIs with Node.js.",
    status: "Available",
    deadline: "2024-03-20",
    type: "Development",
    credits: 800,
    estimatedHours: 10,
    requirements: [
      "Node.js expertise",
      "API design experience",
      "Database knowledge"
    ],
    generatedContent: "Backend development project details...",
    comments: []
  },
  "job-003": {
    id: "job-003",
    title: "DevOps Specialist",
    client: "CloudTech Inc.",
    description: "Managing CI/CD pipelines.",
    status: "Available",
    deadline: "2024-03-25",
    type: "DevOps",
    credits: 700,
    estimatedHours: 12,
    requirements: [
      "CI/CD experience",
      "Cloud platform knowledge",
      "Infrastructure as code"
    ],
    generatedContent: "DevOps project details...",
    comments: []
  }
}

export function generateStaticParams() {
  return [
    { id: "job-001" },
    { id: "job-002" },
    { id: "job-003" }
  ]
}

export default function JobPage({ params }: { params: { id: string } }) {
  const job = jobData[params.id]
  if (!job) return <div className="p-6">Job not found.</div>

  return <JobDetailsClient job={job} />
}