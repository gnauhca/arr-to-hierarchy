var arrToHierarchy = require('../src/arr-to-hierarchy.js');
var expect = require('chai').expect;

describe('parse test', function() {
    var testarr = [
        {
            'HIGHSCHOOL': 'high school A',
            'GRADE': '1',
            'CLASS': 'class A',
            'NAME': 'Jack',
            'AGE': '19'
        }
    ];

    var correct = [
        {
            'highschool': 'high school A',
            'grades': [
                {
                    'grade': '1',
                    'classes': [
                        {
                            'class': 'class A',
                            'classmate': [
                                {
                                    'name': 'Jack',
                                    'age': '19'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    var keyMap = {
        'highschool': 'HIGHSCHOOL',
        'grade': 'GRADE',
        'class': 'CLASS',
        'name': 'NAME',
        'age': 'AGE'
    };
    var hierarchyCfg = [
        {
            'key': 'highschool',
            'next': 'grades'
        },
        {
            'key': 'grade',
            'next': 'classes'
        },
        {
            'key': 'class',
            'next': 'classmate'
        }       

    ];

    var result = arrToHierarchy(testarr, hierarchyCfg, keyMap);
    
    it('Get correct hierarchy', function() {
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(correct));
    });
});





