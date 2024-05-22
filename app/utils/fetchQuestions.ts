const fetchQuestions = async () => {
  const res = await fetch("/questions.json");
  const data = await res.json();
  return data.questions;
};

export default fetchQuestions;
