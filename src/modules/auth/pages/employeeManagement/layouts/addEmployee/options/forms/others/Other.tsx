import HeaderForm from '../HeaderForm';
import OtherForm from './OtherForm';

interface Props {
  bool?: boolean;
}

function Other({ bool }: Props) {
  return (
    <HeaderForm title="Others" bool={bool}>
      <OtherForm />
    </HeaderForm>
  );
}

export default Other;
