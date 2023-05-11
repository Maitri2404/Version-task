function validateUsername(username) {
    const regex = /^[A-Z][A-Z0-9]+$/;
    return regex.test(username);
  }
  
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$!%*?&_]){8,16}/;
    return regex.test(password);
  }
  
  module.exports = { validateUsername, validatePassword };