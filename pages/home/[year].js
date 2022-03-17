import { useState, useRef } from 'react';
import { Modal} from 'antd';
import { useRouter } from 'next/router';
import AntLayout from '../../components/AntLayout';
import AddGoalForm from '../../components/AddGoalForm';

export default function YearItem() {
    const router = useRouter();
    const formComponentRef = useRef();
    const [ goalModalVisible, setGoalModalVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);


    function showAddGoalModal () {
        setGoalModalVisible(true)
    }
        
    function handleCancel() {
        setGoalModalVisible(false);
    }

    function setLoading(status) {
        setConfirmLoading(status);
    }

    function handleSubmit() {
        if(formComponentRef.current) {
            formComponentRef.current.handleFormSubmit(parseInt(router.query.year));
        }
    }

    return (
        <AntLayout hasProfile={true} hasSideBar={true} isDetailPage={true} onAddGoalClick={showAddGoalModal}>
            <Modal
                title="Add a goal"
                visible={goalModalVisible}
                centered
                okText="Submit"
                onOk={handleSubmit}
                cancelText="Cancel"
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <AddGoalForm setConfirmLoading={setLoading} closeForm={handleCancel} ref={formComponentRef}/>
            </Modal>
        </AntLayout>
    );
}