import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  active: css`
    color: #9b9b9b !important;
    background: #2f2f2f !important;
  `,
  btn: css`
    display: block;

    margin-top: 15px;
    padding: 10px 20px;

    font-weight: bold;
    color: #fff;
    text-align: center;

    background: #2f2f2f;
    border-radius: 8px;
  `,
  subTitle: css`
    color: gray;
  `,
  summary: css`
    margin-top: 15px;
  `,
  title: css`
    font-size: 20px;
    font-weight: bold;
  `,
  ul: css`
    padding-inline-start: 15px;

    li::marker {
      content: '✓';
    }

    li {
      margin-top: 5px;
    }

    p {
      margin-left: 15px;
    }
  `,
}));
