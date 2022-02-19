import React, { useEffect, useState } from "react";

import Statistics from "../Statistics";
import Section from "../Section";
import FeedbackOptions from "../FeedbackOptions";
import Notification from "../Notification";

export default function Main() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTotal(good + neutral + bad);
    setPercentage(Math.round((good * 100) / total));
  }, [good, neutral, bad, total]);
  const onClickIncrementValue = (e) => {
    switch (e.currentTarget.textContent) {
      case "good":
        setGood((prev) => prev + 1);
        break;
      case "bad":
        setBad((prev) => prev + 1);
        break;
      case "neutral":
        setNeutral((prev) => prev + 1);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Section title={"Please leave feedback"}>
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={onClickIncrementValue}
        />
      </Section>
      <Section title={"Statistics"}>
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={percentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}
