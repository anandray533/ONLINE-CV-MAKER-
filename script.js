document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const objective = document.getElementById("objective").value || generateObjective(name);
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;
  const photo = document.getElementById("photo").files[0];

  // Insert data into CV
  document.getElementById("cvName").textContent = name;
  document.getElementById("cvEmail").textContent = email;
  document.getElementById("cvObjective").textContent = objective;
  document.getElementById("cvSkills").textContent = skills;
  document.getElementById("cvExperience").textContent = experience;

  const outputDiv = document.getElementById("cvOutput");

  // Load image
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("cvPhoto").src = e.target.result;
  };
  if (photo) {
    reader.readAsDataURL(photo);
  }

  // Animate CV output
  outputDiv.classList.remove("hidden");
  setTimeout(() => {
    outputDiv.classList.add("show");
  }, 100); // delay for smooth CSS animation
});

function generateObjective(name) {
  return `A highly motivated individual named ${name}, eager to contribute to team success through hard work and continuous learning.`;
}
