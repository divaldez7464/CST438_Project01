import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export const addUser = async (name, user_name, password) => {
    const db = useSQLiteContext();
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

