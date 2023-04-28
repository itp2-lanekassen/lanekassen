import { ChangeEventHandler } from 'react';
import { FormValues } from './AbsenceForm';

/**
 * Renders a comment field necessary for posting and editing absence
 */
export const CommentField = (props: {
  formValues?: FormValues;
  handleInputChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
}) => {
  return (
    <div className="modal-field">
      <label htmlFor="comment" className="block md:heading-xs base pb-2">
        Personlig notis
      </label>
      <textarea
        name="comment"
        id="comment"
        value={props.formValues?.comment || ''}
        onChange={props.handleInputChange}
        className="modal-input w-full border-2 rounded-[20px] p-3 border-primary min-h-[125px] bg-primary-contrast"
        rows={3}
      />
    </div>
  );
};
