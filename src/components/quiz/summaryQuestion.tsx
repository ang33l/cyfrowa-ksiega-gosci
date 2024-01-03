import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import Spinner from "../spinner";

export default function SummaryQuestion({ data, index, quizUid }: {
    data: {
        question: {
            _id: Id<"question">;
            _creationTime: number;
            query: string;
            enabled: boolean;
        };
        answers: {
            _id: Id<"question_answer">;
            _creationTime: number;
            question_id: Id<"question">;
            answer: string;
            correct: boolean;
        }[];
    }, index: number,
    quizUid: string
}) {
    const correctAnswer = data.answers.find(answer => answer.correct)

    const userAnswer = useQuery(api.quiz.getUsersAnswer, { quiz_uid: quizUid, question_id: data.question._id })
    if (!userAnswer) return <Spinner text="Wczytywanie poprawnych odpowiedzi..." />
    return <div className="p-2 text-xl bg-[#f7ba604b] rounded-lg">
        <p className="font-bold">{index + 1}. {data.question.query}</p>
        <div className="flex flex-col gap-1">
            {data.answers.map((answer, i) =>
                <div key={i} className={`flex gap-1 items-center ${answer._id === correctAnswer?._id ? "bg-green-400" :
                        userAnswer.answer === answer._id && "bg-red-400"
                    }`}>
                    <input type="radio"
                        id={answer._id}
                        name={data.question._id}
                        disabled={true}
                        defaultChecked={userAnswer.answer === answer._id}

                    />
                    <label htmlFor={answer._id}>{answer.answer}</label>
                </div>)}
        </div>
    </div>
}