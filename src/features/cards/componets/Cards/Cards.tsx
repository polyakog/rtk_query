import { useParams } from 'react-router-dom'

import s from './styles.module.css'


export const Cards = () => {
	let {packId} = useParams<{ packId: string }>();
console.log('packId', packId)
	
	return (
		<div>
			<h1>Cards</h1>
		</div>
	);
};
