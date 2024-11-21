import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestChangeTodo = (
	setErrorParagraph,
	todoText,
	selectedTodoId,
	refreshTodo,
	setTodoText,
	setSelectedTodoId,
) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestChangeTodo = () => {
		if (!todoText.trim()) {
			setErrorParagraph(true);
			return;
		}

		if (!selectedTodoId) {
			setErrorParagraph(true);
			return;
		}

		setIsUpdating(true);

		const changeDbRef = ref(db, `todos/${selectedTodoId}`);

		set(changeDbRef, {
			title: todoText,
		})
			.then(() => {
				setTodoText('');
				setErrorParagraph();
				setSelectedTodoId(null);
			})
			.finally(() => {
				setIsUpdating(false);
				setErrorParagraph(false);
			});
	};

	return { requestChangeTodo, isUpdating };
};
