import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import ChangeUsername from '../Small/ChangeUsername';
import DobUpdate from '../Small/DobUpdate';


export default function SecondSettings({ value }) {  // Make sure to destructure 'value' from props

  const [basicActive, setBasicActive] = useState('home');

  const handleBasicClick = (tab) => {
    if (value === tab) return;  // Compare with the clicked tab, not the current active one
    setBasicActive(tab);
  }

  useEffect(() => {
    console.log(basicActive);
  }, [basicActive]);

  return (
    <MDBRow style={{ color: 'white' ,marginTop:"7%"}}>
      <MDBCol size={4}>
        <MDBListGroup>
        <MDBTabs >
            <MDBListGroupItem action active={basicActive === 'home'} noBorders className='px-3 mb-6' color='dark' style={{borderRadius:"15px"}} >
              <MDBTabsItem >
                <MDBTabsLink onClick={() => handleBasicClick('home')} >Change Username</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'profile'} noBorders className='px-3 mb-6'  color='dark' style={{borderRadius:"15px"}} >
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('profile')}>Update birthdate</MDBTabsLink>
              </MDBTabsItem> 
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'messages'} noBorders className='px-3 mb-6'  color='dark'style={{borderRadius:"15px"}} >
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('messages')}>Reset password</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            {/* <MDBListGroupItem action active={basicActive === 'settings'} noBorders className='px-3 mb-6'  color='dark' style={{borderRadius:"15px"}}>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('settings')}>Settings</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem> */}
          </MDBTabs>
        </MDBListGroup>
      </MDBCol>

      <MDBCol size={8}>
        <MDBTabsContent>
          <MDBTabsPane open={basicActive === 'home'}>
            <ChangeUsername/>
           
          </MDBTabsPane>
          <MDBTabsPane open={basicActive === 'profile'}>
            <DobUpdate/>
          </MDBTabsPane>
          <MDBTabsPane open={basicActive === 'messages'}>
            {/* Content for Messages tab */}
          </MDBTabsPane>
          <MDBTabsPane open={basicActive === 'settings'}>
            {/* Content for Settings tab */}
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCol>
    </MDBRow>
  );
}
