const departments = [
  {
    id: "cardiology",
    name: "❤️ Cardiology",
    desc: "Comprehensive heart care and advanced treatments."
  },
  {
    id: "neurology",
    name: "🧠 Neurology",
    desc: "Specialized care for brain and nervous system disorders."
  },
  {
    id: "orthopedics",
    name: "🦴 Orthopedics",
    desc: "Bone, joint and musculoskeletal care."
  },
  {
    id: "pediatrics",
    name: "👶 Pediatrics",
    desc: "Healthcare for infants and children."
  },
  {
    id: "oncology",
    name: "💉 Oncology",
    desc: "Advanced cancer care and treatments."
  }
];

const grid = document.getElementById("departmentGrid");

departments.forEach(dep => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${dep.name}</h3>
    <p>${dep.desc}</p>
    <a href="department.html?type=${dep.id}">View Details</a>
  `;

  grid.appendChild(card);
});
