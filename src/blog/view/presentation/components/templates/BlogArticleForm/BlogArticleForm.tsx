import {makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import clsx from "clsx";
import {ErrorMessage, Form, Formik} from "formik";
import Optional from "optional-js";
import * as React from "react";
import {ErrorTypography} from "src/common/view/presentation/components/molecules";
import {MarkdownEditor} from "src/common/view/presentation/components/organisms";
import * as Yup from "yup";
import {ArticleContent} from "../../organisms";
import {BlogArticleDetailResponse} from "src/blog/domain/BlogArticleDetailResponse";

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
  }
}));

interface BlogArticleRequestDto {
  seq: number;
  title: string;
  slug: string;
  content: string;
}

interface Props {
  isUpdating?: boolean;
  initialValues?: BlogArticleDetailResponse;
  onSubmit(request: BlogArticleRequestDto): Promise<void>;
}

const BlogArticleForm = ({ isUpdating, initialValues, onSubmit }: Props) => {
  const classes = useStyles();

  return <Formik<BlogArticleRequestDto>
    enableReinitialize
    initialValues={{
      seq: Optional.ofNullable(initialValues).map(iv => iv.seq).orElse(0),
      title: Optional.ofNullable(initialValues).map(iv => iv.title).orElse(""),
      slug: Optional.ofNullable(initialValues).map(iv => iv.slug).orElse(""),
      content: Optional.ofNullable(initialValues).map(iv => iv.content).orElse("")
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
      const { values, handleChange, handleBlur } = props;

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
          <div>
            <MarkdownEditor
              label="내용"
              type="text"
              name="content"
              fullWidth
              multiline
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              PreviewComponent={ArticleContent}
            />
            <ErrorMessage
              name="content"
              className={classes.errorMessageCenter}
              component={ErrorTypography} />
          </div>
        </div>
      </Form>;
    }}
  </Formik>;
};

export default BlogArticleForm;
