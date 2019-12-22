import { Card, CardContent, Theme } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Check } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import { BaseFieldProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import I18NService from 'src/common/domain/service/I18NService';
import { ErrorTypography, MutableTextField, MySpeedDial, Spacer, SpeedDialActionData } from 'src/common/presentation/components/molecules';
import { MarkdownEditor } from 'src/common/presentation/components/organisms';
import NoticeFormDto from 'src/mother/notice/api/dto/NoticeFormDto';

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  semiTransparent: {
    opacity: 0.5
  },
  flex: {
    display: 'flex',
  },
  cardContainer: {
    margin: 10
  },
  card: {
    minWidth: 600
  }
}))

interface Props {
  isEditing: boolean
  pending: boolean
  rejected: boolean
}

const { useTranslation } = I18NService;

const NoticeForm: React.FC<InjectedFormProps<NoticeFormDto, Props> & Props> = ({
  handleSubmit,
  isEditing,
  pending,
  rejected
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["mother", "common"]);
  const actions: SpeedDialActionData[] = [{
    icon: <Check />,
    name: isEditing ? t('common:complete.edit') : t('common:complete.add'),
    handleClick: handleSubmit
  }]

  return <form>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
    </ErrorTypography>

    <div className={clsx({ [classes.semiTransparent]: pending })}>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Field<BaseFieldProps<TextFieldProps>>
              name="title"
              component={MutableTextField}
              props={{
                label: t("notice.title")
              }}
            />

            <Spacer />

            <Field<BaseFieldProps<TextFieldProps>>
              name="content"
              component={MarkdownEditor}
              props={{
                label: t("notice.content"),
                variant: "outlined",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>

    <MySpeedDial actions={actions} />
  </form>;
}

export default reduxForm<NoticeFormDto, Props>({
  form: "NoticeForm",
  enableReinitialize: true,
  // validate
})(NoticeForm);