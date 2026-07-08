const form = document.getElementById("registration-card");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzTgKry8CKMXrGCT__OqAYMfuV24blLNvN3-QQ0c2PcsIyHjCDzWY3Ma6VdQb3W7U0G/exec";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = document.querySelector(".submit-btn");
  submitButton.textContent = "Submitting...";
  submitButton.disabled = true;

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    teamName: document.getElementById("teamName").value,
    golfer2: document.getElementById("golfer2Name").value,
    golfer3: document.getElementById("golfer3Name").value,
    golfer4: document.getElementById("golfer4Name").value,
    shirt1: document.getElementById("captainShirtSize").value,
    shirt2: document.getElementById("golfer2ShirtSize").value,
    shirt3: document.getElementById("golfer3ShirtSize").value,
    shirt4: document.getElementById("golfer4ShirtSize").value,
    division: document.querySelector('input[name="division"]:checked').value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')
      .value,
  };

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(formData),
    });

    form.reset();
    form.style.display = "none";

    document.getElementById("successMessage").style.display = "block";

    // Scroll to the success message
    document.getElementById("successMessage").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }

  submitButton.textContent = "Submit Registration";
  submitButton.disabled = false;
});
