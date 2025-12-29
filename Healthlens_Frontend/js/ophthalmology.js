// Auto-fill department on appointment page
const params = new URLSearchParams(window.location.search);
const dept = params.get("dept");

if (dept) {
  const select = document.getElementById("departmentSelect");
  if (select) {
    select.value = dept;
  }
}
