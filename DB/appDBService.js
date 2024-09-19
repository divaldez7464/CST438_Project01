import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export const addUser = async (db, name, user_name, password) => {
  if(db == null){
      db = useSQLiteContext()
  }
  console.log('addUser called with:', { name, user_name, password });
  try {
    const result = await db.runAsync(
      'INSERT INTO user (name, user_name, password) VALUES (?, ?, ?);',
      name, user_name, password
    );
    console.log('Insert successful:', result);
    return result;
  } catch (error) {
    console.error('Insert error:', error);
    throw error;
  }
};

export const getUserByUserName = async (db,user_name) => {
  if(db == null){
    db = useSQLiteContext()
  }
  console.log('getUserByUserName called with:', user_name);
  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM user WHERE user_name = ?;',
      user_name
    );
    console.log('Select Query:', result);
    return result;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

//legacy code: we were unable to create a customeWorkout portion
//export const addCustomWorkout = async (db,exercise,type, muscle, equipment ) => {
//  if(db == null){
//      db = useSQLiteContext()
//    }
//  console.log('addCustomWorkout called with:', { exercise,type, muscle, equipment });
//  try {
//    const result = await db.runAsync(
//      'INSERT INTO customWorkouts (exercise,type, muscle, equipment ) VALUES (?, ?, ?, ?);',
//      exercise,type, muscle, equipment
//    );
//    console.log('Insert successful:', result);
//    return result;
//  } catch (error) {
//    console.error('Insert error:', error);
//    throw error;
//  }
//};
//
////legacy code: we were unable to create a customeWorkout portion
//export const getCustomWorkouts = async (db,muscle) => {
//  if(db == null){
//    db = useSQLiteContext();
//  }
//  console.log('getCustomWorkouts called with:', muscle);
//  try {
//    const result = await db.getFirstAsync(
//      'SELECT * FROM customWorkouts WHERE muscle = ?;',
//      muscle
//    );
//    console.log('Select Query:', result);
//    return result;
//  } catch (error) {
//    console.error('Query error:', error);
//    throw error;
//  }
//};

export const addFavorites = async (db,user_name,name ) => {
  if(db == null){
      db = useSQLiteContext();
   }
  console.log('addFavorites called with:', { user_name,name });
  try {
    const result = await db.runAsync(
      'INSERT INTO favorites (user_name, exercise_name) VALUES (?, ?);',
      user_name,name
    );
    console.log('Insert successful:', result);
    return result;
  } catch (error) {
    console.error('Insert error:', error);
    throw error;
  }
};

export const getFavorites = async (db, userName) => {
    if(db == null){
      db = useSQLiteContext();
   }
  try {
    const result = await db.getAllAsync(
      'SELECT id, exercise_name FROM favorites WHERE user_name = ?',
      [userName]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const deleteFavorite = async (db,user_name, exercise_name) => {
   if(db == null){
      db = useSQLiteContext();
   }
  try {
    await db.runAsync(`DELETE FROM favorites WHERE exercise_name = ? AND user_name = ?`, [exercise_name, user_name]);
    console.log('Favorite deleted:', exercise_name);
    return 1;
  } catch (error) {
    console.error('Error deleting favorite:', error);
  }
};
