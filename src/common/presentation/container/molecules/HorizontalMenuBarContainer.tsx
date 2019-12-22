import * as React from 'react';
import { connect } from 'react-redux';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import HorizontalMenuBar from '../../components/molecules/HorizontalMenuBar';
import { RootState } from '../../state-module/root';

interface Props {
  paths: string[]
}

const HorizontalMenuBarContainer: React.FC<Props> = ({ paths }) => {
  return <HorizontalMenuBar value={FIRST_DEPTH_PATHS.indexOf(paths[0] as FirstDepthPath)} />;
}

const mapStateToProps = (state: RootState) => ({
  paths: state.common.paths
})

export default connect(mapStateToProps)(HorizontalMenuBarContainer);