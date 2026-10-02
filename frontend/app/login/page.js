"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, LockKeyhole } from "lucide-react";
import Button from "../../components/common/Button";
import { ROLE_LABELS, ROLES } from "../../lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState(ROLES.STUDY_COORDINATOR);
  const [loading, setLoading] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    window.sessionStorage.setItem("ayutrac-role", role);
    window.setTimeout(() => router.push("/dashboard"), 350);
  };
  return <main className="login-page"><section className="login-brand"><div className="brand login-logo"><span className="brand-mark"><Activity size={22} /></span><span>AYU<span>TRAC</span></span></div><p>Clinical Trials Management System</p><div className="login-feature"><LockKeyhole size={18} /><span>Privacy-first clinical research operations for Ayurveda.</span></div></section><section className="login-panel"><div><span className="eyebrow">Secure access</span><h1>Welcome to AyuTRAC</h1><p>Choose a demonstration role to enter the clinical workspace.</p></div><form onSubmit={submit}><label>Role<select value={role} onChange={(e) => setRole(e.target.value)}>{Object.values(ROLES).map((value) => <option key={value} value={value}>{ROLE_LABELS[value]}</option>)}</select></label><label>Work email<input type="email" required defaultValue="coordinator@ayutrac.demo" /></label><Button type="submit" loading={loading} className="login-submit">Enter secure workspace</Button></form><small>Mock SSO/MFA entry point. Production authentication is enforced by the backend identity provider.</small></section></main>;
}

