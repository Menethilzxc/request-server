import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodo = (
	refreshTodoFlag,
	searchTodo,
	sortByAlphabet,
	sortTodos,
	filterTodos,
) => {
	const [loader, setLoader] = useState(true);
	const [sortedTodos, setSortedTodos] = useState({});

	useEffect(() => {
		const requestDbRef = ref(db, 'todos');

		return onValue(requestDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			let tempSortedTodos = sortByAlphabet ? sortTodos(loadedTodos) : loadedTodos;

			filterTodos(searchTodo, tempSortedTodos);

			setSortedTodos(tempSortedTodos);

			setLoader(false);
		});
	}, []);

	return { loader, sortedTodos };
};
