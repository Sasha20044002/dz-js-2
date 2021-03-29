document.getElementById('fix-button').addEventListener('click', () => {
  let string = document.getElementById('regexp-source').value
  const regexp = new RegExp('\'', 'gmi');
  let newString = string.replace(regexp, '"');
  newString = newString.replace(/\b\"\b/gm, '\'');
  document.getElementById('regexp-output').value = newString;
})