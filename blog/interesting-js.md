# Interesting JavaScript Patterns

Here's a list of patterns and techniques in JavaScript that are uncommon but interesting!

## 1. Switch Statements

Don't you hate how switch statements look kinda... off? Case, colon, expressions, kinda ungrouped right?

You can actually use normal blocks to make it look more structured:

```javascript
const value = 10;
switch (value) {
	case 1: {
		console.log("one!!!");	
	} break;
	case 10: {
		console.log("ten!!!");
	} break;
	default: {
		console.log("idk!!!");
	}
};
```

Having the braces around the cases makes it look more structured in my opinion.

Also, usually in a `switch` statement, you would switch on an expression and have cases for specific values. But! You can switch the cases and the expression!

```javascript
const value = 10;
switch (true) {
	case value < 5: {
		console.log("come back when you're mmmm a little richer");
	} break;
	case value === 67: {
		console.log("r u serious");
	} break;
	default: {
		console.log("yea sure");
	}
}
```

Funnily enough, its now more closer to some sort of `match` statement.

## 2. Breaking out of blocks

You might know about the labels in JavaScript, they allow you to break out of named loops.

```javascript
outerLoop: for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		if (i === 2 && j === 2) {
			break outerLoop;
		}
		console.log(i, j);
	}
}
```

But did you know that you can also break out of normal blocks?

```javascript
console.log("Totally normal code");
meow: {
	console.log("This will be printed");
	if (true) break meow;
	console.log("This will NOT be printed");
}
```

I think that's very useful for cases when you are doing a lot of conditional logic inside the body of a React component.

## 3. finally

You must have heard of `try...catch` blocks, and there exists a third block called `finally` that runs regardless of `try` succeeding or failing.

```javascript
const demo = (error: boolean) => {
	try {
		if (error) throw new Error("You told me to throw");
		console.log("Success!");
	} catch (e) {
		console.error("Sneaky error:", e);
	} finally {
		console.log("Always prints");
	}
};

demo(false);
// Success!
// Always prints

demo(true);
// Sneaky error: Error: You told me to throw
// Always prints
```

You don't actually need the `catch` block to use `finally`, you can just have a `try...finally` block.

```javascript
try {
	console.log("This will run");
} finally {
	console.log("This will also run");
}
```

But! Did you know that if you return from a `try` block, the `finally` block will still run?

```javascript
const demo = () => {
	try {
		return true;
		console.log("You will never see this");
	} finally {
		console.log("Finally");
	}
};

console.log(demo());
// Finally
// true
```

You can even return from the `finally` block, which will override the return value of the `try` block!

```javascript
const demo = () => {
	try {
		return true;
	} finally {
		return false;
	}
};

console.log(demo());
// false
```

## 4. Void operator

Do you have times when you want to call a function that returns something or assign to something in an arrow function but TypeScript says "wrong return type!! grrr"

You can use the `void` keyword to ignore the return type of an expression!

```typescript
type O = { fn: () => void }
const o: O = {
	fn: () => void Math.random(),
};
```

