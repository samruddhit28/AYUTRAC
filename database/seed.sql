INSERT INTO roles (id, name) VALUES
  ('10000000-0000-0000-0000-000000000001', 'ADMIN'),
  ('10000000-0000-0000-0000-000000000002', 'PRINCIPAL_INVESTIGATOR'),
  ('10000000-0000-0000-0000-000000000003', 'STUDY_COORDINATOR'),
  ('10000000-0000-0000-0000-000000000004', 'MONITOR'),
  ('10000000-0000-0000-0000-000000000005', 'ETHICS_COMMITTEE'),
  ('10000000-0000-0000-0000-000000000006', 'PHARMACOVIGILANCE'),
  ('10000000-0000-0000-0000-000000000007', 'LEADERSHIP')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (id, role_id, email, display_name, mfa_enabled) VALUES
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'coordinator@ayutrac.demo', 'Research Coordinator', TRUE),
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'pi@ayutrac.demo', 'Dr. Meera Iyer', TRUE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO studies (id, protocol_number, title, phase, status, target_enrollment, enrolled_count, principal_investigator, protocol_version, start_date) VALUES
  ('20000000-0000-0000-0000-000000000001', 'AYU-CT-001', 'Ayurveda Integrative Care Study', 'Phase II', 'Recruiting', 200, 144, 'Dr. Meera Iyer', 'v2.1', '2026-04-15'),
  ('20000000-0000-0000-0000-000000000002', 'AYU-CT-002', 'Traditional Medicine Safety Study', 'Phase III', 'Monitoring', 150, 81, 'Dr. Arjun Nair', 'v1.4', '2026-06-02'),
  ('20000000-0000-0000-0000-000000000003', 'AYU-CT-003', 'Ayurvedic Intervention Trial', 'Phase II', 'Setup', 150, 42, 'Dr. Kavita Sharma', 'v1.0', '2026-08-28')
ON CONFLICT (protocol_number) DO NOTHING;

INSERT INTO sites (id, study_id, site_code, name, city, status) VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'AIIA-01', 'All India Institute of Ayurveda', 'New Delhi', 'Active'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'KLE-02', 'KLE Ayurveda Hospital', 'Belagavi', 'Active'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'NIA-03', 'National Institute of Ayurveda', 'Jaipur', 'Active')
ON CONFLICT (study_id, site_code) DO NOTHING;

INSERT INTO participants (id, pseudonym, study_id, site_id, screening_status, enrollment_date, current_visit, status) VALUES
  ('40000000-0000-0000-0000-000000000001', 'P-AYU-00144', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Enrolled', '2026-09-21', 'Week 12', 'Active'),
  ('40000000-0000-0000-0000-000000000002', 'P-AYU-00281', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'Enrolled', '2026-09-18', 'Month 3', 'Active')
ON CONFLICT (pseudonym) DO NOTHING;

INSERT INTO regulatory_deadlines (study_id, category, title, owner_role, due_date, status) VALUES
  ('20000000-0000-0000-0000-000000000001', 'CTRI', 'CTRI Registration', 'STUDY_COORDINATOR', '2026-10-12', 'Due Soon'),
  ('20000000-0000-0000-0000-000000000003', 'IEC', 'IEC Approval Evidence', 'ETHICS_COMMITTEE', '2026-10-16', 'On Track'),
  ('20000000-0000-0000-0000-000000000002', 'GCP', 'Safety Report', 'PHARMACOVIGILANCE', '2026-10-20', 'On Track');

INSERT INTO adverse_events (study_id, participant_id, event_code, severity, status, onset_date, narrative) VALUES
  ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'AE-1042', 'Moderate', 'Open', '2026-09-30', 'Transient gastrointestinal discomfort reported at Week 12.');

