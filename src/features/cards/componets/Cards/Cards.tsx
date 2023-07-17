import { useParams } from 'react-router-dom'
// import s from './styles.module.css'
import React from 'react';
import { useGetCardsQuery } from '../../service/cards.api';
import { SerializedError } from '@reduxjs/toolkit';


export const Cards = () => {
	let {packId} = useParams<{ packId: string }>();

	const {data, isError, error, isLoading}= useGetCardsQuery<{data: any, isError: boolean, error:{error: string}, isLoading: boolean}>(packId ?? '')
	if (isError) {
		debugger
		console.log('ERROR:', error)
		// const err = error as {error: string}
		return <div>
			<h1>API Error </h1>
			<p>
			{error.error}
			</p>
			</div>
		
	}

	if (isLoading) {
		return <div><h1>Loading ...</h1></div>
	}
	
	return (
		<div>
			<h1>Cards</h1>
			<div>
				{JSON.stringify(data)}
			</div>
		</div>
	);
};
