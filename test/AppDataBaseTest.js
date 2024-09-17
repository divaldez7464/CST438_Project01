import { addUser, getUserByUserName, addFavorites, getFavorites } from '../DB/appDBService';
import { jest } from '@jest/globals';

jest.mock('expo-sqlite');

describe('Database CRUD Operations (Mocked)', () => {
    it('should add a user successfully', async () => {

      //debug logs for sanity checks
      console.log('Running addUser test');
      const result = await addUser(null,'Roe Deer', 'Red Deer', 'red fox');
      console.log('addUser result:', result);

      expect(result.insertId).toBe(1);
    });

    it('should retrieve the added user by username', async () => {
      console.log('Running getUserByUserName test');

      await addUser(null,'Angel Bedolla', 'angel', 'password');
      const user = await getUserByUserName(null,'angel');
      console.log('getUserByUserName result:', user);

      expect(user).toBeDefined();

      expect(user.user_name).toBe('angel');
      expect(user.name).toBe('Angel Bedolla');
    });

    it('should add to favorites successfully', async () => {

      //deug logs for sanity checks
      console.log('Running addFavorites test');
      const result = await addFavorites(null,'angel','situps');
      console.log('addFavorites result:', result);

    expect(result.insertId).toBe(1);
    });

    it('should retrieve favorites by username', async () => {
      console.log('Running getFavorites test');

      await addFavorites(null,'angel','pushups');
      const favorites = await getFavorites(null,'angel');
      console.log('getFavorites result:', favorites);

      expect(favorites).toBeDefined();

      expect(favorites.user_name).toBe('angel');
      expect(favorites.exercise_name).toBe('pushups');
    });




});