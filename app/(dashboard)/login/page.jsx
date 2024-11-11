"use client";
import { useGlobal } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import Modal from "@/app/ui/Modal";
import LoginForm from "@/app/ui/LoginForm";
import "./login.css";

function Login() {
  const router = useRouter();
  const { setCurrentUser, appUsers, setAppUsers, showModal, closeModal } = useGlobal();

  function handleSubmit(e) {
    e.preventDefault();
    const userEmail = e.target.userEmail.value.trim();
    const userPassword = e.target.userPassword.value;
    
    if (!userEmail || !userPassword) {
      showModal("Error", "E-mail and/or password missing");
      return;
    }

    const userInfo = appUsers.find((user) => user.email === userEmail);
    if (userInfo) {
      if (userInfo.password === userPassword) {
        setCurrentUser(userInfo);
        router.push("/bio");
      } else {
        showModal("Error", "Invalid password. Please try again.");
      }
    } else {
      showModal(
        "Create Account",
        "No account found. Would you like to create one?",
        () => handleNewAccount(userEmail, userPassword)
      );
    }
  };

  function handleNewAccount(email, password) {
      const newUserId = appUsers[appUsers.length - 1]?.id + 1 || 1;
      const newUser = {
        id: newUserId,
        email,
        password,
        name: `Avid Hiker #${newUserId}`,
        avatar: "/newUser.png",
        bio: "Enter your bio description here",
        hikes: [],
      };
      setAppUsers((existingUsers) => [...existingUsers, newUser]);
      setCurrentUser(newUser);
      closeModal();
      router.push("/bio");
    }

  return (
    <div id="login">
      <h1>Log In</h1>
      <div id="login-info" className="text-box">
        <LoginForm onSubmit={handleSubmit} />
        <Modal />
      </div>
    </div>
  );
}
export default Login;