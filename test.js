import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();
	const result = await alfy('clear');

	t.deepEqual(result, [
		{
			title: 'Cache-clear'
		}
	]);
});
