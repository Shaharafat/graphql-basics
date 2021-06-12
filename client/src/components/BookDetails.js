import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
	const { error, loading, data } = useQuery(getBookQuery, {
		variables: { id: bookId },
	});

	if (error) {
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
			<p>Output book details here.</p>
			<h1>{data?.book?.name}</h1>
			<p>{data?.book?.genre}</p>
			<p>{data?.book?.author?.name}</p>
			<p>All books by this author</p>
			<ul>
				{data?.book?.author?.books.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
};

export default BookDetails;
