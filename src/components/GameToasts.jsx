import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { BoardContext } from "../contexts/BoardContext.jsx";
import { PhaseMessages } from "../constants/gameConstants.js";

const GameToasts = () => {
  const { gamePhase } = useContext(BoardContext);
  const shownPhases = useRef(new Set());

  useEffect(() => {
    const message = PhaseMessages[gamePhase];
    if (message && !shownPhases.current.has(gamePhase)) {
      toast.info(message);
      shownPhases.current.add(gamePhase);
    }
  }, [gamePhase]);

  return null;
};

export default GameToasts;
