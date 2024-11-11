import { useGlobal } from "@/app/context/GlobalContext";
import "./Modal.css";

export default function Modal() {
  const { modal } = useGlobal();
  if (!modal.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <div className="modal-buttons">
          {modal.onConfirm && (
            <button onClick={modal.onConfirm} className="modal-confirm">
              OK
            </button>
          )}
          <button onClick={modal.onClose} className="modal-close">
            {modal.onConfirm ? "Cancel" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};