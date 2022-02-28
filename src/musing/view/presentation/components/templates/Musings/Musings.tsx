import {createStyles, makeStyles} from "@material-ui/core";
import * as React from "react";
import {MusingResponseDto} from "src/musing/domain";
import EachMusing from "./EachMusing";
import {pageContainerStyle} from "src/common/view/presentation/styles/pageContainerStyle";

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
}

const Musings: React.FC<MusingsProps> = ({ musings }) => {
  const classes = useStyles();
  return <div>
    <div style={pageContainerStyle}>
      <div/>
      <div className={classes.container}>
        <div className={classes.eachItem}>
          {musings.map(i => <EachMusing key={i.from} item={i} />)}
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
