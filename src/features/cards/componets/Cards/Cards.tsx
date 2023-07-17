import { useParams } from 'react-router-dom'
import s from './styles.module.css'
import React, { ChangeEvent, useState } from 'react';
import { useAddCardMutation, useGetCardsQuery, useLazyGetCardsQuery } from '../../service/cards.api';
import LinearProgress from '@mui/material/LinearProgress';
import { ArgCreateCardType } from '../../service/cards.api.types';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';



export const Cards = () => {
	let { packId } = useParams<{ packId: string }>();
	const [skip, setSkip] = useState(true);

	const { data, isError, error, isLoading } = useGetCardsQuery(packId ?? '', {
		skip: skip			// не будет автоматического запроса, можно делать запрос при нажатии кнопки
		// если skip: true
	})

	const [addCard, { isLoading: isAddLoading, data: newCards }] = useAddCardMutation();  // можно давать другие имена данным

	// const [getCards, {data, isError, error, isLoading}] = useLazyGetCardsQuery() // отложенная загрузка запроса
	// 																			// вызываем фунцию (getCards - назвали функцию)

	if (isError) {
		console.log('ERROR:', error)
		const err = error as { error: string }
		return <div>
			<h1>API Error </h1>
			<p>
				{err.error}
			</p>
		</div>

	}

	if (isLoading || isAddLoading) {
		return <LinearProgress color={"primary"} />  // показывает загрузку
	}

	const fetchCardsHandler = () => {
		setSkip(false) // запуск автоматический октрыт
		// getCards(packId ?? '') // при загрузке через useLazy

	}


	const addCardHandler = () => {
		if (packId) {
			const newCard: ArgCreateCardType = {
				cardsPack_id: packId,
				question: "🐱 question " + nanoid(), //nanoid - произвольный id
				answer: "🐙 answer " + nanoid(),
			};
			addCard(newCard)
				.unwrap()															//если хотим выводить обратную связь, результат загрузки
				.then((res) => {													//
					const cardQuestion = res.newCard.question;						//
					toast.success(`Карточка ${cardQuestion} успешно добавлена`); 	//
				})
				.catch((err) => {
					toast.error(err.data.error);									//
				});																	//


		}
	};

	const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
		console.log("page: ", page);
	  };


	return (
		<div>
			<h1>Cards</h1>
			
			<button onClick={fetchCardsHandler}>fetch cards</button>

			<button onClick={addCardHandler}>add card</button>

			<div>
        {data &&
          data.cards.map((card) => {
            return (
              <div className={s.container} key={card._id}>
                <div>
                  <b>Question: </b>
                  <p>{card.question}</p>{" "}
                </div>
                <div>
                  <b>Answer: </b>
                  <p>{card.answer}</p>{" "}
                </div>
              </div>
            );
          })}
      </div>
      <Pagination count={data?.cardsTotalCount} onChange={changePageHandler} />
    </div>


	);
};
