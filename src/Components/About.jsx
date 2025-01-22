import { useRef, useState } from "react"

const FaqsCard = (props) => {

    const answerElRef = useRef()
    const [state, setState] = useState(false)
    const [answerH, setAnswerH] = useState('0px')
    const { faqsList, idx } = props

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight
        setState(!state)
        setAnswerH(`${answerElH + 20}px`)
    }

    return (
        <div 
            className="space-y-3 mt-5 overflow-hidden border-b"
            id="about"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? {height: answerH } : {height: '0px'}}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default () => {

    const faqsList = [
        {
            q: "What is Insurance?",
            a: "Insurance is a financial arrangement where you pay regular premiums to a company, and in return, they provide financial protection or compensation in case of certain events like accidents, illnesses, or property damage."
        },
        {
            q: "What is Insurance Claim?",
            a: "An insurance claim is a request made to your insurance company for compensation or coverage for a loss or damage covered by your policy."
        },
        {
            q: "What happens after you file a Claim?",
            a: "After filing a claim, the insurance company will review the information, assess the damage or loss, and determine if it’s covered under your policy. They may then offer a settlement or deny the claim."
        },
        {
            q: "How can you check the status of the Claim?",
            a: "You can check the status of your claim by contacting your insurance company’s claims department or checking their online portal if available."
        },
        {
            q: "What is Claim Settlement?",
            a: "A claim settlement is the amount of money the insurance company agrees to pay you or a third party to resolve a claim based on the policy terms and coverage."
        }
    ]
  
    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8" id="about">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Doubts on Insurance ?
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered for necessary asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
}