import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../../common/api/common.api';
import { AddCardResponseType, ArgCreateCardType, FetchCardsResponseType } from './cards.api.types';

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    // чтобы цеплялась кука нужно прописывать credentials
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
    // 5) endpoints - объект, содержащий эндпоинты для этого API, описанные с помощью функций, которые будут вызываться при вызове соответствующих методов API (например, get, post, put, patch, delete). Обязательный параметр.
  endpoints: (build) => { 
    return {
    // 1 параметр - тип того, что возвращает сервер (ResultType)
    // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<FetchCardsResponseType, string>({     //Get запрос
        query: (packId) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
            },
          };
        },
      }),

addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
  query: (card)=> {
    return {
      method:"POST",
      url: "cards/card",
      body: {
        card
      },
    }
  },
}),

    };
  },    
})

// export const {useGetCardsQuery} = cardsApi
export const {useLazyGetCardsQuery, useGetCardsQuery, useAddCardMutation} = cardsApi

