import { Modal} from 'antd';
import { useRouter } from 'next/router';
import AntLayout from '../../components/AntLayout';
import EachGoals from '../../components/EachGoals';
import React, { useEffect, useState, useRef } from "react";
import AddGoalForm from '../../components/AddGoalForm';
import { Typography } from 'antd';
const { Title } = Typography;

export default function YearItem() {
    const router = useRouter();
    console.log("==router.query: ", router.query);
    const [ allData, setAllData ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [isShown, setIsShown] = useState(false);
    const year = router.query.year;
    const formComponentRef = useRef();
    const [ goalModalVisible, setGoalModalVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState("Add a goal");
    const [ currentGoal, setCurrentGoal ] = useState({});
  
    useEffect(() => {
        async function fetchData() {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            credentials: "include",
          };
    
          fetch(
            "https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user",
            requestOptions
          )
            .then((response) => {
              if (response.status !== 200) {
                router.push(`/login?redirect=${router.asPath}`);
                setIsShown(false)
              } else {
                console.log("Successfully Login!");
                setIsShown(true)
                response.json().then((data) => {
                  if('data' in data) {
                    console.log(12312312312)
                  }
                  if(data.length !== 0 && 'data' in data) {
                      for (let i = 0; i < data.data.length; i++) {
                          if(year == data.data[i].year) {
                              console.log("found years", data.data[i].goals);
                              console.log(data.username);
                              setUsername(data.username);
                              if(data.data[i].goals) {
                                setAllData(data.data[i].goals);
                              }
                              break;
                          }
                          
                      }
                  }
                  console.log(allData)
                });
              }
            })
            .catch((error) => console.log(error));
        }
        if(!isShown){
          fetchData();
        }
      });
  
    function showAddGoalModal () {
        if(modalTitle === "Edit goal") {
            if(formComponentRef.current) {
                formComponentRef.current.resetForm();
            }
        }
        setModalTitle("Add a goal");
        setCurrentGoal({});
        setGoalModalVisible(true)
    }

    function showSpecificGoal(goal) {
        setModalTitle("Edit goal");
        setCurrentGoal(goal);
        setGoalModalVisible(true);
    }
        
    function handleClose() {
        setGoalModalVisible(false);
    }

    // function handleCancel() {
    //     if(formComponentRef.current) {
    //         formComponentRef.current.resetForm();
    //     }
    //     setGoalModalVisible(false);
    // }

    function setLoading(status) {
        setConfirmLoading(status);
    }

    function handleSubmit() {
        if(formComponentRef.current) {
            formComponentRef.current.handleFormSubmit(parseInt(router.query.year));
        }
    }

    function addGoalToData(goal) {
        setAllData(oldData=>[...oldData, goal]);
    }

    return (
        <AntLayout hasProfile={true} hasSideBar={true} isShowAddNewPlan={false} onAddGoalClick={showAddGoalModal} username={username} allData={allData}>
            <Title className='top-year' level={2}>Year: {year}</Title>
            {/* <h1>This is {year}</h1> */}
            <EachGoals allData={allData} editGoal={showSpecificGoal}/>
            <Modal
                title={modalTitle}
                visible={goalModalVisible}
                centered
                okText="Submit"
                onOk={handleSubmit}
                cancelText="Cancel"
                onCancel={handleClose}
                confirmLoading={confirmLoading}
            >
                <AddGoalForm goal={currentGoal} syncData={addGoalToData} setConfirmLoading={setLoading} closeForm={handleClose} ref={formComponentRef}/>
            </Modal>
        </AntLayout>
    );
}