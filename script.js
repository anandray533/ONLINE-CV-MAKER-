document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Set photo
  const photoInput = document.getElementById("photo");
  document.getElementById("cvPhoto").src = URL.createObjectURL(photoInput.files[0]);

  // Get field values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const objective = document.getElementById("objective").value.trim();
  const skills = document.getElementById("skills").value;
  const about = document.getElementById("about").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const projects = document.getElementById("projects").value;

  // Populate output
  document.getElementById("cvName").textContent = name;
  document.getElementById("cvEmail").textContent = email;
  document.getElementById("cvObjective").textContent = objective || generateObjective();
  document.getElementById("cvSkills").textContent = skills;
  document.getElementById("cvAbout").textContent = about;
  document.getElementById("cvExperience").textContent = experience;
  document.getElementById("cvEducation").textContent = education;
  document.getElementById("cvProjects").textContent = projects;

  // Show CV and download button
  document.getElementById("cvOutput").classList.remove("hidden");
  document.getElementById("downloadBtn").classList.remove("hidden");
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const element = document.querySelector(".cv-container");
  html2pdf().from(element).save("My_CV.pdf");
});

// AI-generated career objective (basic)
function generateObjective() {
  return "To obtain a challenging position where I can effectively contribute my skills and grow professionally in a dynamic organization.";
}
