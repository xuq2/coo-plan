import { Card, Col, Divider, Row, Tag } from "antd";
import Link from 'next/link'
import React from "react";
import moment from "moment";

export default function EachGoals(props) {
    const month = [9,10,11,12,1,2,3,4,5,6,7,8];

    return (
        <>
            {/* Time line */}
            <Row className="time-line">
                <Divider >Month</Divider>
                {month.map(x => (
                    <>
                <Col span={2} lg={2}> 
                    {x}
                </Col>
                    </>
                ))}
                
            </Row>
            <Row className="goal-col">
                {props.allData.map(x => {
                    const start_month = parseInt(moment(x.goal_time.start_time).format('MM'));
                    const end_month = parseInt(moment(x.goal_time.end_time).format('MM'));
                    let month_window;
                    if(end_month < start_month) {
                        month_window = end_month + 12 - start_month + 1;
                    } else {
                        month_window = end_month - start_month + 1;
                    }
                    let start_col;
                    if(start_month < 9) {
                        start_col = start_month + 12 - 9;
                    } else {
                        start_col = start_month - 9;
                    }
                    // console.log(start_month);
                    // console.log(end_month);
                    // console.log("start_col: " + start_col);
                    // console.log("month_window: " + month_window);
                    return(
                    <>
                        <Col className="goal-col"span={start_col*2}></Col>
                        <Col className="goal-col" span={month_window*2}>
                            <Tag style={{width: '100%', textAlign: 'center'}} color={x.color}>
                            {/* {moment(x.goal_time.start_time).format('MM')} */}
                            {x.goal_name}
                            </Tag>
                        </Col>
                        <Col className="goal-col" span={24-start_col*2-month_window*2}></Col>
                    </>
                    )
                })}
            </Row>
        </>
    )
}
