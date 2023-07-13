
getPacks: () => {
    return instance.get<FetchPacksResponseType>("cards/pack", {
      params: {
        //❗Ваш user_id
        user_id: "6435620aaf58963e887fb0f7",
        pageCount: 20,
      },
    });
  },