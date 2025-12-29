function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");

  let bgColor = "bg-blue-500";
  if (type === "success") bgColor = "bg-green-500";
  if (type === "error") bgColor = "bg-red-500";
  if (type === "warning") bgColor = "bg-yellow-500";

  toast.className = `
    ${bgColor}
    text-white px-4 py-3 rounded-lg shadow-lg
    animate-fadeIn
  `;

  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, duration);
}
