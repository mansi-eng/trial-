import * as React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface SupplyStageState {
    companyItems: Array<any>
    businessUnitItems: Array<any>
    countriesItems: Array<any>
    selectedCompany: any,
    selectedBu: any,
    selectedCuntries: any
}

const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class SupplyStages extends React.Component<any, SupplyStageState>
{

    constructor(props: any) {
        super(props);
        this.state = {
            companyItems: [],
            businessUnitItems: [],
            countriesItems: [],
            selectedCompany: null,
            selectedBu: null,
            selectedCuntries: null
        }
    }

    componentDidMount(): void {

        fetch('/src/Database/CompanyMaster.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        ).then(function (response) {
            console.log(response)
            return response.json();
        })
            .then((companyData) => {
                this.setState({ companyItems: companyData.data })
                console.log(companyData);
                //setData(myJson)
            });

        fetch('/Database/BusinessUnits.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        ).then(function (response) {
            console.log(response)
            return response.json();
        })
            .then((businessUnitsData) => {
                this.setState({ businessUnitItems: businessUnitsData.data })
                //setData(myJson)
            });

        fetch('/Database/Countries.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        ).then(function (response) {
            console.log(response)
            return response.json();
        })
            .then((countriesData) => {
                this.setState({ countriesItems: countriesData.data })
                //setData(myJson)
            });

    }


    createOrderCyleTitle = () => {
        let dt = new Date();
        return `${this.state.selectedCompany}_${this.state.selectedBu}${months[dt.getMonth()]} - ${dt.getFullYear()}`
    }

    onChangeCompany = (ev: any) => {
        this.setState({
            selectedCompany: ev.target.value
        })
    }

    onChangeBusinessUnit = (ev: any) => {
        this.setState({
            selectedBu: ev.target.value
        })
    }



    render(): React.ReactNode {
        return (
            <Container style={{ padding: '0px', }}>
                <div style={{ height: '800px', textAlign: 'left', padding: '40px 58px' }}>
                    <Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ fontWeight: '500', }}>Title *</Form.Label>
                            <Form.Control disabled={true} type="text" placeholder="Enter value" value={this.createOrderCyleTitle()}></Form.Control>

                        </Form.Group>

                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'Brown', fontWeight: '500' }}>Company*</Form.Label>
                            <Form.Select >
                            {
                                    this.state.companyItems.map(item => {
                                        return <option value={item.Title}>{item.Title}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'brown', fontWeight: '500' }}>Business Unit *</Form.Label>
                            <Form.Select>
                                <option>Select</option>
                                {
                                    this.state.businessUnitItems.map(item => {
                                        return <option value={item.Title}>{item.Title}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'brown', fontWeight: '500' }}>Country *</Form.Label>
                            <Form.Select>
                                <option>Select</option>
                                {
                                    this.state.countriesItems.map(item => {
                                        return <option value={item.Title}>{item.Title}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <br></br>

                    <Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'brown', fontWeight: '500' }}>Start Date *</Form.Label>
                            <Form.Control
                                type='data'
                                placeholder='Start Date'
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'brown', fontWeight: '500' }}>Expected End Date *</Form.Label>
                            <Form.Control
                                type='data'
                                placeholder='Expected End Date'
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <Form.Label style={{ color: 'brown', fontWeight: '500' }}>Comment *</Form.Label>
                            <Form.Control
                                as='textarea'
                                style={{ height: '80px', textAlign: 'left' }}
                                placeholder='Enter Short Bio / Descripton'

                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <br></br>

                    <Row>
                        <Form.Group as={Col} xs={12} md={4}>
                            <Button variant='danger' style={{ borderRadius: '50px' }}>Submit</Button>{' '}
                            <Button variant='danger' style={{ borderRadius: '50px' }}>Do To Home</Button>{' '}

                        </Form.Group>
                    </Row>
                </div>

            </Container>
        )
    }
}