import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const Booklist = () => {
	const [selected, setSelected] = useState(null);
	const { error, loading, data } = useQuery(getBooksQuery);
	if (error) {
		console.log(error);
		return <p>{error.message}</p>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	if (data) {
		console.log(data);
	}

	return (
		<div>
			<ul id="book-list">
				{data?.books.map((book) => (
					<li key={book.id} onClick={(e) => setSelected(book.id)}>
						{book.name}
					</li>
				))}
			</ul>
			<BookDetails bookId={selected} />
		</div>
	);
};

export default Booklist;
