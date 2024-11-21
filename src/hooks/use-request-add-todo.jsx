import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodo = (
	setErrorParagraph,
	todoText,
	refreshTodo,
	setTodoText,
) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		if (!todoText.trim()) {
			setErrorParagraph(true);
			return;
		}

		setIsCreating(true);

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: todoText,
		})
			.then(() => {
				refreshTodo();
				setTodoText('');
				setErrorParagraph();
			})
			.finally(() => {
				setIsCreating(false);
				setErrorParagraph(false);
			});
	};

	return { requestAddTodo, isCreating };
};
