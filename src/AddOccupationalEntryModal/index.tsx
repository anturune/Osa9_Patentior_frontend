import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
//import AddEntriesForm, { EntriesFormValues } from './AddEntryFormHealthcheck';
import AddOccupationalHealthCareForm, { EntriesFormValuesOccupationalHealthcare } from './AddEntryFormOccupationalHealthcare';


interface PropsOccupationalHelathcare {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntriesFormValuesOccupationalHealthcare) => void;
  error?: string;
}


const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: PropsOccupationalHelathcare) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a Occupational Healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationalHealthcareEntryModal;