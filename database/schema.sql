CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(64) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(160) NOT NULL,
  sso_subject VARCHAR(255) UNIQUE,
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_number VARCHAR(64) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  phase VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Setup',
  target_enrollment INTEGER NOT NULL CHECK (target_enrollment > 0),
  enrolled_count INTEGER NOT NULL DEFAULT 0 CHECK (enrolled_count >= 0),
  principal_investigator VARCHAR(160) NOT NULL,
  protocol_version VARCHAR(64) NOT NULL,
  start_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
  site_code VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(128),
  status VARCHAR(32) NOT NULL DEFAULT 'Setup',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(study_id, site_code)
);

CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pseudonym VARCHAR(80) UNIQUE NOT NULL,
  study_id UUID NOT NULL REFERENCES studies(id),
  site_id UUID NOT NULL REFERENCES sites(id),
  screening_status VARCHAR(32) NOT NULL,
  enrollment_date DATE,
  current_visit VARCHAR(80),
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  visit_name VARCHAR(120) NOT NULL,
  scheduled_date DATE,
  completed_date DATE,
  status VARCHAR(32) NOT NULL DEFAULT 'Planned',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE monitoring_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id),
  site_id UUID NOT NULL REFERENCES sites(id),
  monitor_id UUID REFERENCES users(id),
  record_type VARCHAR(64) NOT NULL,
  severity VARCHAR(32),
  finding TEXT NOT NULL,
  due_date DATE,
  status VARCHAR(32) NOT NULL DEFAULT 'Open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE adverse_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id),
  participant_id UUID REFERENCES participants(id),
  event_code VARCHAR(80) NOT NULL,
  severity VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Open',
  onset_date DATE NOT NULL,
  narrative TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE serious_adverse_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id),
  participant_id UUID REFERENCES participants(id),
  adverse_event_id UUID REFERENCES adverse_events(id),
  sae_number VARCHAR(80) UNIQUE NOT NULL,
  severity VARCHAR(32) NOT NULL DEFAULT 'Serious',
  status VARCHAR(32) NOT NULL DEFAULT 'Open',
  onset_date DATE NOT NULL,
  expedited_due_date DATE,
  narrative TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE regulatory_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID REFERENCES studies(id),
  category VARCHAR(32) NOT NULL,
  title VARCHAR(255) NOT NULL,
  owner_role VARCHAR(64) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID REFERENCES studies(id),
  uploaded_by UUID REFERENCES users(id),
  document_type VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  storage_key VARCHAR(500) NOT NULL,
  checksum VARCHAR(128),
  review_status VARCHAR(32) NOT NULL DEFAULT 'Pending review',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id),
  participant_id UUID REFERENCES participants(id),
  site_id UUID REFERENCES sites(id),
  query_text TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Open',
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(80) NOT NULL,
  entity VARCHAR(80) NOT NULL,
  entity_id UUID,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET,
  previous_value JSONB,
  new_value JSONB
);

CREATE INDEX idx_sites_study_id ON sites(study_id);
CREATE INDEX idx_participants_study_id ON participants(study_id);
CREATE INDEX idx_visits_participant_id ON visits(participant_id);
CREATE INDEX idx_monitoring_open ON monitoring_records(study_id, status);
CREATE INDEX idx_ae_study_id ON adverse_events(study_id);
CREATE INDEX idx_sae_study_id ON serious_adverse_events(study_id);
CREATE INDEX idx_deadlines_due_date ON regulatory_deadlines(due_date);
CREATE INDEX idx_audit_entity ON audit_logs(entity, entity_id);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER roles_updated BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER studies_updated BEFORE UPDATE ON studies FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER sites_updated BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER participants_updated BEFORE UPDATE ON participants FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER visits_updated BEFORE UPDATE ON visits FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER monitoring_updated BEFORE UPDATE ON monitoring_records FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER ae_updated BEFORE UPDATE ON adverse_events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER sae_updated BEFORE UPDATE ON serious_adverse_events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER regulatory_updated BEFORE UPDATE ON regulatory_deadlines FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER documents_updated BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER queries_updated BEFORE UPDATE ON queries FOR EACH ROW EXECUTE FUNCTION set_updated_at();

