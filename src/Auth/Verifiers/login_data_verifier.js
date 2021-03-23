exports.login_data_verifier = function (username, password) {
  if (!username || !password) {
    return "Please fill empty fields";
  } else {
    if (username.length !== 8 || username.length > 8) {
      return "The user name provided is invalid";
    } else if (password.length < 9) {
      return "The password provided is invalid";
    }
  }

  return "ALL_GOOD";
};
