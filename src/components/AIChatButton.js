import { useState, memo } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { FiCode } from "react-icons/fi";

const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });
const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });
const SignupModal = dynamic(() => import("./SignupModal"), { ssr: false });

const AIChatButton = ({ onCodeGenerated }) => {
    const { data: session } = useSession();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsSignupModalOpen(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeSignupModal = () => {
        setIsSignupModalOpen(false);
    };

    const switchToSignup = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(true);
    };

    const switchToLogin = () => {
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const toggleChat = () => {
        if (!session) {
            openLoginModal();
        } else {
            setIsChatOpen(!isChatOpen);
        }
    };

    // Handle code generated from the AI
    const handleCodeGenerated = (code) => {
        if (onCodeGenerated) {
            onCodeGenerated(code);
        }
    };

    return (
        <>
            <button
                onClick={toggleChat}
                className="topbar-chat-button"
                title={session ? (isChatOpen ? "Close AI Assistant" : "Open AI Assistant") : "Login to use AI Assistant"}
            >
                <FiCode size={16} />
                <span>AI Assistant</span>
            </button>

            {session && isChatOpen && <ChatBot isOpen={isChatOpen} toggleChat={toggleChat} onCodeGenerated={handleCodeGenerated} />}

            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onSwitchToSignup={switchToSignup} />}
            {isSignupModalOpen && <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} onSwitchToLogin={switchToLogin} />}
        </>
    );
};

export default memo(AIChatButton);
