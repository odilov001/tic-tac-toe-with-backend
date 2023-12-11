const baseURL = "http://localhost:4000/api";

export const http = {
  get: (suffixURL: string) => fetch(baseURL + suffixURL),
  // delete: (suffixURL: string) => fetch(baseURL + suffixURL, { method: "DELETE" }),
  post: (suffixURL: string, body: BodyInit) => fetch(baseURL + suffixURL, { method: "POST", headers: { "content-type": "application/json" }, body }),
  patch: (suffixURL: string, body: BodyInit) => fetch(baseURL + suffixURL, { method: "PATCH", headers: { "content-type": "application/json" }, body })
};
