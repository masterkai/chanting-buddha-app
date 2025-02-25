type Func = () => Promise<void>;

const executeFunctionsSequentially = async (functions: Func[]): Promise<void> => {
	for (const func of functions) {
		await func();
	}
};


// sleep function
const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
export { executeFunctionsSequentially, sleep };
