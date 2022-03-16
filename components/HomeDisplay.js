import { Row, Col, Card } from "antd"
import { useRouter } from "next/router";

export default function HomeDisplay() {
    const years = ["2018","2019","2020","2021"];
    const router = useRouter();

    return (
        <>
        <div className="site-card-wrapper">
            <Row gutter={32}>
                {years.map(year=>
                    <Col span={6} key={year} style={{marginBottom: 30}}>
                        <Card 
                            hoverable 
                            style={{width: 250, height: 80, verticalAlign: 'center'}}
                            onClick={()=>{router.push(`${router.asPath}/${year}`)}}
                        >
                            <h1 style={{fontWeight: 'bold', textAlign: 'center'}}>{year}</h1>
                        </Card>
                    </Col>
                    )
                }
            </Row>
        </div>
            
            
        </>
    );
}