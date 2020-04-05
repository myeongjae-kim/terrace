import { makeStyles, TextField, Theme, Typography, Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import clsx from "clsx";
import { ErrorMessage, Form, Formik } from "formik";
import Optional from "optional-js";
import * as React from "react";
import { BlogArticleDetailResponseDto, BlogArticleRequestDto } from "src/blog/api";
import { ErrorTypography, MySpeedDial, MarkdownPreview } from "src/common/presentation/components/molecules";
import { WysiwygEditor } from "src/common/presentation/components/organisms";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 100,
    margin: `${theme.spacing(2)}px 0`,
    userSelect: "none"
  },
  shortFieldContainer: {
    maxWidth: theme.spacing(50),
    margin: "auto",
    "& > div": {
      margin: theme.spacing(1)
    }
  },
  errorMessageCenter: {
    display: "flex",
    justifyContent: "center"
  },
  editorContainer: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(40),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    "& pre": {
      border: "initial !important"
    }
  },
  previewContainr: {
    margin: `${theme.spacing(1)}px auto`,
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(100),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    height: "100vh",
    overflow: "scroll",
    padding: `0 ${theme.spacing(2)}px`
  }
}));

interface Props {
  isUpdating?: boolean;
  initialValues?: BlogArticleDetailResponseDto;
  pending: boolean;
  rejected: boolean;
  onSubmit(request: BlogArticleRequestDto): Promise<void>;
}

const BlogArticleForm: React.FC<Props> = ({ isUpdating, initialValues, pending, onSubmit }) => {
  const classes = useStyles();

  const initialContent = Optional.ofNullable(initialValues).map(iv => iv.content).orElse("");

  const [content, setContent] = React.useState(initialContent);
  React.useEffect(() => { setContent(initialContent); }, [initialContent]);

  const [showPreview, setShowPreview] = React.useState(false);
  const togglePreview = React.useCallback(() => {
    setShowPreview(!showPreview);
  },[showPreview]);

  return <>
    <Formik<BlogArticleRequestDto>
      enableReinitialize
      initialValues={{
        seq: Optional.ofNullable(initialValues).map(iv => iv.seq).orElse(0),
        title: Optional.ofNullable(initialValues).map(iv => iv.title).orElse(""),
        slug: Optional.ofNullable(initialValues).map(iv => iv.slug).orElse(""),
        content
      }}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        seq: Yup.number().moreThan(0, "양수를 입력하세요."),
        title: Yup.string().required("제목을 입력하세요."),
        slug: Yup.string().required("슬러그를 입력하세요."),
        content: Yup.string().required("내용을 입력하세요."),
      })}
    >
      {props => {
        const { values, handleChange, handleBlur, isSubmitting } = props;

        const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value
            .replace("/", "")
            .replace(" ", "")
            .replace("#", "")
            .replace("%", "")
            .replace("&", "");

          handleChange(e);
        };

        return <Form>
          <Typography variant="h2" className={classes.title}>블로그 글 {isUpdating ? "수정" : "등록"}</Typography>
          <div className={clsx(classes.shortFieldContainer)}>
            <div>
              <TextField
                label="순서"
                type="number"
                name="seq"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.seq}
              />
              <ErrorMessage name="seq" component={ErrorTypography} />
            </div>
            <div>
              <TextField
                label="제목"
                type="text"
                name="title"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <ErrorMessage name="title" component={ErrorTypography} />
            </div>
            <div>
              <TextField
                label="슬러그"
                type="text"
                name="slug"
                fullWidth
                required
                helperText="입력 불가능한 특수문자: #%&"
                onChange={handleSlugChange}
                onBlur={handleBlur}
                value={values.slug}
              />
              <ErrorMessage name="slug" component={ErrorTypography} />
            </div>
          </div>
          <div>
            <ErrorMessage
              name="content"
              className={classes.errorMessageCenter}
              component={ErrorTypography} />
          </div>
          <div style={{zIndex: 5000}}>
            <MySpeedDial disabled={isSubmitting || pending} actions={[{
              name: "완료",
              icon: <Check />
            }]} />
          </div>
        </Form>;
      }}
    </Formik>
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button variant="outlined" onClick={togglePreview}>
          {showPreview ? "미리보기 닫기" : "미리보기"}
        </Button>
      </div>
      {showPreview && <div className={classes.previewContainr}>
        <MarkdownPreview markdown={"# Preview\n\n" + content} />
      </div>}
      <div className={classes.editorContainer}>
        <WysiwygEditor
          initialValue={content}
          onChange={setContent}
        />
      </div>
    </div>
  </>;
};

export default BlogArticleForm;