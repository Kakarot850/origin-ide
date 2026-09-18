async function test() {
    const { REACT_TEMPLATES } = await import('../src/utils/templates.js');
    const res = await fetch('https://unpkg.com/@babel/standalone/babel.min.js');
    const babelCode = await res.text();
    const vm = require('vm');
    const sandbox = { window: {}, console: console };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(babelCode, sandbox);
    const Babel = sandbox.Babel;
    console.log('Babel loaded:', !!Babel);

    try {
        const out1 = Babel.transform(REACT_TEMPLATES.javascript, { presets: ['react'] });
        console.log('Transform with react preset SUCCESS!');
    } catch (e) {
        console.error('Transform with react failed:', e.message);
    }

    try {
        const out2 = Babel.transform(REACT_TEMPLATES.javascript, { presets: ['react', 'env'] });
        console.log('Transform with react+env SUCCESS!');
    } catch (e) {
        console.error('Transform with react+env failed:', e.message);
    }
}

test().catch(console.error);
