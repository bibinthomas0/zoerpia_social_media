import React from "react";
import {
  Grid,
  GridItem,
} from "@chakra-ui/react";

import ThirdSection from "../../../Components/Home/Main/ThirdSection";
import SecondSettings from "../../../Components/Settings/Main/SecondSection";
import FirstSetting from "../../../Components/Settings/Main/FirstSection";

function UserSettings() {
  return (
    <Grid
      height={"820px"}
      templateColumns="repeat(10, 9%)"
      gap={1}
      fontWeight={"bold"}
      bg={'black'}
      color={'white'}
    >
      <GridItem paddingLeft={"7%"}  colSpan={{ base: "1", xl: "2" }}>
     
        <FirstSetting />
      </GridItem>

      
      <GridItem
        colSpan={{ base: "9", xl: "7" }}
        
      
       
      >
        <SecondSettings />
      </GridItem>
     
    </Grid>
  );
}

export default UserSettings;
