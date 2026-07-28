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
  architectureNotes: string[];
  features: string[];
  challenges: ChallengeSolution[];
  results: string[];
  lessons: string[];
  codeSnippet: { label: string; code: string };
};

export const projects: Project[] = [
  {
    slug: "dopa-faculty-management-system",
    name: "DOPA Faculty Management System",
    category: "Enterprise HR Platform",
    oneLiner: "Payroll, scheduling, and role-based access for a coaching institute's entire faculty operation.",
    description:
      "An enterprise HR platform handling payroll processing, faculty scheduling, and permission-scoped access across roles — built to replace manual spreadsheet-based coordination with a single system of record.",
    tech: ["Next.js", "TypeScript", "MongoDB", "JWT", "RBAC"],
    year: "2026",
    timeline: "In production — DOPA Coaching, 2026",
    role: "Solo build — data modeling, RBAC design, and deployment",
    problem:
      "Faculty payroll, class scheduling, and staff record-keeping were spread across spreadsheets and manual approvals. There was no single source of truth for who was scheduled where, what they were owed, or who could see what — and every payroll cycle meant reconciling data by hand.",
    solution:
      "A single internal platform where payroll, scheduling, and staff records live in one system, gated by role-based access so faculty, coordinators, and admins each see exactly what their role requires — nothing more.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js App Router UI, server components for data-heavy views, role-aware navigation." },
      { layer: "API", detail: "Next.js route handlers enforcing auth + RBAC checks before touching data." },
      { layer: "Auth", detail: "JWT-based sessions with role claims; middleware guards protected routes." },
      { layer: "Data", detail: "MongoDB with schemas for staff, schedules, payroll runs, and audit history." },
    ],
    architectureNotes: [
      "Role-based access control is enforced at the API boundary, not just hidden in the UI — every route handler checks the caller's role before executing a query.",
      "Payroll calculations run server-side and are logged per run, so every figure is traceable back to the schedule data that produced it.",
      "Scheduling and payroll share the same underlying staff/attendance records, so there's one source of truth instead of two systems drifting apart.",
    ],
    features: [
      "Role-scoped dashboards for admin, coordinator, and faculty accounts",
      "Payroll runs generated from logged schedules and attendance, with an auditable history",
      "Faculty scheduling with conflict detection across time slots",
      "Permission-scoped staff records — each role sees only what it's authorized to",
    ],
    challenges: [
      {
        challenge: "Payroll figures needed to be trustworthy — a wrong number erodes confidence in the whole system immediately.",
        solution: "Payroll runs are computed from immutable schedule/attendance snapshots and stored as an auditable record, so any figure can be traced back to its source data.",
      },
      {
        challenge: "Different roles needed meaningfully different views of the same data without maintaining separate codebases per role.",
        solution: "Centralized RBAC middleware that scopes queries and UI rendering from a single role definition, checked at the API layer.",
      },
    ],
    results: [
      "Payroll and scheduling run out of one system instead of three separate spreadsheets that had to be manually cross-checked.",
      "Coordinators and admins each get a dashboard scoped to their role, instead of one shared spreadsheet everyone could edit.",
      "Every payroll figure now has an audit trail back to its source data — previously, a disputed number meant digging through email history.",
    ],
    lessons: [
      "The distinction between roles and permissions mattered more than expected — modeling them separately from the start avoided a rewrite when a coordinator later needed one admin-level capability.",
      "Logging *why* a payroll figure came out a certain way, not just the figure itself, turned out to be what actually built staff trust in the system.",
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
      "A real-time portal coordinating mentor operations end-to-end — live notifications via server-sent events, an integrated payment engine, automated workflow steps, and reporting for program oversight.",
    tech: ["Next.js", "TypeScript", "SSE", "MongoDB"],
    year: "2026",
    timeline: "In production — DOPA Coaching, 2026",
    role: "Solo build — real-time architecture and payment reconciliation logic",
    problem:
      "Mentor assignments, session tracking, and payouts were coordinated manually across chats and spreadsheets, with no live visibility into session status or payment state for program coordinators.",
    solution:
      "A real-time operations portal where mentor activity, payments, and reporting update live — coordinators see session and payment status the moment it changes, without refreshing or asking around.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js UI subscribed to a live event stream for instant status updates." },
      { layer: "Realtime", detail: "Server-Sent Events (SSE) endpoint pushing state changes to connected clients." },
      { layer: "Workflow", detail: "Step-based automation engine advancing mentor sessions through defined states." },
      { layer: "Payments", detail: "Payment engine reconciling mentor payouts against completed sessions." },
      { layer: "Data", detail: "MongoDB storing sessions, payment records, and reporting aggregates." },
    ],
    architectureNotes: [
      "SSE was chosen over WebSockets for the notification layer — the traffic is one-directional (server → client), so SSE gives real-time updates with a much simpler connection model.",
      "Workflow steps are modeled explicitly as a state machine, so a mentor session's status is always one of a known, finite set of states — never ambiguous.",
      "Reporting is computed from the same event stream that drives live notifications, so dashboards and payouts never disagree with what coordinators are seeing in real time.",
    ],
    features: [
      "Live notifications on session and payment status via SSE — no polling",
      "Automated workflow steps moving mentor sessions from scheduled to completed to paid",
      "Integrated payment engine reconciling payouts against completed sessions",
      "Reporting dashboard for program-level oversight",
    ],
    challenges: [
      {
        challenge: "Coordinators needed to see status changes the instant they happened, without expensive polling or a full WebSocket infrastructure.",
        solution: "Implemented an SSE endpoint that streams state changes as they're written, giving near-instant updates with a fraction of the complexity of a WebSocket server.",
      },
      {
        challenge: "Manual payout tracking was error-prone — sessions could be marked complete without payment being reconciled, or vice versa.",
        solution: "Modeled the mentor lifecycle as an explicit state machine, so a payout can only be triggered once a session has reached a verified 'completed' state.",
      },
    ],
    results: [
      "Session and payout status is visible the moment it changes, replacing a routine of coordinators pinging mentors in chat to ask 'where are we at?'",
      "A payout can no longer be triggered for a session that wasn't actually verified complete — a gap that existed in the old chat-and-spreadsheet process.",
      "One SSE connection per client replaced what would have been a WebSocket server, connection registry, and keepalive protocol to build and operate.",
    ],
    lessons: [
      "Picking SSE over WebSockets by asking \"does the client ever send on this channel?\" — rather than reaching for WebSockets because the feature was labeled real-time — kept the operational surface much smaller.",
      "A state machine only pays off if illegal transitions are actually rejected, not just undocumented; enforcing that at the data layer, not the UI, was what prevented the payout-before-completion bug class.",
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
      "A registration platform built for a national medical-entrance conference — payment collection via HDFC SmartGateway, automated WhatsApp confirmations, QR-coded digital passes, and an admin dashboard for live event oversight.",
    tech: ["Next.js", "MongoDB", "HDFC SmartGateway", "WhatsApp API"],
    year: "2026",
    timeline: "Event platform — 2026",
    role: "Solo build — payment webhook handling and check-in flow",
    problem:
      "A national conference needed to register a large number of attendees, collect payment reliably, deliver confirmations and passes without manual follow-up, and let event staff verify attendees quickly at the door.",
    solution:
      "A self-serve registration platform: attendees register and pay online, receive a WhatsApp confirmation with a QR-coded digital pass automatically, and staff scan passes at check-in from an admin dashboard showing live registration and attendance numbers.",
    architectureLayers: [
      { layer: "Client", detail: "Public registration flow + staff-facing admin dashboard, both in Next.js." },
      { layer: "Payments", detail: "HDFC SmartGateway integration handling payment collection and verification." },
      { layer: "Messaging", detail: "Meta WhatsApp Business API sending automated confirmations and passes." },
      { layer: "Passes", detail: "Server-generated QR codes bound to each registration record." },
      { layer: "Data", detail: "Registration, payment, and check-in records with admin-facing aggregates." },
    ],
    architectureNotes: [
      "Payment confirmation triggers the WhatsApp send — the pass is only issued once payment is verified via the gateway's webhook, avoiding passes issued for unpaid registrations.",
      "Each QR code encodes a signed reference to the registration record, so check-in scanning validates against the database rather than trusting the code's contents blindly.",
      "The admin dashboard reads from the same registration table the public flow writes to, giving organizers a live count with no separate reporting step.",
    ],
    features: [
      "Self-serve registration with HDFC SmartGateway payment collection",
      "Automated WhatsApp confirmation and digital QR pass delivery on successful payment",
      "QR-based check-in scanning for event staff",
      "Admin dashboard with live registration, payment, and attendance numbers",
    ],
    challenges: [
      {
        challenge: "Payment and pass delivery needed to be reliable — a failed webhook shouldn't mean a paying attendee never receives their pass.",
        solution: "Built idempotent payment-webhook handling with retry-safe pass generation, so a delayed or retried webhook can't issue duplicate passes or silently drop a confirmed payment.",
      },
      {
        challenge: "Check-in needed to be fast at the door, without staff needing to look up attendees manually.",
        solution: "QR codes resolve directly to a registration record server-side, so scanning is a single lookup — no manual search required.",
      },
    ],
    results: [
      "No staff involvement between an attendee paying and receiving their pass — the old process would have needed someone manually confirming payments and sending passes one by one.",
      "Check-in became a single scan per attendee instead of a name lookup against a printed or spreadsheet list — the actual bottleneck at high-attendance events.",
      "Organizers could see registration and payment numbers live during the sign-up window, instead of waiting on an end-of-day manual count.",
    ],
    lessons: [
      "Payment gateway webhooks arrive late, out of order, or more than once often enough that idempotency isn't an edge case to handle later — it has to be the default assumption from the first line of the handler.",
      "Binding the QR code to a server-side lookup instead of encoding trust into the code itself was a small extra step that closed an obvious pass-forgery risk.",
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
      "A teacher dashboard for daily attendance tracking that automatically triggers WhatsApp reports, closing the loop between classroom records and parent communication without manual follow-up.",
    tech: ["React", "Node.js", "MongoDB", "WhatsApp API"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — end to end",
    problem:
      "Teachers recorded attendance on paper or in disconnected spreadsheets, and parents only found out about absences if a teacher happened to follow up individually — which didn't happen consistently.",
    solution:
      "A teacher dashboard for marking daily attendance that automatically sends a WhatsApp report to parents, so communication happens by default instead of depending on someone remembering to send it.",
    architectureLayers: [
      { layer: "Client", detail: "React teacher dashboard for daily class attendance entry." },
      { layer: "API", detail: "Node.js/Express backend handling attendance records and report triggers." },
      { layer: "Messaging", detail: "WhatsApp Business API sending automated attendance reports to parents." },
      { layer: "Data", detail: "MongoDB storing attendance records per class, per day, with historical reporting." },
    ],
    architectureNotes: [
      "Marking attendance for a class and triggering the parent report are decoupled — a report queue processes sends asynchronously so a slow WhatsApp API call never blocks the teacher's UI.",
      "Reports are generated from the same attendance record teachers see on screen, so there's no separate 'reporting' data path that could drift from what was actually marked.",
    ],
    features: [
      "Daily attendance entry per class, built for speed during a live classroom session",
      "Automatic WhatsApp report to parents on marked absence",
      "Historical attendance reporting per student and per class",
    ],
    challenges: [
      {
        challenge: "Attendance marking needed to be fast enough to not disrupt a live classroom — teachers wouldn't adopt a slow tool.",
        solution: "Built a minimal, keyboard-friendly marking UI where a full class can be marked in a handful of taps, with sends happening asynchronously after submission.",
      },
      {
        challenge: "WhatsApp API calls are not instant, and blocking the teacher's save action on delivery would make the tool feel unreliable.",
        solution: "Decoupled marking from sending via an async report queue, so attendance saves immediately and messages go out in the background.",
      },
    ],
    results: [
      "Parents get an absence notification the same day by default — previously it depended entirely on whether a teacher remembered to follow up.",
      "A term's worth of attendance is now one queryable record instead of a stack of paper registers nobody wanted to dig back through.",
      "Teachers adopted it because marking a class takes seconds, not minutes — the async send meant speed didn't have to trade off against reliability.",
    ],
    lessons: [
      "Adoption hinged on the marking flow being fast, not on the automation being clever — the WhatsApp piece was the easy half; the classroom-speed UI was the half that determined whether teachers actually used it.",
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
      "A full applicant lifecycle system — document uploads, interview management, and automated merit calculation — with WhatsApp status updates keeping applicants informed at every stage.",
    tech: ["Next.js", "MongoDB", "Cloudinary", "WhatsApp API"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — pipeline design and merit-scoring logic",
    problem:
      "A scholarship program needed to manage a full applicant lifecycle — application intake, document verification, interviews, and merit-based selection — that had previously been coordinated manually over email and phone, with applicants left guessing about their status.",
    solution:
      "An end-to-end applicant portal covering intake, document upload, interview scheduling, and automated merit calculation, with WhatsApp updates so applicants always know where they stand.",
    architectureLayers: [
      { layer: "Client", detail: "Applicant-facing intake and status portal, admin review dashboard." },
      { layer: "Documents", detail: "Cloudinary handling upload, storage, and delivery of applicant documents." },
      { layer: "Workflow", detail: "Stage-based applicant pipeline: intake → document review → interview → merit → decision." },
      { layer: "Messaging", detail: "WhatsApp Business API notifying applicants at each stage transition." },
      { layer: "Data", detail: "MongoDB storing applications, documents metadata, interview records, and merit scores." },
    ],
    architectureNotes: [
      "The applicant record moves through explicit pipeline stages; a WhatsApp notification fires on every stage transition, so status communication is a side effect of the workflow, not a manual task.",
      "Merit calculation is a pure function over stored applicant data (documents verified, interview score, eligibility criteria), making it re-runnable and auditable if criteria change.",
      "Document uploads go directly to Cloudinary from the client with signed upload parameters, keeping large file traffic off the application server.",
    ],
    features: [
      "Applicant intake form with document upload",
      "Admin document verification workflow",
      "Interview scheduling and scoring",
      "Automated merit calculation from eligibility and interview data",
      "WhatsApp status updates at every pipeline stage",
    ],
    challenges: [
      {
        challenge: "Applicants had no visibility into where their application stood, which drove repeated manual status inquiries to program staff.",
        solution: "Tied WhatsApp notifications directly to pipeline stage transitions, so status updates go out automatically the moment an application moves forward.",
      },
      {
        challenge: "Merit calculation involved multiple weighted factors and needed to be transparent and consistent across a large applicant pool.",
        solution: "Implemented merit scoring as a pure, auditable function over stored applicant data, so results are reproducible and explainable rather than a manual judgment call.",
      },
    ],
    results: [
      "Status inquiries to program staff dropped off, since applicants get a WhatsApp update the moment their stage changes rather than needing to ask.",
      "Every merit score can be recomputed and explained from the same inputs — during the old email-based process, a challenged decision meant reconstructing it from memory.",
      "Documents live in one searchable system instead of scattered across staff inboxes as email attachments.",
    ],
    lessons: [
      "Re-running merit scores after a late change to eligibility criteria — something that came up mid-cycle — only worked cleanly because the scoring function had no hidden state to begin with.",
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
      "An analytics tool that models historical counselling data to predict likely outcomes for MDS aspirants, giving users a data-backed view of their admission chances.",
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB"],
    year: "2025",
    timeline: "Deployed — 2025",
    role: "Solo build — data modeling and prediction logic",
    problem:
      "MDS aspirants going through counselling had no reliable, data-backed way to estimate their admission chances at a given rank and category — decisions were being made on guesswork and word-of-mouth.",
    solution:
      "A predictor tool that models historical counselling round data — rank, category, and college outcomes — to give aspirants a data-backed estimate of where they're likely to be placed.",
    architectureLayers: [
      { layer: "Client", detail: "Next.js form for rank/category input and results visualization." },
      { layer: "API", detail: "Prediction endpoint querying historical outcome data via Prisma." },
      { layer: "Data", detail: "MongoDB storing structured historical counselling round outcomes." },
      { layer: "Analytics", detail: "Ranking/probability model built over historical rank-to-outcome data." },
    ],
    architectureNotes: [
      "Prisma provides a typed data layer over the historical counselling dataset, making the prediction queries straightforward to reason about and extend as more rounds of data become available.",
      "Predictions are computed from actual historical outcomes rather than a black-box model, so results can be explained in terms of comparable past ranks — important for a decision aspirants are trusting.",
    ],
    features: [
      "Rank and category-based prediction of likely counselling outcomes",
      "Historical outcome data as the basis for every prediction, not a black box",
      "Clear results view for a non-technical audience under time pressure during counselling",
    ],
    challenges: [
      {
        challenge: "Predictions needed to be trustworthy and explainable to users making real admission decisions, not just statistically plausible.",
        solution: "Grounded predictions in comparable historical outcomes rather than an opaque model, so a result can be traced back to similar past ranks and categories.",
      },
      {
        challenge: "Historical counselling data was inconsistent across sources and rounds, and needed to be normalized before it was usable.",
        solution: "Built a structured schema via Prisma that normalizes rank, category, and outcome fields at ingestion, so the prediction logic operates on clean, consistent data.",
      },
    ],
    results: [
      "Aspirants get a rank-and-category estimate grounded in real counselling-round outcomes, instead of relying on forum threads and word-of-mouth during a narrow decision window.",
      "Every prediction can be traced back to the comparable historical ranks behind it, rather than presented as an unexplained number.",
      "Data that was previously inconsistent across sources and rounds is now normalized into one schema, making it usable for prediction at all.",
    ],
    lessons: [
      "Resisting the pull toward a more sophisticated model was the right call here — for a decision this consequential, aspirants trusted 'here's what happened to similar ranks before' more than a score they couldn't interrogate.",
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
