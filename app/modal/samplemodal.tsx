import { useState, useEffect, useCallback } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    children?: React.ReactNode;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    showCloseIcon?: boolean;
}

export function SampleModal({ 
    isOpen: externalIsOpen, 
    onClose: externalOnClose,
    title = "Modal Title",
    children,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    showCloseIcon = true
}: ModalProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Determine if we're controlled or uncontrolled
    const isControlled = externalIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;
    
    const handleClose = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            if (isControlled) {
                externalOnClose?.();
            } else {
                setInternalIsOpen(false);
            }
            setIsAnimating(false);
        }, 200);
    }, [isControlled, externalOnClose]);
    
    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape || !isOpen) return;
        
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, handleClose]);
    
    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    
    if (!isOpen && !isAnimating) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black transition-all duration-300 ${
                    isOpen && !isAnimating ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 backdrop-blur-none'
                }`}
                onClick={closeOnOutsideClick ? handleClose : undefined}
            />
            
            {/* Modal Container */}
            <div 
                className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
                    isOpen && !isAnimating 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {title}
                        </h2>
                    </div>
                    
                    {showCloseIcon && (
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg p-1 hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                    {children || (
                        <p className="text-gray-600 leading-relaxed">
                            This is a beautifully styled modal component with smooth animations and multiple configuration options.
                        </p>
                    )}
                </div>
                
                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 pt-0">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Example action
                            alert('Action confirmed!');
                            handleClose();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-md"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

// Example usage component
export function ModalDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'controlled' | 'uncontrolled'>('controlled');
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Modal Component Demo
                    </h1>
                    
                    <div className="space-y-6">
                        {/* Controlled Modal Example */}
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Controlled Modal</h2>
                            <p className="text-gray-600 mb-4">
                                This modal is controlled by React state. Click the button to open it.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                            >
                                Open Controlled Modal
                            </button>
                        </div>
                        
                        {/* Uncontrolled Modal Example */}
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Uncontrolled Modal</h2>
                            <p className="text-gray-600 mb-4">
                                This modal manages its own state. Click to open a modal that closes itself.
                            </p>
                            <button
                                onClick={() => {
                                    const uncontrolledModal = document.createElement('div');
                                    const root = document.getElementById('root');
                                    if (root) {
                                        // Just for demo - in real app, you'd use a proper portal
                                        console.log('Uncontrolled modal would open here');
                                        alert('For uncontrolled modal, use the component directly with internal state');
                                    }
                                }}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md"
                            >
                                Open Uncontrolled Modal
                            </button>
                        </div>
                        
                        {/* Modal Features */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">✨ Features:</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">✓ Smooth animations with fade and scale</li>
                                <li className="flex items-center gap-2">✓ Close on outside click or ESC key</li>
                                <li className="flex items-center gap-2">✓ Body scroll lock when open</li>
                                <li className="flex items-center gap-2">✓ Controlled or uncontrolled usage</li>
                                <li className="flex items-center gap-2">✓ Fully customizable with props</li>
                                <li className="flex items-center gap-2">✓ Accessible with keyboard navigation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Controlled Modal */}
            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Controlled Modal Example"
                closeOnOutsideClick={true}
                closeOnEscape={true}
                showCloseIcon={true}
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        This modal is controlled by React state. It can be closed by:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                        <li>Clicking the Cancel button</li>
                        <li>Clicking the Confirm button</li>
                        <li>Clicking the X icon in the top right</li>
                        <li>Clicking outside the modal</li>
                        <li>Pressing the ESC key</li>
                    </ul>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                            💡 Tip: This modal also locks body scroll when open!
                        </p>
                    </div>
                </div>
            </Modal>
            
            {/* Example of an uncontrolled modal - uncomment to use */}
            {/* <Modal title="Uncontrolled Modal">
                This modal manages its own state and will close itself.
            </Modal> */}
        </div>
    );
}