import * as React from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../components/templates/MainLayout';
import { RootState } from '../../state-module/root';

interface Props {
  paths: string[]
}

const MainLayoutContainer: React.FC<Props> = ({ children, paths }) => {
  return <MainLayout paths={paths} open={true}>
    {children}
  </MainLayout>
}


const mapStateToProps = (state: RootState) => ({
  paths: state.common.paths
})

export default connect(mapStateToProps)(MainLayoutContainer);