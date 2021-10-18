import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalForm, { EntriesFormValuesHospital } from './AddEntryFormHospital';


interface PropsHospital {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntriesFormValuesHospital) => void;
    error?: string;
}


const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: PropsHospital) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a Hospital entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddHospitalEntryModal;