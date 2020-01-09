const obj = {
	a: 10,
	b: {
		x: 20,
		y: 30,
		z: 40
	}
};

const {b: {x, ...rest1}, ...rest2} = obj;
const p = x => JSON.stringify(x, null, 2);
const {a, ...b} = obj;
console.log(`\n### b: \n${p(b)}`);
console.log(`\n### x: \n\t${x}`);
console.log(`\n### rest1: \n${p(rest1)}`);
console.log(`\n### rest2: \n${p(rest2)}`);

