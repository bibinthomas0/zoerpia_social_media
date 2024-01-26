import React from "react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  Input,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { BiCheck } from "react-icons/bi";

const BioStatus = () => {
  return function CustomControlsExample() {
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls();

      return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton icon={<BiCheck />} {...getSubmitButtonProps()} />
          <IconButton icon={<MdClose />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton size="sm" icon={<BiEdit />} {...getEditButtonProps()} />
        </Flex>
      );
    }

    return (
      <Editable
        textAlign="center"
        defaultValue="Rasengan ⚡️"
        fontSize="2xl"
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    );
  };
};

export default BioStatus;
