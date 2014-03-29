function define(key, value){
   Object.defineProperty(exports, key, {
      value: value,
      enumerable: true,
   });
}

define("SELECT_DISH_TABLE_QUERY","SELECT * FROM DISH WHERE DISH_NAME = ?");
