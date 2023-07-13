import React from 'react'
import { useNavigate } from "react-router-dom"

const navigateToCardsPageHandler = (packId: string) => {
  const navigate = useNavigate();
    navigate(`/cards/${packId}`);
  };