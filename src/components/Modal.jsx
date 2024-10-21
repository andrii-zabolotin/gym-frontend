import Button from "./Button.jsx";

const Modal = ({message, onAccept, onDiscard, question}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-md max-w-sm space-y-5">
                <div className="flex flex-row items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC40C"
                         className="bi bi-question-circle-fill size-6" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
                    </svg>
                    <h2 className="text-lg font-bold">{question}</h2>
                </div>
                <p className="text-gray-500">{message}</p>
                <div className="flex justify-end">
                    <div className="grid grid-cols-2 w-full gap-5">
                        <Button
                            onClick={onAccept}
                        >
                            Так
                        </Button>
                        <Button
                            onClick={onDiscard}
                        >
                            Ні
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
