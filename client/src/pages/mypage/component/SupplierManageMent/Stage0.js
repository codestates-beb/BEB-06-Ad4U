import React from 'react';

import { getLocalData } from '../../../../config/localStrage';
import supplier from '../../../../hooks/axios/supplier';

import { Container, Row, Col} from 'react-bootstrap';

import '../../Supplier.css';
import '../TransactionButton.css';

//모집중
const Stage0 = ({ adList }) => {

  const adId = adList.id;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  return (
    <>
      <Container className='supplierManagement_container'>
        <Row>
          <Col xl={9} className='supplierStage0_contentArea'><div>현재 광고주가 지원자를 모집중에 있습니다.</div></Col>
          <Col xl={3} className='supplierStage0_buttonArea '><button className='transaction_Button apply_cancel' onClick={() => supplier.callApplyCancel(accessToken, isClient, adId)}>cancel</button></Col>
        </Row>  
      </Container>
    </>
  );
}

export default Stage0;