import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntriesForm, { EntriesFormValues } from './AddEntryFormHealthcheck';
//import AddOccupationalHealthCareForm, { EntriesFormValuesOccupationalHealthcare } from './AddEntryFormOccupationalHealthcare';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntriesFormValues) => void;
  error?: string;
}
/*
interface PropsOccupationalHelathcare {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntriesFormValuesOccupationalHealthcare) => void;
  error?: string;
}
*/
const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a Healthcheck entry for patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntriesForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
/*
const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: PropsOccupationalHelathcare) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a Occupational Healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
*/
export default AddEntryModal ;