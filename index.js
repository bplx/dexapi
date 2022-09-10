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
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'GET [URL]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                    }
                },
                {
                    opcode: 'getParam',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get [PROPERTY] from [JSON]',
                    arguments: {
                        PROPERTY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        JSON: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                },
                {
                    opcode: 'getArrayIndex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get index [INDEX] from [ARRAY]',
                    arguments: {
                        INDEX: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        ARRAY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                },
                {
                    opcode: 'send',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'POST [URL] with json [REQ]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        REQ: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                },
                {
                    opcode: 'getProxy',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'GET [URL] with proxy [PROXY]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        PROXY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    }
                }
            ],
            menus: {}
        };
    }
    getProxy (args) {
        async function hi (url) {
            let r = await fetch(args.PROXY, {
                headers: {
                    'Target-URL': args.URL
                }
            });
            return r;
        };
        hi("https://api.chucknorris.io/jokes/random").then((r)=>{ 
            let a=console.log(r.json().then(r=>{
                return r
            }))});
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
            .then((response) => response.text())
            .then((data) => {return data});
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
Scratch.extensions.register(new Scratch3dexapi());
