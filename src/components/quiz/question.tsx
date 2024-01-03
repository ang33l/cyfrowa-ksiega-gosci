import { Id } from "../../../convex/_generated/dataModel";

export default function QuestionWithAnswers({ data, index, setAnswers }: {
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
    setAnswers: React.Dispatch<React.SetStateAction<{ question_id: string; answer_id: string | undefined; }[]>>
}) {
    return <div className="p-2 text-xl bg-[#f7ba604b] rounded-lg">
        <p className="font-bold">{index + 1}. {data.question.query}</p>
        <div className="flex flex-col gap-1">
            {data.answers.map((answer, i) =>
                <div key={i} className="flex gap-1 items-center">
                    <input type="radio"
                        id={answer._id}
                        name={data.question._id}
                        onChange={
                            () => {
                                setAnswers(prev => {
                                    const temp = prev;
                                    temp[index] = { question_id: data.question._id, answer_id: answer._id }
                                    return temp
                                })
                            }
                        }

                    />
                    <label htmlFor={answer._id}>{answer.answer}</label>
                </div>)}
        </div>
    </div>
}