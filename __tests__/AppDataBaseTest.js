//to run test
import { addUser, getUserByUserName } from '../DB/appDBService';
import { jest } from '@jest/globals';

jest.mock('expo-sqlite');

describe('Database CRUD Operations (Mocked)', () => {
  it('should add a user successfully', async () => {

    //deug logs for sanity checks
    console.log('Running addUser test');
    const result = await addUser('Roe Deer', 'Red Deer', 'red fox');
    console.log('addUser result:', result);

    expect(result.insertId).toBe(1);
  });

  it('should retrieve the added user by username', async () => {
      console.log('Running getUserByUserName test');

      await addUser('Angel Bedolla', 'angel', 'password');
      const user = await getUserByUserName(null,'angel');
      console.log('getUserByUserName result:', user);

      expect(user).toBeDefined();

      expect(user.user_name).toBe('angel');
      expect(user.name).toBe('Angel Bedolla');
    });

});


