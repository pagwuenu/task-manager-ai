const express = require('express');
const { randomUUID } = require('node:crypto');

const app = express();
const tasks = [];

app.use(express.json());

app.get('/tasks', (req, res) => {
	res.json(tasks);
});

app.post('/tasks', (req, res) => {
	const { title, description = '' } = req.body;

	if (typeof title !== 'string' || title.trim().length === 0) {
		return res.status(400).json({ error: 'A non-empty title is required.' });
	}

	if (typeof description !== 'string') {
		return res.status(400).json({ error: 'Description must be a string.' });
	}

	const task = {
		id: randomUUID(),
		title: title.trim(),
		description: description.trim(),
		completed: false,
		createdAt: new Date().toISOString(),
	};

	tasks.push(task);
	res.status(201).json(task);
});

if (require.main === module) {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Task API listening on port ${port}`);
	});
}

module.exports = app;
