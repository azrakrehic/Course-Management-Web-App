var string1=`{
    "stats": {
      "suites": 2,
      "tests": 2,
      "passes": 2,
      "pending": 0,
      "failures": 0,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
    "tests": [
      {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    "pending": [],
    "failures": [],
    "passes": [
    {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        },
        {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ]
  }
  `;

var string2=`{
    "stats": {
      "suites": 2,
      "tests": 2,
      "passes": 1,
      "pending": 0,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
    "tests": [
      {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    "pending": [],
    "failures": [
    {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ],
    "passes": [
    {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ]
  }
  `;

var string3=`{
    "stats": {
      "suites": 2,
      "tests": 2,
      "passes": 0,
      "pending": 0,
      "failures": 2,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
    "tests": [
      {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    "pending": [],
    "failures": [
    {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        },
        {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ],
    "passes": []
  }
  `;

  var string4 = `{
    "stats": {
      "suites": 2,
      "tests": 2,
      "passes": 0,
      "pending": 1,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
    "tests": [
      {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    "pending": [
    	{
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }],
    "failures": [
    {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ],
    "passes": []
  }
  `;

  var string5 = `{
: {
      "suites": 2,
      "tests": 2,
      "passes": 0,
      "pending": 1,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },    "tests": [
      {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    "pending": [],
    "failures": [
    {
        "title": "T1",
        "fullTitle": "TEST 1 dajTacnost",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        },
        {
        "title": "T2",
        "fullTitle": "TEST 2 dajTacnost",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
        }
    ],
    "passes": []
  }
  `;


let assert = chai.assert;
describe('TestoviParser', function() {
 describe('dajTacnost()', function() {
   it('Prolaze svi testovi', function() {
       assert.deepEqual(TestoviParser.dajTacnost(string1), {"tacnost":"100%","greske":[]} ,"Trebaju prolaziti svi testovi");
     });
   it('Jedan test prolazi, jedan ne prolazi', function() {
   	 assert.deepEqual(TestoviParser.dajTacnost(string2), {"tacnost":"50%","greske":["TEST 2 dajTacnost"]} ,"Jedna greska, 50% prolazi");
   });
    it('Padaju svi testovi', function() {
       assert.deepEqual(TestoviParser.dajTacnost(string3), {"tacnost":"0%","greske":["TEST 1 dajTacnost", "TEST 2 dajTacnost" ]} ,"Trebaju padati svi testovi");
     });
    it('Nemoguce izvrsiti testove (pending)', function() {
       assert.deepEqual(TestoviParser.dajTacnost(string4), {"tacnost":"0%","greske":["Testovi se ne mogu izvršiti" ]} ,"Pending razlicit od nule");
     });

    it('Nemoguce izvrsiti testove (fali stats)', function() {
       assert.deepEqual(TestoviParser.dajTacnost(string5), {"tacnost":"0%","greske":["Testovi se ne mogu izvršiti" ]} ,"Trebaju padati svi testovi, nema stats!");
     });

 });
});



