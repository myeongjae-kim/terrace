import { makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import clsx from 'clsx';
import { ErrorMessage, Form, Formik } from 'formik';
import * as React from 'react';
import { BlogArticleRequestDto } from 'src/blog/api';
import { DisplayProps, MySpeedDial } from 'src/common/presentation/components/molecules';
import { MarkdownEditor } from 'src/common/presentation/components/organisms';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 100,
    margin: `${theme.spacing(2)}px 0`,
    userSelect: 'none'
  },
  shortFieldContainer: {
    maxWidth: theme.spacing(50),
    margin: 'auto',
    "& > div": {
      margin: theme.spacing(1)
    }
  }
}))

interface Props {
  pending: boolean
  rejected: boolean
  onSubmit(request: BlogArticleRequestDto): Promise<void>
}

const BlogArticleForm: React.FC<Props> = ({ pending, onSubmit }) => {
  const classes = useStyles();

  return <Formik<BlogArticleRequestDto>
    initialValues={{
      seq: 0,
      title: "",
      slug: "",
      content: ""
    }}
    onSubmit={onSubmit}
  >
    {props => {
      const { values, handleChange, handleBlur, isSubmitting } = props;
      return <Form>
        <Typography variant="h2" className={classes.title}>블로그 글 등록</Typography>
        <div className={clsx(classes.shortFieldContainer)}>
          <div>
            <TextField
              label="순서"
              type="number"
              name="seq"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.seq}
            />
            <ErrorMessage name="seq" component="div" />
          </div>
          <div>
            <TextField
              label="제목"
              type="text"
              name="title"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <TextField
              label="슬러그"
              type="text"
              name="slug"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slug}
            />
            <ErrorMessage name="slug" component="div" />
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
            />
            <ErrorMessage name="content" component="div" />
          </div>
        </div>
        <MySpeedDial disabled={isSubmitting || pending} actions={[{
          name: "완료",
          icon: <Check />
        }]} />
        <DisplayProps {...props} />
      </Form>
    }}
  </Formik>;
}

export default BlogArticleForm;