console.log('expo-sqlite mock loaded');

//source: https://jestjs.io/docs/manual-mocks
let mockDatabase = {
  user: [
    { id: 1, name: 'Angel Bedolla', user_name: 'angel', password: 'password' }
  ],
  favorites:[
    {id: 2, user_name:'angel', exercise_name: 'pushups'}
  ]
};

// Mocking useSQLiteContext, which is how database is being called
export const useSQLiteContext = () => ({
  execAsync: async (sql, params) => {
    console.log('execAsync called with SQL:', sql);
    console.log('execAsync called with params:', params);

    if (sql.startsWith('INSERT')) {
      console.log('Simulating insert success');
      return { insertId: 1 };
    } else if (sql.startsWith('SELECT')) {
      console.log('Simulating select success');
      const tableName = sql.match(/FROM (\w+)/)[1];
      if (!mockDatabase[tableName]) {
        throw new Error('Table not found');
      }
      const results = mockDatabase[tableName].filter(row =>
        row.user_name === params[0]
      );
      console.log('Simulating SELECT with results:', results);
      return { rows: { _array: results } };
    } else {
      throw new Error('Unknown SQL command');
    }
  },

  // Mocking runAsync
  runAsync: async (sql, ...params) => {
    console.log('runAsync called with SQL:', sql);
    console.log('runAsync called with params:', params);

    if (sql.startsWith('INSERT')) {
      console.log('Simulating insert success');
      return { insertId: 1 };
    } else if (sql.startsWith('UPDATE') || sql.startsWith('DELETE')) {
      console.log('Simulating update/delete success');
      return { changes: 1 };
    } else {
      throw new Error('Unknown SQL command');
    }
  },

  // Mocking getFirstAsync
  getFirstAsync: async (sql, params) => {
    console.log('getFirstAsync called with SQL:', sql);
    console.log('getFirstAsync called with params:', params);

    if (sql.startsWith('SELECT')) {
      const tableName = sql.match(/FROM (\w+)/)[1];
      if (!mockDatabase[tableName]) {
        throw new Error('Table not found');
      }
      console.log('finding table: ',tableName);
      var result;
      if(mockDatabase[tableName][0].user_name == params){
        result = mockDatabase[tableName][0] }
      else{
        result = false;
      }
      console.log('Simulating getFirstAsync with result:', result);
      return result || null;
    } else {
      throw new Error('Unknown SQL command');
    }
  },

  // Mocking getAllAsync
    getAllAsync: async (sql, params) => {
      console.log('getAllAsync called with SQL:', sql);
      console.log('getAllAsync called with params:', params);

      if (sql.startsWith('SELECT')) {
        const tableName = sql.match(/FROM (\w+)/)[1];
        if (!mockDatabase[tableName]) {
          throw new Error('Table not found');
        }
        console.log('finding table: ',tableName);
        var result;
        if(mockDatabase[tableName][0].user_name == params){
          result = mockDatabase[tableName][0] }
        else{
          result = false;
        }
        console.log('Simulating getAllAsync with result:', result);
        return result || null;
      } else {
        throw new Error('Unknown SQL command');
      }
    }
});