// Login Form Submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple validation
  if (username === "admin" && password === "password") {
    window.location.href = "index.html"; // Redirect to main page
  } else {
    alert("Invalid username or password. Please try again.");
    alert("This is a invalid form submision so please try again");

  }
});

// Smooth Scroll to Staff Profiles Section
document.getElementById("explore-button").addEventListener("click", () => {
  document.getElementById("staff").scrollIntoView({ behavior: "smooth" });
});

// Scroll-triggered animations
gsap.utils.toArray(".feature-card, .profile-card").forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
  });
});

// Upvote Functionality
document.querySelectorAll(".upvote-button").forEach(button => {
  button.addEventListener("click", () => {
    const upvoteCount = button.querySelector(".upvote-count");
    upvoteCount.textContent = parseInt(upvoteCount.textContent) + 1;
  });
});

// Add New Staff Member
document.getElementById("add-staff-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newStaff = {
    name: document.getElementById("staff-name").value,
    role: document.getElementById("staff-role").value,
    interests: document.getElementById("staff-interests").value,
    image: document.getElementById("staff-image").value,
    upvotes: 0,
  };
  staffData.push(newStaff);
  renderStaffProfiles();
  e.target.reset();
});

// Render Staff Profiles
function renderStaffProfiles() {
  const profileGrid = document.getElementById("profile-grid");
  profileGrid.innerHTML = "";
  staffData.forEach((staff, index) => {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";
    profileCard.innerHTML = `
      <img src="${staff.image}" alt="${staff.name}">
      <h3>${staff.name}</h3>
      <p>${staff.role}</p>
      <p class="interests">${staff.interests}</p>
      <button class="upvote-button">👍 Upvote <span class="upvote-count">${staff.upvotes}</span></button>
    `;
    profileGrid.appendChild(profileCard);
  });
}

// Initial Render
renderStaffProfiles();