function define(key, value){
   Object.defineProperty(exports, key, {
      value: value,
      enumerable: true,
   });
}

define("SELECT_DISH_TABLE_QUERY","SELECT DISH_ID FROM DISH WHERE DISH_NAME = '$1'");
define("SELECT_HOTEL_TABLE_QUERY","SELECT HOTEL_ID FROM HOTEL WHERE HOTEL_NAME = '$1'");
//There can be more than one review for the hotel_dish. All the review id has to be fetched.- sort the data by time.
define("SELECT_REVIEW_TABLE_QUERY","SELECT REVIEW_ID FROM REVIEW WHERE HOTEL_DISH_ID = '$1'");
define("INSERT_REVIEW_TABLE_QUERY","INSERT INTO REVIEW VALUES('$1','$2','$3','$4','$5','$6','$7','$8','$9','$10')");
define("INSERT_DISH_TABLE_QUERY","INSERT INTO DISH VALUES('$1','$2','$3','$4')");
define("UPDATE_DISH_TABLE_QUERY","UPDATE DISH SET DISH_NAME = '$1' WHERE DISH_NAME='$2'");
define("INSERT_HOTEL_TABLE_QUERY","INSERT INTO HOTEL VALUES('$1','$2','$3','$4','$5','$6')");
define("DELETE_DISH_TABLE_QUERY","DELETE FROM DISH WHERE DISH_NAME='$1'");
