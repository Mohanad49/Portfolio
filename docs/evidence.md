# Content evidence ledger

Verified on 2026-10-22. This record supports portfolio copy; it is not a claim
that historical test runs were repeated for the new website.

## Source precedence

The owner's supplied resume governs employment, education, contact details, and
workplace scope. Public project source at the commits below governs technical
case studies. The current LinkedIn profile corroborates the professional role
and credentials. Unknown facts stay omitted.

## Retained public sources

| Project | Source commit | Public evidence |
| --- | --- | --- |
| TestPulse | 7d9ac7a3466889265bb0799a2f96aed759481084 | [Pinned README](https://github.com/Mohanad49/testpulse/blob/7d9ac7a3466889265bb0799a2f96aed759481084/README.md) |
| Cal.diy QA Strategy | f7e5dcb77e8098a4f38825900039296b8e11598d | [Pinned README](https://github.com/Mohanad49/caldiy-qa-strategy/blob/f7e5dcb77e8098a4f38825900039296b8e11598d/README.md) |
| LLM Evaluation Harness | 8dcc8334d99e2ed9fdb74bd87405ebd6152564db | [Pinned README](https://github.com/Mohanad49/llm-eval-harness/blob/8dcc8334d99e2ed9fdb74bd87405ebd6152564db/README.md) |

Full public README snapshots are kept in the ignored .research directory for
local copy verification. Public copy links to the retained source commits.

## Claim boundaries

### Professional experience

- Blue Ribbon: 22+ modules, 2,500+ authored cases, 500+ defects driven to resolution,
  and 85% automated regression coverage of the admin portal, as stated in the
  supplied resume. Do not generalize 85% to the complete platform or mobile app.
- Atos: 90+ cases across 25 user stories; internship and PDPC project involvement
  retain their stated role and dates. Do not imply sole ownership of the programme.
- Employer art is conceptual. Internal screenshots, production data, and private
  implementation material are not inputs to generated assets or public copy.
- Credentials: ISTQB CTFL 4.0 and the ML specialization are supported by the resume.
- No claims about money saved, increased revenue, reduced production incidents,
  test execution speedups, team size, or external adoption without further evidence.

### TestPulse

- Four supported input families: JUnit, Playwright, PyTest, Allure.
- Same-commit findings and rolling-window inference are different evidence types.
- Retry information can be unavailable, which is distinct from zero retries.
- The public demo is a static export of real CI results, with its own freshness.
- Quarantine expiry records ageing; it does not automatically re-enable a test.
- No claim of a hosted live API behind the public static dashboard.

### Cal.diy

- Controlled target: Cal.diy v6.2.0 at upstream source
  1c193cca8682b33b9866c792186033f7ef886682, not hosted Cal.com.
- Recorded final audit: API 13/13, BDD 3/3, timezone/DST 14/14, and capacity-one
  contention with one success and 19 expected conflicts. These are dated results.
- Accessibility: one of three surfaces passed and two remained red. Do not turn
  that into a green whole-project badge.
- Two public contract-defect reports exist. Do not call them fixed or accepted
  without checking their current issue state.
- Local Docker latency is not a production performance SLO.

### LLM harness

- Judge measurement: 45 blind human labels, raw agreement 82% with 95% interval
  69-91%, Cohen's kappa 0.51. This small-sample measurement does not generalize.
- Refusal-judge scores are excluded from gates. Other judge dimensions are not
  validated; they must not appear as measured quality results.
- Replay is the default CI mode. Do not describe it as nightly live-provider testing.
- Findings concern the included local-model RAG system, not hosted commercial LLMs.
- Implemented but unused metrics and proposed provider adapters stay out of claims.

## Publication checks still required

- Recheck every source/demo/report link from the final rendered pages.
- Review the final visible copy against this ledger and the supplied resume.
- Ensure development notes and prompt sidecars are not shipped as public assets.
