import * as React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  input1: string;
  input2: string;
  input3: string;
  radio: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    input1: "",
    input2: "",
    input3: "",
    radio: ""
  });
  const [errors, setErrors] = React.useState<Partial<FormValues>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      radio: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<FormValues> = {};
    if (!formValues.input1) {
      newErrors.input1 = "This field is required";
    }
    if (!formValues.input2) {
      newErrors.input2 = "This field is required";
    }
    if (!formValues.radio) {
      newErrors.radio = "Please select an option";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit form
      console.log("Form submitted:", formValues);
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={onClose} />
          <div className="modal__content">
            <h2 className="modal__title">Modal Title</h2>
            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="modal__field">
                <label htmlFor="input1">
                  Input 1<span className="modal__required">*</span>
                </label>
                <input
                  type="text"
                  id="input1"
                  name="input1"
                  value={formValues.input1}
                  onChange={handleInputChange}
                  className="modal__input"
                />
                {errors.input1 && (
                  <div className="modal__error">{errors.input1}</div>
                )}
              </div>
              <div className="modal__field">
                <label htmlFor="input2">
                  Input 2<span className="modal__required">*</span>
                </label>
                <input
                  type="text"
                  id="input2"
                  name="input2"
                  value={formValues.input2}
                  onChange={handleInputChange}
                  className="modal__input"
                />
                {errors.input2 && (
                  <div className="modal__error">{errors.input2}</div>
                )}
              </div>
              <div className="modal__field">
                <label htmlFor="input3">Input 3</label>
                <input
                  type="text"
                  id="input3"
                  name="input3"
                  value={formValues.input3}
                  onChange={handleInputChange}
                  className="modal__input"
                />
              </div>
              <div className="modal__field">
                <div>Radio buttons</div>
                {errors.radio && (
                  <div className="modal__error">{errors.radio}</div>
                )}
                <div className="modal__radio-group">
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="option1"
                      checked={formValues.radio === "option1"}
                      onChange={handleRadioChange}
                      required
                    />
                    Option 1
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="option2"
                      checked={formValues.radio === "option2"}
                      onChange={handleRadioChange}
                      required
                    />
                    Option 2
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="option3"
                      checked={formValues.radio === "option3"}
                      onChange={handleRadioChange}
                      required
                    />
                    Option 3
                  </label>
                </div>
              </div>
              <div className="modal__buttons">
                <button
                  type="button"
                  className="modal__cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="modal__submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
