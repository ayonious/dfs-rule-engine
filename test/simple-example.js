const {executeEngine} = require('../src/nested-rules-engine');
const {expect} = require('chai');

describe('Simple Example', () => {
    it(`is working`, function () {
        // Step1: Define your conditional rules
        const rules = {
            "you_are_a_human": {
                "you_are_kind": "help_me_find_my_book",
                "you_are_smart": "please_do_my_homework",
                "default": "there_is_no_option"
            },
            "default": "there_is_no_option"
        };
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "kindnessLevel": 0,
            "intelligence": 10
        }
        
        // Step3: Make your custom Functions
        const functions = {
            default : () => true,
            you_are_a_human: ({type}) => type === 'human',
            you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
            you_are_smart: ({intelligence}) => intelligence > 5,
            help_me_find_my_book: () => ({
                payload: 'lets help someone',
                effort: 'finding the book'
            }),
            you_should_like_helping: () => ({
                payload: 'find people',
                effort: 'help them'
            }),
            please_do_my_homework: () => ({
                payload: 'doing homework',
                effort: 'im getting sick'
            }),
            there_is_no_option: () => ({
                payload: '??',
                effort: '???'
            })
        };

        // Step4: Execute Engine
        const res = executeEngine(inputs, functions, rules);

        console.log(res);
        expect(res).to.deep.equal(
            [{ 
                result: null,
                logs: { 
                    inputCheckErrors: { 
                        you_are_older_than_15: 'function Not found' 
                    } 
                } 
            },{ 
                result: { payload: 'going home', effort: 'im getting sleepy' },
                logs: [ 
                    'Executing Function the_cup_is_not_empty',
                    'Result of Function the_cup_is_not_empty is true',
                    'Executing Function you_drank_too_much_water',
                    'Result of Function you_drank_too_much_water is false',
                    'Executing Function default',
                    'Result of Function default is true',
                    'Executing Function go_home_and_sleep' ] 
            }]
        );
    }); 
});