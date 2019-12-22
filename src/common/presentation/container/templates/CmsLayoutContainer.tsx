import * as React from 'react';
import { connect } from 'react-redux';
import CmsLayout from '../../components/templates/CmsLayout';
import { RootState } from '../../state-module/root';

interface Props {
  paths: string[]
}

const CmsLayoutContainer: React.FC<Props> = ({ children, paths }) => {
  const [open, setOpen] = React.useState(true);
  const toggleOpen = () => setOpen(!open);

  return <CmsLayout paths={paths} open={open} toggleOpen={toggleOpen}>
    {children}
  </CmsLayout>
}


const mapStateToProps = (state: RootState) => ({
  paths: state.common.paths
})

export default connect(mapStateToProps)(CmsLayoutContainer);