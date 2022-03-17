import { Form, Input, Row, Col, Checkbox, DatePicker, Select, Tag, Divider, notification } from 'antd';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker; 
const { TextArea } = Input;
const { Option } = Select;

function AddGoalForm(props, ref) {
    const [ goalName, setGoalName ] = useState(""); 
    const [ goalColor, setGoalColor ] = useState("red");
    const [ goalPriority, setGoalPriority ] = useState("high");
    const [ goalTerms, setGoalTerms ] = useState([]); 
    const [ goalTime, setGoalTime ] = useState({});
    const [ goalDescription, setGoalDescription ] = useState("");
    const [ form ] = Form.useForm();
    const [ goalTasks, setGoalTasks ] = useState([{"toggle": false, "msg": ""}]);
    const [ goalResourceLink, setGoalResourceLink ] = useState("");

    useEffect(()=>{
        const goal = props.goal;
        if(Object.keys(goal).length !== 0) {
            console.log(goal);
            setGoalName(goal.goal_name);
            setGoalColor(goal.color);
            setGoalPriority(goal.priority);
            setGoalTerms(goal.terms);
            setGoalDescription(goal.description);
            setGoalTasks(goal.task);
            setGoalResourceLink(goal.resource_link);
            setGoalTime(goal.goal_time);
        }
    }, [props.goal]);

    const openNotificationWithIcon = (type, description) => {
        notification[type]({
          message: 'Add Goal Error',
          description: description,
          duration: 0,
          key: 'addGoalError'
        });
    };

    useImperativeHandle(ref, () => ({
        async handleFormSubmit(year) {
            notification.close('addGoalError');
            if(goalName === "") {
                openNotificationWithIcon('error', 'Please enter your goal name');
            } else if(Object.keys(goalTime).length === 0) {
                openNotificationWithIcon('error', 'Please fill in goal time');
            }
            if(goalName && Object.keys(goalTime).length !== 0) {
                try {
                    props.setConfirmLoading(true);
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "year": year,
                        "goal_name": goalName,
                        "color": goalColor,
                        "priority": goalPriority,
                        "task": goalTasks,
                        "terms": goalTerms,
                        "goal_time": goalTime,
                        "description": goalDescription,
                        "resource_link": goalResourceLink
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        credentials: 'include'
                    };

                    fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user/addgoals", requestOptions)
                        .then(response => {
                            if(response.status === 200) {
                                console.log("Successfully added goal");
                                const goalData = {
                                    "goal_name": goalName,
                                    "color": goalColor,
                                    "priority": goalPriority,
                                    "task": goalTasks,
                                    "terms": goalTerms,
                                    "goal_time": goalTime,
                                    "description": goalDescription,
                                    "resource_link": goalResourceLink
                                }
                                props.syncData(goalData);
                                resetForm();
                                props.setConfirmLoading(false);
                                props.closeForm();
                            } else {
                                response.text().then(error => {
                                    openNotificationWithIcon('error', error);
                                    props.setConfirmLoading(false);
                                });
                            }
                        })
                        .catch(error => console.log('error', error));
                } catch(e) {
                    console.log(e);
                }
            }
        },
        resetForm() {
            console.log("Reset form");
            setGoalName(""); 
            setGoalColor("red");
            setGoalPriority("high");
            setGoalTerms([]); 
            setGoalTime({});
            setGoalDescription("");
            setGoalTasks([{"toggle": false, "msg": ""}]);
            setGoalResourceLink("");
        }
    }));

    function resetForm() {
        console.log("Reset form");
        setGoalName(""); 
        setGoalColor("red");
        setGoalPriority("high");
        setGoalTerms([]); 
        setGoalTime({});
        setGoalDescription("");
        setGoalTasks([{"toggle": false, "msg": ""}]);
        setGoalResourceLink("");
    }

    function updateTask(e, index) {
        let newTasks = [...goalTasks];
        newTasks[index].msg = e.target.value;
        setGoalTasks(newTasks);
    }

    function updateTaskToggle(e, index) {
        let updatedTasks = [...goalTasks];
        updatedTasks[index].toggle = e.target.checked;
        setGoalTasks(updatedTasks);
    }

    function handleKeyPressed(e) {
        if(e.key === 'Enter' && e.target.value !== "") {
            setGoalTasks(oldTasks=>[...oldTasks, {"toggle": false, "msg": ""}])
        }
    }

    function handleDateChange(dates) {
        setGoalTime({
            "start_time": dates[0].valueOf(),
            "end_time": dates[1].valueOf()
        })
    }

    return (
        <Form
            form={form}
            layout="vertical"
        >
            <Row justify='space-between'>
                <Col span={10}>
                    <Form.Item label="Name a goal">
                        <Input maxLength={15} showCount value={goalName} onChange={(e)=>setGoalName(e.target.value)}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Color">
                        <Select value={goalColor} onChange={(value)=>setGoalColor(value)}>
                            <Option value="red"><Tag color="red">Red</Tag></Option>
                            <Option value="magenta"><Tag color="magenta">Magenta</Tag></Option>
                            <Option value="volcano"><Tag color="volcano">Volcano</Tag></Option>
                            <Option value="orange"><Tag color="orange">Orange</Tag></Option>
                            <Option value="gold"><Tag color="gold">Gold</Tag></Option>
                            <Option value="lime"><Tag color="lime">Lime</Tag></Option>
                            <Option value="green"><Tag color="green">Green</Tag></Option>
                            <Option value="cyan"><Tag color="cyan">Cyan</Tag></Option>
                            <Option value="blue"><Tag color="blue">Blue</Tag></Option>
                            <Option value="geekblue"><Tag color="geekblue">Geekblue</Tag></Option>
                            <Option value="purple"><Tag color="purple">Purple</Tag></Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Priority">
                        <Select value={goalPriority} onChange={(value)=>setGoalPriority(value)}>
                            <Option value="high"><Tag color="red">High</Tag></Option>
                            <Option value="medium"><Tag color="orange">Medium</Tag></Option>
                            <Option value="low"><Tag color="yellow">Low</Tag></Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Tasks">
                <div style={{border: '1px solid #d9d9d9', borderRadius: '2px', padding: '8px 10px'}}>
                    {goalTasks.map((task, index)=>(
                        <div style={{marginBottom: 5, marginTop: 5}} key={index} >
                            <Checkbox checked={task.toggle} className='tasks-checkbox' onChange={(e)=>updateTaskToggle(e, index)}>
                                <Input value={task.msg} onKeyPress={(e)=>handleKeyPressed(e)} onChange={(e)=>updateTask(e, index)} className='tasks-input'></Input>
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </Form.Item>
            <Form.Item label="Select your terms">
                <div style={{border: '1px solid #d9d9d9', borderRadius: '2px', padding: '8px 10px'}}>
                    <Checkbox.Group value={goalTerms} style={{alignItems: 'center'}} onChange={(checkedValues)=>setGoalTerms(checkedValues)}>
                        <Checkbox value='fall'><Tag color='orange'>Fall</Tag></Checkbox>
                        <Divider type='vertical'/>
                        <Checkbox value='winter'><Tag color='blue'>Winter</Tag></Checkbox>
                        <Divider type='vertical'/>
                        <Checkbox value='spring'><Tag color='green'>Spring</Tag></Checkbox>
                        <Divider type='vertical'/>
                        <Checkbox value='summer'><Tag color='red'>Summer</Tag></Checkbox>
                    </Checkbox.Group>
                </div>
            </Form.Item>
            <Form.Item label="Time">
                <RangePicker 
                    value={Object.keys(goalTime).length === 0 ? [] : [moment(goalTime.start_time), moment(goalTime.end_time)]}
                    onChange={(dates)=>handleDateChange(dates)}/>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea onChange={(e)=>setGoalDescription(e.target.value)} value={goalDescription} autoSize={{minRows:5}}/>
            </Form.Item>
        </Form>
    );
}

export default forwardRef(AddGoalForm);