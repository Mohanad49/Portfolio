interface RecordedObservation { runId: number; startedAt: string; status: 'passed' | 'failed'; retryCount: null; }
interface RecordedHistory { suite: string; test: string; commit: string; exportedAt: string; source: string; observations: RecordedObservation[]; }

// Frozen public observations verified in docs/experience/testpulse-evidence.json.
export const experienceHistory = {
  suite: 'caldiy-api-v2',
  test: 'test_booking_lifecycle',
  commit: '5c0869a1ddaf9aedc8f05d3d0cccc8c7b4dcc3a2',
  exportedAt: '2026-10-23T08:12:11.869191+00:00',
  source: 'https://testpulse-eight.vercel.app/data/suite-0.json',
  observations: [
    { runId: 1220, startedAt: '2026-09-14T09:22:01.130320+00:00', status: 'passed', retryCount: null },
    { runId: 1224, startedAt: '2026-09-14T09:31:25.423954+00:00', status: 'failed', retryCount: null },
    { runId: 1364, startedAt: '2026-09-21T09:02:13.068837+00:00', status: 'passed', retryCount: null },
  ],
} satisfies RecordedHistory;
