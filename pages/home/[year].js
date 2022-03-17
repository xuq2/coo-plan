import { Modal} from 'antd';
import { useRouter } from 'next/router';
import AntLayout from '../../components/AntLayout';
import EachGoals from '../../components/EachGoals';
import React, { useEffect, useState, useRef } from "react";
import AddGoalForm from '../../components/AddGoalForm';

export default function YearItem() {
    const router = useRouter();
    console.log("==router.query: ", router.query);
    const [ allData, setAllData ] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const year = router.query.year;
    const formComponentRef = useRef();
    const [ goalModalVisible, setGoalModalVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);
  
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
                              console.log("found years", data.data[i].goals)
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
        <AntLayout hasProfile={true} hasSideBar={true} isShowAddNewPlan={false} onAddGoalClick={showAddGoalModal}>
            <h1>This is {year}</h1>
            <EachGoals allData={allData}/>
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