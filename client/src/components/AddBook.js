import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
	addBookMutation,
	getAuthorsQuery,
	getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const { error, loading, data } = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation);

	// form submission will execute this.
	const submitForm = (e) => {
		e.preventDefault();
		console.log(authorId);
		// mutation function
		addBook({
			variables: { name: name, genre: genre, authorId: authorId },
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	if (error) {
		return <p>Error.</p>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	if (data) {
		console.log(data);
		console.log(authorId);
	}

	return (
		data && (
			<div>
				<form onSubmit={submitForm}>
					<div className="field">
						<label>Book Name:</label>
						<input type="text" onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="field">
						<label>Genre:</label>
						<input type="text" onChange={(e) => setGenre(e.target.value)} />
					</div>
					<div className="field">
						<label>Author</label>
						<select onChange={(e) => setAuthorId(e.target.value)}>
							<option value="">Select an Option</option>
							{data?.authors.map((author) => (
								<option key={author.id} value={author?.id}>
									{author.name}
								</option>
							))}
						</select>
					</div>

					<button>+</button>
				</form>
			</div>
		)
	);
};

export default AddBook;
