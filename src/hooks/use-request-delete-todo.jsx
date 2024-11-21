import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = (refreshTodo, setSelectedIndex, selectedTodoId) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = () => {
		setIsDeleting(true);

		const requestDeleteTodo = ref(db, `todos/${selectedTodoId}`);
		remove(requestDeleteTodo)
			.then(() => {
				refreshTodo();
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return { requestDeleteTodo, isDeleting };
};
