const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");
const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

// querySelector() — at least one element / CSS selector
const bodyEl = document.querySelector("body");

// ---------- Initial state snapshot (used by resetProfile) ----------

const INITIAL_STATE = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  studentId: profileCard ? profileCard.dataset.studentId : "2026-001",
};


/**
 * isValidStudentName(name)
 * Returns true when the trimmed name contains at least 2 characters.
 */
function isValidStudentName(name) {
  if (typeof name !== "string") return false;
  return name.trim().length >= 2;
}

/**
 * formatStudentStatus(status)
 * Returns "Active" for "active" and "Inactive" for "inactive".
 */
function formatStudentStatus(status) {
  return status === "active" ? "Active" : "Inactive";
}



/**
 * setStatus(status)
 * Updates the profile status text, data-status value,
 * and active/inactive CSS classes without touching className directly.
 */
function setStatus(status) {
  if (!profileCard || !profileStatus) return;

  const normalizedStatus = status === "inactive" ? "inactive" : "active";


  profileStatus.textContent = formatStudentStatus(normalizedStatus);

  
  profileCard.dataset.status = normalizedStatus;

  
  if (normalizedStatus === "active") {
    profileCard.classList.add("active");
    profileCard.classList.remove("inactive");
  } else {
    profileCard.classList.add("inactive");
    profileCard.classList.remove("active");
  }
}

/**
 * updateProfile()
 * Validates the form, then updates the profile card using
 * the current control values. Uses textContent only.
 */
function updateProfile() {
  if (!nameInput || !programInput || !yearInput || !statusInput) return;

  const newName = nameInput.value;

  // Defensive validation
  if (!isValidStudentName(newName)) {
    if (formMessage) {
      formMessage.textContent = "Student name is required";
    }
    return; // Do not update the profile when invalid
  }

  // Verify elements exist before modifying
  if (profileName) profileName.textContent = newName.trim();
  if (profileProgram) profileProgram.textContent = programInput.value;
  if (profileYear) profileYear.textContent = yearInput.value;

  setStatus(statusInput.value);

  if (formMessage) {
    formMessage.textContent = "";
  }
}

/**
 * toggleDetails()
 * Shows or hides the details panel using classList.toggle().
 */
function toggleDetails() {
  if (!detailsPanel) return;
  detailsPanel.classList.toggle("hidden");
}

/**
 * toggleTheme()
 * Toggles the dark-theme class on document.body.
 */
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

/**
 * resetProfile()
 * Restores the exact initial profile data, status, controls,
 * message, details visibility, and theme.
 */
function resetProfile() {
  // Restore profile card text (safe content)
  if (profileName) profileName.textContent = INITIAL_STATE.name;
  if (profileProgram) profileProgram.textContent = INITIAL_STATE.program;
  if (profileYear) profileYear.textContent = INITIAL_STATE.year;

  setStatus(INITIAL_STATE.status);

  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = `Student ID: ${profileCard.dataset.studentId}`;
  }

 
  if (nameInput) nameInput.value = "";
  if (programInput) programInput.value = INITIAL_STATE.program;
  if (yearInput) yearInput.value = INITIAL_STATE.year;
  if (statusInput) statusInput.value = INITIAL_STATE.status;

 
  if (formMessage) formMessage.textContent = "";

  
  if (detailsPanel) detailsPanel.classList.remove("hidden");

  
  document.body.classList.remove("dark-theme");
}



if (updateBtn) updateBtn.addEventListener("click", updateProfile);
if (toggleDetailsBtn) toggleDetailsBtn.addEventListener("click", toggleDetails);
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
if (resetBtn) resetBtn.addEventListener("click", resetProfile);


if (studentIdDisplay && profileCard) {
  studentIdDisplay.textContent = `Student ID: ${profileCard.dataset.studentId}`;
}
