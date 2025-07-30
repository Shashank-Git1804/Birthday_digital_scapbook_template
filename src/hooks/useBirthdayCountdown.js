import { useEffect, useState } from 'react';

export const useBirthdayCountdown = (testMode = false) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthday, setIsBirthday] = useState(false);

  const getNextBirthday = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const actualBirthday = new Date(`${currentYear}-07-31T00:00:00`);

    if (testMode) {
      return new Date(now.getTime() + 10000); // 10 seconds from now
    }

    return now > actualBirthday
      ? new Date(`${currentYear + 1}-07-31T00:00:00`)
      : actualBirthday;
  };

  useEffect(() => {
    let nextBirthday = getNextBirthday();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextBirthday.getTime() - now;

      if (distance <= 0) {
        setIsBirthday(true);
        nextBirthday = getNextBirthday(); // reset
        setTimeout(() => setIsBirthday(false), 10000); // hide after 10s
      }

      const updatedDistance = nextBirthday.getTime() - now;

      setTimeLeft({
        days: Math.floor(updatedDistance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((updatedDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((updatedDistance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((updatedDistance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, isBirthday };
};
