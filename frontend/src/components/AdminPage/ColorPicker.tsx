import { Component, Dispatch, SetStateAction } from 'react';
import { PhotoshopPicker } from 'react-color';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  colorHook: string;
}

class ColorPicker extends Component<ColorPickerProps> {
  previousColor: string;

  constructor(props: ColorPickerProps) {
    super(props);
    this.previousColor = props.colorHook;
  }

  handleChangeComplete = (color: any) => {
    const { onColorChange } = this.props;
    this.setState({ background: color.hex });
    onColorChange(color.hex);
  };

  handleAccept = () => {
    const { onColorChange } = this.props;
    const { setOpen } = this.props;
    this.setState({ background: this.props.colorHook });
    onColorChange(this.props.colorHook);
    setOpen(false);
  };

  handleCancel = () => {
    const { onColorChange } = this.props;
    const { setOpen } = this.props;
    this.setState({ background: this.previousColor });
    onColorChange(this.previousColor);
    setOpen(false);
  };

  render() {
    return (
      <PhotoshopPicker
        header="Velg farge"
        color={this.props.colorHook}
        onChangeComplete={this.handleChangeComplete}
        onAccept={this.handleAccept}
        onCancel={this.handleCancel}
        onChange={this.handleChangeComplete}
      />
    );
  }
}

export default ColorPicker;
