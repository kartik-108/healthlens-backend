// department.js

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const titleEl = document.getElementById("pageTitle");
const nameEl = document.getElementById("deptName");
const descEl = document.getElementById("deptDesc");
const doctorList = document.getElementById("doctorList");

// Temporary static data (backend later)
const departments = {
  cardiology: {
    name: "Cardiology",
    desc: "Advanced heart care and cardiac treatments.",
    doctors: ["Dr. Sharma", "Dr. Mehta"]
  },
  neurology: {
    name: "Neurology",
    desc: "Brain and nervous system care.",
    doctors: ["Dr. Rao", "Dr. Singh"]
  }
};

if (!type || !departments[type]) {
  nameEl.innerText = "Department not found";
  descEl.innerText = "";
} else {
  const dept = departments[type];

  titleEl.innerText = `${dept.name} | HealthLens`;
  nameEl.innerText = dept.name;
  descEl.innerText = dept.desc;

  dept.doctors.forEach(d => {
    const div = document.createElement("div");
    div.innerText = d;
    doctorList.appendChild(div);
  });
}
