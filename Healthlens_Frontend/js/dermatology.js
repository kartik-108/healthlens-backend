// dermatology.js
// Auto-select department on appointment page if needed in future
const params = new URLSearchParams(window.location.search);
const dept = params.get("dept");

if (dept) {
  document.getElementById("departmentSelect")?.value = dept;
}
