import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.checked ? "black" : "papayawhip")};
  border-radius: 100%;
  border: 3px solid black;
  transition: all 150ms;
  cursor:pointer;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

function CheckDone({ task, toggleDoneTask }) {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <label>
        <Checkbox
          checked={task.done}
          onChange={(e) => toggleDoneTask(e, task.id)}
        />
        <span style={{ marginLeft: 8 }}></span>
      </label>
    </div>
  );
}

export default CheckDone;
