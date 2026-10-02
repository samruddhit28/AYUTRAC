const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Unable to complete request");
  }
  return response.json();
}

export const studyApi = {
  list: () => request("/studies"),
  get: (id) => request(`/studies/${id}`),
  create: (data) => request("/studies", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/studies/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/studies/${id}`, { method: "DELETE" }),
};

export const participantApi = {
  list: () => request("/participants"),
  create: (data) => request("/participants", { method: "POST", body: JSON.stringify(data) }),
};

export const safetyApi = {
  list: () => request("/safety"),
  create: (data) => request("/safety", { method: "POST", body: JSON.stringify(data) }),
};

export const regulatoryApi = {
  list: () => request("/regulatory"),
  create: (data) => request("/regulatory", { method: "POST", body: JSON.stringify(data) }),
};

export const reportApi = { list: () => request("/reports") };

