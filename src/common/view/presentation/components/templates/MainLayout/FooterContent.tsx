import {useRouter} from "next/router";
import * as React from "react";
import {styled, Typography} from "@mui/material";
import {Link} from "../../molecules";

const FooterDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  userSelect: "none",
});

const SignImg = styled("img")(({theme}) => ({
  width: 50,
  height: 50,
  marginTop: -20,
  pointerEvents: "none",
  opacity: theme.palette.mode === "dark" ? 0 : "initial"
}));

const FooterContent = () => {
  const router = useRouter();

  const createOrEdit = React.useCallback(() => {
    const splitPath = router.asPath.split("/").slice(1);
    if (splitPath.length === 1) {
      router.push(router.pathname + "/create").then(); // url에서 쿼리를 제외하고 사용하기 위해 pathname 사용
    } else if (splitPath.length > 1) {
      router.push("/" + splitPath[0] + "/update/" + splitPath.slice(1).join("/")).then();
    }
  }, [router]);

  return <FooterDiv>
    <SignImg alt="ignorable" onClick={createOrEdit} src="https://cdn.myeongjae.kim/res/about_logos/0.png" style={{ opacity: 0, pointerEvents: "all" }} />

    <Typography variant="caption">
      If you like my website, you can copy it from <Link href="https://github.com/myeongjae-kim/terrace">here</Link>.
    </Typography>

    <SignImg alt="ignorable" src="https://cdn.myeongjae.kim/res/about_logos/0.png" />
  </FooterDiv>;
};

export default FooterContent;
