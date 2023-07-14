import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../../common/api/common.api';

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    // 5) endpoints - объект, содержащий эндпоинты для этого API, описанные с помощью функций, которые будут вызываться при вызове соответствующих методов API (например, get, post, put, patch, delete). Обязательный параметр.
  endpoints: (build) => { 
    return {
    // 1 параметр - тип того, что возвращает сервер (ResultType)
    // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<any, string>({
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
    };
  },    
})

export const {useGetCardsQuery} = cardsApi

