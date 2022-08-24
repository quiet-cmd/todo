import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import './stopwatch.css';

const Stopwatch = ({ stopwatchTime, playerState, updateStopwatchTime }) => {
  const [player, setPlayer] = useState(playerState);
  const [timer, setTimer] = useState(stopwatchTime);
  const [timerID, setTimerID] = useState();
  const timerRef = useRef(timer);
  const playerRef = useRef(player);

  useEffect(() => {
    if (player) setTimer((e) => new Date() - e);
    return () => {
      clearInterval(timerID);
      if (playerRef.current) return updateStopwatchTime(new Date() - timerRef.current, playerRef.current);
      updateStopwatchTime(timerRef.current, playerRef.current);
    };
  }, []);

  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  useEffect(() => {
    playerRef.current = player;
    clearInterval(timerID);
    if (player) {
      setTimerID(setInterval(() => setTimer((timer) => timer + 1000), 1000));
    }
  }, [player]);

  const timeFormat = (time) => {
    const timestamp = new Date(1995, 11, 17, 0, 0, 0).getTime();
    if (time >= 86399000) setTimer(() => time % 86399000);
    return format(new Date(timestamp + time), 'HH:mm:ss');
  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={() => setPlayer(true)} />
      <button className="icon icon-pause" onClick={() => setPlayer(false)} />
      {timeFormat(timer)}
    </span>
  );
};

export default Stopwatch;
