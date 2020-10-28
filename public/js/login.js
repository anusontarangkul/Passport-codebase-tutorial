// Providing a way to run JavaScript code when DOM is safe to be manipulated
$(document).ready(function () {
  // Getting references to our form and inputs

  // Seting loginForm variable to html element
  var loginForm = $("form.login");
  // Setting email input variable to html element
  var emailInput = $("input#email-input");
  // Setting password input variable to html element
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    // Preventing the form from submitting
    event.preventDefault();
    // Creating object variable to set the properties of email and password to the respective values
    var userData = {
      // Obtaining emailInput value and trimming white spaces
      email: emailInput.val().trim(),
      // Obtaining passwordInput value and trimming white spaces
      password: passwordInput.val().trim()
    };
    // Validating email and password are not blank.
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    // Clearing emailInput form
    emailInput.val("");
    // Clearing passwordInput form
    passwordInput.val("");
  });

  // loginUser function taking in the email and password
  function loginUser(email, password) {
    // posting the email and password keys on login route
    $.post("/api/login", {
      email: email,
      password: password
    })
      // If successful post
      .then(function () {
        // redirecting to members area
        window.location.replace("/members");
        // If there's an error
      })
      // If there's an error
      .catch(function (err) {
        // Console log the error
        console.log(err);
      });
  }
});
