export type ChallengeSolution = {
  challenge: string;
  solution: string;
};

export type ArchitectureLayer = {
  layer: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  tech: string[];
  year: string;
  timeline: string;
  role: string;
  problem: string;
  solution: string;
  architectureLayers: ArchitectureLayer[];
  features: string[];
  challenge: ChallengeSolution;
  results: string[];
  codeSnippet: { label: string; code: string };
};

export const projects: Project[] = [
  {
    slug: "dopa-faculty-management-system",
    name: "DOPA Faculty Management System",
    category: "Enterprise HR Platform",
    oneLiner: "Payroll, scheduling, and role-based access for a coaching institute's entire faculty operation.",
    description:
      "An enterprise HR platform handling payroll, faculty scheduling, and role-based access — replacing spreadsheet-based coordination with a single system of record.",
    tech: ["Next.js", "TypeScript", "MongoDB", "JWT", "RBAC"],
    year: "2026",
    timeline: "In production — DOPA Coaching, 2026",
    role: "Solo build — data modeling, RBAC design, and deployment",
    problem:
      "Faculty payroll, scheduling, and staff records were spread across spreadsheets and manual approvals, with no single source of truth.",
    solution:
      "One platform where payroll, scheduling, and staff records live together, gated by role-based access so each role sees exactly what it needs.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js App Router UI, server components for data-heavy views." },
      { layer: "API", detail: "Route handlers enforcing auth + RBAC checks before touching data." },
      { layer: "Auth", detail: "JWT sessions with role claims; middleware guards protected routes." },
      { layer: "Data", detail: "MongoDB schemas for staff, schedules, payroll runs, and audit history." },
    ],
    features: [
      "Role-scoped dashboards for admin, coordinator, and faculty accounts",
      "Auditable payroll runs generated from logged schedules and attendance",
      "Faculty scheduling with conflict detection across time slots",
    ],
    challenge: {
      challenge: "Payroll figures needed to be trustworthy, and different roles needed different views of the same data without separate codebases.",
      solution: "Payroll runs are computed from immutable schedule snapshots and stored as an auditable record; RBAC middleware scopes queries and UI from one role definition, checked at the API layer.",
    },
    results: [
      "Payroll and scheduling run out of one system instead of three cross-checked spreadsheets.",
      "Every payroll figure has an audit trail back to its source data.",
    ],
    codeSnippet: {
      label: "RBAC guard on a protected route handler",
      code: `export async function withRole(role: Role, handler: Handler) {
  return async (req: Request) => {
    const session = await getSession(req);
    if (!session || !session.roles.includes(role)) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    return handler(req, session);
  };
}`,
    },
  },
  {
    slug: "dopa-mentor-management-portal",
    name: "DOPA Mentor Management Portal",
    category: "Operations & Workflow Automation",
    oneLiner: "Real-time mentor operations with live notifications, payments, and automated reporting.",
    description:
      "A real-time portal coordinating mentor operations — live notifications via server-sent events, payment reconciliation, and automated reporting.",
    tech: ["Next.js", "TypeScript", "SSE", "MongoDB"],
    year: "2026",
    timeline: "In production — DOPA Coaching, 2026",
    role: "Solo build — real-time architecture and payment reconciliation logic",
    problem:
      "Mentor assignments, session tracking, and payouts were coordinated manually across chats and spreadsheets, with no live visibility into status.",
    solution:
      "A real-time portal where mentor activity, payments, and reporting update live — coordinators see status change instantly, without refreshing or asking around.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js UI subscribed to a live event stream for instant updates." },
      { layer: "Realtime", detail: "Server-Sent Events (SSE) endpoint pushing state changes to clients." },
      { layer: "Workflow", detail: "Step-based automation engine advancing sessions through defined states." },
      { layer: "Data", detail: "MongoDB storing sessions, payment records, and reporting aggregates." },
    ],
    features: [
      "Live notifications on session and payment status via SSE — no polling",
      "Automated workflow moving sessions from scheduled to completed to paid",
      "Payment engine reconciling payouts against completed sessions",
    ],
    challenge: {
      challenge: "Coordinators needed instant status visibility, and payouts could be triggered before a session was actually verified complete.",
      solution: "Built an SSE endpoint streaming state changes as they're written, and modeled the mentor lifecycle as an explicit state machine so payouts only fire from a verified 'completed' state.",
    },
    results: [
      "Session and payout status is visible the instant it changes, replacing manual chat check-ins.",
      "A payout can no longer be triggered for a session that wasn't verified complete.",
    ],
    codeSnippet: {
      label: "Server-Sent Events endpoint pushing session updates",
      code: `export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const unsubscribe = sessionEvents.subscribe((event) => {
        controller.enqueue(\`data: \${JSON.stringify(event)}\\n\\n\`);
      });
      return () => unsubscribe();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}`,
    },
  },
  {
    slug: "neet-con-2026",
    name: "NEET CON 2026",
    category: "Event Registration Platform",
    oneLiner: "End-to-end event registration with payments, WhatsApp delivery, and QR check-in for a national conference.",
    description:
      "A registration platform for a national medical-entrance conference — payments via HDFC SmartGateway, automated WhatsApp confirmations, and QR check-in.",
    tech: ["Next.js", "MongoDB", "HDFC SmartGateway", "WhatsApp API"],
    year: "2026",
    timeline: "Event platform — 2026",
    role: "Solo build — payment webhook handling and check-in flow",
    problem:
      "A national conference needed reliable payment collection, automatic confirmation delivery, and fast attendee verification at the door.",
    solution:
      "A self-serve platform: attendees register and pay online, get an automatic WhatsApp confirmation with a QR pass, and staff scan passes at check-in from a live admin dashboard.",
    architectureLayers: [
      { layer: "Client", detail: "Public registration flow + staff-facing admin dashboard, both Next.js." },
      { layer: "Payments", detail: "HDFC SmartGateway integration handling collection and verification." },
      { layer: "Messaging", detail: "Meta WhatsApp Business API sending confirmations and passes." },
      { layer: "Data", detail: "Registration, payment, and check-in records with admin-facing aggregates." },
    ],
    features: [
      "Self-serve registration with HDFC SmartGateway payment collection",
      "Automated WhatsApp confirmation and QR pass delivery on payment success",
      "QR-based check-in scanning with a live admin dashboard",
    ],
    challenge: {
      challenge: "Payment and pass delivery had to be reliable even with late or duplicate webhooks, and check-in needed to be fast with no manual lookups.",
      solution: "Built idempotent webhook handling with retry-safe pass generation, and bound each QR code to a server-side lookup so scanning is a single validated read.",
    },
    results: [
      "Zero manual steps between a payment and pass delivery.",
      "Check-in became a single scan per attendee instead of a manual list lookup.",
    ],
    codeSnippet: {
      label: "Issuing a pass only after payment webhook verification",
      code: `export async function handlePaymentWebhook(payload: WebhookPayload) {
  const registration = await verifyAndFetchRegistration(payload);
  if (registration.passIssued) return; // idempotent — already handled

  const qr = await generateSignedQr(registration.id);
  await sendWhatsAppPass(registration.phone, qr);
  await markPassIssued(registration.id);
}`,
    },
  },
  {
    slug: "attendance-management-system",
    name: "Attendance Management System",
    category: "Academic Operations",
    oneLiner: "Teacher-facing attendance tracking with automated WhatsApp reporting to parents.",
    description:
      "A teacher dashboard for daily attendance that automatically triggers WhatsApp reports, closing the loop between classroom records and parent communication.",
    tech: ["React", "Node.js", "MongoDB", "WhatsApp API"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — end to end",
    problem:
      "Teachers recorded attendance on paper or disconnected spreadsheets, and parents only found out about absences if a teacher followed up individually.",
    solution:
      "A fast teacher dashboard for marking daily attendance that automatically sends a WhatsApp report to parents, so communication happens by default.",
    architectureLayers: [
      { layer: "Client", detail: "React teacher dashboard for daily class attendance entry." },
      { layer: "API", detail: "Node.js/Express backend handling records and report triggers." },
      { layer: "Messaging", detail: "WhatsApp Business API sending automated reports to parents." },
      { layer: "Data", detail: "MongoDB storing attendance records per class, per day." },
    ],
    features: [
      "Daily attendance entry built for speed during a live classroom session",
      "Automatic WhatsApp report to parents on marked absence",
      "Historical attendance reporting per student and per class",
    ],
    challenge: {
      challenge: "Attendance marking needed to stay fast during a live class, without blocking on a WhatsApp API call.",
      solution: "Built a keyboard-friendly marking UI with an async report queue, so attendance saves instantly and messages send in the background.",
    },
    results: [
      "Parents get a same-day absence notification by default.",
      "A full term of attendance is now one queryable record instead of paper registers.",
    ],
    codeSnippet: {
      label: "Async report dispatch after attendance is saved",
      code: `async function markAttendance(classId: string, entries: AttendanceEntry[]) {
  await db.attendance.insertMany(entries);
  const absentees = entries.filter((e) => e.status === "absent");
  reportQueue.enqueue(absentees.map((e) => ({ studentId: e.studentId, classId })));
  return { saved: entries.length };
}`,
    },
  },
  {
    slug: "ews-scholarship-portal",
    name: "EWS Scholarship Portal",
    category: "Applicant Workflow Platform",
    oneLiner: "Application intake, document verification, interview scheduling, and merit calculation for a scholarship program.",
    description:
      "A full applicant lifecycle system — document uploads, interview management, and automated merit calculation — with WhatsApp status updates at every stage.",
    tech: ["Next.js", "MongoDB", "Cloudinary", "WhatsApp API"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — pipeline design and merit-scoring logic",
    problem:
      "A scholarship program's intake, document verification, interviews, and merit-based selection were coordinated manually over email, leaving applicants guessing about status.",
    solution:
      "An end-to-end applicant portal covering intake, documents, interviews, and automated merit calculation, with WhatsApp updates at every stage.",
    architectureLayers: [
      { layer: "Client", detail: "Applicant-facing intake/status portal and an admin review dashboard." },
      { layer: "Documents", detail: "Cloudinary handling upload, storage, and delivery of documents." },
      { layer: "Workflow", detail: "Stage-based pipeline: intake → document review → interview → decision." },
      { layer: "Data", detail: "MongoDB storing applications, documents, interviews, and merit scores." },
    ],
    features: [
      "Applicant intake form with direct-to-Cloudinary document upload",
      "Interview scheduling and scoring with admin verification workflow",
      "Automated, auditable merit calculation from eligibility and interview data",
    ],
    challenge: {
      challenge: "Applicants had no visibility into their status, and merit scoring needed to be transparent and consistent across a large pool.",
      solution: "Tied WhatsApp notifications to pipeline stage transitions, and implemented merit scoring as a pure, re-runnable function over stored applicant data.",
    },
    results: [
      "Status inquiries to program staff dropped off — updates go out automatically.",
      "Every merit score can be recomputed and explained from the same inputs.",
    ],
    codeSnippet: {
      label: "Merit score as a pure, re-runnable function",
      code: `function calculateMerit(applicant: Applicant): MeritScore {
  const eligibility = scoreEligibility(applicant.income, applicant.category);
  const interview = applicant.interviewScore ?? 0;
  const documents = applicant.documentsVerified ? 1 : 0;
  return {
    total: eligibility * 0.5 + interview * 0.4 + documents * 0.1,
    breakdown: { eligibility, interview, documents },
  };
}`,
    },
  },
  {
    slug: "dr-bhatia-mds-predictor",
    name: "Dr Bhatia MDS Predictor",
    category: "Predictive Analytics",
    oneLiner: "A data-driven predictor using historical admission data to forecast MDS counselling outcomes.",
    description:
      "An analytics tool that models historical counselling data to predict likely outcomes for MDS aspirants, giving a data-backed view of admission chances.",
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — data modeling and prediction logic",
    problem:
      "MDS aspirants going through counselling had no reliable, data-backed way to estimate admission chances at a given rank and category.",
    solution:
      "A predictor that models historical counselling round data — rank, category, and college outcomes — into a data-backed estimate of likely placement.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js form for rank/category input and results visualization." },
      { layer: "API", detail: "Prediction endpoint querying historical outcome data via Prisma." },
      { layer: "Data", detail: "MongoDB storing structured historical counselling round outcomes." },
    ],
    features: [
      "Rank and category-based prediction of likely counselling outcomes",
      "Predictions grounded in historical outcomes, not a black-box model",
      "Clear results view for a non-technical audience under time pressure",
    ],
    challenge: {
      challenge: "Predictions needed to be trustworthy and explainable for a real admission decision, using historical data that was inconsistent across sources.",
      solution: "Grounded predictions in comparable historical outcomes rather than an opaque model, and normalized rank/category/outcome fields into one schema via Prisma at ingestion.",
    },
    results: [
      "Aspirants get an estimate traceable to real comparable outcomes, not forum guesswork.",
      "Previously inconsistent data across sources is now normalized into one usable schema.",
    ],
    codeSnippet: {
      label: "Predicting outcomes from comparable historical ranks",
      code: `async function predictOutcome(rank: number, category: Category) {
  const comparable = await prisma.counsellingRound.findMany({
    where: { category, rank: { gte: rank - 500, lte: rank + 500 } },
  });
  return summarizeOutcomes(comparable);
}`,
    },
  },
];
