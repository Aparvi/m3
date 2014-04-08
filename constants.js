function define(key, value){
   Object.defineProperty(exports, key, {
      value: value,
      enumerable: true,
   });
}

define("SELECT_DISH_TABLE_QUERY","SELECT DISH_ID FROM DISH WHERE DISH_NAME = '$1'");
define("SELECT_HOTEL_TABLE_QUERY","SELECT HOTEL_ID FROM HOTEL WHERE HOTEL_NAME = '$1'");
define("SELECT_REVIEW_TABLE_QUERY","SELECT REVIEW_ID FROM REVIEW WHERE HOTEL_DISH_ID = '$1'");
define("INSERT_DISH_TABLE_QUERY","INSERT INTO DISH VALUES('$1','$2','$3','$4')");
