var test = require('unit.js');


describe('Testing AppDataBase', function(){
  it('test read Logs', function(){
    // just for example of tested value
    var example = 'hello world';
    test
      .string(example)
        .startsWith('hello')
        .match(/[a-z]/)
      .given(example = 'you are welcome')
        .string(example)
          .endsWith('welcome')
          .contains('you')
      .when('"example" becomes an object', function(){
        example = {
          message: 'hello world',
          name: 'Nico',
          job: 'developper',
          from: 'France'
        };
      })
      .then('test the "example" object', function(){
        test
          .object(example)
            .hasValue('developper')
            .hasProperty('name')
            .hasProperty('from', 'France')
            .contains({message: 'hello world'})
        ;
      })
      .if(example = 'bad value')
        .error(function(){
          example.badMethod();
        })
    ;
  });

  it('test insert log', function(){

  });

  it('test read favorites', function(){

    });

  it('test insert favorites', function(){

    });

  it('test read user', function(){

   });

   it('test insert user', function(){
       // other tests ...
   });
});