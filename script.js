const form = document.getElementById("cvForm");
const downloadBtn = document.getElementById("downloadBtn");

const fields = [
  "name", "email", "objective", "skills", "about",
  "experience", "education", "projects"
];

// Load saved data on page load
window.addEventListener("load", () => {
  fields.forEach(field => {
    const saved = localStorage.getItem(field);
    if (saved) document.getElementById(field).value = saved;
  });
  updatePreview();
});

// Save data to localStorage and update preview live
fields.forEach(field => {
  const input = document.getElementById(field);
  input.addEventListener("input", () => {
    localStorage.setItem(field, input.value);
    updatePreview();
  });
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const photo = document.getElementById("photo");
  if (photo.files.length > 0) {
    document.getElementById("cvPhoto").src = URL.createObjectURL(photo.files[0]);
  }

  const name = document.getElementById("name").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;

  let objective = document.getElementById("objective").value;
  if (!objective) {
    objective = await generateObjectiveAI(name, skills, experience);
    document.getElementById("objective").value = objective;
  }

  updatePreview();
  document.getElementById("cvOutput").classList.remove("hidden");
  downloadBtn.classList.remove("hidden");
});

downloadBtn.addEventListener("click", function () {
  const element = document.getElementById("cvContainer");
  html2pdf()
    .set({ margin: 10, filename: "My_CV.pdf", image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } })
    .from(element)
    .save();
});

// Update preview elements
function updatePreview() {
  const getVal = id => document.getElementById(id).value;
  document.getElementById("cvName").textContent = getVal("name");
  document.getElementById("cvEmail").textContent = getVal("email");
  document.getElementById("cvObjective").textContent = getVal("objective");
  document.getElementById("cvSkills").textContent = getVal("skills");
  document.getElementById("cvAbout").textContent = getVal("about");
  document.getElementById("cvExperience").textContent = getVal("experience");
  document.getElementById("cvEducation").textContent = getVal("education");
  document.getElementById("cvProjects").textContent = getVal("projects");
}

// Simulated AI objective generation — replace with OpenAI API if needed
async function generateObjectiveAI(name, skills, experience) {
  return `To leverage my experience in ${experience || "technology"} and skills in ${skills || "multiple domains"} to grow professionally and contribute to impactful projects.`;
}
