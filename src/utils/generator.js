const passwordGenerate = (length) => {
  let characters =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPGHJKLZXCVBNM[];',./?><:!@#$%^&*()_+=-";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

module.exports = {
  passwordGenerate
};
