import {createStyles, makeStyles} from "@material-ui/core";
import * as React from "react";
import {Maybe} from "src/common/presentation/components/molecules";
import {MusingResponseDto} from "src/musings/api/dto";
import EachMusing from "./EachMusing";
import Loading from "src/Loading";
import {pageContainerStyle} from "src/common/styles/pageContainerStyle";

const useStyles = makeStyles(createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  eachItem: {
    maxWidth: 450,
  },
}));

export interface MusingsProps {
  musings: MusingResponseDto[];
  pending: boolean;
  rejected: boolean;
}

const Musings: React.FC<MusingsProps> = ({ musings, pending }) => {
  const classes = useStyles();
  return <div>
    <div style={pageContainerStyle}>
      <div/>
      <div className={classes.container}>
        <div className={classes.eachItem}>
          <Maybe test={pending}>
            <Loading />
          </Maybe>
          <Maybe test={!pending}>
            {musings.map(i => <EachMusing key={i.from} item={i} />)}
          </Maybe>
        </div>
      </div>
      <div/>
    </div>
    <style jsx global>{`
        h1 {
          font-family: 'Bad Script' !important;
        }
        h1 {
          margin-bottom: 12px !important;
        }
      `}
    </style>
  </div>;
};

export default Musings;
