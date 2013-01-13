if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) { return i; }
    }

    return -1;
  }
}

/*
  function findIndexByKeyValue: finds "key" key inside "ob" object that equals "value" value
  example: findIndexByKeyValue(students, 'name', "Jim");
  object: students = [
     {name: 'John', age: 100, profession: 'Programmer'},
     {name: 'Jim', age: 50, profession: 'Carpenter'}
  ];
  would find the index of "Jim" and return 1
*/
function findIndexByKeyValue (obj, key, value) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i][key] == value) {
      return i;
    }
  }
  return null;
}