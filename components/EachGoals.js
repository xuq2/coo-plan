import { Col, Divider, Row } from "antd";
import React from "react";

export default function EachGoals(props) {
    const month = [9,10,11,12,1,2,3,4,5,6,7,8];

    return (
        <>
            {/* Time line */}
            <Row className="time-line">
                <Divider >Month</Divider>
                {month.map(x => (
                    <>
                <Col span={2} > 
                    {x}
                </Col>
                    </>
                ))}
                {props.allData.map(x => (
                    <>
                        <Col>
                            {x.color}
                        </Col>
                    </>
                ))}
            </Row>
        </>
    )
}
