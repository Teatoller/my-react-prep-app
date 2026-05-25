import { useState } from "react";

export function Modal() {
    const [isOpen, setIsOpen] = useState(true);
    const [onClose, setOnClose] = useState(() => () => setIsOpen(false));

    if (!isOpen) return null;

    // where do I get to use th setOnClose function? I want to be able to pass it down to the button so that when the button is clicked, the modal closes. I also want to be able to use it in other components that might need to close the modal, such as a close icon in the top right corner of the modal.
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                <p className="mb-4">This is a simple modal component.</p>
                <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Close
                </button>
            </div>
        </div>
    );
}