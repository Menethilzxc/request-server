import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<>
			<div className={styles.app}>
				<h1>Todo list</h1>
				<ol>
					{todos.map((todo, index) => (
						<li key={todo.id}>
							<span>{index + 1}.</span>
							{todo.title}
						</li>
					))}
				</ol>
			</div>
		</>
	);
}

export default App;
