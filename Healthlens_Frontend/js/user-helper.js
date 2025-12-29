async function getUserProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
