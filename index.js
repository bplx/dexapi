const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

class Scratch3dexapi {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'dexapi',
            name: 'DexahApi',
            blocks: [
                {
                    opcode: 'get',
                    blockType: BlockType.REPORTER,
                    text: 'GET [URL]',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                    }
                },
                {
                    opcode: 'getParam',
                    blockType: BlockType.REPORTER,
                    text: 'get [PROPERTY] from [JSON]',
                    arguments: {
                        PROPERTY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                },
                {
                    opcode: 'getArrayIndex',
                    blockType: BlockType.REPORTER,
                    text: 'get index [INDEX] from [ARRAY]',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        ARRAY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                },
                {
                    opcode: 'send',
                    blockType: BlockType.REPORTER,
                    text: 'POST [URL] with json [REQ]',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        REQ: {
                            type: ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                }
            ],
            menus: {}
        };
    }
    
    getArrayIndex (args) {
        let a = args.ARRAY.slice(0, -1).substr(1);
        let b = args.INDEX;
        let c = JSON.parse(args.ARRAY)[b];
        if (typeof c === "string") {
            return c;
        } else {
            return JSON.stringify(c);
        }
        
    }

    send (args) {
        return fetch(args.URL, JSON.parse(args.REQ))
            .then((res) => response.json())
            .then((data) => {return JSON.stringify(data)});
    }

    get (args) {
        return fetch(args.URL)
            .then((response) => response.json())
            .then((data) => {return JSON.stringify(data)});
    }

    getParam (args) {
        let j = JSON.parse(args.JSON);
        let r = j[args.PROPERTY];
        if (typeof r === 'string') {
            return j[args.PROPERTY];
        } else {
            return JSON.stringify(j[args.PROPERTY]);
        }
        
    }
}

module.exports = Scratch3dexapi;
