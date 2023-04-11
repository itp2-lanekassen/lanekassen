import { Component, Dispatch, SetStateAction, createRef } from 'react';
import { PhotoshopPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  colorHook: string;
}

class ColorPicker extends Component<ColorPickerProps> {
  previousColor: string;
  pickerRef: React.RefObject<HTMLDivElement>;

  constructor(props: ColorPickerProps) {
    super(props);
    this.previousColor = props.colorHook;
    this.pickerRef = createRef();
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.pickerRef.current && !this.pickerRef.current.contains(event.target as Node)) {
      this.handleCancel();
    }
  };

  handleChangeComplete = (color: ColorResult) => {
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
      <div ref={this.pickerRef}>
        <PhotoshopPicker
          header="Velg farge"
          color={this.props.colorHook}
          onChangeComplete={this.handleChangeComplete}
          onAccept={this.handleAccept}
          onCancel={this.handleCancel}
          onChange={this.handleChangeComplete}
        />
      </div>
    );
  }
}

export default ColorPicker;

// Inspired by: http://casesandberg.github.io/react-color/
