const useIteratorInterface = () => {
	console.log('\n### useIteratorInterface');
	const arr = [10, 20, 30];
	const iterator = arr[Symbol.iterator]();

	console.log(iterator.next());    // → {value: 10, done: false}
	console.log(iterator.next());    // → {value: 20, done: false}
	console.log(iterator.next());    // → {value: 30, done: false}
	console.log(iterator.next());    // → {value: undefined, done: true}
};
useIteratorInterface();

const pojoWithIterator = () => {
	console.log('\n### pojoWithIterator');
	const collection = {
		a: 10,
		b: 20,
		c: 30,
		[Symbol.iterator]() {
			const values = Object.keys(this);
			let i = 0;
			return {
				next: () => {
					return {
						value: this[values[i++]],
						done: i > values.length
					}
				}
			};
		}
	};

	const iterator = collection[Symbol.iterator]();

	console.log(iterator.next());    // → {value: 10, done: false}
	console.log(iterator.next());    // → {value: 20, done: false}
	console.log(iterator.next());    // → {value: 30, done: false}
	console.log(iterator.next());    // → {value: undefined, done: true}
};
pojoWithIterator();

// Not good with async data source!
const pojoWithGeneratorIterator = () => {
	console.log('\n### pojoWithGeneratorIterator');
	const collection = {
		a: 10,
		b: 20,
		c: 30,
		[Symbol.iterator]: function * () {
			for (let key in this) {
				yield this[key];
			}
		}
	};

	const iterator = collection[Symbol.iterator]();

	console.log(iterator.next());    // → {value: 10, done: false}
	console.log(iterator.next());    // → {value: 20, done: false}
	console.log(iterator.next());    // → {value: 30, done: false}
	console.log(iterator.next());    // → {value: undefined, done: true}
};
pojoWithGeneratorIterator();

const pojoWithAsyncIterator = () => {
	console.log('\n### pojoWithAsyncIterator');
	const collection = {
		a: 10,
		b: 20,
		c: 30,
		[Symbol.asyncIterator]() {
			const values = Object.keys(this);
			let i = 0;
			return {
				next: () => {
					return Promise.resolve({
						value: this[values[i++]],
						done: i > values.length
					});
				}
			};
		}
	};

	const iterator = collection[Symbol.asyncIterator]();

	console.log(iterator.next().then(result => {
		console.log(result);    // → {value: 10, done: false}
	}));

	console.log(iterator.next().then(result => {
		console.log(result);    // → {value: 20, done: false}
	}));

	console.log(iterator.next().then(result => {
		console.log(result);    // → {value: 30, done: false}
	}));

	console.log(iterator.next().then(result => {
		console.log(result);    // → {value: undefined, done: true}
	}));
};
pojoWithAsyncIterator();
