import * as React from "react";
import {HeadTitle} from "src/view/common/presentation/components/molecules";
import Places from "src/view/places/presentation/components/templates/Places";

const PlacesPage = () => <div style={{ width: "100%" }}>
  <HeadTitle title="Places" />
  <Places />
</div>;

export default PlacesPage;
