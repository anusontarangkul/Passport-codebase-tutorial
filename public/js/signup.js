// Providing a way to run JavaScript code when DOM is safe to be manipulated
$(document).ready(function () {
  // Getting references to our form and input

  // Assigning signupForm variable to html element
  var signUpForm = $("form.signup");
  // Assigning emailInput variable to html element
  var emailInput = $("input#email-input");
  // Assigning passwordInput variable to html element
  var passwordInput = $("input#password-input");

  // When the signup button is clicked,
  signUpForm.on("submit", function (event) {
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
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    // Clearing emailInput form
    emailInput.val("");
    // Clearing passwordInput form
    passwordInput.val("");
  });

  // Doing a post to the signup route.
  function signUpUser(email, password) {
    $.post("/api/signup", {
      // Entering the email and password to it's respective key value pair
      email: email,
      password: password
    })
      // If successful post
      .then(function (data) {
        // Redirecting to members page
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  // Creating function to handle login errors
  function handleLoginErr(err) {
    // Alerting to user with the error
    $("#alert .msg").text(err.responseJSON);
    // Creating fadeIn effect
    $("#alert").fadeIn(500);
  }
});
