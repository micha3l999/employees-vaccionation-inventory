function generateRandowPass() {
  return pass = new Array(15).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0)
    .toString(36)[Math.random()<.5?"toString":"toUpperCase"]();});
}

function getUserCopy(user) {
  const copy = JSON.stringify(user);
  const response = JSON.parse(copy);
  delete response.password;
  return response;
}

module.exports = { 
  generateRandowPass,
  getUserCopy,
};
