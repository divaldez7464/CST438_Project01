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

export const addCustomWorkout = async (db,exercise,type, muscle, equipment ) => {
  if(db == null){
      db = useSQLiteContext()
    }
  console.log('addCustomWorkout called with:', { exercise,type, muscle, equipment });
  try {
    const result = await db.runAsync(
      'INSERT INTO customWorkouts (exercise,type, muscle, equipment ) VALUES (?, ?, ?, ?);',
      exercise,type, muscle, equipment
    );
    console.log('Insert successful:', result);
    return result;
  } catch (error) {
    console.error('Insert error:', error);
    throw error;
  }
};

export const getCustomWorkouts = async (db,muscle) => {
  if(db == null){
    db = useSQLiteContext();
  }
  console.log('getCustomWorkouts called with:', muscle);
  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM customWorkouts WHERE muscle = ?;',
      muscle
    );
    console.log('Select Query:', result);
    return result;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

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
  try {
    const result = await db.getAllAsync(
      'SELECT id, exercise_name FROM favorites WHERE user_name = ?',
      [userName]
    );
    return result;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};


export const deleteFavorite = async (db, exerciseId) => {
  try {
    await db.runAsync(`DELETE FROM favorites WHERE id = ?`, [exerciseId]);
    console.log('Favorite deleted:', exerciseId);
  } catch (error) {
    console.error('Error deleting favorite:', error);
  }
};


const handleDelete = async (exerciseId) => {
    try {
      console.log('Deleting favorite with id:', exerciseId);  // Log the ID before deletion

      // Remove from the database
      await deleteFavorite(db, exerciseId);

      console.log('Favorite deleted successfully.');

      // Update the UI
      setData(prevData => prevData.filter(item => item.id !== exerciseId));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };
